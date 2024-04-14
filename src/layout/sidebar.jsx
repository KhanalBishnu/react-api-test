import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <div
        className="d-flex flex-column text-white bg-dark"
        style={{ minHeight: "93vh", width: "100%" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">Dummy Post</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link active" aria-current="page">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              DashBoard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/view-product" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              View Product
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-product" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Add Product
            </Link>
          </li>
        </ul>
      
      </div>
    </>
  );
}

export default Sidebar;
