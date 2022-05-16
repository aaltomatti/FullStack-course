const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('blogs', { username: 1, name: 1, id: 1 })
    response.json(users)
  })
  

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if(username === undefined || password === undefined){
        return response.status(400).json({ error: 'username or password missing' })
    }
    if(username.length < 3 || password.length <3){
        return response.status(400).json({ error: 'username and password must be atleast 3 characters long' })
    }
    const targetUser = await User
        .findOne({ username })
    if (targetUser) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10 //magic 10
    const pwdHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      pwdHash,
    })
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter