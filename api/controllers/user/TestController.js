

const testController = async (req, res, next) => {
    res.json({ message: 'Test controller for user' })
}


module.exports = {
    testController
}