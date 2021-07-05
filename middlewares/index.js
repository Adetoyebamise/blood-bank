const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use((req, res, next) => {
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], 'bloodbank', (err, decodedToken) => {
                if(err) req.user = undefined
                req.user = decodedToken
                next()
            })
        } else {
            req.user = undefined
            next()
        }
    })
}