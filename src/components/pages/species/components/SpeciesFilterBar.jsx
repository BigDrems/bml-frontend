import React from 'react';
import { Search } from 'lucide-react';
import { FilterDropdown } from '../common/FilterDropdown';
import { useSpeciesExplorer } from '@/hooks/useSpeciesExplorerRedux';

export const SpeciesFilterBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    habitatFilter,
    setHabitatFilter,
    statusFilter,
    setStatusFilter
  } = useSpeciesExplorer();

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="flex-1 min-w-64 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search species by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white text-foreground border border-input pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#90BE54]"
        />
      </div>
      
      <FilterDropdown
        value={typeFilter}
        onChange={setTypeFilter}
        options={['bird', 'mammal', 'reptile', 'amphibian', 'fish', 'insect', 'invertebrate', 'plant']}
        label="Type"
      />
      
      <FilterDropdown
        value={habitatFilter}
        onChange={setHabitatFilter}
        options={['forest', 'freshwater', 'marine', 'grassland', 'wetland', 'coastal', 'cave', 'urban']}
        label="Habitat"
      />
      
      <FilterDropdown
        value={statusFilter}
        onChange={setStatusFilter}
        options={['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Data Deficient']}
        label="Conservation Status"
      />
    </div>
  );
};
