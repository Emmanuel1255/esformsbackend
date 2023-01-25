const requestRouter = require('express').Router();
const Mongo_Mongo_Client = require('../helpers/dbconnection');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');

let perdiemMsg = require('../views/requests/pdRequest');
let pettycashMsg = require('../views/requests/pcRequest');
let vhApproval = require('../views/approval/vhApproval');
const vhRequest = require('../views/requests/vhRequest');
let noApproval = [
    'eric@easysolar.org',
    'nthabi@easysolar.org',
    'alex@easysolar.org',
    'natty.davis@easysolar.org',
    'shamsu.mustapha@lib.easysolar.org',
    'ousmane@easysolar.org',
    'akam.kpaka@sl.easysolar.org',
    'zora.anthony@easysolar.org',
];
// eslint-disable-next-line no-undef
const EMAIL_URI = process.env.SG_URI;
sgMail.setApiKey(EMAIL_URI);

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            // req.body.user['Full Name'] +
            //   '--' +
            `${Date.now().toString(32)}-${file.originalname
                .replace(/\s/g, '')
                .toLowerCase()}`
        );
    },
});
const upload = multer({ storage: fileStorageEngine });

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
    console.log('email sent successfully');
};

let user = {};

requestRouter.post(
    '/requests/upload',
    upload.single('invoice'),
    async (req, res) => {
        res.send('File Upload Successful');
    }
);

requestRouter.get('/users', async (req, res) => {
    try {
        await Mongo_Mongo_Client.connect();
        const db = Mongo_Mongo_Client.db('esforms');
        const usersCollection = db.collection('users');

        const query = { 'Employee Email Address': `${req.query.email}` };
        
        user = await usersCollection.findOne(query);
        res.send(user);
    } catch (err) {
        console.log(err);
    } finally {
        await Mongo_Mongo_Client.close();
    }
});

requestRouter.post('/requests/perdiem', async (req, res) => {
    const body = req.body;
    try {
        await Mongo_Mongo_Client.connect();
        const db = Mongo_Mongo_Client.db('esforms');
        const requestCollection = db.collection('requests');

        await requestCollection.insertOne(req.body);
        await sendMail(perdiemMsg(body['user'], req, body._id));
        return res.send(body);
    } catch (err) {
        console.log(err);
    } finally {
        await Mongo_Mongo_Client.close();
    }
    res.send(body);
});
// const server = 'http://esformsbackend.herokuapp.com/';
 const server = 'https://esforms.onrender.com/';

requestRouter.post(
    '/requests/pettycash',
    upload.single('invoice'),
    async (req, res) => {
        const body = {};
        body._id = req._id;
        body.details = JSON.parse(req.body.details);
        body.details.invoiceLink = `${server}${req.file.filename}`;
        body.user = JSON.parse(req.body.user);
        try {
            console.log(req._id, body._id);
            await Mongo_Mongo_Client.connect();
            const db = Mongo_Mongo_Client.db('esforms');
            const pettyCashCollection = db.collection('pettycash');

            await pettyCashCollection.insertOne(body);
            await sendMail(
                pettycashMsg(
                    JSON.parse(req.body.user),
                    JSON.parse(req.body.details),
                    body._id,
                    req.file
                )
            );
            return res.send(body);
        } catch (err) {
            console.log(err);
        } finally {
            await Mongo_Mongo_Client.close();
        }
        res.send(body);
    }
);
requestRouter.post('/requests/pettycash/2', async (req, res) => {
    const body = {};
    body._id = req._id;
    body.details = req.body.details;
    body.user = req.body.user;
    try {
        console.log(req._id, body._id);
        await Mongo_Mongo_Client.connect();
        const db = Mongo_Mongo_Client.db('esforms');
        const pettyCashCollection = db.collection('pettycash');

        await pettyCashCollection.insertOne(body);
        await sendMail(pettycashMsg(req.body.user, req.body.details, body._id));
        return res.send(body);
    } catch (err) {
        console.log(err);
    } finally {
        await Mongo_Mongo_Client.close();
    }
    res.send(body);
});

requestRouter.post('/requests/vehicle', async (req, res) => {
    const body = req.body;
    const userEmail = body['user']['Employee Email Address'];
    const other = body['thirdpartyemail'];
    const msg =
        noApproval.includes(userEmail) || noApproval.includes(other)
            ? vhApproval
            : vhRequest;
    try {
        await Mongo_Mongo_Client.connect();
        const db = Mongo_Mongo_Client.db('esforms');
        const vehicleCollection = db.collection('vehicle');

        await vehicleCollection.insertOne(req.body);
        await sendMail(msg(body['user'], body, body._id));
        return res.send(body);
    } catch (err) {
        console.log(err);
    } finally {
        await Mongo_Mongo_Client.close();
    }
    res.send(body);
});

module.exports = requestRouter;
