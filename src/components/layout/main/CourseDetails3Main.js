import PackageDetailsPrimary from "@/components/sections/course-details/PackageDetailsPrimary";

import React from "react";

const CourseDetails3Main = ({ id }) => {
  console.log(id);
  return (
    <>
      <PackageDetailsPrimary type={3} id={id} />
    </>
  );
};

export default CourseDetails3Main;
