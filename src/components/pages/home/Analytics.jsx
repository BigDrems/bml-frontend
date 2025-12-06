import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/api/analytics";

function Analytics() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const analyticsItems = [
    {
      title: "Total Species",
      value: stats?.totalSpecies || 0,
      percent: stats?.percentages?.species || 0,
    },
    {
      title: "Total Observations",
      value: stats?.totalObservations || 0,
      percent: stats?.percentages?.observations || 0,
    },
    {
      title: "Active Contributors",
      value: stats?.activeContributors || 0,
      percent: stats?.percentages?.contributors || 0,
    },
    {
      title: "Protected Areas",
      value: stats?.protectedAreas || 0,
      percent: stats?.percentages?.protectedAreas || 0,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center px-4 md:px-0 mt-8 md:mt-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1400px] w-full">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 md:p-6 bg-[#445133] rounded-[5px] shadow-md animate-pulse"
            >
              <div className="h-4 bg-white/20 rounded w-24 mb-3"></div>
              <div className="h-10 bg-white/20 rounded w-20 self-center my-2"></div>
              <div className="h-3 bg-white/20 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center px-4 md:px-0 mt-8 md:mt-15">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">
          Failed to load analytics. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 md:px-0 mt-8 md:mt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1400px] w-full">
        {analyticsItems.map((item, index) => (
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
            {item.percent !== 0 && (
              <span className="text-[#34FB02] text-[12px] md:text-[13px] italic font-inter">
                {item.percent >= 0 ? '+' : ''}{item.percent}% this month
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
