import { React } from "react";



export default function Questions(props) {

    // decodes the data coming form the API
    const decodeHTML = function (html) {
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
      }

    
    return(
        <>

            <h3 className="quiz-info">{decodeHTML(props.question.question)}</h3>
        </>
    )
};