import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "./product/AddProduct";
import ProductList from "./product/ProductList";
import RoleAndPermisionLIst from './components/roleAndPermission/RoleAndPermisionLIst';
import NotFound from "./components/Constant/NotFound";
import PermissionConstant from "./components/Constant/PermissionConstant";
import { useEffect, useState } from "react";
import PermissionRouteProtector from "./components/Constant/PermissionRouteProtector";
import UserList from "./components/userManagement/UserList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />}>
        <Route path="products">
          <Route path="add-product" element={<AddProduct />} />
          <Route index element={<ProductList />} />
        </Route>
        <Route path="role-and-permission" element={<PermissionRouteProtector 
          Component={RoleAndPermisionLIst} permission="View|Role And Permission" />}>

        </Route>
        <Route path="user-management" element={<PermissionRouteProtector 
          Component={UserList} permission="View|User Management" />}>

        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
