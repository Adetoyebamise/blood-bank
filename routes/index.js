const userAuth = require('./user.auth')

module.exports = (app) => {
    //user registration
    app.use('/api/v1/user/auth', userAuth)
}