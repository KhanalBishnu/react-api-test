import React from "react";
import Sidebar from "./../layout/sidebar";

function Dashboard() {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 p-0">
        <Sidebar />
      </div>
      <div className="col-md-10"></div>
    </div>
    </div>
  );
}

export default Dashboard;
