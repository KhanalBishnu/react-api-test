
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PermissionConstant from './PermissionConstant';

const PermissionRouteProtector = ({ Component, permission }) => {
  let location = useLocation();
  const isAccessable=PermissionConstant(permission);
  
  if (!isAccessable) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

export default PermissionRouteProtector;