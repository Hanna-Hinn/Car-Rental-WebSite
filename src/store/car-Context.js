/**
 *  A Car Context that will do the following:
 *    1.) set the Selected Car when clicking the car Cards
 *    2.) Add Cars
 *    3.) Edit Car Information
 *    4.) Delete Car
 */
import React, { useContext, useState } from "react";
import axios from "axios";

// Creating the Context and initlizing the context values
const CarContext = React.createContext({
  selectedCar: {},
  setSelectedCar: {},
  addCar: () => {},
  editCar: () => {},
  deleteCar: () => {},
});

//Car Context Provider
export const CarContextProvider = (props) => {
  const [selectedCar, setSelectedCar] = useState();

  // Change Selected Car method
  const changeSelectedCar = (newValue) => {
    setSelectedCar(newValue);
  };

  //Add Car
  const addCar = (newCar) => {
    return axios.post(
      "https://car-rental-ac864-default-rtdb.firebaseio.com/cars.json",
      newCar
    );
  };

  // Edit Car
  const editCar = (carId, newCarValues) => {
    return axios.put(
      `https://car-rental-ac864-default-rtdb.firebaseio.com/cars/${carId}.json`,
      { ...newCarValues }
    );
  };

  //Delete Car
  const deleteCar = (carId) => {
    return axios.delete(
      `https://car-rental-ac864-default-rtdb.firebaseio.com/cars/${carId}.json`
    );
  };

  // Saving the Context Values
  const contextValue = {
    selectedCar,
    setSelectedCar: changeSelectedCar,
    addCar,
    editCar,
    deleteCar,
  };

  return (
    <CarContext.Provider value={contextValue}>
      {props.children}
    </CarContext.Provider>
  );
};

// useCarContext Method
export const useCarContext = () => {
  return useContext(CarContext);
};

export default CarContext;
