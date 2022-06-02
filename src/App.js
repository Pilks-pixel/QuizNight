import './App.css';
import Questions from './components/Questions';
import AnswerButtons from './components/AnswerButtons';
import { useState, useRef, useEffect } from 'react';




function App() {

  const [showQuestion, setShowQuestion] = useState(false)
  const [score, setScore] = useState(0)
  const [quizData, setQuizData] = useState([])
  const [questionNum, setQuestionNum] = useState(0)
  const [gameFinished, setGameFinished] = useState(false)
  const [buttonStyles, setButtonStyles] = useState({backgroundColor: '#f5f5f5'}) 
  const btnDisable = useRef();

  console.log(quizData)
  console.log(quizData[questionNum])


  

  function handleClick() {
    return setShowQuestion(prevShowQuestion => !prevShowQuestion)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json())
    .then(data => setQuizData(data.results));
  },[])

  
    function answerClick(a) {

    if (questionNum === quizData.length - 1) {
        setGameFinished(true)
        // btnDisable.current.disabled = true
        a === quizData.correct_answer? setButtonStyles({backgroundColor: '#00FF00'}) : setButtonStyles({backgroundColor: 'red'})
        return a === quizData[questionNum].correct_answer? setScore(prevScore => prevScore + 1) :
        score
    } else {
        // btnDisable.current.disabled = true
        a === quizData[questionNum].correct_answer? setButtonStyles({backgroundColor: '#00FF00'}) : setButtonStyles({backgroundColor: 'red'})
        // setTimeout(() => {setQuizQuestion(quizData[questionNum])}, 400)
        setTimeout(() => {setQuestionNum(prevQuestionNum => prevQuestionNum + 1)}, 400)
        setTimeout(() => {setButtonStyles({backgroundColor: '#f5f5f5'})}, 400)
        // setTimeout(() => {btnDisable.current.disabled = false}, 400)
        return a === quizData[questionNum].correct_answer? setScore(prevScore => prevScore + 1) :
        score
        
    }
  } 

  
  

  return (
    <div className="App">
      <h1>Quiz Night</h1>
      <p>Welcome to Quiz Night, you will face 10 questions</p>
      <button onClick={handleClick}>Start</button>

      { showQuestion && 
      <>
        <Questions question={quizData[questionNum]}/>
        <AnswerButtons 
        question={quizData[questionNum]} 
        qNumber={questionNum} 
        newQuestion={answerClick} 
        styles={buttonStyles} 
        btnOff={btnDisable}
        />
      </>
      }

      <h3>Score: {score}</h3>
      {gameFinished && <h2>Go to Scores</h2>}


    </div>
  );
}

export default App;
