const router = require('express').Router()
const { registerUser } = require('../controllers/auth/user.auth')

router.post('/register', registerUser)

module.exports = router