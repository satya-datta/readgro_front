"use client";
import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const AdmineditCourseMain = ({ course_id }) => {
  // State for course details
  const [course_name, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [course_description, setCourseDescription] = useState("");
  const [course_image, setCourseImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [course_price, setCoursePrice] = useState("");
  const [discount_price, setDiscountPrice] = useState("");
  const [commission, setCommission] = useState("");

  // State for dynamically added topics
  const [topics, setTopics] = useState([]);
  const [newTopics, setNewTopics] = useState([]); // Stores newly added topics
  const [deletedTopics, setDeletedTopics] = useState([]);

  // Fetch course details and topics on mount
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await fetch(
          `https://readgro-backend-new.onrender.com/getspecific_course/${course_id}`
        );
        const courseData = await courseResponse.json();

        const topicsResponse = await fetch(
          `https://readgro-backend-new.onrender.com/gettopics/${course_id}`
        );
        const topicsData = await topicsResponse.json();

        setTopics(Array.isArray(topicsData.topics) ? topicsData.topics : []);
        setCourseName(courseData.course.name || "");
        setInstructor(courseData.course.instructor || "");
        setCourseDescription(courseData.course.description || "");
        setExistingImage(courseData.course.image || "");
        setCoursePrice(String(courseData.course.course_price || ""));
        setDiscountPrice(String(courseData.course.discount_price || ""));
        setCommission(String(courseData.course.commission || ""));
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [course_id]);

  // Store topics in localStorage
  useEffect(() => {
    localStorage.setItem("newTopics", JSON.stringify(newTopics));
    localStorage.setItem("deletedTopics", JSON.stringify(deletedTopics));
  }, [newTopics, deletedTopics]);

  const handleAddTopic = () => {
    setNewTopics([...newTopics, { topic_name: "", video_url: "" }]);
  };

  const handleDeleteTopic = (index) => {
    if (index < topics.length) {
      setDeletedTopics([...deletedTopics, topics[index].topic_id]);
      setTopics(topics.filter((_, i) => i !== index));
    } else {
      setNewTopics(newTopics.filter((_, i) => i !== index - topics.length));
    }
  };

  const handleTopicChange = (index, field, value) => {
    if (index < topics.length) {
      const updatedTopics = [...topics];
      updatedTopics[index][field] = value;
      setTopics(updatedTopics);
    } else {
      const updatedNewTopics = [...newTopics];
      updatedNewTopics[index - topics.length][field] = value;
      setNewTopics(updatedNewTopics);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("course_name", course_name);
    formData.append("instructor", instructor);
    formData.append("course_description", course_description);
    if (course_image) {
      formData.append("course_image", course_image);
    }
    formData.append("course_price", course_price);
    formData.append("discount_price", discount_price);
    formData.append("commission", commission);

    // Append topics as JSON string
    const allTopics = [...topics, ...newTopics].map(
      ({ topic_name, video_url }) => ({
        topic_name,
        video_url,
      })
    );
    formData.append("topics", JSON.stringify(allTopics));

    try {
      // Update course details with image
      await fetch(
        `https://readgro-backend-new.onrender.com/updatecoursedetails/${course_id}`,
        {
          method: "PUT",
          body: formData, // Send FormData directly
        }
      );

      // Update existing topics
      for (const topic of topics) {
        await fetch(
          `https://readgro-backend-new.onrender.com/updatetopic/${topic.topic_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topic_name: topic.topic_name,
              video_url: topic.video_url,
            }),
          }
        );
      }

      // Create new topics
      for (const topic of newTopics) {
        await fetch("https://readgro-backend-new.onrender.com/create-topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...topic, course_id }),
        });
      }

      // Delete removed topics
      for (const topicId of deletedTopics) {
        await fetch(
          `https://readgro-backend-new.onrender.com/delete-topic/${topicId}`,
          {
            method: "DELETE",
          }
        );
      }

      // Reset states after successful update
      setNewTopics([]);
      setDeletedTopics([]);
      localStorage.removeItem("newTopics");
      localStorage.removeItem("deletedTopics");

      alert("Course and topics updated successfully");
    } catch (error) {
      console.error("Error updating course and topics:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          Edit Course
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
      >
        {/* Course Details */}
        <div className="grid grid-cols-1 mb-15px gap-y-15px gap-x-30px">
          <div>
            <label className="mb-3 block font-semibold">Course Name</label>
            <input
              type="text"
              value={course_name}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-3 block font-semibold">Instructor</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-15px">
          <label className="mb-3 block font-semibold">Description</label>
          <textarea
            value={course_description}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full py-10px px-5 text-sm focus:outline-none"
            rows={5}
          />
        </div>

        {/* Course Image */}
        <div className="mb-15px">
          <label className="mb-3 block font-semibold">Course Image</label>
          {existingImage && !course_image && (
            <img
              src={`${existingImage}`}
              alt="Course"
              className="w-32 h-32 mb-2"
            />
          )}
          <input
            type="file"
            onChange={(e) => setCourseImage(e.target.files[0])} // Store the selected image
            className="w-full py-10px px-5 text-sm focus:outline-none"
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 mb-15px gap-y-15px gap-x-30px md:grid-cols-3">
          <div>
            <label className="mb-3 block font-semibold">Course Price</label>
            <input
              type="number"
              
              value={course_price}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-3 block font-semibold">Discount Price</label>
            <input
              type="number"
              value={discount_price}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-3 block font-semibold">Commission </label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-full py-10px px-5 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Topics Section */}
        <div>
          <label className="mb-3 block font-semibold">Topics</label>
          {[...topics, ...newTopics].map((topic, index) => (
            <div key={index} className="flex items-center mb-3 gap-3">
              <input
                type="text"
                value={topic.topic_name || ""}
                onChange={(e) =>
                  handleTopicChange(index, "topic_name", e.target.value)
                }
                className="flex-1 py-2 px-3 text-sm focus:outline-none border border-gray-300 rounded"
              />
              <input
                type="text"
                value={topic.video_url || ""}
                onChange={(e) =>
                  handleTopicChange(index, "video_url", e.target.value)
                }
                className="flex-1 py-2 px-3 text-sm focus:outline-none border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteTopic(index)}
                className="text-white bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTopic}
            className="mt-3 text-black bg-primaryColor px-3 py-1 rounded"
          >
            Add Topic
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-15px">
          <ButtonPrimary type="submit">Update Course</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AdmineditCourseMain;
