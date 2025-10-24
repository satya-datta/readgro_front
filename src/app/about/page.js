import AboutMain from "@/components/layout/main/AboutMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "About | ReadGro - Learn and Earn",
  description: "About | ReadGro - Learn and Earn",
};

const About = async () => {
  return (
    <PageWrapper>
      <main>
        <AboutMain />
      </main>
    </PageWrapper>
  );
};

export default About;
