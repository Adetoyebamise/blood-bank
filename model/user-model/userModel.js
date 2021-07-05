const Mongoose = require("mongoose");


const userSchema = Mongoose.Schema({
    uniqueId: {
        type:String,
        require:true
    },
    name:{
        firstName: String,
        lastName: String,
        middleName: String,
        require: true
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    
});

const User = Mongoose.model('users', userSchema)

module.exports = User;