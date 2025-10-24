import AdminDashboardMain from "@/components/layout/main/dashboards/AdminDashboardMain";
import StudentSettingsMain from "@/components/layout/main/dashboards/StudentSettingsMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Settings | ReadGro - Learn and Earn",
  description: "Student Settings | ReadGro - Learn and Earn",
};
const Student_Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
      <PlainWrapper>
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <StudentSettingsMain />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </PlainWrapper>
    </div>
  );
};

export default Student_Settings;
