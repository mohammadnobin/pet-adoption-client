import React from "react";
import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner";

const MainLayouts = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar />
      <div className=" pt-36 bg-white dark:bg-black">
        <ScrollRestoration />
        {state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
