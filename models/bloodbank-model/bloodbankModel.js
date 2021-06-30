const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodbankSchema = new Schema(
  {
    bloodbankName: {
      type: String,
      required: true,
    },
    bloodbankType: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bloodbank", bloodbankSchema);
