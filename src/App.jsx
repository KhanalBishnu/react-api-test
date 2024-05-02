import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "./product/AddProduct";
import ProductList from "./product/ProductList";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ExpiredLogin from "./auth/ExpiredLogin";


function App() {



  return (
    <>
    <ExpiredLogin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard/*" element={<ProtectedRoute Component={Dashboard} />} >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
