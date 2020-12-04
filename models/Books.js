const { Schema, model } = require("mongoose")

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: Date,
        trim: true
    },
    bookImage: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: "activate",
        enum: ["deactivate", "activate"]
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }],
}, {
    timestamps: true
})

const Book = model('Book', bookSchema)

module.exports = Book;