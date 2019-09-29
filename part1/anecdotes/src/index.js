import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ quote, votes }) => (
  <>
    <div>{quote}</div>
    <div>has {votes} votes</div>
  </>
)

const AnecdoteWithMaxVotes = ({ votes }) => {
  let max = votes[0]
  let maxIndex = 0

  for (let i = 1; i < votes.length; ++i) {
    if (votes[i] > max) {
      max = votes[i]
      maxIndex = i
    }
  }

  return <Anecdote quote={anecdotes[maxIndex]} votes={max} />
}

const App = (props) => {
  const numAnecdotes = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint16Array(numAnecdotes))

  const chooseRandomQuote = () => {
    const randomQuote = Math.floor((Math.random() * numAnecdotes ))
    setSelected(randomQuote)
  }

  const countVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote quote={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="Vote" onClick={countVote} />
      <Button text="Next anecdote" onClick={chooseRandomQuote} />
      <Heading text="Anecdote with most votes"/>
      <AnecdoteWithMaxVotes votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)