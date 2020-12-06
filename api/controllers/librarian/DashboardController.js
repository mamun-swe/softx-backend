const Books = require('../../../models/Books')
const Students = require('../../../models/Users')

const Index = async (req, res, next) => {
    try {
        const booksTotal = await Books.count().exec()
        const studentsTotal = await Students.find({ role: 'student' }).count().exec()
        return res.status(200).json({ books: booksTotal, students: studentsTotal })
    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    Index
}