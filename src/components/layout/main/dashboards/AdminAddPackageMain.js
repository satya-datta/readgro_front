"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import React, { useState, useEffect } from "react";

const AdminAddPackageMain = () => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [commission, setCommission] = useState("");
  const [packageImage, setPackageImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getallcourses"
        );
        const data = await response.json();
        if (response.ok) {
          setCourses(data.courses);
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPackageImage(event.target.files[0]);
    }
  };

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!packageName.trim())
      newErrors.packageName = "Package name is required.";
    if (!price.trim() || isNaN(price))
      newErrors.price = "Valid price is required.";
    if (!discountPrice.trim() || isNaN(discountPrice))
      newErrors.discountPrice = "Valid discount price is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!commission.trim() || isNaN(commission))
      newErrors.commission = "Valid commission is required.";
    if (!packageImage) newErrors.packageImage = "Package image is required.";
    if (selectedCourses.length === 0)
      newErrors.selectedCourses = "At least one course must be selected.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();

      formData.append("packageName", packageName);
      formData.append("price", price);
      formData.append("discountPrice", discountPrice);
      formData.append("description", description);
      formData.append("commission", commission);
      formData.append("packageImage", packageImage);
      formData.append("courses", JSON.stringify(selectedCourses));

      // Log the form data for debugging purposes
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await fetch(
        "http://localhost:5000/create-package_withcourses",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
        throw new Error(data.message);
      }

      alert("Package created successfully!");
      setPackageName("");
      setPrice("");
      setDiscountPrice("");
      setDescription("");
      setCommission("");
      setPackageImage(null);
      setErrors({});
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-white shadow rounded-5">
      <h2 className="text-2xl font-bold mb-6">Add New Package</h2>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="mb-4">
          <label className="block font-semibold">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Enter package name"
            className="w-full py-2 px-3 border rounded"
          />
          {errors.packageName && (
            <p className="text-red-500">{errors.packageName}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block font-semibold">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full py-2 px-3 border rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Discount Price</label>
          <input
            type="text"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter discount price"
            className="w-full py-2 px-3 border rounded"
          />
          {errors.discountPrice && (
            <p className="text-red-500">{errors.discountPrice}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-2 px-3 border rounded"
            placeholder="Enter package description"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Commission */}
        <div className="mb-4">
          <label className="block font-semibold">Max Commission</label>
          <input
            type="text"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            placeholder="Enter commission"
            className="w-full py-2 px-3 border rounded"
          />
          {errors.commission && (
            <p className="text-red-500">{errors.commission}</p>
          )}
        </div>

        {/* Package Image */}
        <div className="mb-4">
          <label className="block font-semibold">Package Image</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
          {errors.packageImage && (
            <p className="text-red-500">{errors.packageImage}</p>
          )}
        </div>
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Created At</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_name}</td>
                  <td>{course.created_time}</td>
                  <td>{course.instructor}</td>
                  <td>
                    <button
                      className={`px-3 py-1 rounded ${
                        selectedCourses.includes(course.course_id)
                          ? "bg-red-500"
                          : "bg-green"
                      } text-white`}
                      onClick={() => toggleCourseSelection(course.course_id)}
                      type="button"
                    >
                      {selectedCourses.includes(course.course_id)
                        ? "REMOVE"
                        : "ADD"}
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {errors.selectedCourses && (
          <p className="text-red-500">{errors.selectedCourses}</p>
        )}

        <div className="mt-4">
          <ButtonPrimary type="submit">Submit Package</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AdminAddPackageMain;
