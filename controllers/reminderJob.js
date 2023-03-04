const Mongo_Mongo_Client = require('../helpers/dbconnection');
const sgMail = require('@sendgrid/mail');

let reminderMsg = require('../views/requests/pdRequest');

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
    console.log('Reminder email sent successfully');

};

// Function to check pending requests and send reminder emails
async function sendReminderEmails() {
  try {
    await Mongo_Mongo_Client.connect();
    const db = Mongo_Mongo_Client.db('esforms');
    const requestCollection = db.collection('requests');

    const pendingRequests = await requestCollection.find({ approvalStatus: "pending" }).toArray();
    const now = new Date();
    for (const request of pendingRequests) {
      const createdAt = new Date(request.createdAt);
      const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
      if (diffInDays >= 1) {
        await sendMail(reminderMsg(request.user, request));
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    await Mongo_Mongo_Client.close();
  }
}

// Schedule the job to run once a day (at midnight)
setInterval(sendReminderEmails, 5 * 60 * 1000); // 24 hours in milliseconds

module.exports = { sendReminderEmails };
