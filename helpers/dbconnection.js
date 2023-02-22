// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGODB_URI
const MongoClient = require('mongodb').MongoClient
const Mongo_Client = new MongoClient(MONGO_URI)

module.exports = Mongo_Client
