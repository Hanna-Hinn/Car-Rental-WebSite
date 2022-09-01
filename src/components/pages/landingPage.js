// Landing Page

//note : I currently working on the design of the page

import React from "react";
import Header from "../header/header";

import classes from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <div className={classes.landing__Container}>
      <Header />
      <div className={classes.welcome__Div}>
        <h1>Login or SignUp to Continue</h1>
      </div>
    </div>
  );
};

export default LandingPage;
