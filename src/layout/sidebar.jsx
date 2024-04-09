import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../auth/Login'
import AuthUser from '../AuthUser'
import App from '../App'

function Sidebar() {
    const {token} =AuthUser();
    const navigate=useNavigate();
    if(!token){
        debugger
        navigate('/login')
        return null
    }
  return (
    <div className="d-flex flex-column text-white bg-dark" style={{ minHeight:'93vh',width:"100%"}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-4">Dummy Post</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                <svg className="bi me-2" width="16" height="16"><use xlinkHref='#home'></use></svg>
                Home
                </Link>
            </li>
            <li>
                <Link to="/dashboard" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                Dashboard
                </Link>
            </li>
        </ul>
        <hr />
        <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar