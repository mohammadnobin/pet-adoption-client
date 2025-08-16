// user own porfile page
import React from "react";
import useAuth from "../../hooks/useAuth";
import coverImg from "../../assets/profilecover.png";
import useUserRole from "../../hooks/useUserRole";

const MyProfilePage = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  return (
    <div className="flex justify-center items-center h-screen -mt-32 bg-white dark:bg-black">
  <div className="bg-white dark:bg-black shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 border border-gray-200 dark:border-white">
    <img
      alt="cover photo"
      src={coverImg}
      className="w-full mb-4 rounded-t-lg h-56 object-cover"
    />
    <div className="flex flex-col items-center justify-center p-4 -mt-16">
      <a href="#" className="relative block">
        <img
          alt="profile"
          src={user.photoURL}
          className="mx-auto object-cover rounded-full h-40 w-40 border-2 border-white dark:border-white"
        />
      </a>

      <p className="p-2 px-4 text-xs capitalize text-white bg-secondary rounded-full">
        {role}
      </p>
      <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
        User Id: {user.uid}
      </p>
      <div className="w-full p-2 mt-4 rounded-lg">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <p className="flex flex-col">
            Name
            <span className="font-bold text-black dark:text-white">
              {user.displayName}
            </span>
          </p>
          <p className="flex flex-col">
            Email
            <span className="font-bold text-black dark:text-white">
              {user.email}
            </span>
          </p>

          <div className="flex flex-col gap-2">
            <button className="bg-secondary text-white px-10 py-1 rounded-lg cursor-pointer block mb-1 hover:bg-secondary/80 transition">
              Update Profile
            </button>
            <button className="bg-secondary text-white px-7 py-1 rounded-lg cursor-pointer hover:bg-secondary/80 transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default MyProfilePage;
