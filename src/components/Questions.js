import { React } from "react";



export default function Questions(props) {

    
    
    
    
    // const AnswerButtons = () => {
    //     const answers = [...quizQuestion.incorrect_answers, quizQuestion.correct_answer]
    //     answers.sort(() => Math.random() - 0.5)
    //     console.log(answers)
        
        
        

    //         let styles = {
    //             backgroundColor: '#f5f5f5'
    //         }
            
            
    //         function answerClick(a) {
    //             if (questionNum === quizData.results.length) {
    //                 setGameFinished(true)
    //                 return a === quizQuestion.correct_answer? props.setTotalScore(prevScore => prevScore + 1) :
    //                 props.totalScore
    //             } else {
    //                 a === quizQuestion.correct_answer? styles = {backgroundColor: '#59E391'} : styles = {backgroundColor: 'red'}
    //                 setQuizQuestion(quizData.results[questionNum])
    //                 setQuestionNum(prevQuestionNum => prevQuestionNum + 1) 
    //                 return a === quizQuestion.correct_answer? props.setTotalScore(prevScore => prevScore + 1):
    //                 props.totalScore
    //             }
    //         }
            
            
    //         return (
    //             <>
    //             {answers.map((a) => <button style={styles} onClick={() => answerClick(a)}>{a}</button>)}
    //             </>
    //         )

    
    
    
    return(
        <>
            <h3>{props.question.question}</h3>
        </>
    )
};