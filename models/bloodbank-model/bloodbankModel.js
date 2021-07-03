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
