// container Component

import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import CarCard from "./carCards/carCard";
import History from "./history/History";
import ViewDetails from "./viewDetails";

import classes from "./container.module.css";

const Container = (props) => {
  //props
  const { isAdmin, variant } = props;

  //States
  const [cars, setCars] = useState({});
  const [carId, setCarId] = useState([]);
  const [carsInfo, setCarsInfo] = useState([]);

  const fetchCars = useCallback(() => {
    axios
      .get("https://car-rental-ac864-default-rtdb.firebaseio.com/cars.json")
      .then((res) => {
        setCars(res.data);
      });
    // checkRented();
  }, []);

  //Fetching the Cars Data
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // const checkRented = () => {
  //   axios
  //     .get("https://car-rental-ac864-default-rtdb.firebaseio.com/history.json")
  //     .then((res) => {
  //       const data = Object.values(res.data);
  //       data.map((obj, index) => {
  //         const currDate = new Date();
  //         const formatEndDate = new Date(obj.endDate);
  //         if (currDate > formatEndDate) {
  //           axios.patch(
  //             `https://car-rental-ac864-default-rtdb.firebaseio.com/cars/${obj.carId}.json`,
  //             {
  //               rented: false,
  //             }
  //           );
  //         }
  //       });
  //     });
  // };

  useEffect(() => {
    setCarId(Object.keys(cars));
    setCarsInfo(Object.values(cars));
  }, [cars]);

  // Setting the cars Id and Values
  const setCarsIdInfo = () => {
    setCarId(Object.keys(cars));
    setCarsInfo(Object.values(cars));
  };

  return (
    <Fragment>
      <div
        className={
          variant === "list" ? classes.container__list : classes.container
        }
      >
        {variant === "view" && <ViewDetails />}
        {variant === "list" && (
          <Fragment>
            {isAdmin && (
              <CarCard
                variant="addCard"
                reFetchCars={fetchCars}
                updateCarsInfo={setCarsIdInfo}
              />
            )}
            {carsInfo.map(
              (car, index) =>
                car && (
                  <CarCard
                    key={carId[index]}
                    cardMedia={car.photoUrl}
                    typoGraphy={[
                      { content: car.carName, textStyle: "h5", color: "black" },
                      {
                        content: `${car.price}/day`,
                        textStyle: "body2",
                        color: "text.secondary",
                      },
                    ]}
                    checkAdmin={isAdmin}
                    car={car}
                    carId={carId[index]}
                    reFetchCars={fetchCars}
                    updateCarsInfo={setCarsIdInfo}
                  />
                )
            )}
          </Fragment>
        )}
        {variant === "history" && <History isAdmin={isAdmin} />}
      </div>
    </Fragment>
  );
};

Container.propTypes = {
  variant: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default Container;
