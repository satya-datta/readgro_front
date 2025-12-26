"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const UserAffiliateForm = () => {
  const { user } = useUserContext();
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user?.userId) {
      fetchReferralCode(user.userId);
    }
    loadCourses();
  }, [user?.userId]);

  const fetchReferralCode = async (userId) => {
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
        if (data.user.generatedReferralCode) {
          setReferralCode(data.user.generatedReferralCode);
          setReferralLink(
            `https://readgro.com/?referralcode=${data.user.generatedReferralCode}`
          );
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  const loadCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/getallcourses");
      const data = await res.json();
      console.log(data);
      if (Array.isArray(data?.courses)) setCourses(data.courses);
    } catch (e) {
      // ignore
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const generateCourseLink = () => {
    if (!selectedCourse) return;
    const newLink = `${referralLink}&course=${encodeURIComponent(selectedCourse)}`;
    setGeneratedLink(newLink);
  };

  return (
    <div className="p-5 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">AFFILIATE LINKS</h2>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          My Referral Link
        </label>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-2 bg-gray-100 text-gray-700 text-sm"
          />
          <button
            onClick={() => copyToClipboard(referralLink)}
            className="bg-primaryColor text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
          >
            Copy Referral Link
          </button>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          My Referral Code
        </label>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 p-2 bg-gray-100 text-gray-700 text-sm"
          />
          <button
            onClick={() => copyToClipboard(referralCode)}
            className="bg-primaryColor text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
          >
            Copy Referral Code
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Generate Link For Course */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Generate Link For Course
        </label>
        <div className="flex">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1 bg-gray-100 text-sm"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_name}>
                {c.course_name}
              </option>
            ))}
          </select>
          <button
            onClick={generateCourseLink}
            disabled={!selectedCourse}
            className={`ml-2 px-4 py-2 text-sm font-medium rounded-md ${selectedCourse
                ? "bg-primaryColor text-white hover:bg-purple-700"
                : "bg-gray-400 text-white cursor-not-allowed"
              }`}
          >
            Generate Link
          </button>
        </div>
      </div>

      {/* Generated Link */}
      {generatedLink && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Generated Course Link</label>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 p-2 bg-gray-100 text-gray-700 text-sm"
            />
            <button
              onClick={() => copyToClipboard(generatedLink)}
              className="bg-primaryColor text-white px-4 py-2 text-sm font-medium hover:bg-purple-700"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAffiliateForm;
