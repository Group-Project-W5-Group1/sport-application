const express = require('express')
const app = express()
const port = 3006
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
require('dotenv').config()
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log('app running')
})