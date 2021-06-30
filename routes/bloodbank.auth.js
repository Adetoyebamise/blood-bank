const express = require('express')
const router = express.Router()
//const { registerUser } = require('../controllers/auth/user.auth')

router.post('/register', (req, res) => {
    res.send('Perform registration here')
})

router.post('/login', (req, res) => {
    res.send('Perform login here')
})

module.exports = router