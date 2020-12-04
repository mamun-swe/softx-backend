const express = require('express')
const router = express.Router()
const BookController = require('../controllers/librarian/BookController')

// Book router
router.get('/book/index', BookController.Index)
router.post('/book/store', BookController.Store)
router.get('/book/:id/show', BookController.Show)
router.put('/book/:id/update', BookController.Update)
router.delete('/book/:id/delete', BookController.Destroy)

module.exports = router