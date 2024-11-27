import React from "react";
import { login, logout } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
const LogoutBtn = () => {
  const dispatch = useDispatch();

  function logoutHandler() {
    authService.logout().then(() => dispatch(logout()));

    // authService contain async op. so return promises. 

  }

  return (
    <input
      onClick={logoutHandler}
      className="m-1 p-2 text-black"
      type="submit"
      value="Logout"
    />
  );
};

export default LogoutBtn;
