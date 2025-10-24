import CourseDetailsMainUser from "@/components/layout/main/CourseDeailsMainUser";

import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Enrolled Courses | ReadGro - Learn and Earn",
  description: "Student Enrolled Courses | ReadGro - Learn and Earn",
};
const Student_Enrolled_Courses = ({ params }) => {
  const { id } = params;
  return (
    <PlainWrapper>
      <main>
        <UserDashboardWrapper>
          <DashboardContainer>
            <CourseDetailsMainUser id={id} />
          </DashboardContainer>
        </UserDashboardWrapper>
      </main>
    </PlainWrapper>
  );
};

export default Student_Enrolled_Courses;
