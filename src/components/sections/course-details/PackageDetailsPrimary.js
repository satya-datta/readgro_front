"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import CoursesOfPackage from "../courses/CoursesOfPackage";
import { useUserContext } from "@/contexts/UserContext";

const PackageDetailsPrimary = ({ type, id }) => {
  const { user } = useUserContext();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/getpackage/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPackageDetails(data);
        } else {
          setError("Package details not found");
        }
      })
      .catch(() => setError("Failed to load package details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleButtonClick = () => {
    if (!user?.userId) {
      window.location.href = `/checkout?package=${packageDetails.package_name}`;
      return;
    }

    const userPackageId = Number(user?.package_id); // Assuming this exists
    const currentPackageId = Number(packageDetails?.package_id);

    if (userPackageId < currentPackageId) {
      router.push("/user/plan"); // Upgrade
    } else {
      router.push("/user/user-enrolled-courses"); // Already has it
    }
  };

  const isUserLoggedIn = Boolean(user?.userId);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-800">
          Error Loading Package
        </h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Package Details
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Package Header Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Package Image (if type 3) */}
            {type === 3 && packageDetails?.package_image && (
              <div className="lg:w-1/2">
                <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={packageDetails.package_image}
                    alt={packageDetails.package_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Package Details Card */}
            <div
              className={`${
                type === 3 ? "lg:w-1/2" : "w-full"
              } bg-white rounded-xl shadow-lg overflow-hidden`}
            >
              <div className="p-6 md:p-8">
                {/* Package Badge */}

                {/* Package Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {packageDetails?.package_name ||
                    "Affiliate Marketing Expert Package"}
                </h1>

                {/* Package Description */}
                <p className="text-lg text-gray-600 mb-6">
                  {packageDetails?.description ||
                    "Add the Learnings to Beginner"}
                </p>

                {/* Discount Banner */}
                {/* Pricing Info Section */}
                <div className="mb-6">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">MRP Price</p>
                    <p className="text-xl font-semibold text-gray-900 ">
                      ₹{packageDetails?.package_price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">With Referral Code</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{packageDetails?.discount_price}
                    </p>
                  </div>
                </div>

                {/* Price Section (only for non-logged-in users) */}
                {!isUserLoggedIn && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">
                      One-time payment. Lifetime access.
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleButtonClick}
                  className="w-full bg-gradient-to-r bg-primaryColor to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  {!isUserLoggedIn
                    ? "Buy Now"
                    : user?.package_id < packageDetails?.package_id
                    ? "Upgrade to this Package"
                    : "Explore Your Package"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Included Courses Section */}
      <section className="py-8 md:py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Info Tag */}

          {/* <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm md:text-base font-medium">
            Get up to ₹2,000 as a reward for your first referral during the
            bonus month, which occurs once every 2-3 years. Offer valid on any
            package.
          </div> */}

          <CoursesOfPackage id={packageDetails?.package_id} />
          {/* Info Tag */}
          {/* {packageDetails?.commission && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm md:text-base font-medium">
              On referring this Package you can earn up to ₹
              {packageDetails.commission} on each referral.
            </div>
          )} */}
        </div>
      </section>
    </main>
  );
};

export default PackageDetailsPrimary;
