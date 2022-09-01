/**
 *  A Common Confirmation Component
 *  Detail: 
 *          > It will take the value of the content to Display to the user
 *          > It will Have to Main Action either Cancel the Action or Continue In it
 *          > It have A Default Prop Values
 *          > All the logic and the action made is determined by the component that wants to user it
 */

import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Confirmation = (props) => {
  const { textContent, action, open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Confirmation Dialog"}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "red" }}>
          {textContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={action} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Confirmation.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  textContent: PropTypes.string,
  action: PropTypes.func,
};

Confirmation.defaultProps = {
  open: false,
  textContent:
    "Are You Sure You wanna Continue with This Action? You Can not Undo It!!!",
  action: () => {},
};

export default Confirmation;
