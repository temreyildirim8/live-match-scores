import { useState } from "react";
import "./Scoreboard.css";

function Scoreboard() {
  const [matches, setMatches] = useState([]);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const startMatch = () => {
    const newMatch = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      id: matches.length,
    };
    setMatches([...matches, newMatch]);
    setHomeTeam("");
    setAwayTeam("");
  };

  const updateScore = (matchId, homeScore, awayScore) => {
    const updatedMatches = matches.map((match) => {
      if (match.id === matchId) {
        return { ...match, homeScore, awayScore };
      }
      return match;
    });
    setMatches(updatedMatches);
  };

  const finishMatch = (matchId) => {
    const updatedMatches = matches.filter((match) => match.id !== matchId);
    setMatches(updatedMatches);
  };

  const getSummary = () => {
    const sortedMatches = [...matches].sort((a, b) => {
      const aTotalScore = a.homeScore + a.awayScore;
      const bTotalScore = b.homeScore + b.awayScore;
      if (aTotalScore > bTotalScore) {
        return -1;
      }
      if (aTotalScore < bTotalScore) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      if (a.id < b.id) {
        return 1;
      }
      return 0;
    });
    return sortedMatches;
  };
  

  return (
  <div className="scoreboard">
    <h1>Live Football World Cup Scoreboard</h1>
    <div>
      {matches.map((match) => (
        <div className="match" key={match.id}>
          <div className="teams">
            <div className="team">
              <span>{match.homeTeam}</span>
            </div>
            <div className="score">
              <span>{match.homeScore}</span>
              <span>-</span>
              <span>{match.awayScore}</span>
            </div>
            <div className="team">
              <span>{match.awayTeam}</span>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => updateScore(match.id, match.homeScore + 1, match.awayScore)} disabled={match.finished}>Home Goal</button>
            <button onClick={() => finishMatch(match.id)} disabled={match.finished}>Finish</button>
            <button onClick={() => updateScore(match.id, match.homeScore, match.awayScore + 1)} disabled={match.finished}>Away Goal</button>
          </div>
        </div>
      ))}
    </div>
    <div>
      <label>
        Home Team:
        <input className="home-team-input" type="text" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} />
      </label>
      <label>
        Away Team:
        <input className="away-team-input" type="text" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} />
      </label>
      <button onClick={startMatch} disabled={!homeTeam || !awayTeam}>Start New Match</button>
    </div>
    <div className="summary">
      <h2>Summary</h2>
      <ul>
        {getSummary().map((match) => (
          <li key={match.id}>{`${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`}</li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Scoreboard;
