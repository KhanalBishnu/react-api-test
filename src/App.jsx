import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./auth/Dashboard";
import './App.css'
import AuthUser from "./AuthUser";
import AuthLayout from "./auth/AuthLayout";
import Guest from "./auth/Guest";

function App() {
  const [count, setCount] = useState(0);
  const {token}=AuthUser()
 

  return (
    <>
    {token!=undefined ?<AuthLayout />:<Guest />}
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
