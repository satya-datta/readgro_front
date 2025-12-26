"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import Testloader from "../others/loader";

const ProfileDetails = () => {
  const { user } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sponsorDetails, setSponsorDetails] = useState({
    sponsor_name: "",
    sponsor_mobile: "",
  });

  useEffect(() => {
    if (user?.userId) {
      fetchUserData(user.userId);
    }
  }, [user?.userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/getuser_details/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setEditableData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          pincode: data.pincode,
          avatar: data.avatar,
          reffercode: data.reffercode, // Assuming reffercode comes here
        });
        console.log(data);

        if (data.reffercode) {
          fetchSponsorDetails(data.reffercode);
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // New function to fetch sponsor details by reffercode
  const fetchSponsorDetails = async (reffercode) => {
    try {
      const response = await fetch(
        `http://localhost:5000/getsponseordetails/${reffercode}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("hi", data);
        setSponsorDetails({
          sponsor_name: data.sponsorname || "",
          sponsor_mobile: data.sponsorphone || "",
        });
        console.log(sponsorDetails);
      } else {
        console.error("Failed to fetch sponsor details");
        setSponsorDetails({ sponsor_name: "", sponsor_mobile: "" });
      }
    } catch (error) {
      console.error("Error fetching sponsor details:", error);
      setSponsorDetails({ sponsor_name: "", sponsor_mobile: "" });
    }
  };

  const handleInputChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!editableData.name?.trim()) newErrors.name = "Name is required";
    if (!editableData.email?.trim()) newErrors.email = "Email is required";

    if (!editableData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(editableData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!editableData.address?.trim())
      newErrors.address = "Address is required";

    if (!editableData.pincode?.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(editableData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    Object.keys(editableData).forEach((key) => {
      formData.append(key, editableData[key]);
    });
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/update_user/${user?.userId}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );
      console.log(response.json());
      if (response.ok) {
        alert("Profile updated successfully");
        setIsEditing(false);
        fetchUserData(user.userId);
        setSelectedImage(null);
        setErrors({});
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="p-5 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {/* Sponsor Email - Always Read-only */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Sponsor Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Sponsor Name</label>
            <input
              type="text"
              value={sponsorDetails.sponsor_name}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Sponsor Mobile</label>
            <input
              type="text"
              value={sponsorDetails.sponsor_mobile}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-600"
            />
          </div>
        </div>
      </div>
      {userData ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">User Details</h3>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "phone", "address", "pincode"].map((field) => (
              <div key={field}>
                <label className="font-semibold capitalize block mb-1">
                  {field.replace("_", " ")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={editableData[field] || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${isEditing ? "bg-white" : "bg-gray-100"
                    } ${errors[field] ? "border-red-500" : ""}`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Profile Image Upload */}
          <div className="mb-4 mt-6">
            <label className="font-semibold block mb-2">Profile Picture</label>
            <div className="flex items-center flex-wrap gap-4">
              <label
                htmlFor="avatarUpload"
                className={`cursor-pointer px-4 py-2 text-sm rounded ${isEditing
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Choose File
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                disabled={!isEditing}
                onChange={handleImageChange}
                className="hidden"
              />
              {selectedImage && (
                <span className="text-sm text-gray-700">
                  {selectedImage.name}
                </span>
              )}
            </div>
          </div>

          {/* Edit / Save Button */}
          <div className="mt-4">
            <button
              onClick={isEditing ? handleSaveChanges : handleEditClick}
              className="w-full md:w-auto px-4 py-2 bg-primaryColor text-white rounded hover:bg-primaryColor transition m-[5px]"
            >
              {isEditing ? "Save Changes" : "Tap to Edit"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <Testloader />
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
