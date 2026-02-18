import React from "react";
// import "../sass/CalcClearButton.scss";

export const ClearButton = props => (
  <div className="clear-btn" onClick={props.handleClear}>
    {props.children}
  </div>
);
