const router = require('express').Router()
const { registerUser, authenticateUser, requestPasswordChange, resetPassword } = require('../controllers/auth/user.auth')

router.post('/register', (req, res) => registerUser(req, res))

router.post('/login', (req, res) => authenticateUser(req, res))

router.post('/forgotpassword', (req, res) => requestPasswordChange(req, res))

router.post('/resetpassword/:userId/:token',(req, res) => resetPassword(req, res))

module.exports = router