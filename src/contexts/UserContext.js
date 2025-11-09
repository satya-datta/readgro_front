"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import validateAuthToken from "@/libs/validateAuthToken"; // Import function
import Cookies from "js-cookie"; // Import js-cookie

const userContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    const isUserRoute = currentPath.startsWith('/user');

    // If on an admin route, don't interfere with admin context
    if (currentPath.startsWith('/admin/Gnaneswar')) return;

    // Clear admin context when in user section
    if (window.localStorage.getItem('adminToken')) {
      window.localStorage.removeItem('adminToken');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("referralcode");
    const packageType = urlParams.get("package");
    const courseName = urlParams.get("course");

    if (referralCode) {
      // Store referral code in cookies with 10-minute expiry
      Cookies.set("referralCode", referralCode, { expires: 10 / (24 * 60) });
      
      // Handle package type if provided
      if (packageType) {
        Cookies.set("packageName", packageType, { expires: 10 / (24 * 60) });
        router.push(`/checkout?referralcode=${referralCode}&package=${packageType}`);
      } 
      // Handle course name if provided
      else if (courseName) {
        router.push(`/checkout?referralcode=${referralCode}&course=${encodeURIComponent(courseName)}`);
      }
      // No package or course specified, just go to home with referral code
      else {
        router.push(`/?referralcode=${referralCode}`);
      }
      return; // Don't proceed with auth validation if we're redirecting
    }

    // Only validate auth token if we're on a user route or the root
    if (isUserRoute || currentPath === '/') {
      validateAuthToken()
        .then(({ isValid, user }) => {
          if (isValid) {
            const avatarUrl = user?.avatar ? `${user.avatar}` : null;

            const enrichedUser = {
              ...user,
              avatarUrl,
            };

            setUser(enrichedUser);
            setIsUserAuthenticated(true);

            if (currentPath === "/user/login" || currentPath === "/user") {
              router.push("/user/user-enrolled-courses");
            }
          } else {
            setIsUserAuthenticated(false);
            setUser(null);

            if (isUserRoute && currentPath !== "/user/login") {
              router.push("/user/login");
            }
          }
        })
        .catch((error) => {
          console.error('User auth error:', error);
          setIsUserAuthenticated(false);
          setUser(null);
          if (isUserRoute && currentPath !== "/user/login") {
            router.push("/user/login");
          }
        });
    }
  }, [router]);

  return (
    <userContext.Provider
      value={{ user, isUserAuthenticated, setUser, setIsUserAuthenticated }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};

export default UserContextProvider;
