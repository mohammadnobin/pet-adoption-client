// Main Layout Component
// ---------------------
// This component serves as the primary layout for your application.
// It includes a Navbar at the top, a Footer at the bottom,
// and dynamically renders the active route content in between using <Outlet>.
// It also handles scroll restoration and loading states.

import React from "react";
import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar"; // Top navigation bar
import Footer from "../components/Shared/Footer/Footer"; // Footer section
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner"; // Loading spinner

const MainLayouts = () => {
  // Track the current navigation state (idle, loading, submitting)
  const { state } = useNavigation();

  return (
    <div>
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content area with top padding to avoid overlap with Navbar */}
      <div className="pt-36 bg-white dark:bg-black">
        {/* Restores scroll position when navigating between pages */}
        <ScrollRestoration />

        {/* If the page is loading, show spinner; otherwise render nested route */}
        {state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayouts;
