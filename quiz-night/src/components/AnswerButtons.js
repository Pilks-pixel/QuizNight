import { React, useEffect, useState } from "react";

export default function AnswerButtons(props) {

    const [answerOptions, setAnswerOptions] = useState([])

    // decodes the data coming form the API
    const decodeHTML = function (html) {
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }

    let decodedAnswer = decodeHTML(props.question.correct_answer)
    let decodedIncorrectAnswer = props.question.incorrect_answers.map((answer) => decodeHTML(answer))



    // Creates an array of all answers and places them in random order
    useEffect(() => {
        let answers = [...decodedIncorrectAnswer, decodedAnswer]
        answers.sort(() => Math.random() - 0.5)
        setAnswerOptions(answers)
    }, [props.question])

    console.log(answerOptions)

    // Iterates over the answerOptions array and generates a button for each one
    const answerBtnElements = answerOptions.map((a, index) => {
        return <button
            key={index}
            className={!props.selected ? " " : props.selected && a === decodedAnswer ? "correct" : "incorrect"}
            style={props.styles}
            onClick={() => props.newQuestion(a)}
            disabled={props.btnOff}

        >
            {a}</button>
    })


    return (
        <div className="answer-btns">
            {answerBtnElements}
        </div>
    )
}