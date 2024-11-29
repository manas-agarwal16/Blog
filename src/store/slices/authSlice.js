import { createSlice } from "@reduxjs/toolkit";

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
      console.log("in authSlice.js state.userData :  " , state.userData);
    },
    logout: (state, action) => {
      state.loginStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
