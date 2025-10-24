"use client";
import TabButtonSecondary from "../buttons/TabButtonSecondary";
import useTab from "@/hooks/useTab";
import ProfileContent from "./ProfileContent";
import PasswordContent from "./PasswordContent";
import SocialIconContent from "./SocialIconContent";
import TabContentWrapper from "../wrappers/TabContentWrapper";
import PasswordContentUser from "./PasswordContentUser";

const UsersettingsTab = () => {
  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      {/* heading */}
      <div className="mb-6 pb-5 border-b-2 border-borderColor dark:border-borderColor-dark">
        <h2 className="text-2xl font-bold text-blackColor dark:text-blackColor-dark">
          Change Password
        </h2>
      </div>
      <div>
        <div>
          <PasswordContentUser />
        </div>
      </div>
    </div>
  );
};

export default UsersettingsTab;
