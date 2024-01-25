import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [liveMatches, setLiveMatches] = useState([]);
  useEffect(() => {
    // Fetch live match data from your API
    const fetchData = async () => {
      try {
        const response = await fetch(
          global.ip + "sportserver/api/sports/ViewMatch?status=true"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch live match data");
        }
        const data = await response.json();
        setLiveMatches(data);
        console.log("live matches ", data);
      } catch (error) {
        console.error("Error fetching live match data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to format date as "DD-MM-YYYY"
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="mt-4 p-4">
      <div className="row">
        {liveMatches.map((match, index) => (
          <div key={index} className="col-4">
            <div className="card">
              <div className="card-body">
                <h2>Live Match</h2>
                <p>
                  {match.TeamA} vs. {match.TeamB}
                </p>

                {/* <p>Status: {match.Status === 0 ? "Not started" : match.Status === 1 ? "Currently ongoing" : "Completed"}</p>
              <p>Description: {match.Description}</p> */}
                <p>Date: {formatDate(match.mdate)}</p>
                <p>Overs: {match.Overs}</p>
                {/* <a href="#" className="btn btn-primary">
                  Match Summary
                </a> */}
                <Link className="btn btn-primary" to={`/ballentry/${match.Id}`}>
                  Enter Scores
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 style={{ marginTop: 20 }}>Upcoming Match Schedule</h2>
        <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
          <li>Date & Time: India vs. Pakistan - january 25, 2024, 3:00 PM</li>
          <li>
            Date & Time: Australia vs. England - januray 28, 2024, 4:30 PM
          </li>
          <li>Date & Time: Pakistan vs. England - january 30, 2024, 2:15 PM</li>
          <li>Date & Time: India vs. Australia - febuary 2, 2024, 5:45 PM</li>
          <li>Date & Time: England vs. Australia - febuary 5, 2024, 1:00 PM</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
