import { React, useState, useEffect } from "react";
const axios = require('axios');



export default function LeaderTable(props) {

    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function getLeaders() {
            try {
                let { data } = await axios.get("https://q-night.herokuapp.com/leaderBoard");
                console.log(data);
                setLeaders(data);
                setLoading(false)
                console.log(leaders);
            }
            catch (err) {
                console.error(err);
            }
        }

        getLeaders();
    }, [props.gameFinished]);


    leaders.sort(function (a, b) { return b.score - a.score });

    const leaderElements = leaders.map(play => <h3 className="quiz-info" key={play.id}>{play.name} {play.score}</h3>);


    return (
        <div className="leaders">
            {loading? <h2>Loading ...</h2> : leaderElements}
        </div>
    )
}
