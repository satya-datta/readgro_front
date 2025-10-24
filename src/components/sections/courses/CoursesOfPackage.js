"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FaStar } from "react-icons/fa";

const CoursesOfPackage = ({ id }) => {
  const [courseIds, setCourseIds] = useState([]); // Stores course IDs
  const [courses, setCourses] = useState([]); // Stores course details
  // const [topicsCount, setTopicsCount] = useState({});
  const router = useRouter();

  // Fetch course IDs mapped to the package
  useEffect(() => {
    fetch(`https://readgro-backend-new.onrender.com/getcoursemappings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const ids = data.map((course) => course.course_id);
          setCourseIds(ids);
        } else {
          console.error(`Courses data for package ${id} is not an array`, data);
        }
      })
      .catch((error) =>
        console.error(`Error fetching courses for package ${id}:`, error)
      );
  }, [id]);
  console.log(id);
  // Fetch course details using the stored course IDs
  useEffect(() => {
    if (courseIds.length === 0) return;

    console.log("Course IDs being sent to the API:", courseIds);

    fetch("https://readgro-backend-new.onrender.com/getcoursedetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_ids: courseIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received course details:", data);

        if (data && Array.isArray(data.courses)) {
          // ✅ Extract `courses` array
          setCourses(data.courses);
        } else {
          console.error("Courses details response is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, [courseIds]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎓 Explore Our Courses
      </h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => router.push(`../courses/${course.id}`)}
            >
              {/* Category Label */}
              {/* {course.id && (
                <span className="absolute top-2 left-2 bg-primaryColor text-white px-3 py-1 text-xs rounded">
                  {course.id}
                </span>
              )} */}

              {/* Course Image */}
              {course.image && (
                <img
                  src={`${course.image}`}
                  alt={course.course_name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {/* Course Info */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-600 text-sm">By {course.instructor}</p>

                {/* Star Ratings */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={18}
                      className="text-orange-500"
                      fill="orange"
                    />
                  ))}
                </div>

                {/* Lessons Count */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Courses Available</p>
      )}
    </div>
  );
};

export default CoursesOfPackage;
