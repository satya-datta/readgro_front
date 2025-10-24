import AboutMain from "@/components/layout/main/AboutMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
export const metadata = {
  title: "About - Dark | ReadGro - Learn and Earn",
  description: "About - Dark | ReadGro - Learn and Earn",
};
const About_Dark = () => {
  return (
    <PageWrapper>
      <main className="is-dark">
        <AboutMain />
      </main>
    </PageWrapper>
  );
};

export default About_Dark;
