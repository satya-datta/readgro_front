import ErrorMain from "@/components/layout/main/ErrorMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
export const metadata = {
  title: "Error - Dark | ReadGro - Learn and Earn",
  description: "Error - Dark | ReadGro - Learn and Earn",
};
const Error_Dark = () => {
  return (
    <PageWrapper>
      <main className="is-dark">
        <ErrorMain />
      </main>
    </PageWrapper>
  );
};

export default Error_Dark;
