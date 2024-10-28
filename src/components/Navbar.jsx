import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Your weather updates</h2>
      <nav>
        <Link className="nav-button" to="/">
          Dashboard
        </Link>
        <Link className="nav-button" to="/about">
          About
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
