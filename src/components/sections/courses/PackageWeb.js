"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { FaStar } from "react-icons/fa";

const PackageWeb = () => {
  const [packages, setPackages] = useState([]);
  const [courseCounts, setCourseCounts] = useState({});
  const router = useRouter();
  useEffect(() => {
    fetch("http://localhost:5000/getallpackages")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Directly check if data is an array
        if (Array.isArray(data)) {
          setPackages(data); // No need for data.packages
          console.log(data);
          data.forEach((pkg) => {
            fetchCourseCount(pkg.package_id);
          });
        } else {
          console.error("Packages data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const fetchCourseCount = (packageId) => {
    fetch(`http://localhost:5000/getcoursemappings/${packageId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourseCounts((prevCounts) => ({
            ...prevCounts,
            [packageId]: data.length,
          }));
        } else {
          console.error(
            `Courses data for package ${packageId} is not an array`,
            data
          );
        }
      })
      .catch((error) =>
        console.error(`Error fetching courses for package ${packageId}:`, error)
      );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📦 Explore Our Packages
      </h1>
      {packages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="border p-5 rounded-xl shadow-lg bg-white relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => router.push(`/packages/${pkg.package_id}`)}
            >
              {/* Package Image */}
              {pkg.package_image && (
                <img
                  src={`${pkg.package_image}`}
                  alt={pkg.package_name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {/* Package Info */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{pkg.package_name}</h3>
                <p className="text-gray-600 text-sm">{pkg.description}</p>

                {/* Star Ratings */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={18}
                      className="text-orange-500"
                      fill="orange"
                    />
                  ))}
                </div>

                {/* Courses Count */}
                <div className="flex items-center text-gray-600 text-sm mt-3">
                  <BookOpen size={18} className="text-green-500 mr-2" />
                  {courseCounts[pkg.package_id] !== undefined
                    ? `${courseCounts[pkg.package_id]} Courses`
                    : "homourses..."}
                </div>

                {/* Package Price */}
                <p className="text-lg font-bold mt-2">
                  💰 ₹{pkg.discount_price}
                </p>

                {/* View Plan Button */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full">
                  View Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Packages Available</p>
      )}
    </div>
  );
};

export default PackageWeb;
