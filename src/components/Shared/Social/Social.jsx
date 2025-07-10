import React from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

const Social = () => {
  const { socialLoging, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSocialLogin = () => {
    socialLoging()
      .then(async (res) => {
        navigate(from);
        const user = res.user;
        const userInfo = {
          email: user.email,
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
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.message,
        });
      });
  };

  return (
    <div>
      <h2 className="text-xl text-center font-medium py-3">Or</h2>
      <button
        onClick={handleSocialLogin}
        className="flex items-center justify-center gap-3 w-full bg-lime-600 border border-gray-300 shadow-sm rounded-lg py-3 px-4 text-white cursor-pointer font-semibold hover:shadow-md transition duration-300"
      >
        {loading ? (
          <TbFidgetSpinner className="animate-spin m-auto" />
        ) : (
          <>
            <FaGoogle className="text-yellow-500" />
            <span>Login with Google</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Social;
