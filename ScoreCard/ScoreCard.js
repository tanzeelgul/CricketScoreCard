import React, { useState } from 'react';

function ScoreCard() {
  const [batsmanName, setBatsmanName] = useState("");
  const [bowlerName, setBowlerName] = useState("");
  const [score, setScore] = useState("");
  const [extras, setExtras] = useState("");
  const [outType, setOutType] = useState("");
  const [fielderName, setFielderName] = useState("");
  const [over, setOver] = useState("");
  const [ball, setBall] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle submission logic here
    console.log("Score Card Entry Submitted:", {
      batsmanName,
      bowlerName,
      score,
      extras,
      outType,
      fielderName,
      over,
      ball,
    });
    // Reset the form fields
    setBatsmanName("");
    setBowlerName("");
    setScore("");
    setExtras("");
    setOutType("");
    setFielderName("");
    setOver("");
    setBall("");
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="mb-4">Ball By Ball Entry</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label htmlFor="batsmanName" className="form-label">
              Batsman's Name
            </label> */}
            <select
              className="form-select"
              id="batsmanName"
              value={batsmanName}
              onChange={(e) => setBatsmanName(e.target.value)}
            >
              <option value="">Select Batsman</option>
              <option value="Batsman1">BABAR AZAM</option>
              <option value="Batsman2">FAKHAR ZAMAN</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="bowlerName" className="form-label">
              Bowler's Name
            </label> */}
            <select
              className="form-select"
              id="bowlerName"
              value={bowlerName}
              onChange={(e) => setBowlerName(e.target.value)}
            >
              <option value="">Select Bowler</option>
              <option value="Bowler1">MITCHAL STARCK</option>
              <option value="Bowler2">Bowler 2</option>
              {/* Add more options as needed */}
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
              <option value="">Select Runs</option>
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
              <option value="">Select Extra</option>
              <option value="NB">No Ball</option>
              <option value="WD">Wide</option>
              <option value="LB">Leg Bye</option>
              <option value="over">Over Through</option>
              <option value="over">NA</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="outType" className="form-label">
              Out Type
            </label> */}
            <select
              className="form-select"
              id="outType"
              value={outType}
              onChange={(e) => setOutType(e.target.value)}
            >
              <option value="">Out Type</option>
              <option value="Caught">Caught</option>
              <option value="Bowled">Bowled</option>
              <option value="Run Out">Run Out</option>
              <option value="lbw">LBW</option>
              <option value="stump">Stump</option>
              <option value="over">NA</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="fielderName" className="form-label">
              Fielder's Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fielderName"
              value={fielderName}
              onChange={(e) => setFielderName(e.target.value)}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="over" className="form-label">
              Over
            </label>
            <input
              type="text"
              className="form-control"
              id="over"
              value={over}
              onChange={(e) => setOver(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ball" className="form-label">
              Ball
            </label>
            <select
              className="form-select"
              id="ball"
              value={ball}
              onChange={(e) => setBall(e.target.value)}
            >
              <option value="">Select Ball</option>
              <option value="1">Ball 1</option>
              <option value="2">Ball 2</option>
              <option value="3">Ball 3</option>
              <option value="4">Ball 4</option>
              <option value="5">Ball 5</option>
              <option value="6">Ball 6</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          

        </form>
      </div>
    </div>
  );
}

export default ScoreCard;
