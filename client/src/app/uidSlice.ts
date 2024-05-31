import { createSlice } from "@reduxjs/toolkit";

export const uidSlice = createSlice({
  name: "uid",
  initialState: {
    value: -1,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = -1;
    },
  },
});

export const { login, logout } = uidSlice.actions;
export default uidSlice.reducer;
