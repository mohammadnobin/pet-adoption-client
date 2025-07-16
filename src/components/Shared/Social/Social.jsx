// import React from "react";
// import { useLocation, useNavigate } from "react-router";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaGoogle } from "react-icons/fa";
// import useAuth from "../../../hooks/useAuth";
// import { TbFidgetSpinner } from "react-icons/tb";

// const Social = () => {
//   const { socialLoging,gitHubSingIn, loading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/";

//   const handleSocialLogin = () => {
//     socialLoging()
//       .then(async (res) => {
//         navigate(from);
//         const user = res.user;
//         const userInfo = {
//           email: user.email,
//           role: "user",
//           photo: user.photoURL ,
//           created_at: new Date().toISOString(),
//           last_log_in: new Date().toISOString(),
//         };
//         await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);

//         Swal.fire({
//           title: "Good job!",
//           text: "SignUp Successfull",
//           icon: "success",
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error?.message,
//         });
//       });
//   };

//   return (
//     <div>
//       <h2 className="text-xl text-center font-medium py-3">Or</h2>
//       <button
//         onClick={handleSocialLogin}
//         className="flex items-center justify-center gap-3 w-full bg-secondary border border-gray-300 shadow-sm rounded-lg py-3 px-4 text-white cursor-pointer font-semibold hover:shadow-md transition duration-300"
//       >
//         {loading ? (
//           <TbFidgetSpinner className="animate-spin m-auto" />
//         ) : (
//           <>
//             <FaGoogle className="text-yellow-500" />
//             <span>Login with Google</span>
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// export default Social;


import React from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../../hooks/useAuth";

const Social = () => {
  const { socialLoging, gitHubSingIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const saveUserToDB = async (user) => {
    const userInfo = {
      email: user.email,
      role: "user",
      photo: user.photoURL,
      created_at: new Date().toISOString(),
      last_log_in: new Date().toISOString(),
    };

    await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo);
  };

  const handleSocialLogin = () => {
    socialLoging()
      .then(async (res) => {
        await saveUserToDB(res.user);
        navigate(from);

        Swal.fire({
          title: "Good job!",
          text: "Google Login Successful",
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

  const handleGitHubLogin = () => {
    gitHubSingIn()
      .then(async (res) => {
        await saveUserToDB(res.user);
        navigate(from);

        Swal.fire({
          title: "Good job!",
          text: "GitHub Login Successful",
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
    // <div>
    //   <h2 className="text-xl text-center font-medium py-3">Or</h2>

    //   {/* Google Login Button */}
    //   <button
    //     onClick={handleSocialLogin}
    //     className="flex items-center justify-center gap-3 w-full bg-secondary border border-gray-300 shadow-sm rounded-lg py-3 px-4 text-white cursor-pointer font-semibold hover:shadow-md transition duration-300 mb-4"
    //   >
    //     {loading ? (
    //       <TbFidgetSpinner className="animate-spin m-auto" />
    //     ) : (
    //       <>
    //         <FaGoogle className="text-yellow-500" />
    //         <span>Login with Google</span>
    //       </>
    //     )}
    //   </button>

    //   {/* GitHub Login Button */}
    //   <button
    //     onClick={handleGitHubLogin}
    //     className="flex items-center justify-center gap-3 w-full bg-gray-800 border border-gray-300 shadow-sm rounded-lg py-3 px-4 text-white cursor-pointer font-semibold hover:shadow-md transition duration-300"
    //   >
    //     {loading ? (
    //       <TbFidgetSpinner className="animate-spin m-auto" />
    //     ) : (
    //       <>
    //         <FaGithub className="text-white" />
    //         <span>Login with GitHub</span>
    //       </>
    //     )}
    //   </button>
    // </div>
    <div>
  <h2 className="text-xl text-center font-medium py-3">Or</h2>

  {/* Social Buttons Row */}
  <div className="flex items-center justify-center gap-6">
    {/* Google Button */}
    <button
      onClick={handleSocialLogin}
      className="w-12 h-12 rounded-full bg-gray-800 cursor-pointer flex items-center justify-center text-white hover:shadow-lg transition duration-300"
    >
      {loading ? (
        <TbFidgetSpinner className="animate-spin text-xl" />
      ) : (
        <FcGoogle size={30}  className=" text-xl" />
      )}
    </button>

    {/* GitHub Button */}
    <button
      onClick={handleGitHubLogin}
      className="w-12 h-12 cursor-pointer rounded-full bg-gray-800 flex items-center justify-center text-white hover:shadow-lg transition duration-300"
    >
      {loading ? (
        <TbFidgetSpinner className="animate-spin text-xl" />
      ) : (
        <FaGithub size={30} className="text-xl" />
      )}
    </button>
  </div>
</div>

  );
};

export default Social;
