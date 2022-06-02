import { React } from "react";



export default function Questions(props) {

    
    // let uri = props.question.question
    // decodeURI(uri)
    
    return(
        <>

            <h3>{decodeURI(props.question.question)}</h3>
        </>
    )
};