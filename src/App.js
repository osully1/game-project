import { useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { newGameDeck } from './services/card-api';
import { fetchScoreData } from './services/scoresService';
import GameTable from './components/GameTable/GameTable';
import PastScores from './components/PastScores/PastScores';

function App() {

  const [ deckData, setDeckData ] = useState({})
  const [ scores, setScores ] = useState([])

  async function newGame() {
    const data = await newGameDeck()
    setDeckData(data)
  }

  async function getScores() {
    const scoreData = await fetchScoreData()
    setScores(scoreData)
  }

  useEffect(() => {
    getScores();
    newGame();
  }, []); // don't forget empty dependency array

  return (
    <div className="App">
      <header className="App-header">
      <div className='header-buttons'>
        <Link className='top-btn home-btn' to='/'>Home</Link>
        <Link className='history-btn' to='/history'>Game History</Link>
      </div>
        <Switch>
          <Route exact path = '/' render={(props) =>
            <GameTable
            deckData={deckData}
            setDeckData={setDeckData}
            scores={scores}
            setScores={setScores}
            />
            
          } />
          <div className='scores-container'>
            <Route exact path='/history' render={(props) => (
              <PastScores scores={scores}/>
            )} 
            />
          </div>
        </Switch>
      </header>
    </div>
  );
}

export default App;