const Users = require('../../model/user-model/userModel')
require('express-async-errors')
const bcrypt = require('bcrypt')

module.exports = class UserAuthService{
    /**
     * 
     * @param {registration details} profile 
     * @returns created user's profile after saving to the database
     */
    static async userRegistration(profile) {
        const newUser = await new Users(profile)
        let salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(profile.password, salt)
        return await newUser.save()
    }
}