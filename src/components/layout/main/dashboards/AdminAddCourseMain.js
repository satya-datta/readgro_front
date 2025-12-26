"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const AdminAddCourseMain = () => {
  const [course_name, setcourse_name] = useState("");
  const [instructor, setinstructor] = useState("");
  const [course_description, setcourse_description] = useState("");
  const [course_image, setCourseImage] = useState(null);
  const [course_price, setCoursePrice] = useState("");
  const [discount_price, setDiscountPrice] = useState("");
  const [commission, setCommission] = useState("");
  const [topics, setTopics] = useState([]);
  const [errors, setErrors] = useState({});

  // Add a new topic
  const handleAddTopic = () => {
    setTopics([...topics, { topicName: "", videoUrl: "" }]);
  };

  // Handle changes in topic name and video URL
  const handleTopicChange = (index, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index][field] = value;
    setTopics(updatedTopics);
  };

  // Delete a topic
  const handleDeleteTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCourseImage(event.target.files[0]);
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!course_name.trim()) newErrors.course_name = "Course name is required.";
    if (!instructor.trim())
      newErrors.instructor = "Instructor name is required.";
    if (!course_description.trim())
      newErrors.course_description = "Course description is required.";
    if (!course_image) newErrors.course_image = "Course image is required.";

    if (!course_price || isNaN(Number(course_price))) {
      newErrors.course_price = "Valid course price is required.";
    }
    if (discount_price && isNaN(Number(discount_price))) {
      newErrors.discount_price = "Discount must be a number.";
    }
    if (commission && (isNaN(Number(commission)) || Number(commission) < 0)) {
      newErrors.commission = "Commission must be 0-100.";
    }

    if (topics.length === 0) {
      newErrors.topics = "At least one topic is required.";
    } else {
      const invalidTopics = topics.some(
        (topic) => !topic.topicName.trim() || !topic.videoUrl.trim()
      );
      if (invalidTopics)
        newErrors.topics = "All topics must have a name and a video URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Into Submit");
    if (!validateForm()) return;
    console.log("form Validated");
    try {
      const formData = new FormData();
      formData.append("course_name", course_name);
      formData.append("instructor", instructor);
      formData.append("course_description", course_description);
      formData.append("course_price", course_price);
      formData.append("discount_price", discount_price);
      formData.append("commission", commission);
      if (course_image) {
        formData.append("course_image", course_image);
      }

      const courseResponse = await fetch(
        "http://localhost:5000/create-course",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!courseResponse.ok) {
        console.log(courseResponse.json());
        throw new Error("Error creating course");
      }

      const courseResult = await courseResponse.json();
      console.log("Course created successfully:", courseResult);
      const course_id = courseResult.course_id;

      for (const topic of topics) {
        const topicData = {
          topic_name: topic.topicName,
          video_url: topic.videoUrl,
          course_id,
        };

        const topicResponse = await fetch(
          "http://localhost:5000/create-topic",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topicData),
          }
        );

        if (!topicResponse.ok) {
          console.error("Error submitting topic:", topicData);
          continue;
        }

        console.log("Topic created successfully:", await topicResponse.json());
      }

      // Reset form after successful submission
      setcourse_name("");
      setinstructor("");
      setcourse_description("");
      setCourseImage(null);
      setCoursePrice("");
      setDiscountPrice("");
      setCommission("");
      setTopics([]);
      setErrors({});
      alert("Course and topics created successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-white shadow rounded-5">
      <h2 className="text-2xl font-bold mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="text-sm">
        {/* Course Name */}
        <div className="mb-4">
          <label className="block font-semibold">Course Name</label>
          <input
            type="text"
            value={course_name}
            onChange={(e) => setcourse_name(e.target.value)}
            placeholder="Enter course name"
            className="w-full py-2 px-3 border rounded"
          />
          {errors.course_name && (
            <p className="text-red-500">{errors.course_name}</p>
          )}
        </div>

        {/* Instructor */}
        <div className="mb-4">
          <label className="block font-semibold">Instructor</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setinstructor(e.target.value)}
            placeholder="Enter instructor name"
            className="w-full py-2 px-3 border rounded"
          />
          {errors.instructor && (
            <p className="text-red-500">{errors.instructor}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold">Description</label>
          <textarea
            value={course_description}
            onChange={(e) => setcourse_description(e.target.value)}
            className="w-full py-2 px-3 border rounded"
            placeholder="Enter course description"
          />
          {errors.course_description && (
            <p className="text-red-500">{errors.course_description}</p>
          )}
        </div>

        {/* Course Image */}
        <div className="mb-4">
          <label className="block font-semibold">Course Image</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
          {errors.course_image && (
            <p className="text-red-500">{errors.course_image}</p>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold">Course Price</label>
            <input
              type="number"
              value={course_price}
              onChange={(e) => setCoursePrice(e.target.value)}
              placeholder="e.g. 1999"
              className="w-full py-2 px-3 border rounded"
            />
            {errors.course_price && (
              <p className="text-red-500">{errors.course_price}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Discount Price</label>
            <input
              type="number"
              value={discount_price}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="e.g. 1499"
              className="w-full py-2 px-3 border rounded"
            />
            {errors.discount_price && (
              <p className="text-red-500">{errors.discount_price}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Commission</label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              placeholder="e.g. 500"
              className="w-full py-2 px-3 border rounded"
            />
            {errors.commission && (
              <p className="text-red-500">{errors.commission}</p>
            )}
          </div>
        </div>

        {/* Topics Section */}
        <div className="mb-4">
          <label className="block font-semibold">Topics</label>
          {topics.map((topic, index) => (
            <div key={index} className="flex items-center mb-3 gap-3">
              <input
                type="text"
                value={topic.topicName}
                onChange={(e) =>
                  handleTopicChange(index, "topicName", e.target.value)
                }
                placeholder="Topic Name"
                className="flex-1 py-2 px-3 border rounded"
              />
              <input
                type="text"
                value={topic.videoUrl}
                onChange={(e) =>
                  handleTopicChange(index, "videoUrl", e.target.value)
                }
                placeholder="Video URL"
                className="flex-1 py-2 px-3 border rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteTopic(index)}
                className="text-red-500 font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
          {errors.topics && <p className="text-red-500">{errors.topics}</p>}
          <button
            type="button"
            onClick={handleAddTopic}
            className="mt-2 px-4 py-2 bg-green text-white rounded"
          >
            Add Topic
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <ButtonPrimary type="submit">Submit Course</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AdminAddCourseMain;
