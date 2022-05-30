import { React, useEffect } from "react";

export default function AnswerButtons(props) {

    // Creates an array of all answers and places them in random order before rendering each as a button
    const answers = [...props.question.incorrect_answers, props.question.correct_answer]

    useEffect(() => {
        answers.sort(() => Math.random() - 0.5)
        console.log(answers)
    },[props.question])
    
    
        
        
    return (
            <>
            {answers.map((a) => <button style={props.styles}  ref={props.btnOff} onClick={() => props.newQuestion(a, props.btnOff)}>{a}</button>)}
            </>
        )
}