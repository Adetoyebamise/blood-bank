const mongoose = require("mongoose"),
  purchaseRequestSchema = new mongoose.Schema(
    {
      nameOfPatient: {
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
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
    uniqueId: {
      type:String,
      required:true,
    },
  );
module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);
