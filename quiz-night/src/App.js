import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home, LeaderBoard} from './pages';
import { useState } from 'react';




function App() {

  const [playerData, setPlayerData] = useState({playerName:"",playerScore:0});
  const [gameEnded, setGameEnded] = useState(false);

  

  

  return (
    <div className="App">
      <header>
      <h1>Quiz Night</h1>

      </header>

      <Routes>
        <Route path="/" element={<Home 
        player={playerData}
        setPlayer={setPlayerData}  
        gameFinished={gameEnded}
        setGameFinished={setGameEnded}
        />}/>
        <Route path="leaderBoard" element={<LeaderBoard 
        player={playerData}
        setPlayer={setPlayerData}  
        gameFinished={gameEnded}
        setGameFinished={setGameEnded}

        />}/>
      </Routes>
      

    </div>
  );
}

export default App;
