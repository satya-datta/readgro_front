"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import validateAdminToken from "@/libs/ValidateAdminToken"; // Ensure this reads from cookies

const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    const isAdminRoute = currentPath.startsWith('/admin/Gnaneswar');

    // If not on an admin route, don't interfere with user context
    if (!isAdminRoute) return;

    // Allow login page without validation
    if (currentPath === "/admin/Gnaneswar/login") return;

    // Clear any user context when in admin section
    if (window.localStorage.getItem('userToken')) {
      window.localStorage.removeItem('userToken');
      // Clear any user-related cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
    }

    // Validate admin token
    validateAdminToken()
      .then(({ isValid, admin }) => {
        if (isValid) {
          setAdmin(admin);
          setIsAdminAuthenticated(true);

          if (currentPath === "/admin/Gnaneswar" || currentPath === "/admin/Gnaneswar/") {
            router.push("/admin/Gnaneswar/dashboard");
          }
        } else {
          setAdmin(null);
          setIsAdminAuthenticated(false);
          if (isAdminRoute) {
            router.push("/admin/Gnaneswar/login");
          }
        }
      })
      .catch((error) => {
        console.error('Admin auth error:', error);
        setAdmin(null);
        setIsAdminAuthenticated(false);
        if (isAdminRoute) {
          router.push("/admin/Gnaneswar/login");
        }
      });
  }, [router]);

  return (
    <AdminContext.Provider
      value={{ admin, isAdminAuthenticated, setAdmin, setIsAdminAuthenticated }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
