import Image from "next/image";
import React from "react";
import logoImage from "@/assets/images/rg.png";
import useIsSecondary from "@/hooks/useIsSecondary";

const CopyRight = () => {
  const { isSecondary } = useIsSecondary();

  return (
    <div className="pt-1 pb-1 border-t border-darkcolor">
      {isSecondary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 items-center text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Image src={logoImage} alt="ReadGro Logo" width={30} height={30} />
            <p className="text-base text-darkgray text-center">
              © 2025 Powered by{" "}
              <a href="#" className="hover:text-primaryColor">
                ReadGro
              </a>
              . All Rights Reserved.
            </p>
          </div>
          <ul className="flex items-center justify-center gap-4 mt-2 sm:mt-0">
            <li>
              <a
                href="#"
                className="text-base text-darkgray hover:text-primaryColor border-r border-darkgray pr-4"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-base text-darkgray hover:text-primaryColor pl-4"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 pt-6 pb-4 text-center">
          <div className="flex items-center gap-3">
            <Image src={logoImage} alt="ReadGro Logo" width={25} height={25} />
            <p className="text-whiteColor text-center">
              © <span className="text-primaryColor">2025</span> ReadGro. All
              Rights Reserved.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyRight;
