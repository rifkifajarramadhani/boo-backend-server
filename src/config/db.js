const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const connect = async () => {
    const mongoUri = process.env.DB;
    await mongoose.connect(mongoUri, { dbName: 'boo_testing' });
    console.log(`MongoDB connected to ${mongoUri}`);
}

module.exports = connect;