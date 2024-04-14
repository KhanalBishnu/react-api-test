import React from "react";
import Sidebar from "./../layout/sidebar";
import Header from "./Header";
import AddProduct from "../product/AddProduct";
import ProductList from "../product/ProductList";
import {Route, Routes,Outlet } from "react-router-dom";


function Dashboard() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10">
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
