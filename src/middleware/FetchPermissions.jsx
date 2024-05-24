// src/middleware/fetchPermissions.js
import { useDispatch } from 'react-redux';
import AuthUser from '../AuthUser';
import { setPermissions } from '../features/permission/permissionSlice';

export const fetchPermissions = () => async () => {
    const {http} =AuthUser();
    const dispatch = useDispatch();

    try {
    // http.get('permissions').then((res)=>{
    //     let data=res.data;
    //     dispatch(setPermissions(data.data));
    //   });
      const res = await http.get(`/permissions`);
      const data = res.data.data;
        dispatch(setPermissions(data));

  } catch (error) {
    console.error('Failed to fetch permissions:', error);
  }
};
