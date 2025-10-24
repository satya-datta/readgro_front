"use client";
import dashboardImage2 from "@/assets/images/dashbord/dashbord__2.jpg";
import NextImage from "next/image";
import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { Menu, X } from "lucide-react";
import SidebarDashboard from "@/components/shared/dashboards/SidebarDashboard";

import Image from "next/image";
import React from "react";
import logo1 from "@/assets/images/logo/RGFULL.png";
const UserHeroNavbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUserContext();
  const [loadedImageUrl, setLoadedImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.userId) return;

      try {
        const response = await fetch(
          `http://localhost:5000/getuser_details/${user.userId}`
        );
        const data = await response.json();
        if (data?.user?.avatar) {
          const img = new window.Image();
          img.src = data.user.avatar;
          img.onload = () => setLoadedImageUrl(data.user.avatar);
          img.onerror = () => setLoadedImageUrl(null);
        } else {
          setLoadedImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoadedImageUrl(null);
      }
    };

    fetchUserDetails();
  }, [user?.userId]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/userlogout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setShowLogoutPopup(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-4 md:px-8 py-3 flex justify-between items-center">
        {/* Left: Hamburger (Mobile) */}
        <button
          className="lg:hidden text-green-600"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <Image
          prioriy="fasle"
          src={logo1}
          alt="logo"
          className="w-40 h-15 pl-6 py-2"
        />
        {/* Right: Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10">
            {loadedImageUrl ? (
              <img
                src={loadedImageUrl}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
              />
            ) : (
              <NextImage
                src={dashboardImage2}
                alt="Default"
                width={40}
                height={40}
                className="rounded-full border-2 border-green-500"
              />
            )}
          </div>
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="px-3 py-1 text-sm bg-green text-white rounded-[6px] hover:bg-green-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-40 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <SidebarDashboard />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Logout Confirmation */}
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

export default UserHeroNavbar;
