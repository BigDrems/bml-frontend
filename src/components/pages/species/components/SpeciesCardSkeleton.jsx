import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const SpeciesCardSkeleton = () => {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-[4/3] w-full">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};
