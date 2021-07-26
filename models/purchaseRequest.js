const mongoose = require("mongoose"),
  purchaseRequestSchema = new mongoose.Schema(
    {
      bloodBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BloodBank",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      patientName: {
        type: String,
        required: true,
        trim: true,
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
      isPending: {
        type: String,
        enum: ["pending", "accepted", "cancel"],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );
module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);
