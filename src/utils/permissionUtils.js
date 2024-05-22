export const hasPermission = (permissions, requiredPermission) => {
    return permissions.includes(requiredPermission);
  };
  
  export const hasAnyPermission = (permissions, requiredPermissions) => {
    return requiredPermissions.some((perm) => permissions.includes(perm));
  };