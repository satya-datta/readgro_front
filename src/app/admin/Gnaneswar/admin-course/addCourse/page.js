import AdminAddCourseMain from "@/components/layout/main/dashboards/AdminAddCourseMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";

export const metadata = {
  title: "Admin Course | ReadGro - Learn and Earn",
  description: "Admin Course | ReadGro - Learn and Earn",
};
const Admin_Course = () => {
  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminAddCourseMain />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Course;
