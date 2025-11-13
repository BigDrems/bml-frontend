import React from "react";
import { analytics } from "@/data/analytics";

function Analytics() {
  return (
    <div className="flex justify-center px-4 md:px-0 mt-8 md:mt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1400px] w-full">
        {analytics.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-4 md:p-6 bg-[#445133] rounded-[5px] shadow-md"
          >
            <h2 className="text-white text-[14px] md:text-[16px] font-inter font-bold">
              {item.title}
            </h2>
            <p className="text-[28px] md:text-[32px] lg:text-[36px] text-white font-bold font-inter self-center py-2 md:py-3">
              {item.value.toLocaleString()}
            </p>          
            <span className="text-[#34FB02] text-[12px] md:text-[13px] italic font-inter">
              +{item.percent}% this month
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;