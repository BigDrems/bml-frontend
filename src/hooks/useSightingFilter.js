import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSearch, 
  setHabitat, 
  setDateRange, 
  setMapLayer,
  setUI,
  toggleSpeciesType as toggleSpeciesTypeAction, 
  toggleAllTypes as toggleAllTypesAction,
  initializeSelectedTypes
} from '../store/slices/speciesFilterSlice';

/**
 * Hook for filtering sighting data on the map
 * Filters are applied to verified sightings grouped by species
 * @param {Array} speciesData - Species objects with their associated sightings
 * @param {Array} speciesTypes - Available species types from sighting data
 */
export const useSightingFilter = (speciesData, speciesTypes = []) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.speciesFilter);

  // Initialize selected types when speciesTypes changes
  useEffect(() => {
    if (speciesTypes.length > 0) {
      dispatch(initializeSelectedTypes(speciesTypes.map(t => t.id)));
    }
  }, [speciesTypes, dispatch]);

  const updateFilter = (key, value) => {
    switch (key) {
      case 'search':
        dispatch(setSearch(value));
        break;
      case 'habitat':
        dispatch(setHabitat(value));
        break;
      case 'dateRange':
        dispatch(setDateRange(value));
        break;
      case 'mapLayer':
        dispatch(setMapLayer(value));
        break;
      case 'ui':
        dispatch(setUI(value));
        break;
      default:
        break;
    }
  };

  const toggleSpeciesType = (id) => {
    dispatch(toggleSpeciesTypeAction(id));
  };
  
  const toggleAllTypes = (shouldSelect) => {
    dispatch(toggleAllTypesAction({ shouldSelect, typeIds: speciesTypes.map(t => t.id) }));
  };
  
  const filteredSpecies = useMemo(() => {
    const { dateRange, selectedTypes, habitat, search } = filters;

    // First, filter sightings by date range
    return speciesData.map(species => {
      const filteredSightings = species.sightings.filter(sighting => {
        if (!dateRange.start && !dateRange.end) return true;
        
        // Filter by observation date from sighting
        if (!sighting.date) return true;
        
        const sightingDate = new Date(sighting.date);
        // Get just the date part (YYYY-MM-DD) for comparison
        const sightingDateOnly = new Date(sightingDate.getFullYear(), sightingDate.getMonth(), sightingDate.getDate());

        if (dateRange.start) {
          const startParts = dateRange.start.split('-');
          const start = new Date(parseInt(startParts[0]), parseInt(startParts[1]) - 1, parseInt(startParts[2]));
          if (sightingDateOnly < start) return false;
        }

        if (dateRange.end) {
          const endParts = dateRange.end.split('-');
          const end = new Date(parseInt(endParts[0]), parseInt(endParts[1]) - 1, parseInt(endParts[2]));
          if (sightingDateOnly > end) return false;
        }
        
        return true;
      });

      return { ...species, sightings: filteredSightings };
    }).filter(species => {
      
      // Must have verified sightings after date filter
      if (species.sightings.length === 0) return false;

      // Filter by Species Type from sighting data (e.g., bird, mammal)
      if (!selectedTypes[species.type]) return false;

      // Filter by Habitat from sighting data
      if (habitat !== 'all' && species.habitat !== habitat) return false;

      // Filter by Search Term on species name from sighting data
      if (search) {
        const term = search.toLowerCase();
        const matchesCommon = species.commonName?.toLowerCase().includes(term);
        const matchesScientific = species.scientificName?.toLowerCase().includes(term);
        if (!matchesCommon && !matchesScientific) return false;
      }

      return true;
    });
  }, [speciesData, filters]); 

  return {
    filters,
    updateFilter,
    toggleSpeciesType,
    toggleAllTypes,
    filteredSpecies
  };
};