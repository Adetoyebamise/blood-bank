require('express-async-errors')
const Users = require('../../models/user-model/userModel')
const bcrypt = require('bcrypt')

module.exports = class UserAuthService{
    /**
     * @param {registration details} profile 
     * @returns created user's profile after saving to the database
     */
    static async userRegistration(profile) {
        const newUser = await new Users(profile)
        if(newUser.password != newUser.confirmPassword) throw Error('passwords do not match!')
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        return await newUser.save()
    }

    /**
     * @param {userMail} email
     * @returns access to user's profile if found
     */
    static async userAuthentication(email) {
        return await Users.findOne({ email: email })
    }
}