import React from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const UserBankDetails = ({userId}) => {
  return (
    <form
      className="text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
      data-aos="fade-up"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 mb-15px gap-y-15px gap-x-30px">
        <div>
          <label className="mb-3 block font-semibold">Bank Holder Name</label>
          <input
            type="text"
            placeholder="John"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
          />
        </div>
        <div>
          <label className="mb-3 block font-semibold">Bank Name</label>
          <input
            type="text"
            placeholder="Due"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
          />
        </div>
        <div>
          <label className="mb-3 block font-semibold">Account Number</label>
          <input
            type="text"
            placeholder="Ntaden Mic"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
          />
        </div>
        <div>
          <label className="mb-3 block font-semibold">IFSC CODE</label>
          <input
            type="text"
            placeholder="+1-202-555-0174"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
          />
        </div>
        <div>
          <label className="mb-3 block font-semibold">UPI ID</label>
          <input
            type="text"
            placeholder="+1-202-555-0174"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md font-no"
          />
        </div>
       
      </div>
      

     
    </form>
  );
};

export default UserBankDetails;
