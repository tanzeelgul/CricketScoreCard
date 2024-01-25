import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
            <Link className="nav-link text-primary" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/viewteam">
                VIEW TEAM
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/newteam">
                NEW TEAM
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/oldmatch">
                OLD MATCH
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/newmatch">
                NEW MATCH
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/addnewplayer">
                ADD NEW PLAYER
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-primary" to="/scorecard">
                BALL BY BALL ENTRY
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/matchsummary">
                MatchSummary
              </Link>
              
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
