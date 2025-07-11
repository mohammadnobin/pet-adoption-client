import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner";

const MainLayouts = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar />
      <div className=" mt-36">
        {state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
