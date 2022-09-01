// History Component that will display using the Ag-Grid
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useUserContext } from "../../../../store/user-Context";

import AgGrid from "../../../../common/agGrid";

const History = (props) => {
  //props
  const checkAdmin = props.isAdmin;

  //Context
  const { email } = useUserContext();

  //states
  const [rowData, setRowData] = useState([]);
  const [dataAsObj, setDataAsObj] = useState({});
  const [userHistory, setUserHistory] = useState([]);

  //Fetch the History data
  useEffect(() => {
    axios
      .get("https://car-rental-ac864-default-rtdb.firebaseio.com/history.json")
      .then((res) => {
        setDataAsObj(res.data);
      });
  }, []);

  // checking the user displaying the user Own history Or the whole History data if the user is admin
  useEffect(() => {
    if (!checkAdmin) {
      setUserHistory(
        Object.values(
          Object.values(dataAsObj).filter((history) => {
            return history.email === email;
          })
        )
      );
    }

    checkAdmin && setRowData(Object.values(dataAsObj));
  }, [checkAdmin, dataAsObj, email]);

  const [columnDefs] = useState([
    { field: "email" },
    { field: "carId" },
    { field: "carName" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "priceToPay" },
  ]);

  const rowStyle = {
    textAlign: "start",
  };

  return (
    <AgGrid
      rowStyle={rowStyle}
      rowData={checkAdmin ? rowData : userHistory}
      columnDefs={columnDefs}
  
    ></AgGrid>
  );
};

export default History;
