import React from 'react';
import { Search } from 'lucide-react';

export const SpeciesSearch = ({ name = 'speciesQuery' }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#445133]">
        What did you see?
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          name={name}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#90BE54] focus:border-transparent transition outline-none"
          placeholder="Search for a species (e.g., Red Fox)"
        />
      </div>
    </div>
  );
};
