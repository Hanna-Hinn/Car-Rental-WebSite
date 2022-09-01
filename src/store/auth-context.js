/**
 *  A Authorization Context that will : 
 *    1.) Check if the user is loggedIn or not
 *    2.) will save the token and added to the local Storage
 *    3.) Will set a login Expiration Timer which is 1 hour
 *    4.) Logout handler
 */
import React, { useState, useEffect, useCallback, useContext } from "react";

let logoutTimer;

// Creating the Context and initlizing the values
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// calculating the Remaining time to the login to expire 
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

// Retrieving the Token
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("email");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

// Auth Context Provider
export const AuthContextProvider = (props) => {
   // States
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  
  const [token, setToken] = useState(initialToken);

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!token);


  //Logout Handler
  const logoutHandler = useCallback(() => {
    
    setUserIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("email");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //Login Handler
  const loginHandler = (token, expirationTime) => {
    setUserIsLoggedIn(!!token);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //Setting Timer
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  // Passing the Context Values to Provider
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

// a useAuthContext method
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
