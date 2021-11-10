const mongoose = require("mongoose");
require("express-async-errors");
// let validate = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

//to prevent the server from crashing anytime there is a mongoose error
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
});

module.exports = mongoose.model("Users", userSchema);
