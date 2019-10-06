import React, { useState } from 'react'
import Heading from "./components/Heading"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchField, setSearchField] = useState('')

  const exists = (name) => persons.filter((person) => person.name === name).length > 0

  const addEntry = (event) => {
    event.preventDefault()
    if (exists(newName)) {
      console.log(`${newName} already exists in the phonebook; not adding`)
      window.alert(`${newName} is already present in the phonebook`)
      return
    }
    
    console.log("Add entry", newName, newNumber)
    const newEntry = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newEntry))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log("Name change", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("Number change", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchFieldChange = (event) => {
    console.log("Search field change", event.target.value)    
    setSearchField(event.target.value)
  }

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().indexOf(searchField.toLowerCase()) !== -1
  )
  const rows = () => filteredPersons.map(
    person => <li key={person.name}>{person.name} {person.number}</li>
  )

  return (
    <div>
      <Heading title="Phonebook" />
      <div>Filter: <input value={searchField} onChange={handleSearchFieldChange} /></div>
      <Heading title="Add Entry" /> 
      <form onSubmit={addEntry}>
        <div>Name: <input value={newName} onChange={handleNameChange} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <Heading title="Numbers" />
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App