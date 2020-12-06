const express = require('express')
const router = express.Router()
const DashboardController = require('../controllers/librarian/DashboardController')
const BookController = require('../controllers/librarian/BookController')
const RequestController = require('../controllers/librarian/RequestController')

// Dashboard router 
router.get('/dashboard', DashboardController.Index)

// Book router
router.get('/book/index', BookController.Index)
router.post('/book/store', BookController.Store)
router.get('/book/:id/show', BookController.Show)
router.put('/book/:id/update', BookController.Update)
router.delete('/book/:id/delete', BookController.Destroy)

// Request Router
router.get('/request/index', RequestController.Index)
router.post('/request/status/update', RequestController.Update)

module.exports = router