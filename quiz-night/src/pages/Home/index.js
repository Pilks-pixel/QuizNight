import React from "react";
import { Questions, AnswerButtons, Settings} from "../../components";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/settings.png';
const axios = require('axios');



function Home(props) {
    
  const [showQuestion, setShowQuestion] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [answerSelected, setAnswerSelected ] = useState(false);
  const [disable, setDisable] = useState(false);
  const [quizUrl, setQuizUrl] = useState('https://opentdb.com/api.php?amount=6&url3986');

  console.log(quizData);
  console.log(quizData[questionNum]);




  
// Toggle function which conditionally renders the start of the quiz
  function handleClick() {
    return setShowQuestion(prevShowQuestion => !prevShowQuestion)

  }

  // Toggle function which conditionally renders Settings component
  function handleSettings() {
    return setShowSettings(prevShowSettings => !prevShowSettings)

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


  // Loads questions array from open trivia API when page loads
  useEffect(() => {
    fetch(quizUrl)
    .then(response => response.json())
    .then(data => setQuizData(data.results));
  },[quizUrl]);

  
  // OnClick function for Quiz Answers, controls score, questionNumber and answerSelected states
    function answerClick(a) {

    if (questionNum === quizData.length - 1) {
        props.setGameFinished(true)
        setAnswerSelected(prevAnswerSelected => !prevAnswerSelected)
        setDisable(true)
        return a === quizData[questionNum].correct_answer? props.setPlayer(prevPlayer => ({...prevPlayer, score: prevPlayer.score + 1})) : 
        props.player.playerScore


    } else {
        setAnswerSelected(prevAnswerSelected => !prevAnswerSelected)
        setTimeout(() => {setQuestionNum(prevQuestionNum => prevQuestionNum + 1)}, 500)
        setTimeout(() => {setAnswerSelected(false)}, 500)
        return a === quizData[questionNum].correct_answer? props.setPlayer(prevPlayer => ({...prevPlayer, score: prevPlayer.score + 1  })) :
        props.player.playerScore
        
    }
  } 

  // If gameFinshed is true, posts player to database
  useEffect(() => {
    if (props.gameFinished) {
      async function highS() {
          try {
              let resp = await axios.post("https://q-night.herokuapp.com/leaderBoard", {
              name: props.player.name,
              score: props.player.score
          });
          console.log(resp.data)
          console.log(resp)
          }   
          catch(err) {
              console.error(err);
      }
   }
   highS();
  }

  }, [props.gameFinished])
  

  
    return(
        <div className="home">
          <div className="quiz">
            { !showQuestion &&
            <>
              <h3 className="quiz-info">Welcome to Quiz Night, you will face {quizData.length} questions</h3>
              <form>
                <input 
                  type="text"
                  placeholder="Enter Player Name..."
                  onChange={handleChange}
                  name="name"
                  value={props.player.name}
                />
              </form>
              <br></br>
              
              <button disabled={!props.player.name} onClick={handleClick}>Start</button>

              <img src={logo} alt='setting' height='40px' width='40px' onClick={handleSettings} />

              { showSettings && <div className='settings-tab'>
              <Settings 
              url={quizUrl}
              setUrl={setQuizUrl}
              />
              </div> }
            </>
            }

            { showQuestion && 
            <>
              <h3>Question {questionNum + 1}</h3>
              <Questions question={quizData[questionNum]}/>
              <AnswerButtons 
              question={quizData[questionNum]} 
              qNumber={questionNum} 
              newQuestion={answerClick} 
              btnOff={disable}
              selected={answerSelected}
              />
            <br></br>
              <h4 className="quiz-info">{props.player.name}'s Score: {props.player.score} / {quizData.length}</h4>
            </>
            }

            <br></br>
            {props.gameFinished && <Link className="quiz-info" to="/leaderBoard">Go to Scores</Link> }

          </div>
        </div>
    );
}

export default Home;