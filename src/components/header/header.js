//Header Component
import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuthContext } from "../../store/auth-context";

import Classes from "./header.module.css";
import Button from "@mui/material/Button";

const Header = (props) => {
  //Context
  const authCtx = useAuthContext();

  //Button Styles
  const buttonStyle = {
    width: 100,
    height: 100,
    color: "white",
    borderColor: "white",
  };

  //Logout handler
  const logoutHandler = () => {
    authCtx.logout();
    routeChange("/");
  };

  //Login Handler
  const loginHandler = () => {
    routeChange("/login");
  };

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <div className={Classes.header}>
      <div className={Classes.company__logo}>
        <Link to="/list">
          <img
            src="https://i.ibb.co/jgBJMPL/car-Rental.png"
            alt="company logo"
          />
        </Link>
        <p>Car Rental</p>
        {authCtx.isLoggedIn ? (
          <Button variant="text" sx={buttonStyle} onClick={logoutHandler}>
            Logout
          </Button>
        ) : (
          <Button variant="text" sx={buttonStyle} onClick={loginHandler}>
            LogIn
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
