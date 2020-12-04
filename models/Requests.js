const { Schema, model } = require("mongoose")

const requestSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    status: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
}, {
    timestamps: true
})

const Request = model('Request', requestSchema)

module.exports = Request;