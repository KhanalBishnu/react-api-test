const PermissionConstant = (requiredPermission) => {
    const allRolePermissions = localStorage.getItem('modulePermission')
      ? JSON.parse(localStorage.getItem('modulePermission'))
      : [];
  
    return allRolePermissions.includes(requiredPermission);
  };
  
  export default PermissionConstant;
  