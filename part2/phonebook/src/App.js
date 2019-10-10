import React, { useState, useEffect } from 'react'

import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Entries from './components/Entries'

import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchField, setSearchField] = useState('')

  useEffect(() => {
    console.log("Effect: fetching data from server")

    personService
      .getAll()
      .then(persons => { setPersons(persons) })
  }, [])
  console.log("Render", persons.length, "persons")

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

    personService
      .add(newEntry)
      .then(newEntry => {
        console.log("New entry added successfully", newEntry)

        setPersons(persons.concat(newEntry))
        setNewName('')
        setNewNumber('')
      })
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
      <Entries persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App