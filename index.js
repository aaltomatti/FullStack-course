require('dotenv').config()
const { response } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'Malformatted id'})
  }

  next(error)
}
app.use(requestLogger)
app.use(errorHandler)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
  })
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })


app.delete('/api/persons/:id', (request,response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.get('/info', (req,res) =>{
  const date = new Date()

  Person.find({}).then(people => {
    res.send(`Phonebook has info for ${people.length} people
    ${Date()}`)
  })
})

app.post('/api/persons', (req,res) => {
    const body = req.body
    console.log(body)
    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    console.log(person)
    person.save().then(savedPerson => {
        res.json(savedPerson)
      })
    })
app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person)
  .then(result => {
    response.json(person)
  })
  .catch(error => next(error))
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
