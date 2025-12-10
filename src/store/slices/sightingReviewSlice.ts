import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SightingStatus = 'pending' | 'verified' | 'rejected' | 'all';

interface SightingReviewFilters {
  search: string;
  status: SightingStatus;
  speciesId: string;
  startDate: string;
  endDate: string;
}

interface Pagination {
  page: number;
  limit: number;
}

interface UIState {
  isDetailModalOpen: boolean;
  isRejectModalOpen: boolean;
  isApproveModalOpen: boolean;
  activeDropdown: string | null;
}

interface SightingReviewState {
  filters: SightingReviewFilters;
  pagination: Pagination;
  ui: UIState;
  selectedSightingId: string | null;
}

const initialState: SightingReviewState = {
  filters: {
    search: '',
    status: 'pending',
    speciesId: '',
    startDate: '',
    endDate: '',
  },
  pagination: {
    page: 1,
    limit: 10,
  },
  ui: {
    isDetailModalOpen: false,
    isRejectModalOpen: false,
    isApproveModalOpen: false,
    activeDropdown: null,
  },
  selectedSightingId: null,
};

const sightingReviewSlice = createSlice({
  name: 'sightingReview',
  initialState,
  reducers: {
    // Filter actions
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.pagination.page = 1; // Reset to first page on search
    },
    setStatusFilter: (state, action: PayloadAction<SightingStatus>) => {
      state.filters.status = action.payload;
      state.pagination.page = 1;
    },
    setSpeciesFilter: (state, action: PayloadAction<string>) => {
      state.filters.speciesId = action.payload;
      state.pagination.page = 1;
    },
    setDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.filters.startDate = action.payload.startDate;
      state.filters.endDate = action.payload.endDate;
      state.pagination.page = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },

    // Pagination actions
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },

    // UI actions
    openDetailModal: (state) => {
      state.ui.isDetailModalOpen = true;
    },
    closeDetailModal: (state) => {
      state.ui.isDetailModalOpen = false;
      state.selectedSightingId = null;
    },
    openRejectModal: (state) => {
      state.ui.isRejectModalOpen = true;
    },
    closeRejectModal: (state) => {
      state.ui.isRejectModalOpen = false;
    },
    openApproveModal: (state) => {
      state.ui.isApproveModalOpen = true;
    },
    closeApproveModal: (state) => {
      state.ui.isApproveModalOpen = false;
    },
    setActiveDropdown: (state, action: PayloadAction<string | null>) => {
      state.ui.activeDropdown = action.payload;
    },

    // Selected sighting
    setSelectedSighting: (state, action: PayloadAction<string | null>) => {
      state.selectedSightingId = action.payload;
    },

    // Composite actions
    viewSightingDetails: (state, action: PayloadAction<string>) => {
      state.selectedSightingId = action.payload;
      state.ui.isDetailModalOpen = true;
    },
    initializeRejectSighting: (state, action: PayloadAction<string>) => {
      state.selectedSightingId = action.payload;
      state.ui.isRejectModalOpen = true;
    },
    initializeApproveSighting: (state, action: PayloadAction<string>) => {
      state.selectedSightingId = action.payload;
      state.ui.isApproveModalOpen = true;
    },
  },
});

export const {
  setSearch,
  setStatusFilter,
  setSpeciesFilter,
  setDateRange,
  resetFilters,
  setPage,
  setLimit,
  openDetailModal,
  closeDetailModal,
  openRejectModal,
  closeRejectModal,
  openApproveModal,
  closeApproveModal,
  setActiveDropdown,
  setSelectedSighting,
  viewSightingDetails,
  initializeRejectSighting,
  initializeApproveSighting,
} = sightingReviewSlice.actions;

export default sightingReviewSlice.reducer;
