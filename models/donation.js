const mongoose = require("mongoose"),
  donationSchema = new mongoose.Schema(
    {
      nameOfPatient: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      bloodType: {
        type: String,
        enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "0+", "O-"],
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      date: {
        type: Date,
        min: Date.now,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
module.exports = mongoose.model("Donation", donationSchema);
