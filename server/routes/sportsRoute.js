const route = require('express').Router()
const SportController = require('../controllers/SportController')

route.get('/englandTeams', SportController.getEnglandTeams)
route.post('/news', SportController.getEnglandNews)
route.get('/sportLists', SportController.getSportLists)

module.exports = route