import React, { useState, useEffect } from 'react'

import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Entries from './components/Entries'
import Notification from './components/Notification'

import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchField, setSearchField ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ success, setSuccess ] = useState(true)

  useEffect(() => {
    console.log("Effect: fetching data from server")

    personService
      .getAll()
      .then(persons => { setPersons(persons) })
  }, [])
  console.log("Render", persons.length, "persons")

  const matchingPersons = (name) => persons.filter(person => person.name === name)

  const handleUpdate = (oldEntry, updatedNumber) => {
    const confirm = window.confirm(`The entry ${oldEntry.name} already exists. Do you want to update ${oldEntry.number} with ${updatedNumber}?`)
    
      if (confirm === false) { return }
      
      const updatedEntry = { ...oldEntry, number: updatedNumber }
      console.log("Update entry", updatedEntry)

      personService
        .update(updatedEntry.id, updatedEntry)
        .then(entry => {
          console.log("Entry successfully updated", entry)
          setPersons(persons.map(person => person.id !== entry.id ? person : entry))
          
          if (success === false) { setSuccess(true) }
          setNotification(`The number of ${entry.name} was updated to ${entry.number}.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log("Update failed", error)

          if (success === true) { setSuccess(false) }
          setNotification(`Updating the number of ${updatedEntry.name} failed; already deleted from server.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
  }

  const addEntry = (event) => {
    event.preventDefault()

    const matching = matchingPersons(newName)
    if (matching.length > 0) {
      handleUpdate(matching[0], newNumber)
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
        console.log("Entry successfully added", newEntry)

        setPersons(persons.concat(newEntry))
        setNewName('')
        setNewNumber('')

        if (success === false) { setSuccess(true) }
        setNotification(`Added ${newEntry.name} with number ${newEntry.number} to phone book.`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      <Notification message={notification} success={success} />
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