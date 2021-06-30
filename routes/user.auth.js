const router = require('express').Router()
const { registerUser, authenticateUser } = require('../controllers/auth/user.auth')

router.post('/register', (req, res) => registerUser(req, res))

router.post('/login', (req, res) => authenticateUser(req, res))

module.exports = router