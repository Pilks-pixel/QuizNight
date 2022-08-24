import React from "react";
import { useNavigate } from "react-router-dom";
import { LeaderTable } from "../../components"


function LeaderBoard(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        props.setPlayer({playerName:"", playerScore:0 })
        props.setGameFinished(prevGame => !prevGame)
        navigate(-1)

  };  

    
    
    return(
        <div className="LeaderBoard">
            <h2>High Scores!</h2>

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