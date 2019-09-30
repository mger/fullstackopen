import React from 'react'

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => (sum + part.exercises), 0)

  return (
    <div>
      <strong>total of {totalExercises} exercises</strong>
    </div>
  )
}

export default Total