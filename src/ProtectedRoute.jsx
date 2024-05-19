import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useEffect } from "react";

function ProtectedRoute(props) {
  const { token } = AuthUser();
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  },[]);

  return (
    <>
      <Component />
    </>
  );
}

export default ProtectedRoute;
