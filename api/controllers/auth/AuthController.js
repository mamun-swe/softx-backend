const Users = require('../../../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Account Register 
const Register = async (req, res, next) => {
    try {
        let { name, email, password, role } = req.body

        // Check account already exist 
        let existAccount = await Users.findOne({ email: email })

        if (existAccount) {
            return res.status(409).json({
                status: false,
                message: "Account already created"
            })
        }

        // Password Hash
        let hashPassword = await bcrypt.hash(password, 10)

        // Create new object
        let newAccount = new Users({
            name: name,
            email: email,
            password: hashPassword,
            // role: 'librarian'
        })

        // Save information
        const account = await newAccount.save()
        if (account) {
            return res.status(201).json({
                status: true,
                message: "Successfully account created"
            })
        }
    } catch (error) {
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


// Account Login
const Login = async (req, res, next) => {
    try {
        let { email, password } = req.body

        // Account find using email 
        let account = await Users.findOne({ email }).exec()

        // Compare with password
        if (account) {
            const result = await bcrypt.compare(password, account.password)
            if (result) {

                // Generate JWT token
                const token = await jwt.sign(
                    { id: account._id, name: account.name, role: account.role },
                    'SECRET', { expiresIn: '1d' }
                )

                // Update JWT token 
                const updateToken = await Users.findOneAndUpdate({ _id: account._id },
                    { $set: { 'access_token': token, 'status': 'online' } },
                    { new: true }).exec()

                if (updateToken) {
                    return res.status(200).json({
                        status: true,
                        token
                    })
                }
                return res.status(404).json({
                    status: false,
                    message: 'Invalid e-mail or password'
                })

            }
            return res.status(404).json({
                status: false,
                message: 'Invalid e-mail or password'
            })
        }

        res.status(404).json({
            status: false,
            message: 'Invalid e-mail or password'
        })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}

// Logout
const Logout = async (req, res, next) => {
    try {
        // Split token
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        // Find account using account id and role
        let account = await Users.findOne({
            $and: [
                { _id: decode.id },
                { role: decode.role }
            ]
        })
        if (!account) {
            return res.status(404).json({
                status: false,
                message: 'Invalid token'
            })
        }

        // Find account and null access_token field 
        const updateToken = await Users.findByIdAndUpdate({ _id: decode.id }, { $set: { 'access_token': null } })
        if (!updateToken) {
            return res.status(404).json({
                status: false,
                message: 'Invalid token'
            })
        }

        res.status(200).json({
            status: true,
            message: 'Successfully logged out'
        })

    } catch (error) {
        if (error) {
            res.status(501).json({
                status: false,
                message: error.message
            })
        }
    }
}

// Me
const Me = async (req, res, next) => {
    try {
        // Split token
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        const id = decode.id

        const result = await Users.findOne({ _id: id }, { name: 1, role: 1 }).exec()
        if (!result) {
            return res.status(404).json({
                status: false,
                message: 'Invalid token'
            })
        }

        res.status(200).json({
            status: true,
            result: result
        })

    } catch (error) {
        next(error)
        console.log(error)
    }
}

module.exports = {
    Register,
    Login,
    Logout,
    Me
}