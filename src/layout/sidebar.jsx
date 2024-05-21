import React, { useState } from "react";
import { Link } from "react-router-dom";
import PermissionConstant from "../components/Constant/PermissionConstant";
function Sidebar() {
  const hasPermissionToCreateProduct=PermissionConstant('Create|Product');
  const hasPermissionToViewProduct=PermissionConstant('View|Product');  
  const hasViewRolePermission = PermissionConstant('View|Role And Permission');
  const hasViewUserManageMent = PermissionConstant('View|User Management');
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    hasPermissionToViewProduct &&{ to: "/dashboard/products", label: "View Product" },
    hasPermissionToCreateProduct &&{ to: "/dashboard/products/add-product", label: "Add Product" },
    hasViewRolePermission && { to: "/dashboard/role-and-permission", label: "Role And Permission" },
    hasViewUserManageMent && { to: "/dashboard/user-management", label: "User Management" },
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
