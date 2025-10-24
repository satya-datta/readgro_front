"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Star, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Testloader from "@/components/shared/others/loader";

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  const [topicsCount, setTopicsCount] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://readgro-backend-new.onrender.com/getallcourses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.courses)) {
          setCourses(data.courses);
          data.courses.forEach((course) => {
            fetchTopicsCount(course.course_id);
          });
        } else {
          console.error("Courses data is not an array", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
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

  // 👇 Show loader while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Testloader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>

      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        className="pb-12"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
              onClick={() => router.push(`courses/${course.course_id}`)}
            >
              {/* Course Image */}
              {course.course_image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${course.course_image}`}
                    alt={course.course_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                    {course.category || "Featured"}
                  </div>
                </div>
              )}

              {/* Course Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.course_name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">4.5</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <BookOpen className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {topicsCount[course.course_id] || 0} Lessons
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description ||
                      "Master this subject with our comprehensive course"}
                  </p>
                </div>

                {/* Instructor & CTA */}
                <div className="mt-auto pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <span className="text-sm font-medium text-gray-700">
                          {course.instructor.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {course.instructor.split(" ")[0]}
                      </span>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseHome;
