import React, { useState, useEffect, useCallback, useContext } from "react";
import { DataContext } from "./DataContext";
import { useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();
  const userIsLoggedIn = !!token;

  const ctx = useContext(DataContext);

  const logoutHandler = useCallback(() => {
    setToken(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setLogoutTimer(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    alert("Logged out successfully");
    // navigate("/signin");
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
