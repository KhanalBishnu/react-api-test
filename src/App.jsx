import { Route, Routes } from "react-router-dom";
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
import AuthUser from "./AuthUser";
import NotFound from "./components/Constant/NotFound";


function App() {
  const {modulePermission}=AuthUser();
  const hasViewRolePermission = modulePermission && modulePermission.includes('View|Role And Permission') || null ;
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard/*" element={<ProtectedRoute Component={Dashboard} />} >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
          {
            hasViewRolePermission ?
            <Route  path="role-and-permission" element={ <RoleAndPermisionLIst />} />:
            <Route path="*" element={<NotFound />} />
          }
        </Route>
        <Route path="/dashboard/*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
