import './App.css';
import Questions from './components/Questions';
import AnswerButtons from './components/AnswerButtons';
import { useEffect, useState, useRef } from 'react';
import quizData from "./quizData";


function App() {

  const [showQuestion, setShowQuestion] = useState(false)
  const [score, setScore] = useState(0)
  const [questionNum, setQuestionNum] = useState(1)
  const [quizQuestion, setQuizQuestion] = useState(quizData.results[0])
  const [gameFinished, setGameFinished] = useState(false)
  const [buttonStyles, setButtonStyles] = useState({backgroundColor: '#f5f5f5'}) 
  const btnDisable = useRef();

  

  function handleClick() {
    return setShowQuestion(prevShowQuestion => !prevShowQuestion)
  }

  function answerClick(a) {
    if (questionNum === quizData.results.length) {
        setGameFinished(true)
        btnDisable.current.disabled = true
        a === quizQuestion.correct_answer? setButtonStyles({backgroundColor: '#00FF00'}) : setButtonStyles({backgroundColor: 'red'})
        return a === quizQuestion.correct_answer? setScore(prevScore => prevScore + 1) :
        score
    } else {
        btnDisable.current.disabled = true
        a === quizQuestion.correct_answer? setButtonStyles({backgroundColor: '#00FF00'}) : setButtonStyles({backgroundColor: 'red'})
        setTimeout(() => {setQuizQuestion(quizData.results[questionNum])}, 400)
        setTimeout(() => {setQuestionNum(prevQuestionNum => prevQuestionNum + 1)}, 400)
        setTimeout(() => {setButtonStyles({backgroundColor: '#f5f5f5'})}, 400)
        setTimeout(() => {btnDisable.current.disabled = false}, 400)
        return a === quizQuestion.correct_answer? setScore(prevScore => prevScore + 1) :
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
      <Questions question={quizQuestion}/>
      <AnswerButtons 
      question={quizQuestion} 
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
