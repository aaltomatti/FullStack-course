const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Mikko',
        url: 'https://Mikonblogit.fi',
        likes: 10
    },
    {
        title: 'HTML is hard',
        author: 'Matti',
        url: 'https://Matinblogit.fi',
        likes: 1
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})
const api = supertest(app)
describe('API GET', () => {
    test('correct amount of blogs are returned', async () => {
        const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    test('returned blogs should have a id field named id', async () => {
        const response = await api .get('/api/blogs')
        const blogs = response.body
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})
describe('API POST', () => {
    test('when blog added increase number of blogs', async () => {
        const newBlog =
        {
            title: 'CSS is easy',
            author: 'Seppo',
            url: 'https://Seponblogit.fi',
            likes: 15
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogs = await Blog.find({})
        const blogsInDb = blogs.map(blog => blog.toJSON())
        expect(blogsInDb).toHaveLength(initialBlogs.length + 1)
        const contents = blogsInDb.map(blog => blog.title)
        expect(contents).toContain('CSS is easy')
    })
    test('set likes to 0 when likes value is not present', async () => {
        const noLikesBlog =
        {
            title: 'nobodylikesme',
            author: 'Rkz',
            url: 'https://Seponblogit.fi',
        }
        await api
            .post('/api/blogs')
            .send(noLikesBlog)
        const blog = await Blog.find({ title: 'nobodylikesme' })
        expect(blog[0].likes).toEqual(0)
    })
    test('send Bad request when title and url are missing from blog', async () => {
        const noTitleUrlBlog =
        {
            author: 'Rkz',
            likes: '20',
        }
        await api
            .post('/api/blogs')
            .send(noTitleUrlBlog)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})