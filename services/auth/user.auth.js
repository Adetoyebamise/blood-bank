const Users = require('../../models/user-model/userModel')
require('express-async-errors')
const bcrypt = require('bcrypt')

module.exports = class UserAuthService{
    /**
     * @param {registration details} profile 
     * @returns created user's profile after saving to the database
     */
    static async userRegistration(profile) {
        const newUser = await new Users(profile)
        if(newUser.password != newUser.profile) throw Error('passwords do not match!')
        let salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        return await newUser.save()
    }
}