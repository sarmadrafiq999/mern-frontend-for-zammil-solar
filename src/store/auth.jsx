import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState("");
  const [token, settoken] = useState(localStorage.getItem("token"));

  //---------------------****--------
  // Store token to localStorage and update state
  //---------------------****--------
  const storeTokenLS = (tokenServer) => {
    settoken(tokenServer);
    localStorage.setItem("token", tokenServer);
  };

  //---------------------****--------
  // Logout user: clear token and user data
  //---------------------****--------
  const logoutUser = () => {
    settoken("");
    setUser("");
    localStorage.removeItem("token");
  };

  //---------------------****--------
  // Check if logged in
  //---------------------****--------
  const isLoggedIn = !!token;
  console.log("loggedin Token ", isLoggedIn);

  //---------------------****--------
  // Fetch authenticated user data with current token
  //---------------------****--------
  const userAuthantication = async () => {
    if (!token) {
      setUser("");
      setisLoading(false);
      return;
    }

    try {
      setisLoading(true);

      const authHeader = `Bearer ${token}`;

      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data.user);
        setUser(data.user);
      } else {
        console.log("Error fetching user Data");
        setUser("");
      }
      setisLoading(false);
    } catch (error) {
      console.log("Error fetching user Data", error);
      setUser("");
      setisLoading(false);
    }
  };

  // Whenever token changes, fetch user data
  useEffect(() => {
    userAuthantication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeTokenLS,
        logoutUser,
        user,
        isLoggedIn,
        isLoading,
        userAuthantication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth child is not used correctly");
  }
  return authContext;
};
