import AdminWebsiteHeroMain from "@/components/layout/main/dashboards/AdminWebsiteHeroMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
export const metadata = {
  title: "Admin Course | ReadGro - Learn and Earn",
  description: "Admin Course | ReadGro - Learn and Earn",
};
const Website_Hero = () => {
  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminWebsiteHeroMain />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Website_Hero;
