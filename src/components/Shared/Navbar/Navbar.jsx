import { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import {  MdDarkMode, MdOutlineWbSunny } from "react-icons/md";
import {
  FaPaw,
  FaBars,
  FaTimes,
  FaHome,
  FaDog,
  FaDonate,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import { DarkModeContext } from "../../../context/DarkandLightContext/DarkModeProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, toggleDarkMode } = use(DarkModeContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => setMenuOpen(false);

const handleLogOut = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to log out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, log me out!",
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
        .then(() => {
          Swal.fire("Logged out!", "You have been logged out successfully.", "success");
        })
        .catch((error) => {
          Swal.fire("Oops!", error.message || "Something went wrong.", "error");
        });
    }
  });
};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-base font-bold px-4 py-3 
                text-black dark:text-white 
                backdrop-blur  custom_gradientd
                border-b-2 border-secondary/15 dark:border-white/15
               custom_gradientl">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-secondary dark:text-white font-bold text-2xl"
          >
            <FaPaw />
            <span>PetAdopt</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 dark:text-white text-gray-700 items-center">
            <NavLink
              to="/"
              className="flex items-center gap-1 hover:text-secondary"
            >
              <FaHome /> Home
            </NavLink>
            <NavLink
              to="/pets"
              className="flex items-center gap-1 hover:text-secondary"
            >
              <FaDog /> Pet Listing
            </NavLink>
            <NavLink
              to="/donations"
              className="flex items-center gap-1 hover:text-secondary"
            >
              <FaDonate /> Donation Campaigns
            </NavLink>
          </div>
          <div className="hidden lg:flex gap-6 text-gray-700 items-center">
            {loading ? (
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown Skeleton btn */}
                <div className="p-4 md:py-1 md:px-2 border-2 border-secondary/50 dark:border-white/50 flex flex-row items-center gap-3 rounded-full">
                  {/* Menu icon skeleton */}
                  <Skeleton circle width={20} height={20} />

                  {/* Avatar skeleton (md screen only) */}
                  <div className="hidden md:block">
                    <Skeleton circle width={30} height={30} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!user && (
                  <>
                    <NavLink
                      to="/signin"
                      className="flex items-center gap-1 px-4 py-2 rounded-4xl bg-secondary text-white hover:bg-white hover:border-secondary border-2 duration-300 hover:text-secondary"
                    >
                      <FaSignInAlt /> Sign In
                    </NavLink>
                  </>
                )}

                {user && (
                  <div className="relative">
                    <div className="flex flex-row items-center gap-3 ">
                      {/* Dropdown btn */}
                      <div
                        onClick={toggleDropdown}
                        className="p-4 md:py-1 md:px-2 border-2 border-secondary/50 dark:border-white/50 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                      >
                        <AiOutlineMenu className="text-secondary dark:text-white" />
                        <div className="hidden md:block">
                          {/* Avatar */}
                          <img
                            className="rounded-full size-10"
                            referrerPolicy="no-referrer"
                            src={user && user.photoURL}
                            alt="profile"
                          />
                        </div>
                      </div>
                    </div>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border-2 border-secondary/50  rounded-lg shadow-lg z-50">
                        <NavLink
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-secondary hover:text-white rounded-lg text-sm text-gray-700"
                        >
                          <FaTachometerAlt /> Dashboard
                        </NavLink>
                        <button
                          onClick={handleLogOut}
                          className="flex cursor-pointer items-center gap-2 w-full text-left px-4 py-2 hover:bg-secondary hover:text-white rounded-lg text-sm text-red-500"
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
                       <button
              className="text-black dark:text-white  cursor-pointer "
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <MdOutlineWbSunny size={30} />
              ) : (
                <MdDarkMode size={30} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-x-2.5">
           <button
              className="text-black dark:text-white  cursor-pointer "
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <MdOutlineWbSunny size={30} />
              ) : (
                <MdDarkMode size={30} />
              )}
            </button>
                  <button className="text-secondary" onClick={toggleMenu}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4 dark:text-white text-gray-700">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 hover:text-secondary"
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/pets"
            onClick={closeMenu}
            className="flex items-center gap-2 hover:text-secondary"
          >
            <FaDog /> Pet Listing
          </NavLink>
          <NavLink
            to="/donations"
            onClick={closeMenu}
            className="flex items-center gap-2 hover:text-secondary"
          >
            <FaDonate /> Donation Campaigns
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/signin"
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-secondary"
              >
                <FaSignInAlt /> Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-secondary"
              >
                <FaUserPlus /> Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-secondary"
              >
                <FaTachometerAlt /> Dashboard
              </NavLink>
              <button
                onClick={() => {
                  closeMenu();
                  handleLogOut();
                }}
                className="flex items-center gap-2 text-left text-red-500 hover:text-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
