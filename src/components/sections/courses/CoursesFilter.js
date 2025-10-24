import HeadingPrimary from "@/components/shared/headings/HeadingPrimary";
import SectionName from "@/components/shared/section-names/SectionName";

import CourseHome from "./CourseHome";
const CoursesFilter = () => {
  return (
    <section>
      <div className={`container  pb-100px`}>
        {/* heading */}

        <div className="mb-5 md:mb-10">
          <div className="relative" data-aos="fade-up">
            <div className="text-center">
              <SectionName>Course-List</SectionName>
            </div>
          </div>
        </div>

        {/* plans */}
        <CourseHome />
      </div>
    </section>
  );
};

export default CoursesFilter;
