const express = require('express')
const router = express.Router()
const TestController = require('../controllers/user/TestController')

router.get('/', TestController.testController)


module.exports = router