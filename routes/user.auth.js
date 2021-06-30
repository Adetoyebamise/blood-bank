const router = require('express').Router()
const { registerUser } = require('../controllers/auth/user.auth')

router.post('/register', (req, res) => registerUser(req, res))

module.exports = router