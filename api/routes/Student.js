const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/student/StudentController')

router.get('/request/book', StudentController.AllBooks)
router.get('/request/book/search/:query', StudentController.SearchBook)
router.post('/request/book', StudentController.SentRequest)
router.get('/request/pending', StudentController.PendingRequests)
router.get('/request/approved', StudentController.ApprovedRequests)
router.get('/request/:bookId/view', StudentController.ViewBook)

module.exports = router