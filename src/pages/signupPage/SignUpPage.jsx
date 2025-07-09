import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import Social from "../../components/Shared/Social/Social";
import Lottie from "lottie-react";
import signupanimations from '../../components/alljson/signinup.json'
import { FaPaw } from "react-icons/fa";

const SignUpPage = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const image = data.image[0];
    const photo = await imageUpload(image);
    console.log(photo);
    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      const userInfo = {
        email,
        role: "user",
        create_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);
      navigate(from);
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
      <div className="min-h-screen bg-gray-50 px-4 py-6 relative">

      {/* Logo at top-left */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-lime-600 font-bold text-4xl"
      >
        <FaPaw />
        <span>PetAdopt</span>
      </Link>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-full gap-10 mt-16">
        {/* Form Section */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-lime-600 mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6">Register with Profast</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">Name is required</p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-white file:text-gray-700"
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">Image is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 rounded-md transition duration-200 flex justify-center items-center"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin text-2xl" />
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              state={{ from }}
              to="/signin"
              className="text-lime-600 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>

          {/* Social login */}
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
