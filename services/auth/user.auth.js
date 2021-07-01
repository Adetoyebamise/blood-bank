require('express-async-errors')
const Users = require('../../models/user-model/userModel')
const bcrypt = require('bcrypt')
const Token = require('../../models/user-model/token')
const crypto = require('crypto')
const sendEmail = require('../../utils/email/sendMail')
const Validations = require('../../validations/user.validation') 
module.exports = class UserAuthService{
    /**
     * @param {registration details} userProfile 
     * @returns created user's profile after saving to the database
     */
    static async userRegistration(userProfile) {
        const { error, isValid } = await Validations.newUser(userProfile)
        if(!isValid) {
            return error
        }
        const newUser = await new Users(userProfile)
        if(newUser.password != newUser.confirmPassword) throw Error('passwords do not match!')
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt)
        let user = await newUser.save()
        await sendEmail(user.email,"Registration successful",{name: user.firstName}, '../templates/reqResetPwd.handlebars')
        return user
    }

    /**
     * @param {userMail} email
     * @returns access to user's profile if found
     */
    static async userAuthentication(email) {
        const { error, isValid } = await Validations.checkMail(email)
        if(!isValid) {
            return error
        }
        return await Users.findOne({ email: email })
    }

    static async resetPasswordRequest(email) {
        const { error, isValid } = await Validations.checkMail(email)
        if(!isValid) {
            return error
        }
        //check if user exists
        const user = await Users.findOne({ email: email })
        //check user already has an existing token if true, delete token
        let token = Token.findOne({ userId: user._id})
        if(token) {
            await Token.findByIdAndDelete(token._id)
        }
        const resetToken = await crypto.randomBytes(32).toString('hex')
        const hash = await bcrypt.hash(resetToken, 10)
        await Token.create({
            userId: user._id,
            token: hash,
            createdAt: Date.now()
        })
        const link = `localhost:3000/api/v1//passwordReset?token=${resetToken}&id=${user._id}`;
        await sendEmail(user.email,"Password Reset Request",{name: user.firstName , link}, '../templates/welcome.handlebars')
        return resetToken
    }

    static async passwordReset(userId, token, authentication) {
        const { error, isValid } = await Validations.checkPassword(authentication)
        if(!isValid) {
            return error
        }
        const resetToken = await Token.findOne({ userId: userId })
        //check if given/passed token is valid
        let confirmToken = await bcrypt.compare(token, resetToken.token)
        if(!confirmToken) {
            throw Error('invalid token!')
        }
        if(authentication.password !== authentication.confirmPassword) {
            throw Error('Passwords do not match!')
        }
        const newPassword = await bcrypt.hash(authentication.password, 10)
        await Users.findOneAndUpdate({ _id: userId }, { $set: { password: newPassword, confirmPassword: newPassword }}, {runValidators: true, new: true})

        const user = await Users.findById(userId)
        await sendEmail(
            user.email,
            'Password Changed Successfully',
            { name: user.firstName },
            '../templates/resetPwd.handlebars'
            )
        await resetToken.deleteOne()
        return user
    }
}