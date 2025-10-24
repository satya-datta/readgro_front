
import CoursesWeb from "@/components/sections/courses/CoursesWeb";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CoursesMain = () => {
  return (
    <>
      <HeroPrimary path={"Featured Courses"} title={"Featured Course"} />
      <CoursesWeb card={true} />
    </>
  );
};

export default CoursesMain;
