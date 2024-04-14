import React from "react";
import AuthUser from "../AuthUser";
import { Link } from "react-router-dom";

function Header() {
  const { token, logout } = AuthUser();
  const handleLogout = () => {
    if (token != undefined) {
      logout();
      navigate("/login");
    }
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid ">
        <ul className="navbar-nav ms-auto mx-4">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li className="nav-item mx-4">
                <Link
                  className="nav-link btn-home-section"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
