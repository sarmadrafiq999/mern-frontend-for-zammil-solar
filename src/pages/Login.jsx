import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Login() {
  const [loginuser, setloginuser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Now we include `userAuthantication` from the AuthContext
  const { storeTokenLS, userAuthantication } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setloginuser({
      ...loginuser,
      [name]: value,
    });
  };

  // handleSubmit
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
          body: JSON.stringify(loginuser),
        }
      );

      const data = await response.json();
      const tokentobeStored = data.token;

      if (response.ok) {
        // Store token in localStorage and context state
        storeTokenLS(tokentobeStored);

        // ✅ Fetch user data right after login
        await userAuthantication();

        setloginuser({
          email: "",
          password: "",
        });

        toast.success("Login successfully");
        navigate("/");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
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
                  <p>Fill in the details to login your account.</p>
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
                      value={loginuser.email}
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
                      value={loginuser.password}
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
                    <NavLink to="/register" className={"login-link"}>
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
