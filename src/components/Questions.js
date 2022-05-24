import { useState } from "react";
import quizData from "../quizData";


export default function Questions() {

    const [questionNum, setQuestionNum] = useState(1)
    const [quizQuestion, setQuizQuestion] = useState(quizData.results[0])
    const [gameFinished, setGameFinished] = useState(false)

    console.log(quizData)
    
    function answerClick() {
        if (questionNum === quizData.results.length) {
            setGameFinished(true)
        } else {
            setQuizQuestion(quizData.results[questionNum])
            setQuestionNum(prevQuestionNum => prevQuestionNum + 1)  
        }
        

    }
    

    const AnswerButtons = () => {
        const answers = [...quizQuestion.incorrect_answers, quizQuestion.correct_answer]
        answers.sort(() => Math.random() - 0.5)
        console.log(answers)
        
        return (
            <>
                <h3>{quizQuestion.question}</h3>
                {answers.map((a) => <button onClick={answerClick}>{a}</button>)}
                
            </>
    )}
    


    
    
    
    return(
        <>
            {<AnswerButtons />}
            {gameFinished && <h2>Go to Scores</h2>}
        </>
    )
};