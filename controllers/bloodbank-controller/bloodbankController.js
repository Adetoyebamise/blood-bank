require('express-async-errors')
const BloodbankService = require("../../services/bloodbankService")


module.exports = class BloodbankController{
    /**
     * @route GET /api/v1/bloodbank/public
     * @returns an array of all available public bloodbanks if successful
     */
    static async getAllPublicBloodbanks(req, res) {
        const bloodbanks = await BloodbankService.retrieveAllPublicBloodbanks()
        if(!bloodbanks) {
            return res.status(500).json({ err: 'an error occured while loading available bloodbanks'})
        }
        return res.status(200).json({ bloodbanks, err: null})
    }
}