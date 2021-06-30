require('express-async-errors')
const UserAuthService = require('../../services/auth/user.auth')

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
}