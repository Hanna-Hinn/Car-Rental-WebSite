//A Common Backdrop Loading Component

import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadBackDrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

LoadBackDrop.propTypes = {
  open: PropTypes.bool,
};

export default LoadBackDrop;
