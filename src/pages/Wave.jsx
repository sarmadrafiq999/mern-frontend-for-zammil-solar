import React from "react";
import "./Wave.css";

export default function Wave() {
  return (
    <div className="wave-wrapper">
      <svg
        className="wave-svg"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="wave-path"
          d="M0 67 C 150 100 350 0 600 50 C 850 100 1050 0 1200 50 L 1200 100 L 0 100 Z"
        />
      </svg>
    </div>
  );
}
