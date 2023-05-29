import React from "react";
import {
	Questions,
	AnswerButtons,
	Settings,
	useInterval,
	useWindowSize,
} from "../../components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/settings.png";
import Confetti from "react-confetti";
const axios = require("axios");

function Home(props) {
	const [showQuestion, setShowQuestion] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [quizData, setQuizData] = useState([]);
	const [questionNum, setQuestionNum] = useState(0);
	const [answerSelected, setAnswerSelected] = useState(false);
	const [disable, setDisable] = useState(false);
	const [quizUrl, setQuizUrl] = useState(
		"https://opentdb.com/api.php?amount=6&url3986"
	);
	const [countDown, setCountDown] = useState(10);
	const [time, setTime] = useState(countDown);
	const { width, height } = useWindowSize();
	const points = { easy: 5, medium: 10, hard: 15 };

	//Quiz Start & Settings handlers
	function handleStartQuiz() {
		setAnswerSelected(false);
		return setShowQuestion(prevShowQuestion => !prevShowQuestion);
	}

	function settingsToggle() {
		return setShowSettings(prevShowSettings => !prevShowSettings);
	}

	function handleQuizInfoChange(event) {
		const { name, value } = event.target;
		props.setPlayer(prevPlayer => {
			return {
				...prevPlayer,
				[name]: value,
			};
		});
	}

	//  Questions array from open trivia API on page load
	useEffect(() => {
		async function getQuizData() {
			try {
				const response = await axios.get(quizUrl);
				setQuizData(response.data.results);
			} catch (error) {
				console.log(`Failed to fetch questions : ${error}`);
			}
		}

		getQuizData();
	}, [quizUrl]);

	// Question Countdown Custom hook
	useInterval(() => {
		if (showQuestion && !answerSelected) {
			return time === 0
				? (answerClick(), setTime(countDown))
				: setTime(prevTime => prevTime - 1);
		}
	}, 1000);

	// handler for score, questionNumber and answerSelected states
	function answerClick(a) {
		const lastQuestion = questionNum === quizData.length - 1;
		const currentQuestion = quizData[questionNum];
		setAnswerSelected(true);

		if (lastQuestion) {
			props.setGameFinished(true);
			setDisable(true);
		} else {
			setTime(countDown);
			setTimeout(() => {
				setQuestionNum(prevQuestionNum => prevQuestionNum + 1);
				setAnswerSelected(false);
			}, 500);
		}

		return a === currentQuestion.correct_answer
			? props.setPlayer(prevPlayer => ({
					...prevPlayer,
					score: prevPlayer.score + points[currentQuestion.difficulty],
			  }))
			: props.player.playerScore;
	}

	// Post player to database on gameFinished
	useEffect(() => {
		if (props.gameFinished && props.player.score >= 25) {
			console.log("high scores!");
			async function highS() {
				try {
					let resp = await axios.post(
						"https://q-night.herokuapp.com/leaderBoard",
						{
							name: props.player.name,
							score: props.player.score,
						}
					);
					console.log(resp.data);
					console.log(resp);
				} catch (err) {
					console.error(`Couldn't send player data to database: ${err}`);
				}
			}
			highS();
		} else if (props.gameFinished) {
			console.log("Keep practicing!");
		}
	}, [props.gameFinished]);

	return (
		<>
			<div className='home'>
				<div className='quiz'>
					{!showQuestion && (
						<>
							<h3 className='quiz-info'>
								Welcome to Quiz Night, you will face {quizData.length} questions
							</h3>
							<h4 className='quiz-info'>
								Points are based on difficulty, are you ready to go for the top
								score!
							</h4>
							<form>
								<input
									type='text'
									placeholder='Enter Player Name...'
									onChange={handleQuizInfoChange}
									name='name'
									value={props.player.name}
								/>
							</form>
							<br></br>

							<button disabled={!props.player.name} onClick={handleStartQuiz}>
								Start
							</button>

							<div>
								<img
									id='settings-btn'
									src={logo}
									alt='setting'
									height='40px'
									width='40px'
									onClick={settingsToggle}
								/>
							</div>

							{showSettings && (
								<Settings
									url={quizUrl}
									setUrl={setQuizUrl}
									setSettingToggle={setShowSettings}
								/>
							)}
						</>
					)}

					{showQuestion && (
						<>
							<h3 className='question-number-heading'>
								Question {questionNum + 1}
							</h3>
							<Questions question={quizData[questionNum]} />
							<AnswerButtons
								question={quizData[questionNum]}
								qNumber={questionNum}
								newQuestion={answerClick}
								btnOff={disable}
								selected={answerSelected}
							/>
							<br></br>
							{!answerSelected && <h2 className='time-heading'>{time}</h2>}
							<h4 className='quiz-info'>
								{props.player.name}'s Score: {props.player.score} points
							</h4>
						</>
					)}

					<br></br>
					{props.gameFinished && 
						<Link className='btn-go-scores' to='/leaderBoard'>
							Go to Scores
						</Link>
					}
				</div>
			</div>
			{props.gameFinished && ( props.player.score >= 25 && <Confetti
				className='confetti'
				width={width}
				height={height}
				recycle={false}
			/>)}
		</>
	);
}

export default Home;
