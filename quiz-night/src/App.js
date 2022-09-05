import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home, LeaderBoard} from './pages';
import { useState } from 'react';




function App() {

  const [playerData, setPlayerData] = useState({name:"",score:0});
  const [gameEnded, setGameEnded] = useState(false);

  

  

  return (
    <div className="App">
      <header>
      <h1 className="headings" >Quiz Night</h1>

      </header>

      <div className="app-container" > 
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

    </div>
  );
}

export default App;
