import React from 'react'
import Heading from "./Heading"

const PersonForm = ({ nameValue, numberValue, onNameChange, onNumberChange, onSubmit}) => {
  return (
    <div>
      <Heading title="Add Entry" />
      <form onSubmit={onSubmit}>
        <div>Name: <input value={nameValue} onChange={onNameChange} /></div>
        <div>Number: <input value={numberValue} onChange={onNumberChange} /></div>
        <div><button type="submit">Add</button></div>
      </form>
    </div>
  )
}

export default PersonForm