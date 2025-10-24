import StudentProfileMain from "@/components/layout/main/dashboards/StudentProfileMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import UserKYC from "@/components/layout/main/dashboards/UserKYC";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Student Message | ReadGro - Learn and Earn",
  description: "Student Message | ReadGro - Learn and Earn",
};
const Student_Message = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
      <PlainWrapper>
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <UserKYC />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </PlainWrapper>
    </div>
  );
};

export default Student_Message;
