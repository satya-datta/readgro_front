import AdminGetUsers from "@/components/layout/main/dashboards/AdminGetUsers";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Users | ReadGro - Learn and Earn",
  description: "Users | ReadGro - Learn and Earn",
};
const Admin_Course = () => {
  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminGetUsers />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Course;
