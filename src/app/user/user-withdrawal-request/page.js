import RGWithdrawlRequest from "@/components/layout/main/dashboards/RGWithdrawlRequest";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Instructor Announcements | ReadGro - Learn and Earn",
  description: "Instructor Announcements | ReadGro - Learn and Earn",
};
const Instructor_Announcements = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
      <PlainWrapper>
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <RGWithdrawlRequest />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </PlainWrapper>
    </div>
  );
};

export default Instructor_Announcements;
