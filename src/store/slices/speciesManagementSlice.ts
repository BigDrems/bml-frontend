import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Species, SpeciesManagementState, SpeciesFilters } from '../../types/species';

const initialState: SpeciesManagementState = {
  selectedSpecies: null,
  isFormModalOpen: false,
  isDeleteModalOpen: false,
  filters: {},
  mode: 'create',
};

const speciesManagementSlice = createSlice({
  name: 'speciesManagement',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isFormModalOpen = true;
      state.mode = 'create';
      state.selectedSpecies = null;
    },
    openEditModal: (state, action: PayloadAction<Species>) => {
      state.isFormModalOpen = true;
      state.mode = 'edit';
      state.selectedSpecies = action.payload;
    },
    closeFormModal: (state) => {
      state.isFormModalOpen = false;
      state.selectedSpecies = null;
    },
    openDeleteModal: (state, action: PayloadAction<Species>) => {
      state.isDeleteModalOpen = true;
      state.selectedSpecies = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.selectedSpecies = null;
    },
    setFilters: (state, action: PayloadAction<SpeciesFilters>) => {
      state.filters = action.payload;
    },
    updateFilter: (state, action: PayloadAction<{ key: keyof SpeciesFilters; value: string }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    resetState: () => initialState,
  },
});

export const {
  openCreateModal,
  openEditModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal,
  setFilters,
  updateFilter,
  clearFilters,
  resetState,
} = speciesManagementSlice.actions;

export default speciesManagementSlice.reducer;
