"use client";
import useIsTrue from "@/hooks/useIsTrue";
import React from "react";

const HeaderTop = () => {
  const isHome1 = useIsTrue("/");
  const isHome1Dark = useIsTrue("/home-1-dark");
  const isHome4 = useIsTrue("/home-4");
  const isHome4Dark = useIsTrue("/home-4-dark");
  const isHome5 = useIsTrue("/home-5");
  const isHome5Dark = useIsTrue("/home-5-dark");

  return (
    <div className="bg-blackColor2 dark:bg-lightGrey10-dark hidden lg:block">
      <div
        className={`${
          isHome1 ||
          isHome1Dark ||
          isHome4 ||
          isHome4Dark ||
          isHome5 ||
          isHome5Dark
            ? "lg:container 3xl:container2-lg"
            : "container 3xl:container-secondary-lg"
        } 4xl:container mx-auto text-whiteColor text-size-12 xl:text-sm py-1 xl:py-2`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p>
              <i className="icofont-phone text-primaryColor text-size-15 mr-1"></i>
              Call Us: +91 93913 57589
            </p>
          </div>
          <div>
            <p>
              <i className="icofont-email text-primaryColor text-size-15 mr-1"></i>
              Mail Us: readgroofficial@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
