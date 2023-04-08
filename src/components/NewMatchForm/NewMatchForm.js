import React, { useState } from "react";

function NewMatchForm({ startMatch }) {
const [homeTeam, setHomeTeam] = useState("");
const [awayTeam, setAwayTeam] = useState("");

const handleSubmit = (event) => {
event.preventDefault();
startMatch(homeTeam, awayTeam);
setHomeTeam("");
setAwayTeam("");
};

return (
  <div>
    <form onSubmit={handleSubmit}>
      <label>
      Home Team:
      </label>
      <input type="text" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} />
      <label>
      Away Team:
      </label>
      <input type="text" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} />
    </form>
  </div>
)}

export default NewMatchForm;