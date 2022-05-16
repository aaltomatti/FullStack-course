const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id){
        return response.status(401).json({ error: 'missing token or no authorization' })
    }
    const loggedInUser = await User.findById(decodedToken.id)
    if (!request.body.title && !request.body.url){
        return response.status(400).json({ error: 'title and url fields are required' })
    }
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: loggedInUser,
    })
    const savedBlog = await blog.save()
    loggedInUser.blogs = loggedInUser.blogs.concat(savedBlog._id)
    await loggedInUser.save()
    response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
})
module.exports = blogsRouter