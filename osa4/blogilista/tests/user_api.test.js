const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'MaisteriMikz',
        name: 'Mikko',
        pwdhash: '$1$O3JMY.Tw$AdLnLjQ/5jXF9.MTp3gHv/',
    },
    {
        username: 'Seppo12',
        name: 'Seppo',
        pwdhash: '$1$O3JMY.Tw$AdLnLjQ/5jXF9.MTp3gHv/',
    },
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})
const api = supertest(app)

describe('User API POST', () => {
    test('Users with erroneous credentials are not added to db', async () => {
        const incorrectUser = {
            username: 'ad',
            name: 'aska',
            password: 'aska123'
        }
        await api
            .post('/api/users')
            .send(incorrectUser)
            .expect(400)
        const usersAfter = await User.find({})
        expect(usersAfter.length).toEqual(initialUsers.length)
        const usernamesAfter = usersAfter.map(user => user.username)
        expect(usernamesAfter).not.toContain(incorrectUser.username)
    })
}) 