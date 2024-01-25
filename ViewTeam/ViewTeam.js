import React, { useState, useEffect } from "react";

function ViewTeam() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch teams from the API
    fetch(global.ip + "sportserver/api/sports/ViewTeams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="container mt-5">
      <h1 className="mb-4">View Teams</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.Id}>
              <td>{team.Name}</td>
              <td>
                <img
                  src={global.ip + "sportserver/assets/" + team.Flag}
                  alt={`Team ${team.Name} Flag`}
                  width="50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTeam;
