import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.user = action.payload.others;
      state.token = action.payload.token;
    },
    loginAction: (state, action) => {
      state.user = action.payload.others;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { registerAction, loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
