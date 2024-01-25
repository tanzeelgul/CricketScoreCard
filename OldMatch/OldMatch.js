import React from "react";

function OldMatch() {
  const matches = [
    {
      matchNumber: 1,
      teamA: "Pakistan",
      teamB: "England",
      result: "Pakistan won",
      runs: 180,
      wickets: 4,
      winningTeam: "Pakistan",
    },
    {
      matchNumber: 2,
      teamA: "South Africa",
      teamB: "Sri Lanka",
      result: "South Africa won",
      runs: 190,
      wickets: 2,
      winningTeam: "South Africa",
    },
    // Add more matches as needed
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Old Match Results</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Match</th>
            <th>Team A</th>
            <th>Team B</th>
            <th>Result</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Winning Team</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.matchNumber}>
              <td>{`Match ${match.matchNumber}`}</td>
              <td>{match.teamA}</td>
              <td>{match.teamB}</td>
              <td>{match.result}</td>
              <td>{match.runs}</td>
              <td>{match.wickets}</td>
              <td>{match.winningTeam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OldMatch;
