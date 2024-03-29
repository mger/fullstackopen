import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ title }) => <h1>{title}</h1>

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, goodName, neutral, neutralName, bad, badName }) => {
  const total = good + neutral + bad 
  if (total <= 0) { return <div>No feedback gathered yet</div> }

  const averageScore = (1 * good + -1 * bad) / total 
  const positive = (good / total) * 100
  return (
    <table>
      <Statistic name={goodName} value={good} />
      <Statistic name={neutralName} value={neutral} />
      <Statistic name={badName} value={bad} />
      <Statistic name="all" value={total} />
      <Statistic name="average" value={averageScore} />
      <Statistic name="positive" value={positive + '%'} />
    </table>
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