const mongoose = require("mongoose");
const port = 3000 || process.env.PORT;
const logger = require("./config/logger");
const { databaseURL } = require("./config/config.json");

const connectDB = async (app) => {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
    app.listen(port, () => {
      logger.log("info", `Alive on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDB;
