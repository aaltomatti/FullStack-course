const mongoose = require('mongoose')

const password = process.argv[2]
const uri = `mongodb+srv://fullstack_MA:${password}@cluster0.whhbu.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(uri)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length<4) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
  }
else{
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(response=> {
        console.log(`added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    })
}




