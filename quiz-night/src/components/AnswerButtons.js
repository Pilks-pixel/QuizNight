import { React, useEffect, useState } from "react";

export default function AnswerButtons(props) {
	const [answerOptions, setAnswerOptions] = useState([]);

	// decodes the data coming from the API
	const decodeHTML = function (html) {
		const txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	};

	let decodedAnswer = decodeHTML(props.question.correct_answer);
	let decodedIncorrectAnswer = props.question.incorrect_answers.map(answer =>
		decodeHTML(answer)
	);
	
	// Array of answers in random order
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		let answers = [...decodedIncorrectAnswer, decodedAnswer] 
		answers.sort(() => Math.random() - 0.5);
		setAnswerOptions(answers);
	}, [props.question]);
	/* eslint-enable react-hooks/exhaustive-deps */

	// Iterates over the answerOptions array and generates a button for each one
	const answerBtnElements = answerOptions.map((a, index) => {
		return (
			<button
				key={index}
				className={`primary_btn ${
					!props.selected
						? " "
						: props.selected && a === decodedAnswer
						? "correct"
						: "incorrect"
				}`}
				onClick={() => props.newQuestion(a)}
				disabled={props.btnOff}
			>
				{a}
			</button>
		);
	});

	return <div className='container-answer-btns'>{answerBtnElements}</div>;
}
