import React from "react";

const Button = ({
  text = "Submit",
  type = "submit",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500${className} ${textColor} ${bgColor}`}
    >
      {text}
    </button>
  );
};

export default Button;
