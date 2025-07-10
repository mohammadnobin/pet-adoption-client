import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const MainLayouts = () => {
  return (
    <div>
      <Navbar />
      <div className=" mt-36">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
