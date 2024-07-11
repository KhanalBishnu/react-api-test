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
import { useEffect, useState } from "react";
import PermissionRouteProtector from "./components/Constant/PermissionRouteProtector";
import UserList from "./components/userManagement/UserList";
import { useDispatch } from "react-redux";
import { setPermissions } from "./features/permission/permissionSlice";
import AuthUser from "./AuthUser";
import Spinner from "./components/Spinner";
import ProductDetails from "./components/frontend/ProductDetails";
import PaymentResult from "./components/esewa/PaymentStatus";

function App() {
  const dispatch = useDispatch();
  const { http, token } = AuthUser();
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (token) {
      setLoading(true);
      http.get('permissions').then((res) => {
        let data = res.data;
        dispatch(setPermissions(data.data));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {loading ?
        <Spinner content="Loading..." /> :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<PaymentResult />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/product/details/:id" element={<ProductDetails />} />
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
      }
    </>
  );
}

export default App;
