const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth/AuthController')

router.post('/register', AuthController.Register)
router.post('/login', AuthController.Login)
router.get('/logout', AuthController.Logout)

module.exports = router