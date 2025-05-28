import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="glow-background"></div>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! Page Not Found</p>
      <button className="notfound-button" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
