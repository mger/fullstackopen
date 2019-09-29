import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ title }) => <h1>{title}</h1>

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>

const Statistic = ({ name, number }) => <div>{name} {number}</div>

const Statistics = ({ good, goodName, neutral, neutralName, bad, badName }) => {
  const total = good + neutral + bad 
  if (total <= 0) { return <div>No feedback gathered yet</div> }

  const averageScore = (1 * good + -1 * bad) / total 
  const positive = (good / total) * 100
  return (
    <div>
      <Statistic name={goodName} number={good} />
      <Statistic name={neutralName} number={neutral} />
      <Statistic name={badName} number={bad} />
      <Statistic name="all" number={total} />
      <Statistic name="average" number={averageScore} />
      <Statistic name="positive" number={positive + '%'} />
    </div>
  )
}

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
      <Statistics good={good} goodName={goodName} neutral={neutral} neutralName={neutralName} bad={bad} badName={badName} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)