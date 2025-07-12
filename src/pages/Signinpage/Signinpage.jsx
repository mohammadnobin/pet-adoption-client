import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import Social from "../../components/Shared/Social/Social";
import Lottie from "lottie-react";
import loadingAnimation from '../../components/alljson/logninpage.json'
import { FaPaw } from "react-icons/fa";

const Signinpage = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
        navigate(from);
      const userInfo = {
        email,
        role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
      };
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);
    
      Swal.fire({
        title: "Good job!",
        text: "SignUp Successfull",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message,
      });
    }
  };

  return (

    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-4 py-8 gap-10 relative">
  {/* Logo */}
  <Link
    to="/"
    className="absolute top-6 left-6 flex items-center gap-2 text-secondary font-bold text-4xl"
  >
    <FaPaw />
    <span>PetAdopt</span>
  </Link>

  {/* Form Container */}
  <div className="w-full max-w-md backdrop-blur bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 shadow-lg rounded-xl p-8">
    <h2 className="text-3xl font-bold text-center text-secondary mb-2">
      Welcome Back
    </h2>
    <p className="text-center text-gray-500 mb-6">Login with Profast</p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">Email is required</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="Enter password"
        />
        {errors.password?.type === "required" && (
          <p className="text-sm text-red-500 mt-1">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-sm text-red-500 mt-1">
            Password must be at least 6 characters
          </p>
        )}
      </div>

      {/* Forgot Password */}
      <p className="text-sm text-right text-secondary hover:underline cursor-pointer">
        Forgot Password?
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-secondary hover:bg-secondary/80  text-white font-semibold py-2 rounded-md transition duration-200 flex justify-center items-center"
      >
        {loading ? (
          <TbFidgetSpinner className="animate-spin text-2xl" />
        ) : (
          "Login"
        )}
      </button>
    </form>

    {/* Register Redirect */}
    <p className="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?{" "}
      <Link
        to="/signup"
        className="text-secondary font-medium hover:underline"
      >
        Register
      </Link>
    </p>

    {/* Social Login */}
    <div className="mt-6">
      <Social />
    </div>
  </div>

  {/* Animation */}
  <div className="hidden lg:block w-full max-w-md">
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      className="w-full h-auto"
    />
  </div>
</div>

  );
};

export default Signinpage;
