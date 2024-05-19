import React, { useContext, useEffect, useState } from 'react';
import permissionContext from './permissionContext';

function PermissionProvider({ children }) {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem('modulePermission');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  }, []);

  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  return (
    <permissionContext.Provider value={{ permissions, hasPermission }}>
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

