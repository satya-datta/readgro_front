import PackageWeb from "@/components/sections/courses/PackageWeb";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CoursesMain = () => {
  return (
    <>
      <HeroPrimary path={"All Packages"} title={"All Packages"} />
      <PackageWeb card={true} />
    </>
  );
};

export default CoursesMain;
