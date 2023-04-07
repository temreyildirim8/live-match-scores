/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from "@testing-library/react";
import Scoreboard from "./Scoreboard";


describe("Scoreboard", () => {
  test("matches are added to the scoreboard when a new match is started", () => {
    render(<Scoreboard />);
  
    const homeTeamInput = screen.getByLabelText("Home Team:");
    const awayTeamInput = screen.getByLabelText("Away Team:");
    const startMatchButton = screen.getByText("Start New Match");
  
    // enter team names and start match
    fireEvent.change(homeTeamInput, { target: { value: "Brazil" } });
    fireEvent.change(awayTeamInput, { target: { value: "Argentina" } });
    fireEvent.click(startMatchButton);
  
    // check that match is added to the scoreboard
    const match = screen.queryAllByText("Brazil 0 - 0 Argentina");
    expect(match).toBeDefined();
  });

  test("scores are updated correctly when a goal is scored", () => {
    render(<Scoreboard />);
  
    const homeTeamInput = screen.getByLabelText("Home Team:");
    const awayTeamInput = screen.getByLabelText("Away Team:");
    const startMatchButton = screen.getByText("Start New Match");
  
    // enter team names and start match
    fireEvent.change(homeTeamInput, { target: { value: "Brazil" } });
    fireEvent.change(awayTeamInput, { target: { value: "Argentina" } });
    fireEvent.click(startMatchButton);
  
    // score a goal for home team
    const homeGoalButton = screen.getByText("Home Goal");
    expect(homeGoalButton).toBeEnabled();
    fireEvent.click(homeGoalButton);
    const homeScore = screen.queryAllByText("Brazil 1 - 0 Argentina");
    expect(homeScore).toBeDefined();
  
    // score a goal for away team
    const awayGoalButton = screen.getByText("Away Goal");
    expect(awayGoalButton).toBeEnabled();
    fireEvent.click(awayGoalButton);
    const awayScore = screen.queryAllByText("Brazil 1 - 1 Argentina");
    expect(awayScore).toBeDefined();
  });

  test("matches are removed from the scoreboard when finished", () => {
    render(<Scoreboard />);
  
    const homeTeamInput = screen.getByLabelText("Home Team:");
    const awayTeamInput = screen.getByLabelText("Away Team:");
    const startMatchButton = screen.getByText("Start New Match");
  
    // enter team names and start match
    fireEvent.change(homeTeamInput, { target: { value: "Brazil" } });
    fireEvent.change(awayTeamInput, { target: { value: "Argentina" } });
    fireEvent.click(startMatchButton);
  
    // finish the match
    const finishMatchButton = screen.getByText("Finish");
    fireEvent.click(finishMatchButton);
  
    // check that match is removed from the scoreboard
    const match = screen.queryByText("Brazil 0 - 0 Argentina");
    expect(match).not.toBeInTheDocument();
  });

  test("summary of games in progress ordered by total score and start time", () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByLabelText("Home Team:");
    const awayTeamInput = screen.getByLabelText("Away Team:");
    const startMatchButton = screen.getByText("Start New Match");
  
    // Add first match
    fireEvent.change(homeTeamInput, { target: { value: "Team A" } });
    fireEvent.change(awayTeamInput, { target: { value: "Team B" } });
    fireEvent.click(startMatchButton);
  
    // Update scores for first match
    const homeScoreButton = screen.getByText("Home Goal");
    const awayScoreButton = screen.getByText("Away Goal");
    fireEvent.click(homeScoreButton);
    fireEvent.click(homeScoreButton);
    fireEvent.click(awayScoreButton);
  
    // Add second match
    fireEvent.change(homeTeamInput, { target: { value: "Team C" } });
    fireEvent.change(awayTeamInput, { target: { value: "Team D" } });
    fireEvent.click(startMatchButton);
  
    // Update scores for second match
    const secondMatchHomeScoreButton = screen.getAllByText("Home Goal")[1];
    const secondMatchAwayScoreButton = screen.getAllByText("Away Goal")[1];
    fireEvent.click(secondMatchHomeScoreButton);
    fireEvent.click(secondMatchAwayScoreButton);
    fireEvent.click(secondMatchAwayScoreButton);
  
    const summaryItems = screen.getByText("Summary").parentElement.getElementsByTagName("li");
    expect(summaryItems[0]).toHaveTextContent("Team C 1 - 2 Team D");
    expect(summaryItems[1]).toHaveTextContent("Team A 2 - 1 Team B");
  });
  

});