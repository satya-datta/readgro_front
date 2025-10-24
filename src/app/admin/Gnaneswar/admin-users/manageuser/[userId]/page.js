"use client"; // Required in Next.js App Router for hooks

import { useParams } from "next/navigation";
import ManageUsers from "@/components/layout/main/dashboards/ManageUsers";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";

const Admin_Course = () => {
  const { userId } = useParams(); // Extract the course ID from the URL

  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            {/* Pass course_id as a prop */}
            <ManageUsers userId={userId} />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Course;
