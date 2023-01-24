const approveRouter = require('express').Router();
const Mongo_Client = require('../helpers/dbconnection');
const sgMail = require('@sendgrid/mail');

let pdapproveMsg = require('../views/approval/pdApproval');
let pcapproveMsg = require('../views/approval/pcApproval');
let vhapproveMsg = require('../views/approval/vhApproval');

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

approveRouter.get('/approve/perdiem', async (req, res) => {
  const id = ObjectId(`${req.query.id}`);
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('requests');

    const query = { _id: id };
    const request = await Collection.findOne(query);
    const user = request.user;
    await sendMail(pdapproveMsg(user, request));
    return res.send(
      'You have approved this request. Relevant Parties will be notified.'
    );
  } catch (err) {
    console.log(err);
  } finally {
    await Mongo_Client.close();
  }

  res.send(id);
});

approveRouter.get('/approve/pettycash', async (req, res) => {
  const id = ObjectId(`${req.query.id}`);
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('pettycash');

    const query = { _id: id };
    const request = await Collection.findOne(query);
    const user = request.user;
    await sendMail(pcapproveMsg(user, request.details));
    return res.send(
      'You have approved this request. Relevant Parties will be notified.'
    );
  } catch (err) {
    console.log(err);
  } finally {
    await Mongo_Client.close();
  }

  res.send(id);
});

approveRouter.get('/approve/vehicle', async (req, res) => {
  const id = ObjectId(`${req.query.id}`);
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('vehicle');

    const query = { _id: id };
    const request = await Collection.findOne(query);
    const user = request.user;
    await sendMail(vhapproveMsg(user, request));
    return res.send(
      'You have approved this request. Relevant Parties will be notified.'
    );
  } catch (err) {
    console.log(err);
  } finally {
    await Mongo_Client.close();
  }

  res.send(id);
});

module.exports = approveRouter;
