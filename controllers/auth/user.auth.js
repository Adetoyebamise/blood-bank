require('express-async-errors')
const UserAuthService = require('../../services/auth/user.auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = class UserAuthController{
    /**
     * @route PoST /api/v1/user/auth/register
     * @returns user's profile if successfull else, returns a comprehensive error message
     */
    static async registerUser(req, res) {
        const user = await UserAuthService.userRegistration(req.body)
        if(!user || user.msg) return res.status(400).json({status: 'Bad request', err: user.msg})
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
        if(!user || user.msg) {
            return res.status(404).json({status: 'User not found!', err: user.msg})
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({err: 'wrong password!'})
        }
        const token = await jwt.sign({id: user.id}, 'bloodbank')
        return res.status(200).json({token: token, err: null})
    }

    static async requestPasswordChange(req, res) {
        let newToken = await UserAuthService.resetPasswordRequest(req.body.email)
        if(!newToken || newToken.msg) {
            return res.status(400).json({status: 'Bad request', err: newToken.msg})
        }
        return res.status(200).json({
            status: 'A password reset link containing your reset token has been successfully sent to your email',
            token: newToken
        })
    }

    static async resetPassword(req, res) {
        const passwordReset = await UserAuthService.passwordReset(req.params.userId, req.params.token, req.body)
        if(!passwordReset || passwordReset.msg) {
            return res.status(400).json({
                status: 'unable to complete your request, please try again',
                err: passwordReset.msg
            })
        }
        passwordReset.password = undefined
        passwordReset.confirmPassword = undefined
        return res.status(200).json({
            status: 'password has been changed successfully',
            profile: passwordReset,
            err: null
        })
    }
}