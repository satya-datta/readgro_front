import DashboardFooter from "@/components/layout/footer/DashboardFooter";
import AdminContextProvider from "@/contexts/AdminContext";
import CartContextProvider from "@/contexts/CartContext";
import WishlistContextProvider from "@/contexts/WshlistContext";
import Scrollup from "../others/Scrollup";
import HeroDashboard from "@/components/sections/hero-banners/HeroDashboard";

const AdminWrapper = ({ children }) => {
  return (
    <AdminContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <div className="min-h-screen flex flex-col justify-between">
            {/* Main content with top margin */}
            <HeroDashboard />
            <main className="flex-grow mt-20">{children}</main>

            {/* Footer always at bottom */}
            <DashboardFooter />

            {/* Scroll up button */}
            <Scrollup />
          </div>
        </WishlistContextProvider>
      </CartContextProvider>
    </AdminContextProvider>
  );
};

export default AdminWrapper;
