import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import { newGameDeck } from './services/card-api';
import GameTable from './components/GameTable/GameTable'

function App() {

  const [ deckData, setDeckData ] = useState({})

  async function newGame() {
    const data = await newGameDeck()
    setDeckData(data)
    console.log(data)
  }

  useEffect(() => {
    newGame();
  }, []); // don't forget empty dependency array

  return (
    <div className="App">
      <header className="App-header">
        <GameTable deckData={deckData} />
      </header>
    </div>
  );
}

export default App;