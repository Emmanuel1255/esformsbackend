const rejectRouter = require('express').Router();
const Mongo_Client = require('../helpers/dbconnection');
const sgMail = require('@sendgrid/mail');

let denialMsg = require('../views/rejection');

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

rejectRouter.get('/reject/perdiem', async (req, res) => {
    const id = ObjectId(`${req.body.ID}`);
    try {
      await Mongo_Client.connect();
      const db = Mongo_Client.db('esforms');
      const Collection = db.collection('requests');
  
      const query = { _id: id };
      const request = await Collection.findOne(query);
      const user = request.user;
      const approvalStatus = request.approvalStatus;
  
      if (approvalStatus === 'pending') {
        await Collection.updateOne(query, { $set: { approvalStatus: "rejected" }});
        await sendMail(denialMsg(user, request));
        return res.send(
          'You have denied this request. Relevant Parties will be notified.'
        );
      } else if (approvalStatus === 'rejected') {
        return res.send('This request has already been approved.');
      } else if (approvalStatus === 'rejected') {
        return res.send('This request has already been rejected.');
      } else {
        return res.send('Invalid approval status.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      await Mongo_Client.close();
    }
  
    res.send(id);
  });
  

  rejectRouter.post('/reject/*', async (req, res) => {
    const id = ObjectId(req.body.ID.replace(/[^a-z0-9]/gi, ''));
    const reqType = req.body.TYPE === 'pettycash' ? 'pettycash' : 'requests';
    try {
      await Mongo_Client.connect();
      const db = Mongo_Client.db('esforms');
      const Collection = db.collection(reqType);
  
      const query = { _id: id };
      const request = await Collection.findOne(query);
      const user = request.user;
      const details = request.details;

      // Check the current approval status and send email/notification accordingly
      const approvalStatus = details.approvalStatus;
  
      if (approvalStatus === 'pending') {
        details.approvalStatus = 'rejected';
        await Collection.updateOne(query, { $set: { details } });
        await sendMail(denialMsg(user, req));
        return res.send('Request rejected successfully');
      } else if (approvalStatus === 'approved') {
        return res.send('This request has already been approved.');
      } else if (approvalStatus === 'rejected') {
        return res.send('This request has already been rejected.');
      } else {
        return res.send('Invalid approval status.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      await Mongo_Client.close();
    }
  
    res.send(id);
  });
  

module.exports = rejectRouter;
