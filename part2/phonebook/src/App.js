import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addEntry = (event) => {
    console.log("Add entry", event)
    event.preventDefault()
    const newEntry = {
      name: newName
    }

    setPersons(persons.concat(newEntry))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log("Name change", event.target.value)
    setNewName(event.target.value)
  }

  const rows = () => persons.map(person => <li key={person.name}>{person.name}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App