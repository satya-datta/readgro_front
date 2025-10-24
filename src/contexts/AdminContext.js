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
    const currentPath = window.location.pathname;

    // Allow login page without validation
    if (currentPath === "/admin/Gnaneswar/login") return;

    // Validate token using cookie
    validateAdminToken()
      .then(({ isValid, admin }) => {
        if (isValid) {
          setAdmin(admin);
          setIsAdminAuthenticated(true);

          if (
            currentPath === "/admin/Gnaneswar/login" ||
            currentPath === "/admin/Gnaneswar"
          ) {
            router.push("/admin/Gnaneswar/dashboard");
          }
        } else {
          setAdmin(null);
          setIsAdminAuthenticated(false);

          if (currentPath.startsWith("/admin/Gnaneswar")) {
            router.push("/admin/Gnaneswar/login");
          }
        }
      })
      .catch(() => {
        setAdmin(null);
        setIsAdminAuthenticated(false);
        router.push("/admin/Gnaneswar/login");
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
