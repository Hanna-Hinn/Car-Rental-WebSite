//Navigation Component that will navigate between List and History 
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./navigation.module.css";

const Navigation = (props) => {
  let style = {
    fontSize: "20px",
    height: "100px",
    textDecoration: "none",
    textAlign: "center",
    backgroundColor: "rgb(250,250,250)",
    color: "black",
  };

  let activeStyle = {
    ...style,
    backgroundColor: "rgb(150,150,150)",
    color: "white",
  };
  return (
    <div className={classes.navigation}>
      <div className={classes.profile}>
        <img
          src={
            props.photoUrl
              ? props.photoUrl
              : "https://i.ibb.co/BqgGSc6/blank-profile-picture-973460-640.png"
          }
          alt="profile-pic"
        />
        <p>{props.name}</p>
      </div>
      <div className={classes.list__history}>
        <NavLink
          to="/list"
          style={({ isActive }) => (isActive ? activeStyle : style)}
        >
          List
        </NavLink>
        <NavLink
          to="/history"
          style={({ isActive }) => (isActive ? activeStyle : style)}
        >
          History
        </NavLink>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  name: PropTypes.string,
  photoUrl: PropTypes.string,
};

Navigation.defaultProps = {
  photoUrl: "https://i.ibb.co/BqgGSc6/blank-profile-picture-973460-640.png",
};

export default Navigation;
