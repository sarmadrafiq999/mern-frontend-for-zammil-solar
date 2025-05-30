import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export default function Register() {
  const { storeTokenLS } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.ok) {
        storeTokenLS(data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
        toast.success("Registered successfully");
      } else {
        toast.error(data.extraDetails || data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="sectionRegister">
      <div className="container">
        <div className="reg-form">
          <div className="reg-cont">
            <h1>Join Us Today</h1>
            <p>Fill in the details to register your account.</p>
            <br />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                id="username"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="Enter Phone Number"
                id="phone"
                required
                autoComplete="off"
                value={user.phone}
                onChange={handleInput}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>

            <br />
            <button className="reg-btn" type="submit">
              Register Now
            </button>

            <div className="Already">
              Already have an account?{" "}
              <span>
                <NavLink to="/login" className="login-link">
                  Login here
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
