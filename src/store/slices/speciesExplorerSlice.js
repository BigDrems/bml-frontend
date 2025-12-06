import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  // Filters
  searchTerm: "",
  typeFilter: "All",
  habitatFilter: "All",
  statusFilter: "All",
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 8,
};

const speciesExplorerSlice = createSlice({
  name: "speciesExplorer",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
      state.currentPage = 1;
    },
    setHabitatFilter: (state, action) => {
      state.habitatFilter = action.payload;
      state.currentPage = 1;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = "";
      state.typeFilter = "All";
      state.habitatFilter = "All";
      state.statusFilter = "All";
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchTerm,
  setTypeFilter,
  setHabitatFilter,
  setStatusFilter,
  setCurrentPage,
  resetFilters,
} = speciesExplorerSlice.actions;

// Base selectors
const selectSpeciesExplorer = (state) => state.speciesExplorer;

// Memoized selectors using createSelector
export const selectFilters = createSelector(
  [selectSpeciesExplorer],
  (speciesExplorer) => ({
    searchTerm: speciesExplorer.searchTerm,
    typeFilter: speciesExplorer.typeFilter,
    habitatFilter: speciesExplorer.habitatFilter,
    statusFilter: speciesExplorer.statusFilter,
  })
);

export const selectPagination = createSelector(
  [selectSpeciesExplorer],
  (speciesExplorer) => ({
    currentPage: speciesExplorer.currentPage,
    itemsPerPage: speciesExplorer.itemsPerPage,
  })
);

export default speciesExplorerSlice.reducer;
