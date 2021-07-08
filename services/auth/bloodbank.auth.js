require("express-async-errors");
const bloodBankModel = require("../../models/bloodbank-model/bloodbankModel");
const bcrypt = require("bcrypt");

module.exports = class BloodbankAuthService {
  /**
   * @param {registration details} profile
   * @returns created user's profile after saving to the database
   */
  static async bloodbankRegistration(profile) {
    //Profile is basically req.body

    //Check if password are the same - Would be done with (express validation npm package later)
    if (profile.password != profile.confirmPassword) {
      //If passwords dont match, throw error
      return "Password do not match";
    }

    //Check if bloodbank already exists
    let existingBloodbank = await bloodBankModel.find({ email: profile.email });

    if (existingBloodbank.length != 0) {
      return "Email already Exist";
    }

    //Create a new document with profile (req.body)
    const newBloodbank = await new bloodBankModel(profile);

    //If password matches, encrypt and save to database
    // duplicate hashing
    //     const salt = await bcrypt.genSalt(10);
    //     newBloodbank.password = await bcrypt.hash(newBloodbank.password, salt);
    //Return saved bloodbank to controller
    let savedBloodBank = await newBloodbank.save();
    console.log(savedBloodBank);
    return savedBloodBank;
  }

  static async bloodbankLogin(profile) {
    let existingBloodbank = await bloodBankModel.findOne({
      email: profile.email,
    });

    if (!existingBloodbank) {
      return "BloodBank not Found";
    } else {
      let password = await bcrypt.compare(
        profile.password,
        existingBloodbank.password
      );
      if (password) {
        return existingBloodbank;
      } else {
        return "Email or Password Incorrect";
      }
    }
  }
};
