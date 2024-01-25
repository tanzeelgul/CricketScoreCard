
import React, { useState, useEffect } from 'react';

export default function ViewPlayer() {
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(fetch(global.ip + "sportserver/api/sports/viewplayers"), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers you might need, e.g., authorization token
              },
            });
    
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json();
            setPlayers(data);
          } catch (error) {
            console.error('Error fetching player data:', error);
          }
        };
        fetchData();
    }, []);
    
  return (
    <div className="container mt-4">
      <h2>Player Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Img</th>
            <th>DOB</th>
            <th>Kp</th>
            <th>Batsman</th>
            <th>Bowl</th>
            <th>Hnd</th>
            <th>Ar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player 1</td>
            <td>
              <img
                src="player1.jpg" // Replace with the correct image path
                alt="Player 1"
                className="img-thumbnail"
                style={{ maxWidth: '50px' }}
              />
            </td>
            <td>1990-01-01</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
            <td>Right</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Player 2</td>
            <td>
              <img
                src="player2.jpg" // Replace with the correct image path
                alt="Player 2"
                className="img-thumbnail"
                style={{ maxWidth: '50px' }}
              />
            </td>
            <td>1995-05-15</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Left</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
