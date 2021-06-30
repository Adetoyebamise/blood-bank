require('express-async-errors')
const UserAuthService = require('../../services/auth/user.auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = class UserAuthController{
    /**
     * @route PoST /api/v1/user/auth/register
     * @returns user's profile if successfull else, returns an error message
     */
    static async registerUser(req, res) {
        const user = await UserAuthService.userRegistration(req.body)
        if(!user) return res.status(400).json({err: 'Bad request'})
        user.password = undefined
        user.confirmPassword = undefined
        return res.status(200).json({
            user: user,
            err: null
        })
    }

    /**
     * @route PoST /api/v1/user/login
     * @returns a signed token that will be required for authentication on every requests
     */
    static async authenticateUser(req, res) {
        const { email, password } = req.body
        const user = await UserAuthService.userAuthentication(email)
        if(!user) {
            return res.status(404).json({err: 'User not found!'})
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({err: 'wrong password!'})
        }
        const token = await jwt.sign({id: user.id}, 'bloodbank')
        return res.status(200).json({token: token, err: null})
    }
}