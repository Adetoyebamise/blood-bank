const mongoose = require("mongoose"),
  donationSchema = new mongoose.Schema(
    {
      bloodBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BloodBank"
      },
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
        enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      }
    },
    {
      timestamps: true,
    }
  );
module.exports = mongoose.model("Donation", donationSchema);
