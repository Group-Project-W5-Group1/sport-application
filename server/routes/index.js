
const router = require('express').Router()
const UserController = require('../controllers/user')
const news = require(`./sportsRoute`)
const Authentication = require('../middlewares/authenthication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/google', UserController.googleLogin)
router.use(Authentication)
router.use('/news', news) 


module.exports = router 
