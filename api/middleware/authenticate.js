const jwt = require('jsonwebtoken')
const User = require('../../models/Users')


// Librarian Permission
const isLibrarian = async (req, res, next) => {
    try {
        const token = await req.headers.authorization

        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        // find user using token 
        let user = await User.findOne({ $and: [{ _id: decode.id }, { access_token: splitToken }] }, { role: 1 }).exec()
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // check role
        if (user.role === 'librarian') {
            next()
        } else {
            return res.status(401).json({ message: 'You have no permissions to access' })
        }

    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'unauthorized request' })
        }
    }
}


// Student Permission
const isStudent = async (req, res, next) => {
    try {
        const token = await req.headers.authorization

        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        // find user using token 
        let user = await User.findOne({ $and: [{ _id: decode.id }, { access_token: splitToken }] }, { role: 1 }).exec()
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // check role
        if (user.role === 'student') {
            next()
        } else {
            return res.status(401).json({ message: 'You have no permissions to access' })
        }

    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'unauthorized request' })
        }
    }
}


module.exports = {
    isLibrarian,
    isStudent
}