"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
const ItemDashboard = ({ item }) => {
  const currentPath = usePathname();
  const { name, path, icon, tag, subItems } = item;
  const isActive = currentPath === path ? true : false;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <li
      className={`py-10px border-b border-borderColor dark:border-borderColor-dark ${
        tag ? "flex justify-between items-center" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <Link
          href={path}
          className={`${
            isActive
              ? "text-primaryColor"
              : "text-contentColor dark:text-contentColor-dark"
          } hover:text-primaryColor dark:hover:text-primaryColor leading-1.8 flex gap-3 text-nowrap`}
        >
          {icon} {name}
        </Link>
        {subItems && (
          <button
            onClick={toggleDropdown}
            className="text-contentColor dark:text-contentColor-dark hover:text-primaryColor ml-auto"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
      {/* Dropdown menu */}
      {isDropdownOpen && subItems && (
        <ul className="pl-5 mt-2">
          {subItems.map((subItem, idx) => (
            <li key={idx} className="py-2">
              <Link
                href={subItem.path}
                className={`text-contentColor dark:text-contentColor-dark hover:text-primaryColor`}
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default ItemDashboard;
