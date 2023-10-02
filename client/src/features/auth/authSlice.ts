import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken(state, action) {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut(state) {
      state.token = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: { token: string } }) =>
  state.auth.token;
