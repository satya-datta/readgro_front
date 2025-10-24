import AdminPayments from "@/components/layout/main/dashboards/AdminPayments";
// import AdminQuizAttemptsMain from "@/components/layout/main/dashboards/AdminQuizAttemptsMain";
// import ManageUsers from "@/components/layout/main/dashboards/ManageUsers";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Admin Quiz Attempts | ReadGro - Learn and Earn",
  description: "Admin Quiz Attempts | ReadGro - Learn and Earn",
};
const Admin_Quiz_Attempts = () => {
  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminPayments />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Quiz_Attempts;
