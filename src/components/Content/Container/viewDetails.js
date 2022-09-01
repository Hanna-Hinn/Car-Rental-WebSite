import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ViewDetails = () => {
  // const { carName, photoUrl, carDetails, price, rented } = props;
  const [car, setCar] = useState({});
  let params = useParams().id;

  useEffect(() => {
    axios
      .get(
        `https://car-rental-ac864-default-rtdb.firebaseio.com/cars/${params}.json`
      )
      .then((res) => {
        setCar(res.data);
      });
  }, [params]);

  console.log(car);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <h1>View Car</h1>
      <TextField
        value={car.carName}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        sx={{
          width: "300px",
          height: "100px",
          margin: "10px",
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
          src={car.photoUrl}
          alt={car.carName}
          width={"300px"}
          height={"300px"}
        />
      </Box>

      <TextField
        value={car.carDetails}
        sx={{
          width: 300,
          flexBasis: "100%",
          margin: 1,
        }}
        InputProps={{
          readOnly: true,
        }}
        multiline
        rows={6}
      />
      <TextField
        value={car.price}
        InputProps={{
          readOnly: true,
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
      />

      <TextField
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        value={car.rented}
        sx={{
          width: 300,
          margin: "10px",
          flexBasis: "100%",
        }}
      />
    </Box>
  );
};

export default ViewDetails;
