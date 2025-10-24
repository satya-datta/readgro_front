"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import React, { useState, useEffect } from "react";

const AdminEditPackageMain = ({ package_id }) => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [commission, setCommission] = useState("");
  const [packageImage, setPackageImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [discountPrice, setDiscountPrice] = useState("");

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(
          `https://readgro-backend-new.onrender.com/getpackage/${package_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setPackageName(data.package_name);
          setPrice(data.package_price);
          setDescription(data.description);
          setCommission(data.commission);
          setDiscountPrice(data.discount_price); // Add this line
        } else {
          console.error("Failed to fetch package details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    const fetchMappedCourses = async () => {
      try {
        const response = await fetch(
          `https://readgro-backend-new.onrender.com/getcoursemappings/${package_id}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const ids = data.map((course) => course.course_id);
          setCourseIds(ids);
        } else {
          console.error("Courses data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching course mappings:", error);
      }
    };

    const fetchAllCourses = async () => {
      const response = await fetch(
        `https://readgro-backend-new.onrender.com/getallcourses`
      );
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.courses)) {
        setAllCourses(data.courses);
      }
    };
    fetchAllCourses();
    fetchPackageDetails();
    fetchMappedCourses();
  }, [package_id]);

  useEffect(() => {
    if (courseIds.length === 0) return;

    fetch("https://readgro-backend-new.onrender.com/getcoursedetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_ids: courseIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.courses)) {
          //   console.log(data);
          setCourses(data.courses);
          setSelectedCourses(courseIds);
        } else {
          console.error("Courses details response is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, [courseIds]);

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
    const parsedCommission = Number(commission); // Convert to number
    const parsedPrice = Number(price); // Convert price as well

    if (!packageName.trim())
      newErrors.packageName = "Package name is required.";
    if (isNaN(parsedPrice) || parsedPrice <= 0)
      newErrors.price = "Valid price is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (isNaN(parsedCommission) || parsedCommission < 0)
      newErrors.commission = "Valid commission is required.";
    if (isNaN(Number(discountPrice)) || Number(discountPrice) < 0) {
      newErrors.discountPrice = "Valid discount price is required.";
    }

    if (selectedCourses.length === 0)
      newErrors.selectedCourses = "At least one course must be selected.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form Submitted");

    if (!validateForm()) {
      console.log("Form Validation Failed");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("packageName", packageName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("commission", commission);
      if (packageImage) formData.append("packageImage", packageImage);
      formData.append("courses", JSON.stringify(selectedCourses));
      formData.append("discountPrice", discountPrice);

      console.log("FormData Content:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        `https://readgro-backend-new.onrender.com/edit_package/${package_id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (!response.ok) {
        alert(data.message);
        throw new Error(data.message);
      }

      // Handle course mapping
      await handleCourseMapping();

      alert("Package updated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCourseMapping = async () => {
    const removedCourses = courseIds.filter(
      (id) => !selectedCourses.includes(id)
    );
    const addedCourses = selectedCourses.filter(
      (id) => !courseIds.includes(id)
    );

    console.log("Removed Courses:", removedCourses);
    console.log("Added Courses:", addedCourses);

    try {
      if (removedCourses.length > 0) {
        const removeResponse = await fetch(
          `https://readgro-backend-new.onrender.com/remove_courses/${package_id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courses: removedCourses }),
          }
        );

        const removeData = await removeResponse.json();
        console.log("Remove Courses Response:", removeData);
      }

      if (addedCourses.length > 0) {
        const addResponse = await fetch(
          "https://readgro-backend-new.onrender.com/add_courses",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              packageId: package_id,
              courses: addedCourses,
            }),
          }
        );

        const addData = await addResponse.json();
        console.log("Add Courses Response:", addData);
      }
    } catch (error) {
      console.error("Error updating courses:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-white shadow rounded-5">
      <h2 className="text-2xl font-bold mb-6">Edit Package</h2>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="mb-4">
          <label className="block font-semibold">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="w-full py-2 px-3 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full py-2 px-3 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Discount Price</label>
          <input
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            required
          />
          {errors.discountPrice && (
            <p className="error">{errors.discountPrice}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-2 px-3 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Commission</label>
          <input
            type="text"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="w-full py-2 px-3 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Package Image</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
          {errors.packageImage && (
            <p className="text-red-500 text-sm mt-1">{errors.packageImage}</p>
          )}
        </div>

        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCourses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_name}</td>
                  <td>{course.instructor}</td>
                  <td>
                    <button
                      className={`px-3 py-1 rounded ${
                        selectedCourses.includes(course.course_id)
                          ? "bg-red-500"
                          : "bg-primaryColor"
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
              {allCourses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ButtonPrimary type="submit">Update Package</ButtonPrimary>
      </form>
    </div>
  );
};

export default AdminEditPackageMain;
