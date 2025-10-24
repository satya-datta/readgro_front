import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PackageMain from "@/components/layout/main/PackageMain";
export const metadata = {
  title: "Plans | ReadGro - Learn and Earn",
  description: "Plans | ReadGro - Learn and Earn",
};

const Courses = async () => {
  return (
    <PageWrapper>
      <main>
        <PackageMain />
      </main>
    </PageWrapper>
  );
};

export default Courses;
