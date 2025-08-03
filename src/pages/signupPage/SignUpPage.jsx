// SignUpPage Component
// --------------------
// Features:
// 1. Allows users to create an account with name, email, password, and profile image
// 2. Validates input fields using React Hook Form
// 3. Uploads profile image before registration
// 4. Stores user data in the database via Axios
// 5. Provides feedback with SweetAlert
// 6. Supports social login and Lottie animation

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import Social from "../../components/Shared/Social/Social";
import Lottie from "lottie-react";
import signupanimations from "../../components/alljson/signinup.json";
import { FaPaw } from "react-icons/fa";

const SignUpPage = () => {
  const { createUser, updateUserProfile, loading } = useAuth();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageSubmit, setImageSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Handle Form Submit
  const onSubmit = async (data) => {
    setImageSubmit(true);

    if (!uploadedImage) return; // Require image upload first
    const { name, email, password } = data;
    const photo = uploadedImage;

    try {
      // Create user with email and password
      await createUser(email, password);

      // Update Firebase user profile with name and photo
      await updateUserProfile(name, photo);

      // Prepare user info for DB
      const userInfo = {
        email,
        photo,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Save user to backend
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);

      // Success alert
      Swal.fire({
        title: "Good job!",
        text: "SignUp Successful",
        icon: "success",
      });

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

  // Handle image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const res = await imageUpload(image);
    setUploadedImage(res);
  };

  return (
    <div className="min-h-screen px-4 py-6 relative bg-white text-black dark:bg-black dark:text-white">
      {/* Logo */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 dark:text-white text-secondary font-bold text-4xl"
      >
        <FaPaw />
        <span>PetAdopt</span>
      </Link>

      <div className="flex flex-col lg:flex-row items-center justify-center min-h-full gap-10 mt-16">
        {/* Form Section */}
        <div className="w-full max-w-md custom_gradientd custom_gradientl border-2 dark:border-white border-secondary/15 shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
            Register with Profile
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-black dark:border-white"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">Name is required</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-2">Profile Image</label>
              <div className="border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
                <label className="cursor-pointer bg-secondary text-white px-4 py-2 rounded hover:bg-white hover:text-secondary dark:hover:bg-black border-2 hover:border-secondary">
                  Upload
                  <input
                    onChange={handleImageUpload}
                    className="hidden"
                    type="file"
                    accept="image/*"
                  />
                </label>
                {uploadedImage && (
                  <img
                    className="w-[100px] h-[100px] object-cover rounded"
                    src={uploadedImage}
                    alt="profile"
                  />
                )}
              </div>
              {imageSubmit && !uploadedImage && (
                <p className="text-red-500 text-sm mt-1">Image is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-black dark:border-white"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
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
              {errors.password?.type === "required" && (
                <p className="text-sm text-red-500 mt-1">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-sm text-red-500 mt-1">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-sm text-red-500 mt-1">
                  Password must contain at least one uppercase letter
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary cursor-pointer hover:bg-secondary/80 text-white font-semibold py-2 rounded-md transition duration-200 flex justify-center items-center"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin text-2xl" />
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              state={{ from }}
              to="/signin"
              className="text-secondary font-medium hover:underline"
            >
              Sign In
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
            animationData={signupanimations}
            loop={true}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
