import React, { useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AgGrid = (props) => {
  const { rowData, columnDefs, defaultColDef } = props;
  const gridRef = useRef();

  //   useEffect(() => {
  //     console.log({gridRef})
  //     gridRef?.current?.api?.sizeColumnsToFit({
  //       defaultMinWidth: 100,
  //     });
  //   }, [gridRef?.current]);
const onFit = () => {
    gridRef?.current?.api?.sizeColumnsToFit({
      defaultMinWidth: 100,
      
    });
  }
  return (
    <div
      className="ag-theme-alpine"
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onFit}
        onGridSizeChanged={onFit}
      ></AgGridReact>
    </div>
  );
};

AgGrid.propTypes = {
  rowStyle: PropTypes.object,
  rowData: PropTypes.array,
  columnDefs: PropTypes.array,
  defaultColDef: PropTypes.object,
};

export default AgGrid;
