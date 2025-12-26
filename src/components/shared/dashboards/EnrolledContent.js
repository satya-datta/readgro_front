"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "../courses/CourseCard";
import CourseView from "../courses/CourseView";

const EnrolledContent = ({ course_ids = [] }) => {
  const [courses, setCourses] = useState([]); // Stores course details
  const router = useRouter();

  // Fetch course details using provided course IDs
  useEffect(() => {
    if (!Array.isArray(course_ids) || course_ids.length === 0) return;

    fetch("http://localhost:5000/getcoursedetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_ids }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.error("Courses details response is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, [course_ids]);
  return courses?.map((course) => (
    <CourseView key={course.id} course={course} />
  ));
};

export default EnrolledContent;
