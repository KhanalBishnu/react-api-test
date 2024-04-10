import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AuthUser from "./AuthUser";
import AuthLayout from "./auth/AuthLayout";
import Guest from "./auth/Guest";

function App() {
  const { token } = AuthUser();
  return (
    <>
      {token ? <AuthLayout /> : <Guest />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={Dashboard} />}
        />
      </Routes>
    </>
  );
}

export default App;
