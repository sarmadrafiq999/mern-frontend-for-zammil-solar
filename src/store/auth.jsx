// Context api
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Store token in localStorage
  const storeTokenLS = (tokenServer) => {
    setToken(tokenServer);
    localStorage.setItem("token", tokenServer);
  };

  // Logout Functionality
  const logoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // isLoggedIn
  const isLoggedIn = !!token;
  console.log("Logged in:", isLoggedIn);

  // Get current user data using JWT
  const userAuthentication = async () => {
    try {
      setisLoading(true);
      const currentToken = localStorage.getItem("token");

      if (!currentToken) {
        logoutUser();
        return;
      }

      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User fetched:", data.user);
        setUser(data.user);
      } else {
        if (response.status === 401 || response.status === 403) {
          logoutUser();
        }
        console.log("Error fetching user data:", response.status);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      logoutUser();
    } finally {
      setisLoading(false);
    }
  };

  // Run authentication when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeTokenLS,
        logoutUser,
        user,
        isLoggedIn,
        isLoading,
        userAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
