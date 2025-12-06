import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HeroSkeleton = () => (
  <div className="w-full min-h-[600px] md:min-h-[891px] p-6 md:p-10 flex flex-col justify-start items-start bg-gray-100">
    <div className="w-full max-w-[923px] bg-gray-200 rounded-[40px] md:rounded-[90px] p-6 md:p-10">
      <Skeleton className="h-12 md:h-20 w-3/4 mb-4" />
      <Skeleton className="h-12 md:h-20 w-1/2 mb-8" />
      <Skeleton className="h-6 md:h-8 w-full mb-2" />
      <Skeleton className="h-6 md:h-8 w-5/6" />
    </div>
    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-19 px-4 md:px-0 md:ml-11 w-full sm:w-auto">
      <Skeleton className="w-full sm:w-[174px] h-[60px] md:h-[69px] rounded-[10px]" />
      <Skeleton className="w-full sm:w-[174px] h-[60px] md:h-[69px] rounded-[10px]" />
    </div>
  </div>
);

const AnalyticsSkeleton = () => (
  <div className="flex justify-center px-4 md:px-0 mt-8 md:mt-15">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1400px] w-full">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-start p-4 md:p-6 bg-gray-100 rounded-[5px] shadow-md h-[120px]">
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  </div>
);

const FeaturedSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-15 px-4 md:px-0 max-w-[1400px] mx-auto">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex flex-col bg-white rounded-[10px] shadow-md overflow-hidden max-w-[400px] mx-auto w-full">
        <Skeleton className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[392px]" />
        <div className="p-4 md:p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-4" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex justify-center pb-4 md:pb-6 mt-3 md:mt-5">
          <Skeleton className="w-[110px] md:w-[130px] h-[40px] md:h-[45px] rounded" />
        </div>
      </div>
    ))}
  </div>
);

const GuideSkeleton = () => (
  <div className="flex flex-col mt-20 md:mt-16 lg:mt-22 px-4 md:px-6 lg:px-0 max-w-[1200px] mx-auto w-full">
    <Skeleton className="h-10 w-64 mb-4" />
    <Skeleton className="h-6 w-full max-w-2xl mb-8" />
    <div className="flex justify-center mt-6 md:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-18 w-full">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center p-4 md:p-6 bg-gray-100 rounded-[5px] w-full shadow-md h-[250px]">
            <Skeleton className="h-16 w-16 rounded-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TestimonialsSkeleton = () => (
  <div className="flex flex-col items-center mt-12 md:mt-22 px-4 w-full">
    <Skeleton className="h-10 w-64 mb-8" />
    <div className="grid items-center justify-center grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">
      {[...Array(2)].map((_, i) => (
        <div key={i} className={`border border-gray-200 rounded-lg p-6 shadow-lg w-full max-w-[539px] min-h-[297px] bg-gray-100 ${i === 0 ? 'rounded-tr-[120px] rounded-bl-[120px]' : 'rounded-tl-[120px] rounded-br-[120px]'}`}>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />
          <Skeleton className="h-4 w-1/2 mt-auto" />
        </div>
      ))}
    </div>
  </div>
);

const FAQSectionSkeleton = () => (
  <div className="py-19 px-4 w-full">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12 flex flex-col items-center">
        <Skeleton className="h-10 w-64 mb-3" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg shadow-md h-16 p-4 flex items-center justify-between">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const HomeSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <HeroSkeleton />
      <AnalyticsSkeleton />
      <FeaturedSkeleton />
      <GuideSkeleton />
      <TestimonialsSkeleton />
      <FAQSectionSkeleton />
    </div>
  );
};
