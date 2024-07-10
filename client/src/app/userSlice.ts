import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    uid: null,
    email: null,
    displayName: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.user.displayName = action.payload.displayName;
    },
    clearUser: (state) => {
      state.user.uid = null;
      state.user.email = null;
      state.user.displayName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
