require('dotenv').config();
const express = require('express');
const app = express();

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const { errorHandler, accessControl } = require('./utils');
const requestRouter = require('./controllers/requests');
const approveRouter = require('./controllers/approve');
const rejectRouter = require('./controllers/reject');
const path = require('path');

global.appRoot = path.resolve(__dirname);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

app.use(accessControl);

app.options('*', cors());

// app.use(logger)

app.get('/', (req, res) => {
    res.send('<h1>Hello Easy!</h1>');
});
app.get('/users', requestRouter);
app.post('/requests/perdiem', requestRouter);
app.post('/requests/pettycash', requestRouter);
app.post('/requests/pettycash/2', requestRouter);
app.post('/requests/vehicle', requestRouter);
app.post('/requests/upload', requestRouter);
app.get('/approve/perdiem', approveRouter);
app.get('/approve/pettycash', approveRouter);
app.get('/approve/vehicle', approveRouter);
app.post('/reject/perdiem', rejectRouter);
app.post('/reject/pettycash', rejectRouter);

// for parsing multipart/form-data
app.use(upload.array());

// handler of requests with unknown endpoint
// app.use(unknownEndpoint);
app.use(express.static(__dirname + '/public'));

// eslint-disable-next-line no-undef
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
