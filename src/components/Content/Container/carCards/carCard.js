/**
 *   Car Card Component
 *    Details : > It's the main component that will have most of the actions and work in it
 */

import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import GenericCard from "../../../../common/genericCard";
import { useCarContext } from "../../../../store/car-Context";
import { Button } from "@mui/material";

import Confirmation from "../../../../common/confirmations";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Dialogs from "../Dialogs/dialogs";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import "./carCard.css";
import CalendarDialog from "../Dialogs/calendarDialog";

// Content Added to the Generic Dialog
// It's added when the user is the admin
// It will also control the display to the edit button when the user clicks on it
// const addToDialogTitleContent = (editHandler, confirmation, showEdit) => {
//   return (
//     <Fragment>
//       <Button variant="contained" onClick={confirmation}>
//         Delete
//       </Button>
//     </Fragment>
//   );
// };

const CarCard = (props) => {
  //props
  const { checkAdmin, car, carId, variant } = props;

  //context
  const { deleteCar } = useCarContext();

  //States
  const [clicked, setClicked] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [actionType, setActionType] = useState("");
  const [openList, setOpenList] = useState(false);

  const [openCalendarDialog, setOpenCalendarDialog] = useState(false);

  // On Card Click Handler
  const clickHandler = (event) => {
    event.preventDefault();
    if (!car.rented || checkAdmin) {
      setClicked(true);
    }
  };

  //Dialog Cancel Handler
  const dialogOnCancelHandler = () => {
    setClicked(false);
    setOpenConfirmation(false);
    setOpenCalendarDialog(false);
  };

  //Action for confirmation for Closing the message
  const confirmOnCloseHandler = () => {
    setOpenConfirmation(false);
  };

  //Adding disabled Style when the car is rented
  const disabledStyle = () => {
    return {
      maxWidth: 200,
      backgroundColor: "gray",
      cursor: "not-allowed",
    };
  };

  // Confirmation Delete Action
  const deleteAction = (event) => {
    event.preventDefault();
    deleteCar(carId).then(() => {
      props.reFetchCars();
      props.updateCarsInfo();
    });
    setClicked(false);
    setOpenConfirmation(false);
  };

  // Function that will cancel the Rent for the user on a Rented Car
  const cancelRentHandler = () => {
    axios
      .patch(
        `https://car-rental-ac864-default-rtdb.firebaseio.com/cars/${carId}.json`,
        {
          rented: false,
        }
      )
      .then(() => {
        props.reFetchCars();
        props.updateCarsInfo();
      });
  };

  const moreOnClickHandler = () => {
    setOpenList(!openList);
  };

  const deleteClickHandler = () => {
    setOpenConfirmation(true);
    setActionType("delete");
  };

  const rentClickHandler = () => {
    setOpenCalendarDialog(true);
    setActionType("rent");
  };

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  // logic for the AddCard to render if the user is the admin
  if (variant === "addCard") {
    return (
      <Fragment>
        <GenericCard
          onClick={clickHandler}
          cardMedia="https://i.ibb.co/D5RR4N8/54657-200.png"
          typoGraphy={[
            { content: "Add new Car", textStyle: "h5", color: "black" },
          ]}
        />
        {clicked && (
          <Dialogs
            open={true}
            onClose={dialogOnCancelHandler}
            variant={"add"}
            reFetchCars={props.reFetchCars}
            updateCarsInfo={props.updateCarsInfo}
          />
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <GenericCard
        // onClick={clickHandler}
        cardMedia={car.photoUrl}
        typoGraphy={
          car && [
            { content: car.carName, textStyle: "h5", color: "black" },
            {
              content: `${car.price}/day`,
              textStyle: "body2",
              color: "text.secondary",
            },
          ]
        }
        style={car.rented ? disabledStyle() : {}}
      >
        <Button
          variant="text"
          style={{
            color: "black",
            width: "100%",
          }}
          onClick={moreOnClickHandler}
        >
          <MoreHorizIcon />
        </Button>
        {openList && (
          <Box>
            <List>
              <ListItemButton
                onClick={() => {
                  routeChange(`view/${carId}`);
                }}
              >
                View
              </ListItemButton>
              {!(checkAdmin || car.rented) && (
                <ListItemButton onClick={rentClickHandler}>Rent</ListItemButton>
              )}
              {checkAdmin && (
                <Fragment>
                  <ListItemButton onClick={clickHandler}>Edit</ListItemButton>
                  <ListItemButton onClick={deleteClickHandler}>
                    Delete
                  </ListItemButton>
                  {car.rented && (
                    <ListItemButton onClick={cancelRentHandler}>
                      Cancel Rent
                    </ListItemButton>
                  )}
                </Fragment>
              )}
            </List>
            {openConfirmation && (
              <Confirmation
                open={true}
                onClose={confirmOnCloseHandler}
                action={actionType === "delete" && deleteAction}
              />
            )}
            {openCalendarDialog && (
              <CalendarDialog
                open={true}
                onClose={dialogOnCancelHandler}
                car={car}
                carId={carId}
                reFetchCars={props.reFetchCars}
                updateCarsInfo={props.updateCarsInfo}
              />
            )}
          </Box>
        )}
      </GenericCard>
      {clicked && (
        <Dialogs
          open={true}
          onClose={dialogOnCancelHandler}
          variant={"edit"}
          car={car}
          carId={carId}
          reFetchCars={props.reFetchCars}
          updateCarsInfo={props.updateCarsInfo}
        />
      )}
    </Fragment>
  );
};

CarCard.propTypes = {
  cardMedia: PropTypes.string,
  typoGraphy: PropTypes.array,
  checkAdmin: PropTypes.bool,
  car: PropTypes.object,
  carId: PropTypes.string,
  variant: PropTypes.string,
  reFetchCars: PropTypes.func,
  updateCarsInfo: PropTypes.func,
};

CarCard.defaultProps = {
  cardMedia: "",
  typoGraphy: [],
  checkAdmin: false,
  car: {},
  variant: "normal",
};

export default CarCard;
