const route = require('express').Router()
const userRoute = require('./userRoute')
const sportsRoute = require('./sportsRoute')
const Authentication = require('../middlewares/authentication')
route.use('/', userRoute)

route.use(Authentication)
route.use('/sports', sportsRoute)


module.exports = route