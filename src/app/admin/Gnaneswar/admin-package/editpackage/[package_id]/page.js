"use client";
import AdminEditPackageMain from "@/components/layout/main/dashboards/AdminEditPackageMain";
// import AdminGetPackageMain from "@/components/layout/main/dashboards/AdminGetPackageMain";
import DashboardContainer from "@/components/shared/containers/DashboardContainer";
import { useParams } from "next/navigation";

import DsahboardWrapper from "@/components/shared/wrappers/DsahboardWrapper";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";

const Admin_Package = () => {
  const { package_id } = useParams(); // Extract the course ID from the URL

  return (
    <AdminWrapper>
      <main>
        <DsahboardWrapper>
          <DashboardContainer>
            <AdminEditPackageMain package_id={package_id} />
          </DashboardContainer>
        </DsahboardWrapper>
      </main>
    </AdminWrapper>
  );
};

export default Admin_Package;
