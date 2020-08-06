const route = require('express').Router()
const userRoute = require('./userRoute')
const sportsRoute = require('./sportsRoute')

route.use('/', userRoute)
route.use('/sports', sportsRoute)


module.exports = route