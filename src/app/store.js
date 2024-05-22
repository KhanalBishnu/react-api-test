import { configureStore } from '@reduxjs/toolkit';
import permissionsReducer from '../features/permission/permissionSlice'

const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
  },
});

export default store;