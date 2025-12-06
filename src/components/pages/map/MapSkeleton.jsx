import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const MapSkeleton = () => {
  return (
    <div className="relative flex h-[calc(100vh-4rem)] bg-gray-100 mb-10 mt-2 shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 z-40">
        {/* Filter Header Skeleton */}
        <div className="p-4 border-b border-gray-200">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Species Filter Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Sections Skeleton */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}

          {/* Habitat Filter Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Map View Skeleton */}
      <div className="flex-1 relative bg-gray-200">
        {/* Map Controls Skeleton */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        
        {/* Legend Skeleton */}
        <div className="absolute bottom-8 right-4 z-10 bg-white p-3 rounded shadow-md w-40">
          <Skeleton className="h-4 w-20 mb-2" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
