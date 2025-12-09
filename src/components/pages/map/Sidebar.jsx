import  {FilterHeader } from "./filters/FilterHeader";
import  {SightingFilter} from "./filters/SightingFilter";
import  {CollapsibleSection } from "./CollapsibleSection";
import { MapLayerControls} from "./MapLayerControl";
import { HabitatFilter } from "./filters/HabitatFilter";
import { ObservationDateFilter } from "./filters/ObservationDateFilter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Sidebar = ({
  filters,
  uiState,
  speciesTypes = [],
  habitatTypes = [],
  onUpdateUI,
  onUpdateFilter,
  onToggleSpecies,
  onToggleAll
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Destructure for easier access, providing defaults if undefined
  const {
    search = '',
    habitat = 'all',
    dateRange = { start: '', end: '' },
    selectedTypes = {}
  } = filters || {};

  const {
    showObsDate = false,
    showMapLayer = false,
    protectedAreaOpacity = 50,
    showProtectedAreas = true
  } = uiState || {};

  const handleDateChange = (type, value) => {
     onUpdateFilter('dateRange', { ...dateRange, [type]: value });
  };

  return (
    <>
      {/* Mobile Toggle Button - Only visible on small screens */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden absolute top-4 left-4 z-[1010] bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle filters"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile - transparent to keep map visible */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[1150]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative
          top-0 left-0
          h-full
          bg-white shadow-lg
          flex flex-col
          z-[1200] lg:z-40
          transition-transform duration-300 ease-in-out
          w-72 sm:w-80 lg:w-72
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button for mobile - inside sidebar */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <FilterHeader />
        
        <div className="flex-1 overflow-y-auto">
          <SightingFilter
            speciesTypes={speciesTypes}
            selectedSpecies={selectedTypes}
            onToggleSpecies={onToggleSpecies}
            onToggleAll={onToggleAll}
            searchTerm={search}
            onSearchChange={(e) => onUpdateFilter('search', e.target.value)}
          />

          <CollapsibleSection
            title="Observation Date"
            isOpen={showObsDate}
            onToggle={() => onUpdateUI('showObsDate', !showObsDate)}
          >
            <ObservationDateFilter 
              startDate={dateRange.start}
              endDate={dateRange.end}
              onDateChange={handleDateChange}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Map Layer"
            isOpen={showMapLayer}
            onToggle={() => onUpdateUI('showMapLayer', !showMapLayer)}
          >
            <MapLayerControls
              opacity={protectedAreaOpacity}
              onOpacityChange={(e) => onUpdateUI('protectedAreaOpacity', Number(e.target.value))}
              showProtectedAreas={showProtectedAreas}
              onToggleProtectedAreas={() => onUpdateUI('showProtectedAreas', !showProtectedAreas)}
            />
          </CollapsibleSection>

          <HabitatFilter 
            value={habitat} 
            onChange={(e) => onUpdateFilter('habitat', e.target.value)}
            habitatTypes={habitatTypes}
          />
        </div>
      </div>
    </>
  );
};
