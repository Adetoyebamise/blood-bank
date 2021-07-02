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
const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  bloodBankSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
      },
      isPublic: {
        type: Boolean,
        required: true,
        default: false,
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

bloodBankSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("BloodBank", bloodBankSchema);
