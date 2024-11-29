import React from "react";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import { authServices } from "../appwrite/index.js";
import { login as authLogin } from "../store/slices/authSlice.js";
import Input from "./Input.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";

const Login = () => {
  console.log("here");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      const session = await authServices.login(data);
      console.log("session : " , session );
      
      if (session) {
        const userData = await authServices.currentUser();
        dispatch(authLogin({userData : session}));
        navigate("/");
      }
    } catch (error) {
      console.log("error in logging ", error);
    }
  };

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md">
              <div className="text-center my-5">
                <Logo />
              </div>
              <div className="bg-white shadow-lg rounded-lg">
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Login</h1>
                  <form
                    onSubmit={handleSubmit(login)} //handleSubmit automatically passes data of each input field
                  >
                    <div>
                      <Input
                        {...register("email", {
                          required: true,
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address",
                          },
                        })} //handleSubmit will pass data with this field
                        label="Email Address: "
                        placeholder="Enter your email"
                        type="email"
                        className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <p className="error">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        {...register("password", {
                          required: true,
                        })}
                        label="Password"
                        type="password"
                        placeholder="password"
                        className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        name="password"
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="text-center">
                      <Button
                        type="submit"
                        className="btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        text="Login"
                      />
                    </div>
                  </form>
                </div>
                <div className="bg-gray-50 py-3 text-center rounded-b-lg">
                  <p className="text-sm text-gray-700">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:underline"
                    >
                      Create One
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
