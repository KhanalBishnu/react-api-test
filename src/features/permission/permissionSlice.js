// src/features/permission/permissionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    list: [],
  },
  reducers: {
    setPermissions(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
