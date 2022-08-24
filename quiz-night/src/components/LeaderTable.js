import { React, useState, useEffect } from "react";


export default function LeaderTable(props) {

    const [leaders, setLeaders] = useState([{ playerName: 'x', playerScore: 5 }, { playerName: 'y', playerScore: 6 }, { playerName: 'z', playerScore: 3 }]);
    const newPlayer = props.player;


    
    
    useEffect(() => {
        if (props.gameFinished) {
            setLeaders(prevLeaders => {
                return [...prevLeaders, newPlayer]
            })
            
        }
        
    },[newPlayer,props.gameFinished]);
    
   
    leaders.sort(function(a,b) { return b.playerScore - a.playerScore });

    const leaderElements = leaders.map(play => <h3>{play.playerName} {play.playerScore}</h3>);
    

    return (
        <>
            {leaderElements}
        </>
    )
}
