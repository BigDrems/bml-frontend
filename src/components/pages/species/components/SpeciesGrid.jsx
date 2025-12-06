import React from 'react';
import { SpeciesCard } from './SpeciesCard';
import { SpeciesCardSkeleton } from './SpeciesCardSkeleton';
import { useSpeciesExplorer } from '@/hooks/useSpeciesExplorerRedux';

export const SpeciesGrid = () => {
  const { species, isLoading, error } = useSpeciesExplorer();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(8)].map((_, index) => (
          <SpeciesCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p className="text-lg">Error loading species: {error}</p>
        <p className="text-sm mt-2">Please try again later.</p>
      </div>
    );
  }

  if (species.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No species found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {species.map(item => (
        <SpeciesCard key={item.id} species={item} />
      ))}
    </div>
  );
};
