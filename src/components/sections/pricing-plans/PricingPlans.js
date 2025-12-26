"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Testloader from "@/components/shared/others/loader";

const PricingPlans = () => {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [courseNames, setCourseNames] = useState({});
  const [loading, setLoading] = useState(true); // ✅ Loader state

  useEffect(() => {
    fetch("http://localhost:5000/getallpackages")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPackages(data);
          const fetchAll = data.map((pkg) =>
            fetchCourseDetails(pkg.package_id)
          );
          Promise.all(fetchAll).finally(() => setLoading(false)); // ✅ Wait for all fetches
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  }, []);

  const fetchCourseDetails = async (packageId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/getcoursemappings/${packageId}`
      );
      const data = await res.json();
      const courseIds = data.map((course) => course.course_id);

      if (courseIds.length > 0) {
        const courseRes = await fetch(
          "http://localhost:5000/getcoursedetails",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ course_ids: courseIds }),
          }
        );

        const courseData = await courseRes.json();
        if (Array.isArray(courseData.courses)) {
          const names = courseData.courses.map((c) => c.name);
          setCourseNames((prev) => ({
            ...prev,
            [packageId]: {
              names,
              total: names.length,
            },
          }));
        }
      }
    } catch (err) {
      console.error(`Error fetching course details for ${packageId}:`, err);
    }
  };

  // ✅ Loader display
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Testloader />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Packages
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => {
            const courseData = courseNames[pkg.package_id];
            const names = courseData?.names || [];
            const total = courseData?.total || 0;

            return (
              <div
                key={pkg.package_id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
                <img
                  src={pkg.package_image}
                  alt={pkg.package_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                  {pkg.package_name}
                </h3>

                {/* Pricing */}
                <div className="text-center mb-4">
                  <p className="text-gray-500 line-through text-sm">
                    ₹{pkg.package_price}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{pkg.discount_price}
                  </p>
                </div>

                {/* Courses Preview */}
                <div className="text-left text-sm mb-4 space-y-1 ml-2">
                  {names.slice(0, total > 3 ? 2 : 3).map((name, idx) => (
                    <p
                      key={idx}
                      className="text-gray-800 text-base font-medium"
                    >
                      ✅ {name}
                    </p>
                  ))}
                  {total > 3 && (
                    <p className="text-gray-800 text-base font-medium">
                      ✅ + {total - 2} more courses
                    </p>
                  )}
                </div>

                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => router.push(`/packages/${pkg.package_id}`)}
                >
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
