import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

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
      <div className="max-w-[90%] mx-auto flex justify-between items-center h-5">
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
          {isOpen ? <FaTimes/> : <FaBars/>}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <LogoutButton setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 flex flex-col mt-10 space-y-4 max-w-[80%] mx-auto">
          {isLoggedIn ? (
            <div className="flex justify-center">
              <LogoutButton setIsLoggedIn={setIsOpen} />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-800 font-bold hover:bg-blue-900 p-3 text-lg text-white rounded-lg text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-gray-800 font-bold hover:bg-gray-950 p-3 text-lg text-white rounded-lg text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
