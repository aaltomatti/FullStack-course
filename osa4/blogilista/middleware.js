const jwt = require('jsonwebtoken')
const User = require('./models/user')
const tokenExtractor = (request, response, next) => {
    const authorizationmessage = request.get('authorization')
    if (authorizationmessage && authorizationmessage.toLowerCase().startsWith('bearer')) {
        request.token = authorizationmessage.substring(7)
    }
    else{
        request.token= null
    }
    next()
}
const userExtractor = async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const loggedInUser = await User.findById(decodedToken.id)
        request.user = loggedInUser
    } catch (error) {
        return response.status(401).json({ error: 'missing or invalid token' })
    }
    next()
}
module.exports = { tokenExtractor, userExtractor }