const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/student/StudentController')

router.post('/request/book', StudentController.SentRequest)
router.get('/request/pending', StudentController.pendingRequests)
router.get('/request/:bookId/view', StudentController.ViewBook)

module.exports = router