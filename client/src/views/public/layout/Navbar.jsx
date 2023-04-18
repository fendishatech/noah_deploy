import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { SidebarContext } from "../../../context/sidebarContext";

const Navbar = () => {
  const [toggleProfile, setToggleProfile] = useState(false);

  const { sidebarToggle, setSidebarToggle } = useContext(SidebarContext);

  const handleSidebarToggle = () => setSidebarToggle(!sidebarToggle);

  const handleMouseEnter = () => {
    setToggleProfile(true);
  };

  const handleMouseLeave = () => {
    setToggleProfile(false);
  };

  return (
    <nav className="bg-gray-200 px-4 py-3 flex items-center justify-between">
      <button
        className="text-gray-800 focus:outline-none"
        onClick={handleSidebarToggle}
      >
        <FaBars />
      </button>
      <div className="flex items-center">
        <button className="text-gray-800 focus:outline-none mr-4">
          <FaBell />
        </button>
        <div className="relative">
          <button
            className="text-gray-800 focus:outline-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://source.unsplash.com/random"
              alt="User avatar"
            />
          </button>
          {/* User Profile menu */}
          {toggleProfile && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`absolute top-8 right-0 w-48 bg-white rounded-lg shadow-lg z-10 ${
                toggleProfile ? "block" : "hidden"
              }`}
            >
              <div className="">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
