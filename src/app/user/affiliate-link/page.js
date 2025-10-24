import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import UserAffiliateForm from "@/components/shared/dashboards/UserAffiliateForm";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
import UserDashboardWrapper from "@/components/shared/wrappers/UserDashboardWrapper";
export const metadata = {
  title: "Student Reviews | ReadGro - Learn and Earn",
  description: "Student Reviews | ReadGro - Learn and Earn",
};
const Student_Reviews = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50  to-yellow-50">
      <PlainWrapper>
        <main>
          <UserDashboardWrapper>
            <DashboardContainer>
              <UserAffiliateForm />
            </DashboardContainer>
          </UserDashboardWrapper>
        </main>
      </PlainWrapper>
    </div>
  );
};

export default Student_Reviews;
