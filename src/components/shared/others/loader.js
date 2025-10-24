import Image from "next/image";
import spinnerImage from "@/assets/images/rg.png";
const Testloader = () => {
  return (
    <div className="preloader flex  h-screen w-full items-center justify-center  bg-whiteColor transition-all duration-700 ">
      {/* spinner  */}
      <div className="w-50px h-50px border-5px border-t-green border-r-green border-b-green-light border-l-green-light rounded-full animate-spin-infinit"></div>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default Testloader;
