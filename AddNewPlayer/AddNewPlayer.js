import React, { useEffect, useState } from "react";
import "./AddNewPlayer.css";

function AddNewPlayer() {
  const [teams, setTeams] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [battingStyle, setBattingStyle] = useState("right-handed");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isBowler, setIsBowler] = useState(false);
  const [isWicketKeeper, setIsWicketKeeper] = useState(false);
  const [isAllRounder, setIsAllRounder] = useState(false);
  const [isBatsman, setIsBatsman] = useState(false);
  const [preferredHand, setPreferredHand] = useState("right");
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    fetch(global.ip + "sportserver/api/sports/ViewTeams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    switch (name) {
      case "image":
        setImage(files ? files[0] : null);
        break;
      case "name":
        setName(value);
        break;
      case "battingStyle":
        setBattingStyle(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "isBowler":
        setIsBowler(checked);
        break;
      case "isWicketKeeper":
        setIsWicketKeeper(checked);
        break;
      case "isAllRounder":
        setIsAllRounder(checked);
        break;
      case "isBatsman":
        setIsBatsman(checked);
        break;
      case "preferredHand":
        setPreferredHand(value);
        break;
      case "selectedTeam":
        setSelectedTeam(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamId = teams.find((team) => team.Name === selectedTeam)?.Id;

    const formDataImage = new FormData();
    formDataImage.append("file", image);

    const responseImage = await fetch(
      global.ip + "sportserver/api/sports/UploadFile",
      {
        method: "POST",
        body: formDataImage,
      }
    );

    if (!responseImage.ok) {
      throw new Error("Failed to upload flag image");
    }

    const imageData = await responseImage.json();
    console.log("Image Upload Result:", imageData);

    const playerData = {
      Name: name,
      Picture: imageData.Name,
      DOB: dateOfBirth,
      Keeper: isWicketKeeper,
      Batsman: isBatsman,
      Bowler: isBowler ? "Yes" : "No",
      Handed: preferredHand,
      AllRounder: isAllRounder,
    };
    fetch(
      global.ip + `sportserver/api/sports/RegisterPlayer?teamId=${teamId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Player registered successfully:", data);
        // Show alert
        alert("Player registered successfully");

        // Clear all fields
        setImage(null);
        setName("");
        setBattingStyle("right-handed");
        setDateOfBirth("");
        setIsBowler(false);
        setIsWicketKeeper(false);
        setIsAllRounder(false);
        setIsBatsman(false);
        setPreferredHand("right");
        setSelectedTeam("");
      })
      .catch((error) => console.error("Error registering player:", error));
  };

  return (
    <div>
      <div className="container">
        <h1 className="mb-4">Add New Player</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="battingStyle" className="form-label">
              Batting Style
            </label>
            <select
              className="form-select"
              id="battingStyle"
              name="battingStyle"
              onChange={handleInputChange}
            >
              <option value="right-handed">Right-Handed</option>
              <option value="left-handed">Left-Handed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-check-label d-block">Bowler</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isBowlerYes"
                name="isBowler"
                value="yes"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isBowlerYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isBowlerNo"
                name="isBowler"
                value="no"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isBowlerNo">
                No
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-check-label d-block">Wicket-Keeper</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isWicketKeeperYes"
                name="isWicketKeeper"
                value="yes"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isWicketKeeperYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isWicketKeeperNo"
                name="isWicketKeeper"
                value="no"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isWicketKeeperNo">
                No
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-check-label d-block">All-Rounder</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isAllRounderYes"
                name="isAllRounder"
                value="yes"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isAllRounderYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isAllRounderNo"
                name="isAllRounder"
                value="no"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isAllRounderNo">
                No
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-check-label d-block">Batsman</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isBatsmanYes"
                name="isBatsman"
                value="yes"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isBatsmanYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="isBatsmanNo"
                name="isBatsman"
                value="no"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isBatsmanNo">
                No
              </label>
            </div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="preferredHand" className="form-label">
              Preferred Hand
            </label>
            <select
              className="form-select"
              id="preferredHand"
              name="preferredHand"
              onChange={handleInputChange}
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div> */}
          <div className="mb-3">
            <label htmlFor="selectedTeam" className="form-label">
              Select Team
            </label>
            <select
              className="form-select"
              id="selectedTeam"
              name="selectedTeam"
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Choose a team
              </option>
              {teams.map((team, index) => (
                <option key={index} value={team.Name}>
                  {team.Name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewPlayer;
