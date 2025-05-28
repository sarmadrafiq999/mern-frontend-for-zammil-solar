import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
export default function Header() {
  //---------------------****--------
  // Destructing isLoggedIn from cotect api useAuth
  //---------------------****--------
  const { isLoggedIn } = useAuth();
  return (
    <nav className="navbar">
      <div className="img-section">
        <img
          src="https://img.pikbest.com/origin/09/21/98/81GpIkbEsTpaz.png!f305cw"
          alt="Home"
          className="nav-icon"
        />
        <div className="logo-text">Solar <span>Energy</span></div>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" className="nav-link">
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to="/logout" className="nav-link">
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>{" "}
          </>
        )}
      </ul>
    </nav>
  );
}
