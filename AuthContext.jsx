import React, { useState, useEffect, useCallback, useContext } from "react";
import { DataContext } from "./DataContext";

// Create AuthContext
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [userDetails, setDetails] = useState(null);

  const userIsLoggedIn = !token;

  const ctx = useContext(DataContext);

  const logoutHandler = useCallback(() => {
    setToken(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setLogoutTimer(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  }, [logoutTimer]);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime =
      new Date(expirationTime).getTime() - new Date().getTime();
    const timer = setTimeout(logoutHandler, remainingTime);
    setLogoutTimer(timer);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    if (storedToken && storedExpirationTime) {
      const remainingTime =
        new Date(storedExpirationTime).getTime() - new Date().getTime();
      if (remainingTime <= 60000) {
        // Less than 1 minute
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
      } else {
        setToken(storedToken);
        const timer = setTimeout(() => {
          setToken(null);
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
        }, remainingTime);
        setLogoutTimer(timer);
      }
    }
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/userinfo", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data & ctx is: ", data.user, ctx);
          setDetails(data.user);
        } else {
          // Handle error
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (window !== undefined) {
      console.log("Context after refreshing is: ", ctx, userDetails);
      ctx.setUserDetails(userDetails);
      fetchUserDetails();
    }
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
