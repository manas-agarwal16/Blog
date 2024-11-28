import React from "react";

const Button = ({
  text="Submit",
  type = "submit",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg w-full ${className} ${textColor} ${bgColor}`}
    >
      {text}
    </button>
  );
};

export default Button;
