import { React, useEffect, useState} from "react";

export default function AnswerButtons(props) {

    // Creates an array of all answers and places them in random order before rendering each as a button
    

        
        function randomAnswers() {
            const answers = [...props.question.incorrect_answers, props.question.correct_answer]
            return answers.sort(() => Math.random() - 0.5)
            
        }
        console.log(randomAnswers())
        
        useEffect(() => {
            randomAnswers();
            
        },[props.newQuestion])
        
        const answerBtnElements = randomAnswers().map((a) => <button style={props.styles}  ref={props.btnOff} onClick={() => props.newQuestion(a)}>{a}</button>)
        
        
    return (
            <>
            {answerBtnElements}
            </>
        )
}