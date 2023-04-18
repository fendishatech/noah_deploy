import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../../context/sidebarContext";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const { sidebarToggle } = useContext(SidebarContext);
  return (
    <div
      className={`bg-gray-800 text-white  flex-shrink-0 ${
        sidebarToggle ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Add Conditional Component here! */}
        <h1 className={`text-xl font-bold ${sidebarToggle ? "" : "hidden"}`}>
          Dashboard
        </h1>
      </div>
      <nav className="px-4 py-2">
        <ul>
          <ListMenu title="Home" icon={<FaHome />} link="/home" />
          <ListMenu title="Home" icon={<FaHome />} link="/home" />
          <ListMenu title="Home" icon={<FaHome />} link="/home" />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

const ListMenu = ({ title, link, icon }) => {
  const { sidebarToggle } = useContext(SidebarContext);
  return (
    <li>
      <Link
        to={link}
        className="flex items-center py-2 px-4 text-gray-400 hover:text-white"
      >
        <span className="mr-2">{icon}</span>
        {sidebarToggle && title}
      </Link>
    </li>
  );
};
