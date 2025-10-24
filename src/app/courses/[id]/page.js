import CourseDetailsMain from "@/components/layout/main/CourseDetailsMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import courses from "@/../public/fakedata/courses.json";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Course Details | ReadGro - Learn and Earn",
  description: "Course Details | ReadGro - Learn and Earn",
};

const Course_Details = async ({ params }) => {
  const { id } = params;
  const isExistCourse = courses?.find(({ id: id1 }) => id1 === parseInt(id));
  if (!isExistCourse) {
    notFound();
  }
  return (
    <PageWrapper>
      <main>
        <CourseDetailsMain id={id} />
      </main>
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  return courses?.map(({ id }) => ({ id: id.toString() }));
}
export default Course_Details;
