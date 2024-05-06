import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../AuthUser";
function Sidebar() {
  // const [permissions,setPermissions]=useState([]);
  const {modulePermission}=AuthUser();
  const hasViewRolePermission = modulePermission.includes('View|Role And Permission');


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
            <Link to="/dashboard" className={`nav-link text-white  ${location.pathname==="/dashboard"?'active':""}`} aria-current="page">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              DashBoard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" className={`nav-link text-white ${location.pathname==="/dashboard/products"?'active':""}`}>
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              View Note
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-product" className={`nav-link text-white ${location.pathname==="/dashboard/add-product"?'active':""}`}>
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Add Note
            </Link>
          </li>
          {
            hasViewRolePermission &&
          <li>
            <Link to="/dashboard/role-and-permission" className={`nav-link text-white ${location.pathname==="/dashboard/role-and-permission"?'active':""}`}>
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Role And Permission
            </Link>
          </li>
          }
        </ul>
      
      </div>
    </>
  );
}

export default Sidebar;
