import React, { useContext, useEffect, useState } from 'react';
import permissionContext from './permissionContext';
import AuthUser from '../AuthUser';

function PermissionProvider({ children }) {
  const getPermissionStorage=localStorage.getItem('modulePermission') ?JSON.parse(localStorage.getItem('modulePermission') ):[];

  const [permissions, setPermissions] = useState({
    hasViewRolePermission: false,
  });
  useEffect(() => {
    if (getPermissionStorage) {
      setPermissions({
        hasViewRolePermission: getPermissionStorage.includes('View|Role And Permission'),
      });
    }
  }, []);

  return (
    <permissionContext.Provider value={permissions}>
      {children}
    </permissionContext.Provider>
  );
}

export const usePermissions = () => {
  const context = useContext(permissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};

export default PermissionProvider;
