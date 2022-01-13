const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const uri = process.env.MONGODB_URI

console.log('connecting to', uri)
mongoose.connect(uri)
  .then(result => {
    console.log('connected to DB')
  })
  .catch((error) => {
    console.log('error connecting to DB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    minlength: 3
  },

  number: {
    type: String,
    minlength: 8}
})
personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)