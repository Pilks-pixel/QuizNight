import './App.css';
import Questions from './components/Questions';
import AnswerButtons from './components/AnswerButtons';
import { useEffect, useState } from 'react';
import quizData from "./quizData";


function App() {

  const [showQuestion, setShowQuestion] = useState(false)
  const [score, setScore] = useState(0)
  const [questionNum, setQuestionNum] = useState(1)
  const [quizQuestion, setQuizQuestion] = useState(quizData.results[0])
  const [gameFinished, setGameFinished] = useState(false)
    


  function handleClick() {
    return setShowQuestion(prevShowQuestion => !prevShowQuestion)
  }

  useEffect((a) => {
    // const timer = setTimeout(() => {
    //   setQuizQuestion(quizData.results[questionNum])
    //     setQuestionNum(prevQuestionNum => prevQuestionNum + 1) 
    // }, 3000);
    // return () => clearTimeout(timer);

  },[])

  function answerClick(a) {
    if (questionNum === quizData.results.length) {
        setGameFinished(true)
        return a === quizQuestion.correct_answer? setScore(prevScore => prevScore + 1) :
        score
    } else {
        // a === quizQuestion.correct_answer? styles = {backgroundColor: 'green'} : styles = {backgroundColor: 'red'}
        setTimeout(() => {setQuizQuestion(quizData.results[questionNum])}, 3000)
        setTimeout(() => {setQuestionNum(prevQuestionNum => prevQuestionNum + 1)}, 3000)
        return a === quizQuestion.correct_answer? setScore(prevScore => prevScore + 1):
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
      <AnswerButtons question={quizQuestion} qNumber={questionNum} newQuestion={answerClick}/>
      </>
      }

      <h3>Score: {score}</h3>
      {gameFinished && <h2>Go to Scores</h2>}


    </div>
  );
}

export default App;
