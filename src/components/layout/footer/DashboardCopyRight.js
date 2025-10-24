import React from "react";
import useIsSecondary from "@/hooks/useIsSecondary";

const DashboardCopyRight = () => {
  const { isSecondary } = useIsSecondary();

  return (
    <div
      className={`py-2 px-4 ${
        isSecondary
          ? "bg-gradient-to-r from-blue-50 to-yellow-50 border-t border-darkcolor"
          : "bg-gradient-to-r from-blue-50 to-yellow-50"
      }`}
    >
      {isSecondary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <div>
            <p className="text-sm text-center sm:text-start text-darkgray">
              © 2025 Powered by{" "}
              <a href="#" className="hover:text-primaryColor">
                ReadGro
              </a>
              . All Rights Reserved.
            </p>
          </div>

          <div>
            <ul className="flex items-center justify-center sm:justify-end text-sm">
              <li>
                <a
                  href="#"
                  className="text-darkgray hover:text-primaryColor pr-3 border-r border-darkgray leading-none"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-darkgray hover:text-primaryColor pl-3 leading-none"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
          <div>
            <p className="text-sm text-gray-700 text-center lg:text-left">
              Copyright © <span className="text-primaryColor">2025</span> by
              ReadGro. All Rights Reserved.
            </p>
          </div>

          {/* <div>
            <ul className="flex gap-2 justify-center lg:justify-end text-gray-700 text-sm">
              <li>
                <a
                  href="https://www.facebook.com"
                  className="p-1 rounded bg-white bg-opacity-20 hover:bg-primaryColor text-center"
                  aria-label="Facebook"
                >
                  <i className="icofont-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  className="p-1 rounded bg-white bg-opacity-20 hover:bg-primaryColor text-center"
                  aria-label="Twitter"
                >
                  <i className="icofont-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.vimeo.com"
                  className="p-1 rounded bg-white bg-opacity-20 hover:bg-primaryColor text-center"
                  aria-label="Vimeo"
                >
                  <i className="icofont-vimeo"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  className="p-1 rounded bg-white bg-opacity-20 hover:bg-primaryColor text-center"
                  aria-label="LinkedIn"
                >
                  <i className="icofont-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.skype.com"
                  className="p-1 rounded bg-white bg-opacity-20 hover:bg-primaryColor text-center"
                  aria-label="Skype"
                >
                  <i className="icofont-skype"></i>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DashboardCopyRight;
