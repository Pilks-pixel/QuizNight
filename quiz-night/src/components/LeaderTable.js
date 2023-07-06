import { React, useState, useEffect } from "react";
const axios = require("axios");

export default function LeaderTable(props) {
	const [leaders, setLeaders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getLeaders() {
			try {
				let { data } = await axios.get(
					"https://quizbackend-jz6f.onrender.com/leaderboard"
				);
				setLeaders(data);
				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		}

		getLeaders();
	}, [props.gameFinished]);

	leaders.sort(function (a, b) {
		return b.score - a.score;
	});

	const leaderElements = leaders.map(play => {
		return (
			<div key={play.id} className='leader-container-score'>
				<h3 className='leader-headings'>{play.name}</h3>
				<span className='leader-score'>{play.score}</span>
			</div>
		);
	});

	return (
		<div className='leaders'>
			{loading ? <h2 className='headings neonText'>Loading ...</h2> : leaderElements}
		</div>
	);
}
