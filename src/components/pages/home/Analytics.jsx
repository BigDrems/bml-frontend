import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/api/analytics";
import { ANALYTICS_ITEMS_CONFIG, ANALYTICS_STALE_TIME } from './const';
import { transformAnalyticsData } from './utils';

function Analytics() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
    staleTime: ANALYTICS_STALE_TIME,
  });

  const analyticsItems = transformAnalyticsData(stats, ANALYTICS_ITEMS_CONFIG);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full">
        {analyticsItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#90BE54]/10 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-3">
                {item.title}
              </h2>
              <p className="text-5xl font-bold font-inter text-[#445133] mb-3">
                {item.value.toLocaleString()}
              </p>          
              {item.percent !== 0 && (
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    item.percent >= 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <svg 
                      className={`w-4 h-4 ${item.percent >= 0 ? '' : 'rotate-180'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>{Math.abs(item.percent)}%</span>
                  </div>
                  <span className="text-xs text-gray-500">this month</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
