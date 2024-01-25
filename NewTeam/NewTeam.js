import React, { useState } from "react";

function NewTeam() {
  const [teamName, setTeamName] = useState("");
  const [flagImage, setFlagImage] = useState(null);

  async function uploadImage(e) {
    e.preventDefault();

    try {
      // Step 1: Upload Flag Image
      const formDataFlag = new FormData();
      formDataFlag.append("file", flagImage);

      const responseFlag = await fetch(global.ip+"sportserver/api/sports/UploadFile", {
        method: "POST",
        body: formDataFlag,
      });

      if (!responseFlag.ok) {
        throw new Error("Failed to upload flag image");
      }

      const flagData = await responseFlag.json();
      console.log("Flag Upload Result:", flagData);

      // Step 2: Register Team without using FormData
      const teamData = {
        Name: teamName,
        Flag: flagData.Name,
      };

      const responseTeam = await fetch(global.ip+"sportserver/api/sports/RegisterTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (responseTeam.ok) {
        console.log("Team added successfully");
      } else {
        console.error("Failed to add team");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <h1 className="mb-4">New Team</h1>
        <form onSubmit={uploadImage}>
          <div className="mb-3">
            <label htmlFor="teamName" className="form-label">
              Team Name
            </label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              name="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="flagImage" className="form-label">
              Flag Image
            </label>
            <input
              type="file"
              className="form-control"
              id="flagImage"
              name="flagImage"
              accept="image/*"
              onChange={(e) => setFlagImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Team
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTeam;
