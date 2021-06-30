const mongoose = require("mongoose");
const port = 3000 || process.env.PORT;
// const logger = require("./config/logger");
require('dotenv').config()

const connectDB = async (app) => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("connected to db");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
