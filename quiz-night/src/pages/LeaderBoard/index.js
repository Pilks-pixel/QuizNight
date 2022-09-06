import React from "react";
import { useNavigate } from "react-router-dom";
import { LeaderTable } from "../../components"


function LeaderBoard(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        props.setPlayer({name:"", score:0 })
        props.setGameFinished(false)
        navigate(-1)

  };  

    
    
    return(
        <div className="leader-board">
            <h1 className="quiz-info">High Scores!</h1>
        
            {<LeaderTable gameFinished={props.gameFinished}
            setGameFinished={props.setGameFinished}
            player={props.player}
            setPlayer={props.setPlayer}/> 
            ?
            <LeaderTable 
            gameFinished={props.gameFinished}
            setGameFinished={props.setGameFinished}
            player={props.player}
            setPlayer={props.setPlayer}
            /> 
            : <h1>Loading ...</h1>}
            
            
            <button id="new-game" onClick={handleClick}>New Game</button>

        </div>
    );
}

export default LeaderBoard;