import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
export default function Register() {
  const { storeTokenLS } = useAuth();
  const navigate = useNavigate();
  const [User, setuser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setuser({
      ...User,
      [name]: value,
    });
  };
  // handleSubmit
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
          body: JSON.stringify(User),
        }
      );
      const data = await response.json();
      const storingToken = data.token;
      if (response.ok) {
        storeTokenLS(storingToken);
        setuser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
        toast.success("Registered successfully");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
      console.log(response);
    } catch (error) {
      alert("Could not fetch reg api");
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
                // value={s}
                placeholder="Enter Username"
                id="username"
                required
                autoComplete="off"
                value={User.username}
                onChange={handleInput}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                // value={s}
                placeholder="Enter phone"
                id="phone"
                required
                autoComplete="off"
                value={User.phone}
                onChange={handleInput}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                // value={s}
                placeholder="example@gmail.com"
                id="email"
                required
                autoComplete="off"
                value={User.email}
                onChange={handleInput}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                // value={s}
                placeholder="Enter your password"
                id="password"
                required
                autoComplete="off"
                value={User.password}
                onChange={handleInput}
              />
            </div>
            <br />
            <button className="reg-btn" type="submit">
              Register Now
            </button>
            <div className="Already">
              Already have an account?
              <span>
                <NavLink to="/login">Login here</NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
