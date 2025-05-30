// Context api
import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState("");
  const [token, settoken] = useState(localStorage.getItem("token"));
  const authorization = `Bearer ${token}`;

  //---------------------****--------
  // !Storing token to localStorage
  //---------------------****--------
  const storeTokenLS = (tokenSrever) => {
    settoken(tokenSrever);
    return localStorage.setItem("token", tokenSrever);
  };
  //---------------------****--------
  // !Logout Functionality
  //---------------------****--------
  const logoutUser = () => {
    settoken("");
    setUser("");
    return localStorage.removeItem("token");
  };
  //---------------------****--------
  //! isLoggedIn Functionality
  const isLoggedIn = !!token;
  console.log("loggedin Token ", isLoggedIn);

  //---------------------****--------
  const userAuthantication = async () => {
    try {
      setisLoading(true);
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.user);
        setUser(data.user);
        setisLoading(false);
      } else {
        console.log("Error fetching user Data");
        setisLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user Data");
    }
  };

  // JWT Authantication To get the data of the current user
  useEffect(() => {
    userAuthantication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenLS,
        logoutUser,
        user,
        isLoggedIn,
        authorization,
        isLoading,
        userAuthantication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// transfering token

export const useAuth = () => {
  const auhtToken = useContext(AuthContext);
  if (!auhtToken) {
    throw new Error("Auth child is not used perfectly");
  }
  return auhtToken;
};
