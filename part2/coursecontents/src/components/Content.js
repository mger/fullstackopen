import React from 'react'
import Part from "./Part"

const Content = ({ parts }) => {
  const partComponents = () => parts.map(
    (p) => <Part key={p.id} name={p.name} exercises={p.exercises} />
  )

  return (
    <div>
      {partComponents()}
    </div>
  )
}

export default Content