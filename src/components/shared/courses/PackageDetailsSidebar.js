
import CourseEnroll from "../course-details/CourseEnroll";

const DetailsSidebar = ({ type, course }) => {
  return (
    <div className="flex flex-col">
      {/* enroll section  */}
      <CourseEnroll type={type} course={course} />

      {/* social area  */}
   

      {/* tags */}
      
    </div>
  );
};

export default DetailsSidebar;
