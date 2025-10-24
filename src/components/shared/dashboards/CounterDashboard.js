"use client";
import { useEffect } from "react";
import CountDashboard from "./CountDashboard";
import counterUp from "@/libs/counterup";

const CounterDashboard = ({ counts, children }) => {
  // useEffect(() => {
  //   counterUp();
  // });
  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      {children ? children : ""}

      {/* counter area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {counts.map((count, index) => (
          <CountDashboard key={index} count={count} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CounterDashboard;
