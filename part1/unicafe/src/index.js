import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ title }) => <h1>{title}</h1>

const Button = ({ name, onClick }) => (
  <button onClick={onClick}>
    {name}
  </button>
)

const StatDisplay = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodName = "good"
  const neutralName = "neutral"
  const badName = "bad"

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Heading title="give feedback" />
      <Button name={goodName} onClick={incrementGood} />
      <Button name={neutralName} onClick={incrementNeutral} />
      <Button name={badName} onClick={incrementBad} />
      <Heading title="statistics" />
      <StatDisplay name={goodName} number={good} />
      <StatDisplay name={neutralName} number={neutral} />
      <StatDisplay name={badName} number={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)