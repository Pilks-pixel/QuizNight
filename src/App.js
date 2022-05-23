import './App.css';
import Questions from './components/Questions';
import { useState } from 'react';

function App() {

  const [showQuestion, setShowQuestion] = useState(false)

  function handleClick() {
    return setShowQuestion(prevShowQuestion => !prevShowQuestion)
  }

  return (
    <div className="App">
      <h1>Quiz Night</h1>
      <p>Welcome to Quiz Night, you will face 10 questions</p>
      <button onClick={handleClick}>Start</button>

      { showQuestion && <Questions />}

    </div>
  );
}

export default App;
