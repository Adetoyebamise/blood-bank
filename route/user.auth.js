const router = require('express').Router()
const { registerUser } = require('../controller/auth/user.auth')

router.post('/register', registerUser)

module.exports = router