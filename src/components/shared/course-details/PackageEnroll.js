"use client";
import Image from "next/image";
import PopupVideo from "../popup/PopupVideo";
import blogImage7 from "@/assets/images/blog/blog_7.png";
import { useCartContext } from "@/contexts/CartContext";
import getAllCourses from "@/libs/getAllCourses";

const PackageEnroll = ({ type,price }) => {
  const discount = 0.68; // 68% off
  const originalPrice = (price / (1 - discount)).toFixed(2); // Calculate original price and format it to 2 decimal places
  
  return (
    <div
      className="py-33px px-25px shadow-event mb-30px bg-whiteColor dark:bg-whiteColor-dark rounded-md"
      data-aos="fade-up"
    >
     
      {/* meeting thumbnail  */}

      <div
        className={`flex justify-between  ${
          type === 2 ? "mt-50px mb-5" : type === 3 ? "mb-50px" : "mb-5"
        }`}
      >
        <div className="text-size-21 font-bold text-primaryColor font-inter leading-25px">
        ₹{price}

          <del className="text-sm text-lightGrey4 font-semibold">/{originalPrice}</del>
        </div>
        <div>
          <a
            href="#"
            className="uppercase text-sm font-semibold text-secondaryColor2 leading-27px px-2 bg-whitegrey1 dark:bg-whitegrey1-dark"
          >
            68% OFF
          </a>
        </div>
      </div>
      <div className="mb-5" data-aos="fade-up">
        
        <button className="w-full text-size-15 text-whiteColor bg-secondaryColor px-25px py-10px mb-10px leading-1.8 border border-secondaryColor hover:text-secondaryColor hover:bg-whiteColor inline-block rounded group dark:hover:text-secondaryColor dark:hover:bg-whiteColor-dark">
          Buy Now
        </button>

       
      </div>
     
      
    </div>
  );
};

export default PackageEnroll;
