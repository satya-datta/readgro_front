import dynamic from "next/dynamic";
import React from "react";
import Faq from "@/components/sections/faq/Faq";
import Counter2 from "@/components/sections/sub-section/Counter2";
import Testloader from "@/components/shared/others/loader";

// Fallback loading component
const Loading = ({ text }) => (
  <div style={{ padding: "20px", textAlign: "center" }}>{text}</div>
);

// Dynamically import sections with fallback
const Hero7 = dynamic(
  () => import("@/components/sections/hero-banners/Hero7"),
  {
    loading: () => <Loading text="Loading Hero Section..." />,
    ssr: false,
  }
);

const About11 = dynamic(() => import("@/components/sections/abouts/About11"), {
  loading: () => <Loading text="Loading About Section..." />,
  ssr: false,
});

const CoursesFilter = dynamic(
  () => import("@/components/sections/courses/CoursesFilter"),
  {
    loading: () => <Testloader />,
    ssr: false,
  }
);

const PricingPlans = dynamic(
  () => import("@/components/sections/pricing-plans/PricingPlans"),
  {
    loading: () => <Testloader />,
    ssr: false,
  }
);

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials/Testimonials"),
  {
    loading: () => <Loading text="Loading Testimonials..." />,
    ssr: false,
  }
);

const HOMEMAIN = () => {
  return (
    <>
      <div style={{ marginBottom: "60px", marginTop: "60px" }}>
        <Hero7 />
      </div>

      <About11 />
      <Counter2 type="lg" />
      <CoursesFilter />
      {/* <PricingPlans /> */}
      <Testimonials />
      <Faq />
    </>
  );
};

export default HOMEMAIN;
