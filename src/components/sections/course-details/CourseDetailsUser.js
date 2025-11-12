"use client";

import { useEffect, useState } from "react";
import CurriculumContent from "@/components/shared/course-details/CurriculumContent";

const CourseDetailsUser = ({ id, type }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://readgro-backend-new.onrender.com/getspecific_course/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCourse(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching course details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (!course)
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-800">
          Course not found
        </h3>
        <p className="text-gray-600 mt-2">
          The requested course could not be loaded.
        </p>
      </div>
    );

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-7xl px-2 sm:px-4 py-4 sm:py-8 space-y-4">
        {/* Course Name Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {course.course.name || "The Complete AI Guide"}
          </h1>
          
          {/* Course Content Section */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Course Content</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <CurriculumContent id={course.course.id} />
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">About This Course</h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {course.course.description ||
              "50+ Generative AI Tools to 10x Business, Productivity, Creativity | ChatGPT, Artificial Intelligence, Prompt Engineering"}
          </p>
        </div>

        {/* Instructor Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Instructor</h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-xl sm:text-2xl text-gray-700 font-medium">
                {course.course.instructor?.charAt(0) || "S"}
              </span>
            </div>
            <div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                {course.course.instructor || "Satya Nanda"}
              </p>
              <p className="text-sm sm:text-base text-gray-600">Course Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsUser;