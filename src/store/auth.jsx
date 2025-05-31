import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState("");
  const [token, settoken] = useState(localStorage.getItem("token"));

  // ✅ Store token in localStorage and update state
  const storeTokenLS = (tokenServer) => {
    settoken(tokenServer);
    localStorage.setItem("token", tokenServer);
  };

  // ✅ Logout function: Clear all
  const logoutUser = () => {
    settoken("");
    setUser("");
    localStorage.removeItem("token");
  };

  // ✅ Boolean check
  const isLoggedIn = !!token;
  console.log("loggedin Token:", isLoggedIn);

  // ✅ Fetch authenticated user using token
  const userAuthantication = async () => {
    if (!token) {
      setUser("");
      setisLoading(false);
      return;
    }

    try {
      setisLoading(true);

      const authHeader = `Bearer ${token}`;

      console.log("🔐 Sending token:", token);
      console.log("🧾 Authorization header:", authHeader);

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
        console.log("✅ User data:", data.user);
        setUser(data.user);
      } else {
        const errorData = await response.json();
        console.error("❌ Error fetching user (bad response):", errorData);
        setUser("");
      }
    } catch (error) {
      console.error("❌ Error fetching user (network/server):", error);
      setUser("");
    } finally {
      setisLoading(false);
    }
  };

  // Re-run auth check when token changes
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
        token,
        userAuthantication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use auth
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return authContext;
};
