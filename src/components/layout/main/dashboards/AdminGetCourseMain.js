"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link

const AdminGetCourseMain = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://readgro-backend-new.onrender.com/getallcourses"
        ); // API endpoint for fetching courses
        const data = await response.json();
        if (response.ok) {
          setCourses(data.courses); // Update the state with fetched courses
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    alert(`Edit course ID: ${courseId}`);
    // Implement navigation or modal for editing the course
  };

  const handleDelete = async (courseId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `https://readgro-backend-new.onrender.com/delete-course/${courseId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        alert("Course deleted successfully.");
      } else {
        console.error("Failed to delete course:", data.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          Manage Courses
        </h2>
      </div>
      <div>
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead className="text-sm md:text-base text-blackColor dark:text-blackColor-dark bg-lightGrey5 dark:bg-whiteColor-dark leading-1.8 md:leading-1.8">
              <tr>
                <th className="px-5px py-10px md:px-5">Course Title</th>
                <th className="px-5px py-10px md:px-5">Created At</th>
                <th className="px-5px py-10px md:px-5">Instructor</th>
                <th className="px-5px py-10px md:px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="text-size-13 md:text-base text-contentColor dark:text-contentColor-dark font-normal">
              {courses.map((course, index) => (
                <tr key={index} className="leading-1.8 md:leading-1.8">
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {course.course_name}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {course.created_time}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <p className="text-blackColor dark:text-blackColor-dark">
                      {course.instructor}
                    </p>
                  </td>
                  <td className="px-5px py-10px md:px-5 font-normal">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`../admin-course/edit-course/${course.course_id}`}
                        className="hover:text-primary"
                      >
                        <button className="hover:text-primary">
                          {/* Edit Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="15"
                            height="15"
                            viewBox="0 0 48 48"
                          >
                            <path d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z"></path>
                          </svg>
                        </button>
                      </Link>

                      <button
                        className="hover:text-primary"
                        onClick={() => handleDelete(course.course_id)}
                      >
                        {/* Delete Icon */}
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-5">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGetCourseMain;
