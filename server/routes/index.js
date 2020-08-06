const route = require('express').Router()
const userRoute = require('./userRoute')

route.use('/', userRoute)

module.exports = route