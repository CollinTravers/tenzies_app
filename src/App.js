import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rollCount, setRollCount] = React.useState(0)

  React.useEffect(() => {
    if (dice.every(die => die.value === dice[0].value) && dice.every(die => die.isHeld)){
      setTenzies(!tenzies)
      console.log("YOU WON")
    }
  }, [dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice(){
    const randomArray = []
    for (let i = 0; i < 10; i++){
      randomArray.push(generateNewDie())
    }
    return randomArray
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setRollCount(prevRollCount => prevRollCount + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRollCount(0)
    }
  }

  function holdDice(id){
    console.log(id)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die--container'>
        {diceElements}
      </div>
      <button 
        onClick={rollDice} 
        className='button--roll'>
          {tenzies ? "New Game" : "Re-Roll"}
      </button>
      <h4>Roll Count: {rollCount}</h4>
      {tenzies && <Confetti/>}
    </main>
  );
}

export default App;
