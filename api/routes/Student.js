const express = require('express')
const router = express.Router()
const Authentication = require('../middleware/authenticate')
const StudentController = require('../controllers/student/StudentController')

router.get('/request/book', Authentication.isStudent, StudentController.AllBooks)
router.get('/request/book/search/:query', Authentication.isStudent, StudentController.SearchBook)
router.post('/request/book', Authentication.isStudent, StudentController.SentRequest)
router.get('/request/pending', Authentication.isStudent, StudentController.PendingRequests)
router.get('/request/approved', Authentication.isStudent, StudentController.ApprovedRequests)
router.get('/request/:bookId/view', Authentication.isStudent, StudentController.ViewBook)

module.exports = router