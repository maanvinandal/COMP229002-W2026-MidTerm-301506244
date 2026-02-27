require('dotenv').config();
const mongoose = require('mongoose');

const ConnectionString = process.env.MONGO_URI;

module.exports = async function () {
    try {
        await mongoose.connect(ConnectionString);
        console.log("==== Backend successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};