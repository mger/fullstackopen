import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Entries from './components/Entries'

import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchField, setSearchField] = useState('')

  const base = "http://localhost:3001/persons"

  useEffect(() => {
    console.log("Effect: fetching data from server")

    axios
      .get(base)
      .then(response => {
        console.log("Promise fulfilled")
        setPersons(response.data)
      })
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
    axios
      .post(base, newEntry)
      .then(response => {
        console.log("New entry added successfully", response.data)

        setPersons(persons.concat(response.data))
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
      <Entries persons={filteredPersons} />
    </div>
  )
}

export default App