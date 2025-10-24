"use client";
import FooterNavList from "./FooterNavList";
import CopyRight from "./CopyRight";
import FooterTop from "./FooterTop";
import { usePathname } from "next/navigation";
import DashboardCopyRight from "./DashboardCopyRight";

const DashboardFooter = () => {
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
          ? "2xl:bg-[url(../assets/images/footer/footer_bg_ai.png)] "
          : ""
      } bg-darkblack 2xl:bg-cover`}
    >
      <DashboardCopyRight />
    </footer>
  );
};

export default DashboardFooter;
