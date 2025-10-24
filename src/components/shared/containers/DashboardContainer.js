"use client";
import SidebarDashboard from "../dashboards/SidebarDashboard";

const DashboardContainer = ({ children }) => {
  return (
    <section className="w-full pt-0 pb-8 px-4 md:px-8 relative">
      {/* Main layout container */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:w-1/4">
          <SidebarDashboard />
        </div>

        {/* Main Dashboard Content */}
        <div className="w-full lg:w-3/4">{children}</div>
      </div>
    </section>
  );
};

export default DashboardContainer;
