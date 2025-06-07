import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;

  return (
    <nav className="w-full mt-6 ">
      <div className="max-w-[95%] mx-auto flex justify-between items-center h-10">
        <Link to={isLoggedIn ? "/dashboard" : "/"}>
          <h1 className="text-3xl md:text-4xl font-bold cursor-pointer">
            Team<span className="text-blue-800">Base</span>
          </h1>
        </Link>

        {/* Hamburger Button (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center space-x-8">
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-xl text-blue-800 font-semibold"
                  : "text-xl hover:text-blue-800"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-xl text-blue-800 font-semibold"
                  : "text-xl hover:text-blue-800"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-xl text-blue-800 font-semibold"
                  : "text-xl hover:text-blue-800"
              }
            >
              Contact
            </NavLink>

            {isLoggedIn ? (
              <LogoutButton setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <div className="flex gap-6">
                <Link
                  to="/login"
                  className="bg-blue-800 font-bold hover:bg-blue-900 p-3 md:p-4 text-md md:text-lg text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-800 font-bold hover:bg-gray-950 p-3 md:p-4 text-md md:text-lg text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-200 rounded-lg shadow-lg py-4 px-6 flex flex-col mx-auto text-center mt-5 space-y-4 max-w-[100%]">
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-blue-800 font-semibold"
                  : "text-lg hover:text-blue-800"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-blue-800 font-semibold"
                  : "text-lg hover:text-blue-800"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-blue-800 font-semibold"
                  : "text-lg hover:text-blue-800"
              }
            >
              Contact
            </NavLink>

            {isLoggedIn ? (
              <LogoutButton setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <div className="flex flex-col gap-4 justify-center mx-auto">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-800 font-bold w-24 hover:bg-blue-900 p-3 md:p-4 text-md md:text-lg text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-800 font-bold w-24 hover:bg-gray-950 p-3 md:p-4 text-md md:text-lg text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
