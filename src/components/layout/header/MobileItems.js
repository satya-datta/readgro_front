import React, { useState } from "react";

import PackagesDropdown from "./PackagesDropdown";

const MobileMenuItems = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const items = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Courses", path: "/courses" },
    {
      id: 4,
      name: "Plan",
      path: "/packages",
      hasDropdown: true,
      children: <PackagesDropdown />,
    },

    { id: 5, name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="pt-8 pb-6 border-b border-borderColor dark:border-borderColor-dark">
      <nav className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => item.hasDropdown && toggleDropdown(item.id)}
            >
              <a href={item.path} className="text-base">
                {item.name}
              </a>
              {item.hasDropdown && (
                <span
                  className={`ml-2 transition-transform duration-300 ${
                    openDropdown === item.id ? "rotate-90" : "rotate-0"
                  }`}
                >
                  ❯
                </span>
              )}
            </div>

            {item.hasDropdown && openDropdown === item.id && (
              <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-black dark:text-white">
                {item.children}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenuItems;
