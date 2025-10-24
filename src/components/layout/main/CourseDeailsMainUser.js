import CourseDetailsUser from "@/components/sections/course-details/CourseDetailsUser";

import React from "react";

const CourseDetailsMainUser = ({ id }) => {
  return (
    <div className="p-10px   bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <CourseDetailsUser id={id} />
    </div>
  );
};

export default CourseDetailsMainUser;
