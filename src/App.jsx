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
import PermissionConstant from "./components/Constant/PermissionConstant";


function App() {
  const {hasViewRolePermission}=PermissionConstant();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard/" element={<ProtectedRoute Component={Dashboard} />} >
          <Route path="products">
          <Route path="add-product" element={<AddProduct />} />
            <Route index element={<ProductList />} />
          </Route>
          <Route path="products" element={<ProductList />} />
          {
            hasViewRolePermission &&
            <Route  path="role-and-permission" element={ <RoleAndPermisionLIst />} />
          }
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
