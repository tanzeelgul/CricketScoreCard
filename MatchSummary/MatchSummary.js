// MatchSummary.js

import React, { useState } from 'react';
import './MatchSummary.css';

function MatchSummary() {
  // State to track which team's summary to display
  const [selectedTeam, setSelectedTeam] = useState('team1');

  // Function to switch between teams
  const switchTeam = (team) => {
    setSelectedTeam(team);
  };

  // Function to render the batting table based on the selected team
  const renderBattingTable = () => {
    const battingData = selectedTeam === 'team1' ? team1BattingData : team2BattingData;

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Batsman</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
              <th className="strike-rate">S R</th>
              {/* <th className="dismissal">Dismissal</th> */}
            </tr>
          </thead>
          <tbody>
            {battingData.map((player) => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.runs}</td>
                <td>{player.ballsFaced}</td>
                <td>{player.fours}</td>
                <td>{player.sixes}</td>
                <td className="strike-rate">{player.strikeRate}</td>
                {/* <td className="dismissal">{player.dismissal}</td> */}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className="text-right extra-runs">
                Extras: {battingData.reduce((sum, player) => sum + player.extras, 0)}
              </td>
            </tr>
            <tr>
              <td colSpan="7" className="text-right">
                Total: {battingData.reduce((sum, player) => sum + player.runs, 0)}/{battingData.length} in 20 overs
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  // Function to render the bowling table based on the selected team
  const renderBowlingTable = () => {
    const bowlingData = selectedTeam === 'team1' ? team1BowlingData : team2BowlingData;

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Bowler</th>
              <th>Overs</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th className="economy">Economy</th>
            </tr>
          </thead>
          <tbody>
            {bowlingData.map((bowler) => (
              <tr key={bowler.name}>
                <td>{bowler.name}</td>
                <td>{bowler.overs}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
                <td className="economy">{bowler.economy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Replace this mock data with your actual data
  const team1BattingData = [
    { name: 'Babar', runs: 50, ballsFaced: 30, fours: 8, sixes: 2, strikeRate: 166.67, dismissal: 'c & b Bowler X', extras: 15 },
    { name: 'fakhar', runs: 30, ballsFaced: 25, fours: 4, sixes: 1, strikeRate: 120.0, dismissal: 'lbw Bowler Y', extras: 10 },
    // Add more batting data for Team 1
  ];

  const team2BattingData = [
    { name: 'Player X', runs: 65, ballsFaced: 40, fours: 10, sixes: 3, strikeRate: 162.5, dismissal: 'b Bowler A', extras: 20 },
    { name: 'Player Y', runs: 45, ballsFaced: 35, fours: 6, sixes: 2, strikeRate: 128.57, dismissal: 'c & b Bowler B', extras: 12 },
    // Add more batting data for Team 2
  ];

  const team1BowlingData = [
    { name: 'mitchal stak', overs: 4, runs: 25, wickets: 2, economy: 6.25 },
    { name: 'zampa ', overs: 3, runs: 15, wickets: 1, economy: 5.00 },
    // Add more bowling data for Team 1
  ];

  const team2BowlingData = [
    { name: 'Bowler A', overs: 4, runs: 30, wickets: 3, economy: 7.50 },
    { name: 'Bowler B', overs: 3, runs: 20, wickets: 0, economy: 6.67 },
    // Add more bowling data for Team 2
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="scorecard">
            <div className="team-heading">
              <h4>{selectedTeam === 'team1' ? 'Team 1' : 'Team 2'} Batting</h4>
            </div>
            {renderBattingTable()}

            <div className="team-heading">
              <h4>{selectedTeam === 'team1' ? 'Team 2' : 'Team 1'} Bowling</h4>
            </div>
            {renderBowlingTable()}

            {/* Buttons below the bowling table */}
            <div className="text-center mt-3">
              <button
                className={`btn ${selectedTeam === 'team1' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => switchTeam('team1')}
              >
                Team 1 Bowling
              </button>
              <button
                className={`btn ${selectedTeam === 'team2' ? 'btn-primary' : 'btn-secondary'} ml-2`}
                onClick={() => switchTeam('team2')}
              >
                Team 2 Bowling
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchSummary;
