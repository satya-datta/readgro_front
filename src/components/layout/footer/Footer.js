"use client";
import FooterNavList from "./FooterNavList";
import CopyRight from "./CopyRight";
import FooterTop from "./FooterTop";
import { usePathname } from "next/navigation";
import logoImage from "@/assets/images/logo/RGFULL.png";

const Footer = () => {
  const pathname = usePathname();
  const isHome8 = pathname === "/home-8" || pathname === "/home-8-dark";
  const isHome9 = pathname === "/home-9" || pathname === "/home-9-dark";
  const isHome10 = pathname === "/home-10" || pathname === "/home-10-dark";

  return (
    <footer
      className={`${
        isHome9
          ? "2xl:bg-[url(../assets/images/footer/footer_bg.png)]"
          : isHome10
          ? "2xl:bg-[url(../assets/images/footer/footer_bg_ai.png)]"
          : ""
      } bg-blackColor2 dark:bg-lightGrey10-dark 2xl:bg-cover`}
    >
      <div
        className={`${
          isHome8 ? "container-fluid-2" : "container"
        } pt-4 pb-4 lg:pt-6 lg:pb-6`} // reduced padding here
      >
        <FooterNavList />
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
