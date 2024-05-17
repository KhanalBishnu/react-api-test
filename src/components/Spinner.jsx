import React from "react";
import AuthUser from "../AuthUser";

function Spinner({content}) {
  return (
    <center>
    <div className="overlay">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Submitting...</span>
      </div>
      <div className="message mt-5">{content ?content:'Submitting'}...</div>
    </div>
  </center>
  );
}

export default Spinner;
