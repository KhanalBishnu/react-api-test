import { createSlice } from '@reduxjs/toolkit';

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    list: [], // Ensure initial state is an array
  },
  reducers: {
    setPermissions(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
