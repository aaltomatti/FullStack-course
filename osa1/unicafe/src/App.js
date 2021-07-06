import React, { useState } from 'react'

const StatisticLine = ({text, value, mark=''}) => {
  return(
  <div>
    {text} {value} {mark}
  </div>
  )
}
const Statistics = ({good, neutral, bad, sum, amount}) => {
  if (amount === 0){
    return(
      <p>No feedback given</p>
    )
  }
  else{
  return(
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={amount} />
      <StatisticLine text="average" value ={sum/amount} />
      <StatisticLine text="positive" value ={good/amount} mark='%' />
    </div>
  )
  }
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  const [amount, setAmount] = useState(0)
 
  const handleGoodClick = () => {
    setGood(good + 1)
    setAmount(amount +1)
    setSum(sum + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral +1)
    setAmount(amount +1)
    setSum(sum)
  }
  const handleBadClick = () => {
    setBad(bad +1)
    setAmount(amount +1)
    setSum(sum-1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick ={handleGoodClick} text='good'/>
      <Button handleClick ={handleNeutralClick} text='neutral'/>
      <Button handleClick ={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <p></p>
      <Statistics good={good} neutral={neutral} bad = {bad} amount = {amount} sum = {sum}/>

    </div>
  )
}

export default App