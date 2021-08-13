import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) => {
return (
  <form onSubmit={props.addPerson}>
    <div>
    name: 
    <input 
    value = {props.newName}
    onChange = {props.handleNameChange}
    />
  </div>
  <div>
    number: 
    <input 
    value = {props.newNumber}
    onChange = {props.handleNumberChange}
    />
  </div>
  <div>
  <button type="submit">add</button>
  </div>
  </form>
)
}

const FilterForm = (props) => {
  return(
    <div>
      filter shown with: <input value = {props.filter}
      onChange= {props.handleFilterChange}/>
  </div>
  )
}

const RenderPersons = ({persons, filter}) =>{
  if (filter === '') {
    return(persons.map(person =>
      <li key={persons.indexOf(person)}> {person.name} {person.number}</li>))
  }
  else{
    return(persons.filter(persone => persone.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
      <li key={persons.indexOf(person)}> {person.name} {person.number}</li>))
  }
}


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(()=> {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      console.log('done')
  }, [])
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    }
    const personas = persons.map(persones => persones.name) 
    if (personas.includes(newName)){
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm handleFilterChange = {handleFilterChange} filter = {filter}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange= {handleNumberChange} newName= {newName} 
      newNumber ={newNumber} addPerson= {addPerson} event= {this}/>
      <h2>Numbers</h2>
      <RenderPersons persons = {persons} filter= {filter}/>
    </div>
  )

}

export default App