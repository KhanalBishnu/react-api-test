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
import PermissionProvider, { usePermissions } from "./context/PermissionProvider";

function AppRoutes() {
  const { hasViewRolePermission } = usePermissions();
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
        {hasViewRolePermission && (
          <Route path="role-and-permission" element={<RoleAndPermisionLIst />} />
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
      <PermissionProvider>
        <AppRoutes />
      </PermissionProvider>
  );
}

export default App;
