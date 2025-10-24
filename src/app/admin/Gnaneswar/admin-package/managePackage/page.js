import AdminGetPackageMain from "@/components/layout/main/dashboards/AdminGetPackageMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
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
            <AdminGetPackageMain />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Course;
