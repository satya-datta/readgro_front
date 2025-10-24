"use client"; // Required in Next.js App Router for hooks

import { useParams } from "next/navigation";
import AdmineditCourseMain from "@/components/layout/main/dashboards/AdmineditCourseMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";

const Admin_Course = () => {
  const { course_id } = useParams(); // Extract the course ID from the URL

  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            {/* Pass course_id as a prop */}
            <AdmineditCourseMain course_id={course_id} />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Course;
