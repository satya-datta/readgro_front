import CheckoutWeb from "@/components/sections/checkout/CheckoutWeb";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const CheckoutMain = ({ coursename }) => {
  console.log(coursename);
  return (
    <>
      {/* <HeroPrimary path={"Checkout"} title={"Checkout"} /> */}
      <CheckoutWeb coursename={coursename} />
    </>
  );
};

export default CheckoutMain;
