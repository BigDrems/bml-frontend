import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  habitat: 'all',
  dateRange: { start: '', end: '' },
  selectedTypes: {},
  mapLayer: {
    showProtectedAreas: true,
    opacity: 50
  },
  ui: {
    showObsDate: false,
    showMapLayer: false
  }
};

const speciesFilterSlice = createSlice({
  name: 'speciesFilter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setHabitat: (state, action) => {
      state.habitat = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setMapLayer: (state, action) => {
      state.mapLayer = { ...state.mapLayer, ...action.payload };
    },
    setUI: (state, action) => {
      state.ui = { ...state.ui, ...action.payload };
    },
    toggleSpeciesType: (state, action) => {
      const id = action.payload;
      state.selectedTypes[id] = !state.selectedTypes[id];
    },
    toggleAllTypes: (state, action) => {
      const { shouldSelect, typeIds } = action.payload;
      typeIds.forEach(id => {
        state.selectedTypes[id] = shouldSelect;
      });
    },
    initializeSelectedTypes: (state, action) => {
      const typeIds = action.payload;
      // Only initialize types that don't exist yet (preserve user selections)
      typeIds.forEach(id => {
        if (state.selectedTypes[id] === undefined) {
          state.selectedTypes[id] = true;
        }
      });
    },
    resetFilters: (state) => {
      return initialState;
    }
  }
});

export const { 
  setSearch, 
  setHabitat, 
  setDateRange, 
  setMapLayer,
  setUI,
  toggleSpeciesType, 
  toggleAllTypes,
  initializeSelectedTypes,
  resetFilters 
} = speciesFilterSlice.actions;

export default speciesFilterSlice.reducer;
