const viewRouter = require('express').Router();
const Mongo_Client = require('../helpers/dbconnection');
const sgMail = require('@sendgrid/mail');

let viewlMsg = require('../views/viewRequest');

// eslint-disable-next-line no-undef
const EMAIL_URI = process.env.SG_URI;
sgMail.setApiKey(EMAIL_URI);

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

const ObjectId = require('mongodb').ObjectId;

// a route to view a request and send an email to the requester with the request details
viewRouter.get('/viewrequest', async (req, res) => {
    const id = ObjectId(`${req.query.id}`);
    try {
        await Mongo_Client.connect();
        const db = Mongo_Client.db('esforms');
        const Collection = db.collection('requests');
        
        const query = { _id: id };
        const request = await Collection.findOne(query);
        const user = request.user;
        await sendMail(viewlMsg(user, request));
        return res.send(
            'You have viewed this request. The requester will be notified.'
        );
    } catch (err) {
        console.log(err);
    } finally {
        await Mongo_Client.close();
    }

    res.send(id);
});

module.exports = viewRouter;

// Path: views\viewRequest.js
