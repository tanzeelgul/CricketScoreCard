import React, { useState, useEffect } from "react";

function NewMatch() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [tossWin, setTossWin] = useState("");
  const [overs, setOvers] = useState(0);
  const [status, setStatus] = useState("");
  const [matchDate, setMatchDate] = useState("");

  const [teams, setTeams] = useState([]);
  const [teamOptionsA, setTeamOptionsA] = useState([]);
  const [teamOptionsB, setTeamOptionsB] = useState([]);

  useEffect(() => {
    // Fetch teams from the API
    fetch(global.ip + "sportserver/api/sports/ViewTeams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        setTeamOptionsA(data);
        setTeamOptionsB(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleTeamAChange = (e) => {
    const selectedTeamA = e.target.value;
    setTeamA(selectedTeamA);

    // Filter teams for Team B dropdown
    const filteredOptionsB = teams.filter((team) => team.Id !== parseInt(selectedTeamA));
    setTeamOptionsB(filteredOptionsB);
  };

  const handleTeamBChange = (e) => {
    const selectedTeamB = e.target.value;
    setTeamB(selectedTeamB);

    // Filter teams for Team A dropdown
    const filteredOptionsA = teams.filter((team) => team.Id !== parseInt(selectedTeamB));
    setTeamOptionsA(filteredOptionsA);
  };

  const handleTossWinChange = (e) => {
    const selectedTossWin = e.target.value;
    setTossWin(selectedTossWin);
  };

  const handleOversChange = (e) => setOvers(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleMatchDateChange = (e) => setMatchDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      TeamAId: teamA,
      TeamBId: teamB,
      TossWinnerTeamId: tossWin,
      Overs: overs,
      Status: status,
      mdate: matchDate,
    };

    try {
      const response = await fetch(global.ip + "sportserver/api/sports/AddMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Match added successfully!");

        // Reset form fields
        setTeamA("");
        setTeamB("");
        setTossWin("");
        setOvers(0);
        setStatus("");
        setMatchDate("");

        // Display success alert
        alert("Match added successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to add match:", errorText);
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error as needed
    }
  };

  return (
    <div className="centered-form">
      <div className="container">
        <h1 className="mb-4 text-center">NEW MATCH</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label htmlFor="teamA" className="form-label">
              Team A
            </label> */}
            <select
              className="form-select"
              id="teamA"
              name="teamA"
              value={teamA}
              onChange={handleTeamAChange}
            >
              <option value="">Select Team A</option>
              {teamOptionsA.map((team) => (
                <option key={team.Id} value={team.Id}>
                  {team.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="teamB" className="form-label">
              Team B
            </label> */}
            <select
              className="form-select"
              id="teamB"
              name="teamB"
              value={teamB}
              onChange={handleTeamBChange}
            >
              <option value="">Select Team B</option>
              {teamOptionsB.map((team) => (
                <option key={team.Id} value={team.Id}>
                  {team.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="tossWin" className="form-label">
              Toss Win
            </label> */}
            <select
              className="form-select"
              id="tossWin"
              name="tossWin"
              value={tossWin}
              onChange={handleTossWinChange}
            >
              <option value="">Select Toss Winner</option>
              <option value={teamA}>{teamA && teams.find((team) => team.Id === parseInt(teamA))?.Name}</option>
              <option value={teamB}>{teamB && teams.find((team) => team.Id === parseInt(teamB))?.Name}</option>
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="overs" className="form-label">
              Overs
            </label> */}
            <input
              type="number"
              className="form-control"
              id="overs"
              name="overs"
              value={overs}
              onChange={handleOversChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="matchDate" className="form-label">
              Match Date
            </label>
            <input
              type="date"
              className="form-control"
              id="matchDate"
              name="matchDate"
              value={matchDate}
              onChange={handleMatchDateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewMatch;
