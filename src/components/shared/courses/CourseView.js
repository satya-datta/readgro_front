import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const CourseView = ({ course }) => {
  const router = useRouter();

  return (
    <div
      className="border p-3 rounded-lg shadow-md bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg m-2 max-w-xs"
      onClick={() => router.push(`./user-enrolled-courses/${course.id}`)}
    >
      {course.image && (
        <img
          src={`${course.image}`}
          alt={course.course_name}
          className="w-full h-32 object-cover rounded-md"
        />
      )}

      <div className="mt-3">
        <h3 className="text-lg font-semibold uppercase">{course.name}</h3>
        <p className="text-gray-500 text-xs uppercase">
          By {course.instructor}
        </p>
      </div>

      <button
        className="mt-3 w-full bg-primaryColor text-white font-semibold py-2 rounded-md hover:bg-primaryColor-700 transition duration-300 text-sm"
        onClick={() => router.push(`./user-enrolled-courses/${course.id}`)}
      >
        Learn 📖
      </button>
    </div>
  );
};

export default CourseView;
