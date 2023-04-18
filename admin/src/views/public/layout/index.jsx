import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { SidebarContextProvider } from "../../../context/sidebarContext";

const PublicLayout = () => {
  return (
    <SidebarContextProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1">
          {/* Navbar */}
          <Navbar />
          {/* Main content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarContextProvider>
  );
};

export default PublicLayout;
