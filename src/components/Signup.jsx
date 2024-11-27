import React from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../appwrite/auth';
import { Link , useNavigate } from 'react-router-dom';
import { Input } from './Input';
import {Button, Logo} from "./index";
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

const Signup = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit , formState : {errors}} = useForm();

    const signUp = async (data) => {
        console.log("signUp data : " , data);
        try {
           const create = await authService.createAccount(data);
           if(create){
            await authService.login(data)
            dispatch(login(data))
            navigate("/");
           }
        } catch (error) {
            console.log("Error in signing up: " , error);
        }
    }

    return (
    <section className="h-screen">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="text-center mb-6">
            <Logo/>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

          <form onSubmit={handleSubmit(signUp)}>
            {/* Name Field */}
            <div>
              <Input
                {...register("name" , {required : true})}
                ref={nameRef}
                label="Name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className='className="text-sm text-red-500 mt-1'>name is required</p>}
            </div>

            {/* Email Field */}
            <div>
              <Input
                {...register("email" , {
                    required : true,
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                })}
                ref={emailRef}
                label="Enter email"
                placeholder="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
             {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>)}
            </div>

            {/* Password Field */}
            <div>
              <Input
                {...register("password" , {required : true})}
                ref={passwordRef}
                label="password"
                placeholder="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">password is required</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                text="Sign Up"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
    );
}

export default Signup;
