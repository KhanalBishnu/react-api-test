import React from "react";

function Spinner() {
  return (
    <center>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </center>
  );
}

export default Spinner;
