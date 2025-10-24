import StudentProfileMain from "@/components/layout/main/dashboards/StudentProfileMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Profile | ReadGro - Learn and Earn",
  description: "Student Profile | ReadGro - Learn and Earn",
};
const Student_Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
      <PlainWrapper>
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <StudentProfileMain />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </PlainWrapper>
    </div>
  );
};

export default Student_Profile;
