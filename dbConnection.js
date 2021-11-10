const mongoose = require("mongoose");
const port = 3000 || process.env.PORT;
const logger = require("./config/logger");
require("dotenv").config();
const config = require("./config/config.json");

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("connected to db");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
