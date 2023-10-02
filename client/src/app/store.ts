import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authReducer from "@/features/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});


export type RootState = ReturnType<typeof store.getState>

export default store;