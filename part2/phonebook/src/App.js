import React, { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Entries from './components/Entries'

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

  const handleChange = (logString, update) => (event) => {
    console.log(logString, event.target.value)
    update(event.target.value)
  }

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().indexOf(searchField.toLowerCase()) !== -1
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={searchField} onChange={handleChange("Search field change", setSearchField)}/>
      <PersonForm 
        nameValue={newName} 
        numberValue={newNumber} 
        onNameChange={handleChange("Name change", setNewName)} 
        onNumberChange={handleChange("Number change", setNewNumber)}
        onSubmit={addEntry}
      />
      <Entries persons={filteredPersons} />
    </div>
  )
}

export default App