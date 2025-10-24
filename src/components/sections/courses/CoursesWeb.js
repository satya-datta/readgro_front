"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Star, Clock, Users } from "lucide-react";

const CoursesWeb = () => {
  const [courses, setCourses] = useState([]);
  const [topicsCount, setTopicsCount] = useState({});
  const [studentsMap, setStudentsMap] = useState({});
  const router = useRouter();

  const studentPool = [
    50, 55, 60, 65, 70, 72, 75, 78, 80, 85, 88, 90, 93, 97, 100,
  ];

  // Shuffle array utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    fetch("https://readgro-backend-new.onrender.com/getallcourses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.courses)) {
          setCourses(data.courses);
          const shuffledStudents = shuffleArray(studentPool);
          const studentData = {};
          data.courses.forEach((course, index) => {
            fetchTopicsCount(course.course_id);
            studentData[course.course_id] =
              shuffledStudents[index % shuffledStudents.length];
          });
          setStudentsMap(studentData);
        } else {
          console.error("Courses data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const fetchTopicsCount = (courseId) => {
    fetch(`https://readgro-backend-new.onrender.com/gettopics/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.topics)) {
          setTopicsCount((prevCounts) => ({
            ...prevCounts,
            [courseId]: data.topics.length,
          }));
        } else {
          console.error(
            `Topics data for course ${courseId} is not an array`,
            data
          );
        }
      })
      .catch((error) =>
        console.error(`Error fetching topics for course ${courseId}:`, error)
      );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Our Courses
      </h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const lessons = topicsCount[course.course_id] || 0;
            const duration = (lessons * 0.5).toFixed(1); // in hours
            const students = studentsMap[course.course_id] || 50;

            return (
              <div
                key={course.course_id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => router.push(`courses/${course.course_id}`)}
              >
                {/* Course Image with Badge */}
                <div className="relative">
                  {course.course_image && (
                    <img
                      src={course.course_image}
                      alt={course.course_name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.category || "New"}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {course.course_name}
                    </h3>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">4.8</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description ||
                      "Comprehensive course covering all aspects of the subject."}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                      {course.instructor?.charAt(0).toUpperCase() || "I"}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {course.instructor || "Instructor"}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
                    <div className="flex flex-col items-center">
                      <BookOpen className="w-5 h-5 text-blue-500 mb-1" />
                      <span className="text-xs text-gray-600">
                        {lessons} Lessons
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock className="w-5 h-5 text-purple-500 mb-1" />
                      <span className="text-xs text-gray-600">
                        {duration} Hours
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="w-5 h-5 text-green-500 mb-1" />
                      <span className="text-xs text-gray-600">
                        {students} Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-12">No Courses Available</p>
      )}
    </div>
  );
};

export default CoursesWeb;
