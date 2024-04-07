import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./auth/Dashboard";
import './App.css'
import AuthUser from "./AuthUser";

function App() {
  const [count, setCount] = useState(0);
  const {token}=AuthUser()

  return (
    <>
     <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

<div className="container-fluid ">
  <ul className="navbar-nav ms-auto mx-4">
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    {token ? (
  <>
    <li className="nav-item mx-4">
      <Link className="nav-link btn-home-section" >Logout</Link>
    </li>
  </>
) : (
  <>
    <li className="nav-item mx-4">
      <Link className="nav-link btn-home-section" to="/login">Login</Link>
    </li>
    <li className="nav-item mx-4">
      <Link className="nav-link btn-home-section" to="/sign-up">Sign Up</Link>
    </li>
  </>
)}
    
  </ul>
</div>

</nav>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/sign-up" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
    </>
  );
}

export default App;
