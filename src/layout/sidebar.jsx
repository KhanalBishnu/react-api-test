import React, { useState } from "react";
import { Link } from "react-router-dom";
import PermissionConstant from "../components/Constant/PermissionConstant";
function Sidebar() {
  const hasViewRolePermission = PermissionConstant('View|Role And Permission');
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/products", label: "View Note" },
    { to: "/dashboard/products/add-product", label: "Add Note" },
    hasViewRolePermission && { to: "/dashboard/role-and-permission", label: "Role And Permission" },
  ].filter(Boolean);
  
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
        {navLinks.map((link) => (
         (<li key={link.to} className="nav-item">
              <Link to={link.to} className={`nav-link text-white ${location.pathname === link.to ? 'active' : ''}`} aria-current="page">
                <svg className="bi me-2" width="16" height="16">
                  <use xlinkHref="#home"></use>
                </svg>
                {link.label}
              </Link>
          </li>)
        ))}
      </ul>
      
      </div>
    </>
  );
}

export default Sidebar;
