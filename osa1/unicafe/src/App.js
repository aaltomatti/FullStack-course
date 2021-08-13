import React, { useState } from 'react'

const Statistics = ({good, neutral, bad, sum, amount}) => {
  if (amount === 0){
    return(
      <p>No feedback given</p>
    )
  }
  else{
  return(
    <>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>        
          <tr>
            <td>all</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{sum/amount}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(good/amount)*100} %</td>
          </tr>
        </tbody>
      </table>
    </>
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