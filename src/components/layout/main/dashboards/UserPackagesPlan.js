"use client";
import { useEffect, useState } from "react";
import useTab from "@/hooks/useTab";
import { useUserContext } from "@/contexts/UserContext";
import PlanCard from "@/components/shared/courses/PlanCard";
import Testloader from "@/components/shared/others/loader";

const UserPackagePlan = () => {
  const { currentIdx, handleTabClick } = useTab();
  const { user } = useUserContext();

  const [packages, setPackages] = useState([]);
  const [userPackage, setUserPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user?.userId) return;

    const fetchPackages = async () => {
      try {
        const [packageRes, userPackageRes] = await Promise.all([
          fetch("http://localhost:5000/getallpackages"),
          fetch(
            `http://localhost:5000/getuserpackage/${user.userId}`
          ),
        ]);

        if (!packageRes.ok || !userPackageRes.ok) {
          throw new Error("Failed to fetch package details");
        }

        const packagesData = await packageRes.json();
        const userPackageData = await userPackageRes.json();

        setPackages(packagesData);
        setUserPackage(userPackageData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();

    // Poll every 10 seconds to check for updates
    const interval = setInterval(fetchPackages, 10000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user?.userId]);

  if (loading)
    return (
      <div>
        <Testloader />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      {/* heading */}
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          MY PLAN
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:mx-4 sm:px-6 sm:-mx-15px">
        {packages.map((pkg, idx) => (
          <PlanCard
            key={idx}
            package_id={pkg.package_id}
            userCurrentPackage={userPackage}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPackagePlan;
