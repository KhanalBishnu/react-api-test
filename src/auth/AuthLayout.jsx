import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Dashboard from './Dashboard'
import AuthUser from '../AuthUser'

function AuthLayout() {
    const {token,logout}=AuthUser();
    const handleLogout=()=>{
        if(token!=undefined){
          logout();
          navigate('/login');

        }
      }
  return (
    <>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid ">
      <ul className="navbar-nav ms-auto mx-4">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item mx-4">
          <Link className="nav-link btn-home-section" onClick={handleLogout} >Logout</Link>
        </li>
      </ul>
    </div>
    </nav>
   
    </>

  )
}

export default AuthLayout