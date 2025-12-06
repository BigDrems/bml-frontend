import React from 'react';
import { SpeciesFilterBar } from './components/SpeciesFilterBar';
import { SpeciesGrid } from './components/SpeciesGrid';
import { SpeciesPagination } from './components/SpeciesPagination';

const SpeciesExplorerContent = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Explore Species</h1>

        {/* Search and Filters */}
        <SpeciesFilterBar />

        {/* Species Grid */}
        <SpeciesGrid />

        {/* Pagination */}
        <SpeciesPagination />
      </div>
    </div>
  );
};

export default SpeciesExplorerContent;