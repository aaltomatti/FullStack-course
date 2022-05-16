const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const foundUser = await User.findOne({ username })
    const isPasswordCorrect = foundUser === null
        ? false
        : await bcrypt.compare(password, foundUser.pwdHash)

    if (!(foundUser && isPasswordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: foundUser.username,
        id: foundUser._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: foundUser.username, name: foundUser.name })
})

module.exports = loginRouter