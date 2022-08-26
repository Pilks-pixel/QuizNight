import React from "react";
import { Questions, AnswerButtons } from "../../components";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Home(props) {
    
  const [showQuestion, setShowQuestion] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [answerSelected, setAnswerSelected ] = useState(false);
  const [disable, setDisable] = useState(false);

  console.log(quizData);
  console.log(quizData[questionNum]);


  
// Toggle function which conditionally renders the start of the quiz
  function handleClick() {
    return setShowQuestion(prevShowQuestion => !prevShowQuestion)
  }

//   Function for controlled form to input playerName into player object
  function handleChange(event) {
    const {name, value} = event.target
    props.setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [name]: value}
    })
  };

  // Loads 10 questions array from open trivia API when page loads
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&url3986')
    .then(response => response.json())
    .then(data => setQuizData(data.results));
  },[]);

  
  // OnClick function for Quiz Answers, controls score, questionNumber and answerSelected states
    function answerClick(a) {

    if (questionNum === quizData.length - 1) {
        props.setGameFinished(true)
        setAnswerSelected(prevAnswerSelected => !prevAnswerSelected)
        setDisable(true)
        return a === quizData[questionNum].correct_answer? props.setPlayer(prevPlayer => ({...prevPlayer,playerScore: prevPlayer.playerScore + 1})) : 
        props.player.playerScore


    } else {
        // btnDisable.current.disabled = true
        setAnswerSelected(prevAnswerSelected => !prevAnswerSelected)
        setTimeout(() => {setQuestionNum(prevQuestionNum => prevQuestionNum + 1)}, 400)
        setTimeout(() => {setAnswerSelected(false)}, 400)
        return a === quizData[questionNum].correct_answer? props.setPlayer(prevPlayer => ({...prevPlayer, playerScore: prevPlayer.playerScore + 1  })) :
        props.player.playerScore
        
    }
  } 

  // console.log(props.player)
  
  
    return(
        <div className="Home">

      { !showQuestion &&
      <>
        <h3>Welcome to Quiz Night, you will face 10 questions</h3>
        <p>Enter Player Name</p>
        <form>
          <input 
            type="text"
            placeholder="Enter Player Name"
            onChange={handleChange}
            name="playerName"
            value={props.player.playerName}
          />
        </form>
        <button onClick={handleClick}>Start</button>
      </>
      }

      { showQuestion && 
      <>
        <Questions question={quizData[questionNum]}/>
        <AnswerButtons 
        question={quizData[questionNum]} 
        qNumber={questionNum} 
        newQuestion={answerClick} 
        btnOff={disable}
        selected={answerSelected}
        />
      </>
      }
      <br></br>
      {showQuestion && `${props.player.playerName}'s Score: ${props.player.playerScore}`}
      <br></br>
      {props.gameFinished && <Link to="/leaderBoard">Go to Scores</Link> }


    </div>
    );
}

export default Home;