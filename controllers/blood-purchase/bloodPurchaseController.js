require("express-async-errors");
const BloodBankPurchaseService = require("../../services/bloodbank-purchase/bloodbankPurchaseService");

class BloodBankPurchaseController {
  /**
   *
   * @route
   * @returns list of bloodbanks having a particular bloodtype
   */
  static async getBloodBanks(req, res) {
    let bloodType;
    switch (req.body.bloodType) {
      case "AB+":
        bloodType = "ABpositive";
        break;
      case "AB-":
        bloodType = "ABminus";
        break;
      case "A+":
        bloodType = "Apositive";
        break;
      case "A-":
        bloodType = "Aminus";
        break;
      case "B+":
        bloodType = "Bpositive";
        break;
      case "B-":
        bloodType = "Bminus";
        break;
      case "O+":
        bloodType = "Opositive";
      case "O-":
        bloodType = "Ominus";
        break;
      default:
        return res.status(400).json({ err: "not a valid bloodtype" });
    }
    let bloodBanks = await BloodBankPurchaseService.getBloodBanks(bloodType);
    if (!bloodBanks) {
      return res
        .status(500)
        .json({ err: "an error occured while loading available bloodbanks" });
    }
    return res.status(200).json({ bloodbanks, err: null });
  }
}
module.exports = BloodBankPurchaseController;
