const { response } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
let persons = 
[
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Arto Hellas",
        "number": "12-43-234345",
        "id": 3
    },

    {
        "name": "Arto Hellas",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(persons)
    console.log('kaikki persoonat')
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/info', (req,res) =>{
    const date = new Date()
    console.log(Date())
    let info = `Phonebook has info for ${persons.length} people
    ${Date()}`
    res.send(info)
})

app.post('/api/persons', (req,res) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*1000)
    }
    if (person.name==="" || person.number === "") {
        return (res.status(400).json({
            error: 'Person must have name and number'
        })
        )
    }
    if (persons.filter(testPerson => testPerson.name === person.name).length === 1){
        return (res.status(400).json({
            error: 'Name must be unique'
        }))
    }
    persons = persons.concat(person)
    res.json(person)
})
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})