import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { login as authLogin, authService } from "../appwrite/index.js";
import { login } from "../store/slices/authSlice.js";
import { Input } from "./Input.jsx";
import {Link , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();

    const {register , handleSubmit , formState : {errors}} = useForm();

    const login = async (data) =>{
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.currentUser();
                dispatch(login(userData));
                navigate("/");
            }
            else{
                setError("Invalid email and password");
            }
        } catch (error) {
            setError("Invalid email and password");
        }
    }

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
                   onSubmit={handleSubmit(login)}  //handleSubmit automatically passes data of each input field
                  >
                    <div>
                      <Input
                        {...register("email"),{
                            required : true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                              },
                        }} //handleSubmit will pass data with this field
                        label="Email Address: "
                        placeHolder="Enter email..."
                        type="email"
                        className="form-input block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ref={emailRef}
                      ></Input>
                      {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label
                          for="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                      </div>
                      <Input
                        {...register("password",{
                            required : true,
                        })}
                        ref={passRef}
                        type="password"
                        className="form-input block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        name="password"
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          name="remember"
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="bg-gray-50 py-3 text-center rounded-b-lg">
                  <p className="text-sm text-gray-700">
                    Don't have an account?{" "}
                    <Link
                        to="/sign-up"
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
