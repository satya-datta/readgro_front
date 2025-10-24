import CartContextProvider from "@/contexts/CartContext";
import UserContextProvider from "@/contexts/UserContext";
import WishlistContextProvider from "@/contexts/WshlistContext";
import Scrollup from "../others/Scrollup";
import DashboardFooter from "@/components/layout/footer/DashboardFooter";
import UserHeroDashboard from "@/components/sections/hero-banners/UserHeroDashboard";

const LoginWrapper = ({ children }) => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <div className="min-h-screen flex flex-col justify-between">
            {/* Main content with top margin */}
          
            <main className="flex-grow mt-20">{children}</main>

            {/* Footer always at bottom */}
            <DashboardFooter />

            {/* Scroll to top button */}
            <Scrollup />
          </div>
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
};

export default LoginWrapper;
