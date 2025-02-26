import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdEmojiEvents } from "react-icons/md";
import { FaBlog } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";

const SideNavbar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-black text-white w-64 shadow-lg fixed left-0 top-0 h-full">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard-Panel</h2>
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link to="dashpanel/overview" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
              <BsGraphUpArrow />
                Overview
              </Link>
            </li>
            <li>
              <Link to="dashpanel/admin" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
                <MdOutlineAdminPanelSettings/>
                Admin
              </Link>
            </li>
            <li>
              <Link to="dashpanel/blog" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
              <FaBlog />
                Blog
              </Link>
            </li>
            <li>
              <Link to="dashpanel/events&dates" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
              <MdEmojiEvents />
                Events & Dates
              </Link>
            </li>
            <li>
              <Link to="dashpanel/images" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
              <IoMdImages />
                Images
              </Link>
            </li>
            <li>
              <Link to="dashpanel/videos" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
              <LiaPhotoVideoSolid />
                Videos
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex flex-row gap-5 py-2 px-4 hover:bg-gray-700 rounded transition duration-200">
              <IoSettingsOutline />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default SideNavbar;