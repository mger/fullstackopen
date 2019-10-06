import React from 'react'
import Heading from "./Heading"
import Entry from "./Entry"

const Entries = ({persons}) => {
  const rows = () => persons.map(person => <Entry key={person.name} name={person.name} number={person.number} />)
  
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