//Layout Component
import React from "react";
import PropTypes from "prop-types";

import Header from "../header/header";
import Container from "../Content/Container/container";
import Navigation from "../navigation/navigation";
// import ViewDialog from "../Content/Container/Dialogs/viewDialog";

import classes from "./layout.module.css";
import { useUserContext } from "../../store/user-Context";
import { CarContextProvider } from "../../store/car-Context";

const Layout = ({ mode }) => {
  const { user } = useUserContext();

  return (
    <CarContextProvider>
      <div className={classes.content}>
        <Header />
        <Navigation name={user.name} photoUrl={user.photoUrl} />
        <Container
          isAdmin={user.email === "admin@admin.com" ? true : false}
          variant={mode}
          user={user}
        />
      </div>
    </CarContextProvider>
  );
};

Container.propTypes = {
  mode: PropTypes.string,
};

export default Layout;
