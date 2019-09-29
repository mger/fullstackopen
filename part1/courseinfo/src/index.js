import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.name}</h1>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Content = (props) => {
  const nameField = 'name'
  const exercisesField = 'exercises'

  return ( 
    <>
      <Part name={props.parts[0][nameField]} exercises={props.parts[0][exercisesField]} />
      <Part name={props.parts[1][nameField]} exercises={props.parts[1][exercisesField]} />
      <Part name={props.parts[2][nameField]} exercises={props.parts[2][exercisesField]} />
    </>
  )
}

const Total = (props) => {
  const exercisesField = 'exercises'

  return (
    <p>Number of exercises {props.parts[0][exercisesField] + props.parts[1][exercisesField] + props.parts[2][exercisesField]}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header name={course["name"]} />
      <Content parts={course["parts"]} />
      <Total parts={course["parts"]} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))