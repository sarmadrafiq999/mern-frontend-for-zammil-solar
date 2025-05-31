import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenLS, userAuthantication } = useAuth();

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
        "https://zammil-backend-production.up.railway.app/api/auth/login",
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
        await userAuthantication();

        setUser({
          email: "",
          password: "",
        });

        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(data.extraDetails || data.message || "Invalid credentials");
      }
    } catch (error) {
      // toast.error("Login failed. Please check your connection.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <section>
        <main>
          <div className="sectionlogin">
            <div className="container-login">
              <div className="log-form">
                <div className="log-cont">
                  <h1>Login now</h1>
                  <p>Fill in the details to login to your account.</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
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
                      placeholder="Enter password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <button className="reg-btn" type="submit">
                    Login Now
                  </button>
                </form>
                <div className="log-now">
                  Don't have an account?{" "}
                  <span>
                    <NavLink to="/register" className="login-link">
                      Register here
                    </NavLink>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
