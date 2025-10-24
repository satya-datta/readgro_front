import React from "react";
import FooterNavItems from "./FooterNavItems";
import FooterAbout from "./FooterAbout";
import logoImage from "@/assets/images/rg.png";
import Image from "next/image";

const FooterNavList = () => {
  const lists = [
    {
      heading: "Useful Links",
      items: [
        { name: "About Us", path: "/about" },
        { name: "Courses", path: "/courses" },
        { name: "Select Plan & Register", path: "/packages" },
        { name: "User Login", path: "/user/login" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      heading: "Policies",
      items: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms and Conditions", path: "/terms-and-conditions" },
        { name: "Cancellation and Refund", path: "/cancellation-refund" },
      ],
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 gap-6 pt-4 pb-4 md:pt-6 md:pb-6 lg:pt-10 lg:pb-6 items-start">
        {/* Logo on the far left */}
        <div className="sm:col-span-12 md:col-span-3 lg:col-span-2 flex justify-center md:justify-start">
          <Image src={logoImage} alt="ReadGro Logo" width={150} height={400} />
        </div>

        {/* About and Nav Sections */}
        <div className="sm:col-span-12 md:col-span-9 lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FooterAbout />
          {lists.map((list, idx) => (
            <FooterNavItems key={idx} list={list} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterNavList;
