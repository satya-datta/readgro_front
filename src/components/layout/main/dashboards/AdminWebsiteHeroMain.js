"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import React, { useState, useEffect } from "react";

const AdminWebsiteHeroMain = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleImage3Change = (e) => {
    setImage3(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image1) {
      formData.append("image1", image1);
    }
    if (image2) {
      formData.append("image2", image2);
    }
    if (image3) {
      formData.append("image3", image3);
    }

    try {
      const response = await fetch(
        "https://readgro-backend-new.onrender.com/website_hero",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("images upload Successfully");
        console.log("Images uploaded successfully");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setErrors({});
      } else {
        console.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-white shadow rounded-5">
      <h2 className="text-2xl font-bold mb-6">Upload Website Hero Images</h2>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="mb-4">
          <label className="block font-semibold">Image 1</label>
          <input type="file" onChange={handleImage1Change} className="w-full" />
          {errors.image1 && <p className="text-red-500">{errors.image1}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Image 2</label>
          <input type="file" onChange={handleImage2Change} className="w-full" />
          {errors.image2 && <p className="text-red-500">{errors.image2}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Image 3</label>
          <input type="file" onChange={handleImage3Change} className="w-full" />
          {errors.image3 && <p className="text-red-500">{errors.image3}</p>}
        </div>

        <div className="mt-4">
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AdminWebsiteHeroMain;
