import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import GenericDialog from "../../../../common/genericDialog";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useCarContext } from "../../../../store/car-Context";
import { useUserContext } from "../../../../store/user-Context";

const CalendarDialog = (props) => {
  const { open, onClose, car, carId } = props;

  const { editCar } = useCarContext();
  const { email } = useUserContext();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkError, setCheckError] = useState(true);

  const validateDateDefault = {
    checkError: false,
    errorMessage: "",
  };

  const [validateStartDate, setValidateStartDate] =
    useState(validateDateDefault);
  const [validateEndDate, setValidateEndDate] = useState(validateDateDefault);
  const [priceToPay, setPriceToPay] = useState(car.price);

  useEffect(() => {
    const currDate = new Date();

    startDate < currDate
      ? setValidateStartDate({
          checkError: true,
          errorMessage: "Starting Date Can not Be Before Current Date",
        })
      : setValidateStartDate({ checkError: false, errorMessage: "" });

    startDate > endDate
      ? setValidateEndDate({
          checkError: true,
          errorMessage: "Ending Date Can not Be Before Starting Date",
        })
      : setValidateEndDate({ checkError: false, errorMessage: "" });

    if (!(validateStartDate.checkError || validateEndDate.checkError)) {
      const diffInTime = endDate - startDate;
      const numDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      numDays === 0
        ? setPriceToPay(car.price)
        : setPriceToPay(numDays * car.price);

      setCheckError(false);
    } else {
      setPriceToPay(0);
      setCheckError(true);
    }
  }, [
    startDate,
    endDate,
    validateStartDate.checkError,
    validateEndDate.checkError,
    car.price,
  ]);

  const dialogContent = () => {
    return (
      <Fragment>
        <span style={{ color: "rgb(150,0,0)", margin: 1 }}>
          Please Make Sure That You Entered the Right Date and Time Before
          Confirming!!!
        </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Starting Time and Date:"
            value={startDate}
            required
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            sx={{ margin: 1 }}
          />
          <DateTimePicker
            label="Ending Date and Time:"
            value={endDate}
            required
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            sx={{ margin: 1 }}
          />
        </LocalizationProvider>
        <br></br>
        <span className="error">
          {validateStartDate.checkError && validateStartDate.errorMessage}
          <br></br>
          {validateEndDate.checkError && validateEndDate.errorMessage}
        </span>
        <TextField
          label="Car Price"
          InputProps={{
            readOnly: true,
          }}
          value={priceToPay}
          sx={{
            margin: "10px",
          }}
        />
      </Fragment>
    );
  };

  const dialogConfirmAction = (event) => {
    event.preventDefault();
    if (!checkError) {
      rentAction();
    }
  };

  //Confirmation Rent Action
  const rentAction = (event) => {
    console.log(car);
    const carName = car.carName;
    const newCarValue = { ...car, rented: true };
    editCar(carId, newCarValue);
    axios
      .post(
        "https://car-rental-ac864-default-rtdb.firebaseio.com/history.json",
        {
          email,
          carId,
          carName,
          startDate,
          endDate,
          priceToPay,
        }
      )
      .then(() => {
        props.reFetchCars();
        props.updateCarsInfo();
        onClose();
      });
  };

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      dialogTitle={"Select Start and End Date of Renting"}
      dialogContent={dialogContent()}
      dialogConfirmContent={"Rent"}
      dialogConfirmAction={dialogConfirmAction}
    ></GenericDialog>
  );
};

CalendarDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  car: PropTypes.object,
  carId: PropTypes.string,
  reFetchCars: PropTypes.func,
  updateCarsInfo: PropTypes.func,
};

export default CalendarDialog;
