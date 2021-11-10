const mongoose = require("mongoose");
const donorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    bloodType: {
      type: String,
      enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("donor", donorSchema);
