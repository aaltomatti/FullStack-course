import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  const errorStyle = {
      color: 'red',
      background: 'white',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
  }
  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}


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

const RenderPersons = ({persons, filter, confirmDeletion}) =>{
  if (filter === '') {
    return(persons.map(person =>
      <li 
      key={persons.indexOf(person)}> {person.name} {person.number} <button onClick= { () => confirmDeletion(person)}> delete</button>
      </li>))
  }
  else{
    return(persons.filter(persone => persone.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
      <li 
      key={persons.indexOf(person)}> {person.name} {person.number} <button onClick= { () => confirmDeletion(person)}> delete</button>
      </li>))
  }
}


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  function confirmDeletion (person) {
    const result = window.confirm(`Delete ${person.name} ?`)
    console.log(person.id)
    if (result) {
      personService
        .pop(person.id)
    setPersons(persons.filter(persone => persone.id !== person.id))
    setNotificationMessage(`Removed ${person.name}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
    }
    else {
      console.log('not confirmed')
      return
    }
  }
  useEffect(()=> {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
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
      const overwrite = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      console.log(overwrite)
      if (overwrite) {
        const oldPersonIndex = persons.findIndex(p => p.name === newName)
        personService
          .insert(persons[oldPersonIndex].id,person)
          .then(returnedPerson => {
            let newPersons = [...persons]
            newPersons[oldPersonIndex] = returnedPerson
            setPersons(newPersons)
          })
          .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
            personService
              .getAll()
              .then(updatedPersons => {
                setPersons(updatedPersons)
                })
          })
          setNewName('')
          setNewNumber('')
          if (errorMessage != null){
            setNotificationMessage(`Changed ${person.name}'s number`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000)
          }
      }
      return
    }
    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    setNewName('')
    setNewNumber('')
    setNotificationMessage(`Added ${person.name}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <ErrorMessage message ={errorMessage}/>
      <FilterForm handleFilterChange = {handleFilterChange} filter = {filter}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange= {handleNumberChange} newName= {newName} 
      newNumber ={newNumber} addPerson= {addPerson} event= {this}/>
      <h2>Numbers</h2>
      <RenderPersons persons = {persons} filter= {filter} setPersons={setPersons} confirmDeletion = {confirmDeletion}/>
    </div>
  )

}

export default App