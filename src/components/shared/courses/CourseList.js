import { useState, useEffect } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getallcourses") // Update with your API URL
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.error("Courses data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded-lg shadow-lg">
            {/* Course Image */}
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded"
              />
            )}

            {/* Course Info */}
            <h3 className="text-lg font-semibold mt-3">{course.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{course.description}</p>
            <p className="text-green-600 font-bold text-lg mt-2">
              ${course.price}
            </p>

            {/* Enroll Button */}
            <button className="mt-3 px-4 py-2 bg-primaryColor text-white rounded hover:bg-primaryColor-700">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
