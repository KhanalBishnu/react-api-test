import React from 'react'
import AuthUser from '../../AuthUser'

 export default function PermissionConstant() {
    const {modulePermission}=AuthUser();
    const hasViewRolePermission = modulePermission && modulePermission.includes('View|Role And Permission')?true:false ;

    return {
        hasViewRolePermission
    }
  
}
