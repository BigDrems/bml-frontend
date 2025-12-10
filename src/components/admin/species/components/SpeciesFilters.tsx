import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { conservationStatuses } from './constants';
import type { SpeciesFiltersProps } from './types';

export const SpeciesFiltersComponent: React.FC<SpeciesFiltersProps> = ({
  filters,
  onUpdateFilter,
  onClearFilters,
  uniqueFamilies,
  uniqueClasses,
}) => {
  const hasActiveFilters = Object.values(filters).some((value) => value);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onUpdateFilter('search', e.target.value)}
            placeholder="Common or scientific name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Conservation Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conservation Status
          </label>
          <Select
            value={filters.conservationStatus || 'all'}
            onValueChange={(value) => onUpdateFilter('conservationStatus', value === 'all' ? '' : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {conservationStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Family</label>
          <Select
            value={filters.family || 'all'}
            onValueChange={(value) => onUpdateFilter('family', value === 'all' ? '' : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Families" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Families</SelectItem>
              {uniqueFamilies.map((family) => (
                <SelectItem key={family} value={family}>
                  {family}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <Select
            value={filters.class || 'all'}
            onValueChange={(value) => onUpdateFilter('class', value === 'all' ? '' : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {uniqueClasses.map((className) => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
