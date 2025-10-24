import AdminDashboardMain from "@/components/layout/main/dashboards/AdminDashboardMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Admin Dashboard | ReadGro - Learn and Earn",
  description: "Admin Dashboard | ReadGro - Learn and Earn",
};
const Admin_Dashboard = () => {
  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminDashboardMain />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Dashboard;
