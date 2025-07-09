import { useState } from 'react';
import { Link } from 'react-router';
import { FaPaw, FaBars, FaTimes, FaChevronDown, FaHome, FaDog, FaDonate, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth';
import Container from '../Container';

const Navbar = () => {
    const {user, logOut} = useAuth()
    console.log(user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => setMenuOpen(false);


  const handleLogOut = ()=>{
    logOut()
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b-2 px-4 py-3">
  <Container>
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-lime-600 font-bold text-2xl">
        <FaPaw />
        <span>PetAdopt</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-gray-700 items-center">
                <Link to="/" className="flex items-center gap-1 hover:text-lime-600">
          <FaHome /> Home
        </Link>
        <Link to="/pets" className="flex items-center gap-1 hover:text-lime-600">
          <FaDog /> Pet Listing
        </Link>
        <Link to="/donations" className="flex items-center gap-1 hover:text-lime-600">
          <FaDonate /> Donation Campaigns
        </Link>
      </div>
      <div className="hidden md:flex gap-6 text-gray-700 items-center">


        {!user && (
          <>
            <Link to="/signin" className="flex items-center gap-1 hover:text-lime-600">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/signup" className="flex items-center gap-1 hover:text-lime-600">
              <FaUserPlus /> Register
            </Link>
          </>
        )}

        {user && (
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <FaChevronDown className="text-gray-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
    </div>
  </Container>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700">
      <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:text-lime-600">
        <FaHome /> Home
      </Link>
      <Link to="/pets" onClick={closeMenu} className="flex items-center gap-2 hover:text-lime-600">
        <FaDog /> Pet Listing
      </Link>
      <Link to="/donations" onClick={closeMenu} className="flex items-center gap-2 hover:text-lime-600">
        <FaDonate /> Donation Campaigns
      </Link>

      {!user && (
        <>
          <Link to="/login" onClick={closeMenu} className="flex items-center gap-2 hover:text-lime-600">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register" onClick={closeMenu} className="flex items-center gap-2 hover:text-lime-600">
            <FaUserPlus /> Register
          </Link>
        </>
      )}

      {user && (
        <>
          <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-2 hover:text-lime-600">
            <FaTachometerAlt /> Dashboard
          </Link>
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
