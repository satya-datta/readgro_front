import RGUserTeam from "@/components/layout/main/dashboards/RGUserTeam";

import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student My Quiz Attempts | ReadGro - Learn and Earn",
  description: "Student My Quiz Attempts | ReadGro - Learn and Earn",
};
const Student_My_Quiz_Attempts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
      <PlainWrapper>
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <RGUserTeam />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </PlainWrapper>
    </div>
  );
};

export default Student_My_Quiz_Attempts;
