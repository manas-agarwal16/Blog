import React from "react";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import authServices from "../../appwrite/auth";
const LogoutBtn = () => {
  const dispatch = useDispatch();

  function logoutHandler() {
    authServices.logout().then(() => dispatch(logout()));

    // authServices contain async op. so return promises. 

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
