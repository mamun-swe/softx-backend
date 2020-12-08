const express = require('express')
const router = express.Router()
const Authentication = require('../middleware/authenticate')
const DashboardController = require('../controllers/librarian/DashboardController')
const BookController = require('../controllers/librarian/BookController')
const RequestController = require('../controllers/librarian/RequestController')

// Dashboard router 
router.get('/dashboard', Authentication.isLibrarian, DashboardController.Index)

// Book router
router.get('/book/index', Authentication.isLibrarian, BookController.Index)
router.post('/book/store', Authentication.isLibrarian, BookController.Store)
router.get('/book/:id/show', Authentication.isLibrarian, BookController.Show)
router.put('/book/:id/update', Authentication.isLibrarian, BookController.Update)
router.delete('/book/:id/delete', Authentication.isLibrarian, BookController.Destroy)

// Request Router
router.get('/request/index', Authentication.isLibrarian, RequestController.Index)
router.post('/request/status/update', Authentication.isLibrarian, RequestController.Update)

module.exports = router