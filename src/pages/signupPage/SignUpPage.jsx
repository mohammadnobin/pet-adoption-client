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
import signupanimations from '../../components/alljson/signinup.json'
import { FaPaw } from "react-icons/fa";

const SignUpPage = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imagesubmite, setImagesubmite] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
      setImagesubmite(true);
      const photo = uploadedImage 
      if (!uploadedImage) return;
    const { name, email, password } = data;
    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      const userInfo = {
        email,
        photo,
        role: "user",
          created_at: new Date().toISOString(),
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

    const handleImageUpload = async (e) => {
      const image = e.target.files[0];
      const res = await imageUpload(image);
      setUploadedImage(res);
    };

  return (
      <div className="min-h-screen  px-4 py-6 relative">

      {/* Logo at top-left */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-secondary font-bold text-4xl"
      >
        <FaPaw />
        <span>PetAdopt</span>
      </Link>

      {/* Main content */}
      <div className="flex flex-col  lg:flex-row items-center justify-center min-h-full gap-10 mt-16">
        {/* Form Section */}
        <div className="w-full max-w-md backdrop-blur bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-2">
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
                className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">Name is required</p>
              )}
            </div>

            {/* Photo */}
            {/* <div>
              <label className="block  text-sm font-medium text-gray-700 mb-1">
                Photo
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full file:py-2 cursor-pointer file:px-4 file:border file:border-secondary/80 file:cursor-pointer  file:rounded-md file:bg-white file:text-gray-700"
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">Image is required</p>
              )}
            </div> */}
                      {/* Image */}
          <div>
            <label className="block font-semibold mb-2">Pet Image</label>
            <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
              <label className="cursor-pointer bg-secondary text-white px-4 py-2 rounded hover:bg-white hover:text-secondary duration-200 border-2 hover:border-secondary">
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
                  alt="pet"
                />
              )}
            </div>
            {imagesubmite && !uploadedImage && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
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
                className="w-full border border-secondary/80 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
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

            {/* Submit */}
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

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              state={{ from }}
              to="/signin"
              className="text-secondary font-medium hover:underline"
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
