import ErrorMain from "@/components/layout/main/ErrorMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Error | ReadGro - Learn and Earn",
  description: "Error | ReadGro - Learn and Earn",
};

const Error = async () => {
  return (
    <PageWrapper>
      <main>
        <ErrorMain />
      </main>
    </PageWrapper>
  );
};

export default Error;
