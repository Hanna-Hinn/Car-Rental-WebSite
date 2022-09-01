import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import GenericDialog from "../../../../common/genericDialog";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useCarContext } from "../../../../store/car-Context";
import Confirmation from "../../../../common/confirmations";
import Box from "@mui/material/Box";

const Dialogs = (props) => {
  //context
  const { addCar, editCar } = useCarContext();

  const { car, carId, variant, open, onClose } = props;

  const defaultValues = {
    carName: car ? car.carName : "",
    carDetails: car ? car.carDetails : "",
    photoUrl: car ? car.photoUrl : "https://i.ibb.co/p4mGdp6/default-cars.jpg",
    price: car ? car.price : 100,
    rented: car ? car.rented : false,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [editable] = useState(variant === "rent" ? false : true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const DialogContent = () => {
    return (
      <Fragment>
        <TextField
          label="Car Name:"
          name="carName"
          required
          variant="outlined"
          InputProps={{
            readOnly: !editable,
          }}
          defaultValue={formValues.carName}
          onChange={handleInputChange}
          sx={{
            margin: "10px 0 10px 0",
            flexBasis: "100%",
          }}
        />

        <Box
          sx={{
            width: 300,
            height: 300,
            margin: 1,
          }}
        >
          <img
            src={formValues.photoUrl}
            alt={formValues.carName}
            width={"300px"}
            height={"300px"}
          />
        </Box>

        <TextField
          label="Photo Url:"
          name="photoUrl"
          variant="outlined"
          defaultValue={formValues.photoUrl}
          required
          InputProps={{
            readOnly: !editable,
          }}
          onChange={handleInputChange}
          sx={{
            flexBasis: "100%",
          }}
        />

        <TextField
          id="text-field-CarName"
          name="carDetails"
          required
          defaultValue={formValues.carDetails}
          sx={{
            width: 300,
            flexBasis: "100%",
            margin: 1,
          }}
          InputProps={{
            readOnly: !editable,
          }}
          multiline
          rows={6}
          onChange={handleInputChange}
        />
        <TextField
          label="Price:"
          name="price"
          type="number"
          required
          defaultValue={formValues.price}
          InputProps={{
            readOnly: !editable,
            inputProps: { min: 0 },
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 150,
            margin: 1,
          }}
          onChange={handleInputChange}
        />
      </Fragment>
    );
  };

  // Dialog confirm Action --> It will open the Confirmation message
  const dialogConfirmAction = (event) => {
    event.preventDefault();
    setOpenConfirmation(true);
  };

  // Confirmation Add Action
  const addCarAction = (event) => {
    event.preventDefault();
    addCar(formValues).then(() => {
      props.reFetchCars();
      props.updateCarsInfo();
      setOpenConfirmation(false);
      onClose();
    });
  };

  // Confirmation edit Action
  const editCarAction = (event) => {
    event.preventDefault();
    const car = { ...formValues };
    editCar(carId, car).then(() => {
      props.reFetchCars();
      props.updateCarsInfo();
    });
    setOpenConfirmation(false);
    onClose();
  };

  const ConfirmationCloseHandler = () => {
    setOpenConfirmation(false);
  };

  const dialogConfirmContent = () => {
    return variant === "add" ? "Add Car" : variant === "edit" ? "Save" : "Rent";
  };

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      dialogTitleText={"Add New Car"}
      dialogContent={DialogContent()}
      dialogConfirmAction={dialogConfirmAction}
      dialogConfirmContent={dialogConfirmContent()}
    >
      {openConfirmation && (
        <Confirmation
          open={true}
          onClose={ConfirmationCloseHandler}
          action={variant === "add" ? addCarAction : editCarAction}
        />
      )}
    </GenericDialog>
  );
};

Dialogs.propTypes = {
  open: PropTypes.bool,
  car: PropTypes.object,
  carId: PropTypes.string,
  variant: PropTypes.string,
  onClose: PropTypes.func,
  reFetchCars: PropTypes.func,
  updateCarsInfo: PropTypes.func,
};

export default Dialogs;
