import { configureStore } from "@reduxjs/toolkit";
import uidSlice from "./uidSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    uid: uidSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
