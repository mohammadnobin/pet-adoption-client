// Signin Page Component
// ---------------------
// This component handles the user login functionality.
// It includes:
// - Email & password login using react-hook-form
// - Validation for password strength
// - Login with social accounts
// - Loading spinner while signing in
// - Redirecting after successful login
// - SweetAlert2 notifications for success and error
// - Lottie animation for visual enhancement

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth"; // Custom Auth hook for signIn and loading state
import Swal from "sweetalert2"; // For showing alerts
import { TbFidgetSpinner } from "react-icons/tb"; // Loading spinner icon
import axios from "axios"; // For posting user info to DB
import Social from "../../components/Shared/Social/Social"; // Social login component
import Lottie from "lottie-react"; // Animation library
import loadingAnimation from "../../components/alljson/logninpage.json"; // Lottie JSON animation
import { FaPaw } from "react-icons/fa"; // Logo icon

const Signinpage = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Redirect path after login

  // React Hook Form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      // Sign in the user
      await signIn(email, password);

      // Prepare user info for database
      const userInfo = {
        email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Save user info to database
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);

      // Success alert
      Swal.fire({
        title: "Good job!",
        text: "SignUp Successful",
        icon: "success",
      });

      // Redirect to the previous page or home
      navigate(from);
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 dark:bg-black px-4 py-8 gap-10 relative">
      {/* Logo */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 dark:text-white text-secondary font-bold text-4xl"
      >
        <FaPaw />
        <span>PetAdopt</span>
      </Link>

      {/* Login Form Container */}
      <div className="w-full max-w-md backdrop-blur custom_gradientd custom_gradientl border-2 dark:border-white border-secondary/15 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-white mb-6">
          Login with your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-black dark:text-white dark:border-white"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])/,
                  message: "Password must contain at least one uppercase letter",
                },
              })}
              className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-black dark:border-white"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
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
            className="w-full cursor-pointer bg-secondary hover:bg-secondary/80 text-white font-semibold py-2 rounded-md transition duration-200 flex justify-center items-center"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin text-2xl" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="text-center text-sm text-gray-600 dark:text-white mt-4">
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

      {/* Animation Section */}
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
