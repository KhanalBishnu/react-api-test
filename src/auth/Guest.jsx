import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Signup from "./Signup";
import Login from "./Login";

function Guest() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid ">
          <ul className="navbar-nav ms-auto mx-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item mx-4">
              <Link className="nav-link btn-home-section" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link btn-home-section" to="/sign-up">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
     
    </>
  );
}

export default Guest;
