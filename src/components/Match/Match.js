import React from "react";

function Match({ match, updateScore, finishMatch }) {
return (
  <div>
    <div>{`${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`}</div>
    <button onClick={() => updateScore(match.id, match.homeScore + 1, match.awayScore)}>Home Goal</button>
    <button onClick={() => updateScore(match.id, match.homeScore, match.awayScore + 1)}>Away Goal</button>
    <button onClick={() => finishMatch(match.id)}>Finish</button>
  </div>
);
}

export default Match;