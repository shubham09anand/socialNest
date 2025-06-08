const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        // const mongoUrl = 'mongodb+srv://shubham09anand:%40Shubham4963@socialnesst.qpbqi.mongodb.net/socialnest?retryWrites=true&w=majority&appName=socialNesst';
        const mongoUrl = 'mongodb://127.0.0.1:27017/SocialMeida';
        await mongoose.connect(mongoUrl);
        const db = mongoose.connection;
        console.log("Connection successful at server", db.host, "on port", db.port, "to database", db.name);
    } catch (error) {
        console.log(`Error in Database Connection: ${error}`);
    }
};

module.exports = connectDB;
