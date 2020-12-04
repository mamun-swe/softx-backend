const Books = require('../../../models/Books')
const url = require('../../../utils/url')
const checkId = require('../../middleware/CheckId')
const fs = require('fs')

// Formate Date
const formateDate = (date) => {
    const format = {
        m: date.getMonth() + 1,
        d: date.getDate(),
        y: date.getFullYear()
    }
    return formattedDate = format.m + '.' + format.d + '.' + format.y
}

// Single File Upload function
const fileUpload = file => {
    // Get file extension from filename
    const extension = file.name.split('.')[1]
    // Rename file with datetime format
    const filename = Date.now() + '.' + extension
    // Upload path
    path = './uploads/books/' + filename
    // Move file to path
    const moveFile = file.mv(path)

    if (!moveFile) {
        return res.status(501).json({ message: 'file upload error' })
    }

    return filename
}

// Remove File from Directory
const removeFile = async (file) => {
    const path = url + "uploads/books/" + file
    try {
        fs.unlinkSync(path)
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}

// Get All Books from Store 
const Index = async (req, res, next) => {
    try {
        // Find All Books
        const books = await Books.find()
            .sort({ _id: 1 })
            .exec()

        // Check books available or not 
        if (books.length <= 0) {
            return res.status(204).json({
                status: false,
                message: 'No books found'
            })
        }

        // Modifiy image path url with public url 
        const response = {
            results: books.map(book => {
                return {
                    id: book.id,
                    bookName: book.bookName,
                    author: book.author,
                    genre: book.genre,
                    releaseDate: formateDate(book.releaseDate),
                    bookImage: url + "uploads/books/" + book.bookImage,
                    status: book.status,
                    students: book.students
                };
            })
        }
        res.status(200).json(response);


    } catch (error) {
        if (error) {
            next(error)
        }
    }
}

// Store new book into database
const Store = async (req, res, next) => {
    try {
        const { bookName, author, genre, releaseDate, status } = req.body

        const filename = fileUpload(req.files.bookImage)

        // New Book Object 
        const newBook = new Books({
            bookName: bookName,
            author: author,
            genre: genre,
            releaseDate: new Date(releaseDate),
            bookImage: filename,
            status: status
        })

        // Save Book Object
        const saveBook = await newBook.save()
        if (!saveBook) {
            return res.status(501).json({
                status: false,
                message: 'Failed to upload new book'
            })
        }

        // Success Response
        res.status(201).json({
            status: true,
            message: 'Successfully new book uploaded'
        })

    } catch (error) {
        console.log(error);
        if (error && error.name == 'ValidationError') {
            let message = []
            for (field in error.errors) {
                message.push(error.errors[field].message)
            }

            return res.status(500).json({
                status: false,
                message
            })
        }

        next(error)
    }
}


// Show individual book information
const Show = async (req, res, next) => {
    const { id } = req.params
    try {
        // Check mongoose id
        await checkId(id)

        // Find book
        const book = await Books.findById({ _id: id }).exec()
        if (!book) {
            return res.status(404).json({
                status: false,
                message: 'Book not found'
            })
        }
        res.status(200).json({
            id: book.id,
            bookName: book.bookName,
            author: book.author,
            genre: book.genre,
            releaseDate: formateDate(book.releaseDate),
            bookImage: url + "uploads/books/" + book.bookImage,
            status: book.status,
            students: book.students
        })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}

// Update individual book information
const Update = async (req, res, next) => {
    const { id } = req.params
    const { bookName, author, genre, releaseDate, status } = req.body
    try {
        // Check mongoose id
        await checkId(id)

        // Find book
        const book = await Books.findById({ _id: id }).exec()
        if (!book) {
            return res.status(404).json({
                status: false,
                message: 'Book not found'
            })
        }

        let filename
        if (req.files) {
            filename = fileUpload(req.files.bookImage)
        }

        // Remove File from directory
        await removeFile(book.bookImage)

        // Book Object 
        const updateData = {
            bookName: bookName ? bookName : book.bookName,
            author: author ? author : book.author,
            genre: genre ? genre : book.genre,
            releaseDate: new Date(releaseDate ? releaseDate : book.releaseDate),
            bookImage: filename ? filename : book.bookImage,
            status: status ? status : book.status
        }

        // Update book
        const updateBook = await book.updateOne(
            { $set: updateData },
            { new: true }
        ).exec()

        if (!updateBook) {
            return res.status(401).json({
                status: false,
                message: 'Failed to update'
            })
        }
        return res.status(200).json({ status: true, message: 'Successfully book updated' })
    } catch (error) {
        if (error) {
            console.log(error.message)
            next(error)
        }
    }
}

// Remove Book from store 
const Destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await checkId(id)

        // remove book
        const action = await Books.findOneAndDelete({ _id: id }).exec()
        if (!action) {
            return res.status(501).json({ status: false, message: "Book not found" })
        }

        res.status(200).json({ status: true, message: "Successfully book deleted" })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    Index,
    Store,
    Show,
    Update,
    Destroy
}