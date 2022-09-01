// A Common Snack bar Component
import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBar = (props) => {
  return (
    <Snackbar
      open={!(props.feedbackMessage === "")}
      autoHideDuration={1000}
      onClose={props.snackbarHandleClose}
    >
      <Alert
        onClose={props.snackbarHandleClose}
        severity={props.isSuccess ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {props.feedbackMessage}
      </Alert>
    </Snackbar>
  );
};

CustomSnackBar.propTypes = {
  openAlert: PropTypes.bool,
  snackbarHandleClose: PropTypes.func,
  isSuccess: PropTypes.bool,
  feedbackMessage: PropTypes.string,
};

export default CustomSnackBar;
