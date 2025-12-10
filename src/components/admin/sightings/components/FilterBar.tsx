import React from 'react';
import type { SightingStatus } from '@/store/slices/sightingReviewSlice';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, parseISO } from 'date-fns';

interface FilterBarProps {
  filters: {
    search: string;
    status: SightingStatus;
    speciesId: string;
    startDate: string;
    endDate: string;
  };
  onSearchChange: (value: string) => void;
  onStatusChange: (value: SightingStatus) => void;
  onSpeciesChange: (value: string) => void;
  onDateRangeChange: (startDate: string, endDate: string) => void;
  onResetFilters: () => void;
  speciesList?: Array<{ id: string; commonName: string }>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onSearchChange,
  onStatusChange,
  onSpeciesChange,
  onDateRangeChange,
  onResetFilters,
  speciesList = [],
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by location, user, or notes..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90BE54] focus:border-transparent outline-none transition-all"
          />
        </div>
        <button
          onClick={onResetFilters}
          className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
        >
          Reset Filters
        </button>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <Select value={filters.status} onValueChange={(value) => onStatusChange(value as SightingStatus)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Species Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species
          </label>
          <Select value={filters.speciesId || "all-species"} onValueChange={(value) => onSpeciesChange(value === "all-species" ? "" : value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-species">All Species</SelectItem>
              {speciesList.map((species) => (
                <SelectItem key={species.id} value={species.id}>
                  {species.commonName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <DatePicker
                date={filters.startDate ? parseISO(filters.startDate) : undefined}
                setDate={(date: Date | undefined) => onDateRangeChange(date ? format(date, 'yyyy-MM-dd') : '', filters.endDate)}
                placeholder="Start date"
              />
            </div>
            <div className="flex-1">
              <DatePicker
                date={filters.endDate ? parseISO(filters.endDate) : undefined}
                setDate={(date: Date | undefined) => onDateRangeChange(filters.startDate, date ? format(date, 'yyyy-MM-dd') : '')}
                placeholder="End date"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
