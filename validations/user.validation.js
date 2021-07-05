const validator = require("validator");

module.exports = class Validations{
    /**
     * @desc validates and sanitize an input
     * @param {object} userProfile 
     */
    static async newUser(userProfile){
        let error = {}
        if(validator.isEmpty(userProfile['firstName']) || validator.isEmpty(userProfile['lastName']) ||
            validator.isEmpty(userProfile['email']) || validator.isEmpty(userProfile['password']) ||validator.isEmpty(userProfile['confirmPassword'])){
            error.msg = 'please fill all required field'
        }

        if(validator.isBoolean(userProfile['firstName']) || validator.isBoolean(userProfile['lastName'] ||
            validator.isBoolean(userProfile['email']) || validator.isBoolean(userProfile['password']) || validator.isBoolean(userProfile['confirmPassword']))){
            error.msg = 'sorry, boolean values are not allowed'
        }

        if(!validator.isAlpha(userProfile['firstName']) || !validator.isAlpha(userProfile['lastName'])){
            error.msg = 'Names can only possibly be in alphabets!'
       }

       if(!validator.isEmail(userProfile['email'])) {
           error.msg = 'please, input a valid email!'
       }

       if(userProfile['password'] !== userProfile['confirmPassword']) {
            error.msg = 'Passwords do not match!'
        }

       if(!validator.isStrongPassword(userProfile['password'])) {
           error.msg = 'password is not strong enough!'
       }

       return {
           error,
           isValid: Object.keys(error).length == 0
       }
    }

    static async checkMail(mail) {
        let error = {}
        if(validator.isEmpty(mail)) {
            error.msg = 'please, fill in the fields!'
        }

        if(!validator.isEmail(mail)) {
            error.msg = 'please, provide a valid email!'
        }

        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }

    static async checkPassword(profile) {
        let error = {}
        if(validator.isEmpty(profile['password']) || validator.isEmpty(profile['confirmPassword'])) {
            error.msg = 'please, fill in the fields!'
        }
        if(profile['password'] !== profile['confirmPassword']) {
            error.msg = 'Passwords do not match!'
        }
        if(!validator.isStrongPassword(profile['password']) || !validator.isStrongPassword(profile['confirmPassword'])) {
            error.msg = 'password is not strong enough!'
        }

        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }

    static async bloodPurchase(details) {
        let error = {}
        if(validator.isEmpty(details['patientName']) || validator.isEmpty(details['relationship'])) {
            error.msg = 'please fill all fields!'
        }
        if(!validator.isAlpha(details['patientName']) || !validator.isAlpha(details['relationship'])) {
            error.msg = 'patients\'s  name and relationship to patient entries can only consist of alphabets!'
        }
        if(validator.isBoolean(details['patientName']) || validator.isBoolean(details['relationship'])) {
            error.msg = 'Boolean values cannot be taken as entries!'
        }
        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }
}