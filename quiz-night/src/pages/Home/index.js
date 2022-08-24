import React from "react";
import { Questions, AnswerButtons } from "../../components";
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";


function Home(props) {
    
  const [showQuestion, setShowQuestion] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
//   const [gameFinished, setGameFinished] = useState(false);
  const [buttonStyles, setButtonStyles] = useState({backgroundColor: '#f5f5f5'}); 
  const btnDisable = useRef();

  console.log(quizData)
  console.log(quizData[questionNum])


  
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
    console.log(props.player)
    // console.log(props.gameFinished)

  };

  // Loads 10 questions array from open trivia API when page loads
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&url3986')
    .then(response => response.json())
    .then(data => setQuizData(data.results));
  },[]);

  
    function answerClick(a) {

    if (questionNum === quizData.length - 1) {
        props.setGameFinished(true)
        // btnDisable.current.disabled = true
        a === quizData.correct_answer? setButtonStyles({backgroundColor: '#00FF00'}) : setButtonStyles({backgroundColor: 'red'})
        return a === quizData[questionNum].correct_answer? props.setPlayer(prevPlayer => ({...prevPlayer,playerScore: prevPlayer.playerScore + 1})) : 
        props.player.playerScore


    } else {
        // btnDisable.current.disabled = true
        a === quizData[questionNum].correct_answer? setButtonStyles({backgroundColor: '#00FF00'}) : setButtonStyles({backgroundColor: 'red'})
        setTimeout(() => {setQuestionNum(prevQuestionNum => prevQuestionNum + 1)}, 400)
        setTimeout(() => {setButtonStyles({backgroundColor: '#f5f5f5'})}, 400)
        // setTimeout(() => {btnDisable.current.disabled = false}, 400)
        return a === quizData[questionNum].correct_answer? props.setPlayer(prevPlayer => ({...prevPlayer, playerScore: prevPlayer.playerScore + 1  })) :
        props.player.playerScore
        
    }
  } 

  console.log(props.player)
  
  
    return(
        <div className="Home">
      <p>Welcome to Quiz Night, you will face 10 questions</p>

      { !showQuestion &&
      <>
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
        styles={buttonStyles} 
        btnOff={btnDisable}
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