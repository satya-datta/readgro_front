import React from "react";
import Navitem from "./Navitem";

import DropdownWrapper from "@/components/shared/wrappers/DropdownWrapper";

import PackagesDropdown from "./PackagesDropdown";

const NavItems = () => {
  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
      // dropdown: <DropdownDemoes />,
      isRelative: false,
    },
    {
      id: 2,
      name: "About",
      path: "/about",
      // dropdown: <DropdownPages />,
      isRelative: false,
    },
    {
      id: 3,
      name: "Courses",
      path: "/courses",
      // dropdown: <DropdownCourses />,
      isRelative: false,
    },
    // {
    //   id: 4,
    //   name: "Packages",
    //   path: "/packages",
    //   dropdown: <PackagesDropdown />,
    //   isRelative: true,
    // },

    {
      id: 5,
      name: "Contact Us",
      path: "/contact",
      // dropdown: <DropdownEcommerce />,
      isRelative: true,
    },
  ];
  return (
    <div className="hidden lg:block lg:col-start-3 lg:col-span-7">
      <ul className="nav-list flex justify-center">
        {navItems.map((navItem, idx) => (
          <Navitem key={idx} idx={idx} navItem={{ ...navItem, idx: idx }}>
            <DropdownWrapper>{navItem.dropdown}</DropdownWrapper>
          </Navitem>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
