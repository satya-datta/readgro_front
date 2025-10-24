import React, { useEffect, useState } from "react";
import DropdownPrimary from "./DropdownPrimary";

// Function to fetch packages
export const fetchPackages = async () => {
  try {
    const response = await fetch(
      "https://readgro-backend-new.onrender.com/getallpackages"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch packages");
    }
    const data = await response.json();

    return data.map((pkg) => ({
      name: pkg.package_name,
      status: null,
      path: `/packages/${pkg.package_id}`,
      type: "secondary",
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

const PackagesDropdown = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen size is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Consider mobile if width is less than 768px
    };

    checkScreenSize(); // Check initially
    window.addEventListener("resize", checkScreenSize); // Listen for resize

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const loadPackages = async () => {
      const packages = await fetchPackages();
      setItems(packages);
      setLoading(false);
    };

    loadPackages();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center">Loading packages...</p>;

  return (
    <div className="relative w-full">
      <div
        className={`rounded-lg shadow-md p-4 w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg 
         ${
           isMobile
             ? "bg-white opacity-100 dark:bg-gray-700"
             : "bg-white dark:bg-gray-800"
         }
`}
      >
        <DropdownPrimary items={items} />
      </div>
    </div>
  );
};

export default PackagesDropdown;
