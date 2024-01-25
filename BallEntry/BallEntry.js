import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BallEntry() {
  const { matchId } = useParams();
  const [batsman, setBatsman] = useState({ id: "", name: "" });
  const [bowler, setBowler] = useState({ id: "", name: "" });
  const [score, setScore] = useState(null);
  const [extras, setExtras] = useState(null);
  const [outType, setOutType] = useState("");
  const [wicketHelper, setWicketHelper] = useState({ id: "", name: "" });
  const [fielderName, setFielderName] = useState("");
  const [over, setOver] = useState("");
  const [ball, setBall] = useState("");
  const [fieldingTeamPlayers, setFieldingTeamPlayers] = useState([]);
  const [battingTeamPlayers, setBattingTeamPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch fielding team players
        const fieldingResponse = await fetch(
          global.ip +
            `sportserver/api/sports/GetFieldingTeamPlayers?matchId=${matchId}`
        );
        const fieldingData = await fieldingResponse.json();
        setFieldingTeamPlayers(fieldingData);
        console.log(JSON.stringify(fieldingData, null, 2));

        // Fetch batting team players
        const battingResponse = await fetch(
          global.ip +
            `sportserver/api/sports/GetBatingTeamPlayers?matchId=${matchId}`
        );
        const battingData = await battingResponse.json();
        setBattingTeamPlayers(battingData);
        console.log(JSON.stringify(battingData, null, 2));
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchData();
  }, [matchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        BatsmanId: batsman.id,
        BowlerId: bowler.id,
        Score: parseInt(score),
        BallType: extras,
        WicketType: outType || null,
        WicketHelperId: wicketHelper.id,
        FielderName: fielderName,
        Over: parseInt(over),
        Ball: parseInt(ball),
        MatchId: parseInt(matchId),
      })
    );
    try {
      const response = await fetch(
        global.ip + "sportserver/api/sports/AddMatchDetail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BatsmanId: batsman.id,
            BowlerId: bowler.id,
            Score: parseInt(score),
            BallType: extras,
            WicketType: outType || null,
            WicketHelperId: wicketHelper.id,
            FielderName: fielderName,
            Over: parseInt(over),
            Ball: parseInt(ball),
            MatchId: parseInt(matchId),
            IsSixer: parseInt(score) == 6 ? true : false,
            IsFour: parseInt(score) == 4 ? true : false,
          }),
        }
      );

      if (response.ok) {
        console.log(
          "Match Detail added successfully",
          JSON.stringify(response)
        );
        // Reset the form fields
        setBatsman({ id: "", name: "" });
        setBowler({ id: "", name: "" });
        setScore("");
        setExtras(null);
        setOutType("");
        setFielderName("");
        setOver("");
        setBall("");
        setWicketHelper({ id: "", name: "" });
      } else {
        console.error("Failed to add Match Detail");
      }
    } catch (error) {
      console.error("Error adding Match Detail:", error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="mb-4">Ball By Ball Entry</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <select
              className="form-select"
              id="batsmanName"
              value={batsman.id}
              onChange={(e) =>
                setBatsman({
                  id: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              <option value="">Select Batsman</option>
              {battingTeamPlayers.map((player) => (
                <option key={player.Id} value={player.Id}>
                  {player.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              id="bowlerName"
              value={bowler.id}
              onChange={(e) =>
                setBowler({
                  id: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              <option value="">Select Bowler</option>
              {fieldingTeamPlayers.map((player) => (
                <option key={player.Id} value={player.Id}>
                  {player.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="score" className="form-label">
              Score
            </label> */}
            <select
              className="form-select"
              id="score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            >
              <option value="null">Select Runs</option>
              <option value="1">1 Run</option>
              <option value="2">2 Runs</option>
              <option value="3">3 Runs</option>
              <option value="4">4 Runs</option>
              <option value="6">6 Runs</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="extras" className="form-label">
              Extras
            </label> */}
            <select
              className="form-select"
              id="extras"
              value={extras}
              onChange={(e) => setExtras(e.target.value)}
            >
              <option value="null">Select Extra</option>
              <option value="NB">No Ball</option>
              <option value="WD">Wide</option>
              <option value="LB">Leg Bye</option>
              <option value="over">Over Through</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              id="outType"
              value={outType}
              onChange={(e) => {
                setOutType(e.target.value);
                // Reset wicket helper when out type changes
                setWicketHelper({ id: "", name: "" });
              }}
            >
              <option value="null">Select Out Type</option>
              <option value="Catch">Catch</option>
              <option value="Bowled">Bowled</option>
              <option value="Run Out">Run Out</option>
              <option value="lbw">LBW</option>
              <option value="stump">Stump</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Conditionally render wicket helper dropdown */}
          {outType !== "NA" && outType !== "" && (
            <div className="mb-3">
              <select
                className="form-select"
                id="wicketHelper"
                value={wicketHelper.id}
                onChange={(e) =>
                  setWicketHelper({
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].text,
                  })
                }
              >
                <option value="">Select Wicket Helper</option>
                {fieldingTeamPlayers.map((player) => (
                  <option key={player.Id} value={player.Id}>
                    {player.Name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <br></br>
          <button type="submit" className="btn btn-primary">
            End Match
          </button>
        </form>
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Team A
                  <span class="badge badge-primary badge-pill">275/6</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Extra Score
                  <span class="badge badge-secondary badge-pill">6</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Overs
                  <span class="badge badge-info badge-pill">40.5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BallEntry;
