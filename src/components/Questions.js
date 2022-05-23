import { useState } from "react";
import quizData from "../quizData";


export default function Questions() {

    const [quizQuestion, setQuizQuestion] = useState(quizData.results[0])

    console.log(quizData)
    

    const AnswerButtons = () => {
        const answers = [...quizQuestion.incorrect_answers, quizQuestion.correct_answer]
        answers.sort(() => Math.random() - 0.5)
        console.log(answers)
        
        return (
                <>
                <h3>{quizQuestion.question}</h3>
                <button>{answers[0]}</button>
                <button>{answers[1]}</button>
                <button>{answers[2]}</button>
                <button>{answers[3]}</button> 
            </>
    
        )}

    
    return(
        <>
            {<AnswerButtons />}
        </>
    )
};