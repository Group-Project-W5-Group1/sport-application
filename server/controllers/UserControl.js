const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { decryptPassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        let newUser = {
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        }
        User.create(newUser)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
                where: {
                    email
                }
            })
            .then(data => {
                if (data) {
                    if (decryptPassword(password, data.password)) {
                        const access_token = generateToken({
                            id: data.id,
                            email: data.email,
                            name: data.name
                        })
                        return res.status(200).json({
                            id: data.id,
                            email: data.email,
                            name: data.name,
                            access_token
                        })
                    } else {
                        return next({
                            name: 'Bad Request',
                            errors: [{
                                message: 'Invalid email/password'
                            }]
                        })
                    }
                } else {
                    return next({
                        name: 'Bad Request',
                        errors: [{
                            message: 'Invalid email/password'
                        }]
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null
        client.verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {
                // console.log(ticket)
                payload = ticket.getPayload();
                const userid = payload['sub'];
                return User.findOne({
                    where: { email: payload.email }
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    let dataUser = {
                        name: payload.name,
                        email: payload.email,
                        password: process.env.GOOGLE_PASSWORD_DEFAULT
                    }
                    return User.create(dataUser)
                }
            })
            .then(data => {
                const token = generateToken({ id: data.id, email: data.email })
                return res.status(200).json({ access_token: token })
            })
            .catch(function(err) {
                next(err)
            })
    }

}
module.exports = UserController