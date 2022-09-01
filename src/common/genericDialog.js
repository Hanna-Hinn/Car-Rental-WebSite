/**
 *  A Common Dialog Component:
 *
 *  Props details: > It will take All the content and Action and It allows to add other components to his structure
 *
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./genericDialog.css";

const GenericDialog = (props) => {
  const [open] = useState(props.open);
  const {
    dialogActionData,
    dialogConfirmAction,
    dialogTitle,
    dialogConfirmContent,
  } = props;

  return (
    <Dialog open={open}>
      <form>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {dialogTitle}

          {props.addedDialogTitleContent}

          <CloseIcon
            onClick={props.onClose}
            color={"action"}
            sx={{
              "&:hover": {
                backgroundColor: "rgb(240,240,240)",
              },
            }}
          />
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "10px",
            width: "500px",
          }}
        >
          {props.dialogContent}
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={props.onClose}>
            {dialogActionData.cancel}
          </Button>

          <Button
            variant="contained"
            onClick={dialogConfirmAction}
            type="submit"
          >
            {dialogConfirmContent}
          </Button>
          {props.dialogActionContent}
        </DialogActions>
      </form>
      {props.children}
    </Dialog>
  );
};

GenericDialog.propTypes = {
  open: PropTypes.bool,
  addedDialogTitleContent: PropTypes.node,
  dialogContent: PropTypes.node,
  dialogActionContent: PropTypes.object,
  dialogConfirmContent: PropTypes.string,
  dialogConfirmAction: PropTypes.func,
  onClose: PropTypes.func,
  dialogTitle: PropTypes.string,
};

GenericDialog.defaultProps = {
  dialogContentData: { details: "" },
  dialogActionData: { price: 0, cancel: "Cancel", confirm: "Rent" },
};

export default GenericDialog;
