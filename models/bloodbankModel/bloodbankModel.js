const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  bloodBankSchema = new mongoose.Schema(
    {
      bloodbankName: {
        type: String,
        trim: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        //required: true,
      },
      website: {
        type: String,
      },
      contactNumber: {
        type: Number,
      },
      briefDescription: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
      },
      bloodbankType: {
        type: String,
        enum: ["public", "private"],
        required: true,
      },
      bloodType: {
        ABpositive: {
          type: Number,
          default: 0,
          min: 0,
        },
        ABminus: {
          type: Number,
          default: 0,
          min: 0,
        },
        Apositive: {
          type: Number,
          default: 0,
          min: 0,
        },
        Aminus: {
          type: Number,
          default: 0,
          min: 0,
        },
        Bpositive: {
          type: Number,
          default: 0,
          min: 0,
        },
        Bminus: {
          type: Number,
          default: 0,
          min: 0,
        },
        Opositive: {
          type: Number,
          default: 0,
          min: 0,
        },
        Ominus: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    },
    {
      timestamps: true,
    }
  );

bloodBankSchema.pre("save", function (next) {
  let user = this;
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      console.log(`Error in hashing password: ${error.message}`);
      next(error);
    });
});

module.exports = mongoose.model("BloodBank", bloodBankSchema);
