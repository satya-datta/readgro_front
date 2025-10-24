"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MobileMenuOpen from "@/components/shared/buttons/MobileMenuOpen";
import useIsTrue from "@/hooks/useIsTrue";
import { useUserContext } from "@/contexts/UserContext";

const NavbarRight = () => {
  const isHome4 = useIsTrue("/home-4");
  const isHome4Dark = useIsTrue("/home-4-dark");
  const isHome5 = useIsTrue("/home-5");
  const isHome5Dark = useIsTrue("/home-5-dark");

  const { user } = useUserContext();
  const router = useRouter();

  const handleLoginClick = () => {
    if (!user) {
      router.push("/user/login");
    } else {
      router.push("/user/user-enrolled-courses");
    }
  };
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const loginLabel = user ? toCamelCase(user.name) : "Login";

  return (
    <div className="lg:col-start-10 lg:col-span-3">
      <ul className="relative nav-list flex justify-end items-center gap-4">
        {!isHome4 && !isHome4Dark && !isHome5 && !isHome5Dark && (
          <>
            {/* Desktop Login Button */}
            <li className="hidden lg:block">
              <button
                onClick={handleLoginClick}
                className="text-size-12 2xl:text-size-15 text-whiteColor bg-primaryColor border-primaryColor border hover:text-primaryColor hover:bg-white px-4 py-2 rounded-md dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor"
              >
                {loginLabel} <i className="icofont-user-alt-5"></i>
              </button>
            </li>

            {/* Desktop Get Started Button */}
            <li className="hidden lg:block">
              <Link
                href="/packages"
                className="text-size-12 2xl:text-size-15 text-whiteColor bg-primaryColor border-primaryColor border hover:text-primaryColor hover:bg-white px-4 py-2 rounded-md dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor"
              >
                Get Started
              </Link>
            </li>
          </>
        )}

        {/* Mobile Login Button */}
        <li className="block lg:hidden">
          <button
            onClick={handleLoginClick}
            className="text-size-12 2xl:text-size-15 text-whiteColor bg-primaryColor border-primaryColor border hover:text-primaryColor hover:bg-white px-4 py-2 rounded-md dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor"
          >
            {loginLabel} <i className="icofont-user-alt-5"></i>
          </button>
        </li>

        {/* Mobile Menu Button */}
        <li className="block lg:hidden">
          <MobileMenuOpen />
        </li>
      </ul>
    </div>
  );
};

export default NavbarRight;
