const mongoose = require("mongoose");
const pendingRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  hospitalRequestedFrom: {
    type: String,
    required: true,
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
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("pendingRequest", pendingRequestSchema);
