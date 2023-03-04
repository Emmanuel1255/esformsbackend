const approveRouter = require('express').Router();
const Mongo_Client = require('../helpers/dbconnection');
const sgMail = require('@sendgrid/mail');

let pdapproveMsg = require('../views/approval/pdApproval');
let pdfinanceMsg = require('../views/approval/pdFinance');
let pduserfinanceMsg = require('../views/approval/pdUserfinance');
let pduserlmMsg = require('../views/approval/pdUserlm');
let pdFinanceappMsg = require('../views/approval/pdFinanceapp');
let pcfinanceMsg = require('../views/approval/pcFinance');
let pcapproveMsg = require('../views/approval/pcApproval');
let pcuserfinanceMsg = require('../views/approval/pcUserfinance');
let pcuserlmMsg = require('../views/approval/pcUserlm');
let pcFinanceappMsg = require('../views/approval/pcFinanceapp');
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
    await sendMail(pdapproveMsg(user, request), pduserfinanceMsg(user, request), pdFinanceappMsg(user, request));
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

approveRouter.get('/approve/perdiemfinance', async (req, res) => {
  const id = ObjectId(`${req.query.id}`);
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('requests');

    const query = { _id: id };
    const request = await Collection.findOne(query);
    const user = request.user;
    await Collection.updateOne(query, { $set: { approvalStatus: "approved" }});
    await sendMail(pdfinanceMsg(user, request),pduserlmMsg(user, request));
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
// 650099.


approveRouter.get('/approve/pettycash', async (req, res) => {
  const id = ObjectId(`${req.query.id}`);
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('pettycash');

    const query = { _id: id };
    const request = await Collection.findOne(query);
    const user = request.user;
    const details = request.details;
    await sendMail(pcapproveMsg(user, request, details), pcuserfinanceMsg(user, request, details), pcFinanceappMsg(user, request, details));
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

approveRouter.get('/approve/pettycashfinance', async (req, res) => {
  const id = ObjectId(`${req.query.id}`);
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('pettycash');

    const query = { _id: id };
    const request = await Collection.findOne(query);
    const user = request.user;
    const details = request.details;
    await sendMail(pcfinanceMsg(user, request, details), pcuserlmMsg(user, request, details));
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

// get all the users from the database
approveRouter.get('/allusers', async (req, res) => {
  try {
    await Mongo_Client.connect();
    const db = Mongo_Client.db('esforms');
    const Collection = db.collection('users');

    const query = {};
    const users = await Collection.find(query).toArray();
    return res.send(users);
  } catch (err) {
    console.log(err);
  } finally {
    await Mongo_Client.close();
  }
});

module.exports = approveRouter;
