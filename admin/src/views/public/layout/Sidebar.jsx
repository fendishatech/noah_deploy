import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../../context/sidebarContext";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const { sidebarToggle } = useContext(SidebarContext);
  return (
    <div
      className={`bg-green-900 px-4 py-3 text-white  flex-shrink-0 transition duration-10000 ease  ${
        sidebarToggle ? "w-64" : "w-20"
      }`}
    >
      <div className="flex bg-red-200 items-center justify-between px-4 py-3">
        {/* Add Conditional Component here! */}
        <h1 className={`text-xl font-bold ${sidebarToggle ? "" : "hidden"}`}>
          Noah
        </h1>
        <h1 className={`text-xl font-bold ${sidebarToggle ? "hidden" : ""}`}>
          N
        </h1>
      </div>
      <nav className="px-2 py-2">
        <ul>
          <ListMenu title="Home" icon={<FaHome />} link="/home" />
          <ListMenu title="Customers" icon={<FaHome />} link="/customers" />
          <ListMenu title="Members" icon={<FaHome />} link="/members" />
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
        className="w-full flex items-center py-2  text-2xl text-gray-400 hover:text-white"
      >
        <span className={`mr-2 ${sidebarToggle ? "" : " text-3xl"}`}>
          {icon}
        </span>
        {sidebarToggle && title}
      </Link>
    </li>
  );
};
