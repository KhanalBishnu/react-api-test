import { useSelector } from 'react-redux';
import { hasPermission } from '../utils/permissionUtils';

const usePermissions = () => {
  const permissions = useSelector((state) => state.permissions.list);
debugger
  const checkPermission = (requiredPermission) => {
    return hasPermission(permissions, requiredPermission);
  };

  // const checkAnyPermission = (requiredPermissions) => {
  //   return hasAnyPermission(permissions, requiredPermissions);
  // };

  return { checkPermission };
  // return { checkPermission, checkAnyPermission };

};

export default usePermissions;
