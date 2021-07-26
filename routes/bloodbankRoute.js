const express = require("express");
const BloodbankController = require("../controllers/bloodbank-controller/bloodbankController");
const allBloodBankController = require('../controllers/bloodbank-controller/allBloodBankController')
const publicBloodBankController = require('../controllers/blood-purchase/publicBloodBankController')
const router = express.Router();

//GET all public bloodbanks/hospitals
router.get('/public', (req, res) => BloodbankController.getAllPublicBloodbanks(req, res))

//Get Public Blood Bank Profile
router.get('/:bloodbankid/profile', allBloodBankController.getBloodBankProfile);
router.put('/:bloodbankid/profile/edit', allBloodBankController.editBloodBankProfile);

//GET public bloodbank pending request, acceptance & cancel
 router.get('/:bloodbankid/pending-request', publicBloodBankController.getPublicBankRequest);

 //Cancelling a public bloodbank Request
 router.delete('/:bloodbankid/pending-request/cancel', publicBloodBankController.deletePublicBankRequest);

//Public Blood Bank request Approval
router.get('/:bloodbankid/pending-request/accept', publicBloodBankController.approvePublicBankRequest)

//make a donation
router.post('/donations/:bloodBankid', BloodbankController.newDonation)

//get all donations for a particular bloodbank
router.get('/donations/:bloodBankid', BloodbankController.getAllDonations)

//get all pending requests for a particular bloodbank
router.get('/pending-request/:bloodBankid', BloodbankController.getPendingRequests)

//accept a pending request
router.put('/accept/:requestId', BloodbankController.acceptPendingRequest)

//cancel a pending request
router.put('/cancel/:requestId', BloodbankController.cancelPendingRequest)

//get all accepted requests
router.get('/accepted-requests/:bloodBankid', BloodbankController.acceptedPendingRequest)

//get all cancelled requests
router.get('/cancelled-requests/:bloodBankid', BloodbankController.cancelledPendingRequest)

module.exports = router;
