import CoursesMain from "@/components/layout/main/CoursesMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Courses | ReadGro - Learn and Earn",
  description: "Courses | ReadGro - Learn and Earn",
};

const Courses = async () => {
  return (
    <PageWrapper>
      <main>
        <CoursesMain />
      </main>
    </PageWrapper>
  );
};

export default Courses;
