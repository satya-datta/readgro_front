"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import dashboardImage2 from "@/assets/images/dashbord/dashbord__2.jpg";
import logo1 from "@/assets/images/logo/RGFULL.png";
import SidebarDashboard from "@/components/shared/dashboards/SidebarDashboard"; // Keep if needed

const HeroDashboard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminToken");
      console.log("Logout successful");
      window.location.href = "/admin/Gnaneswar/login";
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setShowLogoutPopup(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-4 md:px-8 py-3 flex justify-between items-center">
        {/* Left: Hamburger Menu */}
        <button
          className="lg:hidden text-green-600"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Image
          src={logo1}
          alt="ReadGro Logo"
          className="w-40 h-auto pl-6 py-2"
          priority
        />

        {/* Right: Admin Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10">
            <Image
              src={dashboardImage2}
              alt="Admin Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-green-500 object-cover"
            />
          </div>
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="px-3 py-1 text-sm bg-green text-white rounded-[6px] hover:bg-green-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar Drawer (optional) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-40 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold">Admin Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <SidebarDashboard /> {/* Replace or remove if not needed */}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-4 text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroDashboard;
