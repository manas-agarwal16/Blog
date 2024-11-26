import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../appwrite/auth";

const initialState = {
  loginStatus: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //reducer functions must involve only state updates and no asynchronous operations.
    login: (state, action) => {
      state.loginStatus = true;
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.loginStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
