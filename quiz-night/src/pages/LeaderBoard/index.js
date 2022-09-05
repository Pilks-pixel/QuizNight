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
            <h2 className="quiz-info">High Scores!</h2>

            <LeaderTable 
            gameFinished={props.gameFinished}
            setGameFinished={props.setGameFinished}
            player={props.player}
            setPlayer={props.setPlayer}
            />
            
            <button onClick={handleClick}>New Game</button>

        </div>
    );
}

export default LeaderBoard;