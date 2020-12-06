const Requests = require('../../../models/Requests')
const checkId = require('../../middleware/CheckId')
const url = require('../../../utils/url')

// Requests Index
const Index = async (req, res, next) => {
    try {
        const requests = await Requests.find()
            .populate({
                path: 'studentId',
                select: 'name',
            })
            .populate({
                path: 'book',
                select: 'bookName bookImage',
            })
            .exec()
        if (!requests.length) {
            return res.status(404).json({ status: false, message: "No results found" })
        }

        // Modifiy image path url with public url 
        const response = {
            results: requests.map(item => {
                return {
                    requestId: item.id,
                    studentName: item.studentId.name,
                    bookName: item.book.bookName,
                    bookImage: url + "uploads/books/" + item.book.bookImage,
                    status: item.status
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


// Update Request
const Update = async (req, res, next) => {
    try {
        const { id, status } = req.body
        await checkId(id)

        const updateStatus = await Requests.findOneAndUpdate(
            { _id: id },
            { $push: { status: status } },
            { new: true }
        ).exec()

        if (!updateStatus) {
            return res.status(501).json({
                status: false,
                message: 'Update failed'
            })
        }

        res.status(200).json({
            status: true,
            message: 'Successfully request approved'
        })

    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


module.exports = {
    Index,
    Update
}