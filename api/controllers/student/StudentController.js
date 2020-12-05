const Request = require('../../../models/Requests')
const Books = require('../../../models/Books')
const checkId = require('../../middleware/CheckId')
const url = require('../../../utils/url')
const jwt = require('jsonwebtoken')


// Formate Date
const formateDate = (date) => {
    const format = {
        m: date.getMonth() + 1,
        d: date.getDate(),
        y: date.getFullYear()
    }
    return formattedDate = format.m + '.' + format.d + '.' + format.y
}

// Submit request to book view 
const SentRequest = async (req, res, next) => {
    try {
        const { bookId } = req.body

        // Check book id
        if (!bookId) {
            return res.status(209).json({ status: false, message: 'bookId is required' })
        }

        await checkId(bookId)

        // Split token
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const studentId = decode.id

        // Request Object
        const newRequest = new Request({
            studentId: studentId,
            book: bookId
        })

        // Check Already request sent ro not
        const findBook = await Books.findOne({ _id: bookId }).exec()
        const checkAvailable = await findBook.students.find(id => id == studentId)
        if (checkAvailable) {
            return res.status(209).json({ message: 'Already request sent' })
        }

        // push permitted student into book 
        await Books.findOneAndUpdate(
            { _id: bookId },
            { $push: { students: studentId } },
            { new: true }
        ).exec()

        // Save request object
        const saveRequest = await newRequest.save()
        if (!saveRequest) {
            return res.status(501).json({
                status: false,
                message: "Failed to save request"
            })
        }

        res.status(200).json({
            status: true,
            message: 'Successfully sent request'
        })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}

// My Pending requests
const pendingRequests = async (req, res, next) => {
    try {
        // Split token
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const studentId = decode.id

        // Find all pending requests using my id
        const requests = await Request.find({ $and: [{ studentId: studentId }, { status: false }] })
            .populate({
                path: 'book',
                match: { status: 'activate' },
                select: 'bookName author genre releaseDate bookImage',
            })
            .exec()
        if (!requests.length) {
            return res.status(204).json({ status: false, message: "No results found" })
        }

        // Modifiy image path url with public url 
        const response = {
            results: requests.map(item => {
                return {
                    book: {
                        id: item.book.id,
                        bookName: item.book.bookName,
                        author: item.book.author,
                        genre: item.book.genre,
                        releaseDate: formateDate(item.book.releaseDate),
                        bookImage: url + "uploads/books/" + item.book.bookImage,
                    },
                    status: item.status,
                };
            })
        }
        res.status(200).json({ status: true, requests: response.results })

    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

// View a book from the database
const ViewBook = async (req, res, next) => {
    try {
        const { bookId } = req.params
        // Check book id  mongoose id valid 
        await checkId(bookId)

        // Split token
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const studentId = decode.id

        // Check this book is permitted or not
        const check = await Request.findOne({
            $and: [
                { studentId: studentId },
                { book: bookId },
                { status: true }
            ]
        })

        // if permission is not allowed
        if (!check) {
            return res.status(409).json({
                status: false,
                message: 'You have no permission to view this book'
            })
        }

        // Find the book
        const book = await Request.findOne({ studentId: studentId })
            .populate({
                path: 'book',
                match: { status: 'activate' },
                select: 'bookName author genre releaseDate bookImage',
            })
            .exec()

        res.status(200).json({
            status: true,
            book
        })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    SentRequest,
    pendingRequests,
    ViewBook
}