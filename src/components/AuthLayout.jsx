import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ chidhren, authentication }) => {
  const authStatus = useSelector((state) => state.auth.loginStatus);
  // console.log("authStatus : ", authStatus);
  // console.log("authentication : ", authentication);
  // console.log("children : ", chidhren);

  return chidhren;

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication == authStatus && authStatus == false) {
      navigate("/login");
    }
    if (authentication == authStatus && authentication == true) {
      navigate("/");
    } else if (authentication == true && authStatus == false) {
      navigate("/login");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  //kabhi bhi authStatus me navigate (route change ho) or authentication jo calling function bhejega voh change ho. authentication ka abhi routes banayenge tph smjh aayega

  return loader ? (
    <h1 className="text-gray-500">Loading...</h1>
  ) : (
    <>{chidhren}</>
  );
};

export default Protected;
