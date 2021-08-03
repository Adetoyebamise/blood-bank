const mongoose = require("mongoose");
const pendingRequestSchema = new mongoose.Schema({
  bloodBank: {
    type: String,
    ref: "BloodBank",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  nameOfPatient: {
    type: String,
    required: true,
    trim: true,
  },
  bloodType: {
    type: String,
    enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
    required: true,
  },
  relationship: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  isPending: {
    type: String,
    enum: ["pending", "cancel", "accepted"],
    default: "pending",
  },
});
module.exports = mongoose.model("pendingRequest", pendingRequestSchema);
