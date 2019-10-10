import React from 'react'
import Heading from "./Heading"
import Entry from "./Entry"

import personService from "../services/persons"

const Entries = ({persons, setPersons}) => {
  const handleDelete = (name, id) => {
    const confirm = window.confirm(`Do you really want to delete the ${name} entry?`)
    if (confirm === false) { return }

    personService
      .deleteSingle(id)
      .then(data => {
        console.log(`Person with ${id} deleted`, data)
        
        const personsCopy = persons
        personsCopy.splice(personsCopy.indexOf(p => p.id === id), 1)
        setPersons(personsCopy)
      })
  }
  
  const rows = () => persons.map(person => (
    <Entry key={person.name} name={person.name} number={person.number} onClick={() => handleDelete(person.name, person.id)} />
  ))
  
  return (
    <div>
      <Heading title="Numbers" />
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default Entries