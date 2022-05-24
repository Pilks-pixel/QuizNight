import { useState, useEffect } from "react";
import quizData from "../quizData";


export default function Questions() {

    const [questionNum, setQuestionNum] = useState(1)
    const [quizQuestion, setQuizQuestion] = useState(quizData.results[0])
    const [gameFinished, setGameFinished] = useState(false)
    const [score, setScore] = useState(0)

    console.log(score)

    // useEffect(() => {

    // },[quizQuestion])


    
    
    const AnswerButtons = () => {
        const answers = [...quizQuestion.incorrect_answers, quizQuestion.correct_answer]
        answers.sort(() => Math.random() - 0.5)
        console.log(answers)
        
        function answerClick(a) {
            if (questionNum === quizData.results.length) {
                setGameFinished(true)
                return a === quizQuestion.correct_answer? setScore(prevSetScore => prevSetScore + 1) : score
            } else {
                setQuizQuestion(quizData.results[questionNum])
                setQuestionNum(prevQuestionNum => prevQuestionNum + 1) 
                return a === quizQuestion.correct_answer? setScore(prevSetScore => prevSetScore + 1) : score
                }
        
        }

        return (
            <>
                {answers.map((a) => <button onClick={() => answerClick(a)}>{a}</button>)}
                
            </>
    )}
    

    
    return(
        <>
            <h3>{quizQuestion.question}</h3>
            {<AnswerButtons />}
            {gameFinished && <h2>Go to Scores</h2>}
        </>
    )
};