import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Filters
  filters: {
    search: '',
    role: '',
    status: ''
  },
  // Pagination
  pagination: {
    page: 1,
    limit: 10
  },
  // UI State
  ui: {
    activeDropdown: null,
    isFormModalOpen: false,
    isDeleteModalOpen: false
  },
  // Selected user for edit/delete operations
  selectedUser: null
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    // Filter actions
    setSearch: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1; // Reset to first page on search
    },
    setRoleFilter: (state, action) => {
      state.filters.role = action.payload;
      state.pagination.page = 1;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.page = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    
    // Pagination actions
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    nextPage: (state) => {
      state.pagination.page += 1;
    },
    prevPage: (state) => {
      if (state.pagination.page > 1) {
        state.pagination.page -= 1;
      }
    },
    
    // UI actions
    setActiveDropdown: (state, action) => {
      state.ui.activeDropdown = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.ui.activeDropdown = state.ui.activeDropdown === action.payload ? null : action.payload;
    },
    closeDropdown: (state) => {
      state.ui.activeDropdown = null;
    },
    openFormModal: (state, action) => {
      state.ui.isFormModalOpen = true;
      state.selectedUser = action.payload || null;
      state.ui.activeDropdown = null;
    },
    closeFormModal: (state) => {
      state.ui.isFormModalOpen = false;
      state.selectedUser = null;
    },
    openDeleteModal: (state, action) => {
      state.ui.isDeleteModalOpen = true;
      state.selectedUser = action.payload;
      state.ui.activeDropdown = null;
    },
    closeDeleteModal: (state) => {
      state.ui.isDeleteModalOpen = false;
      state.selectedUser = null;
    },
    
    // Selected user
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    }
  }
});

export const {
  // Filters
  setSearch,
  setRoleFilter,
  setStatusFilter,
  resetFilters,
  // Pagination
  setPage,
  setLimit,
  nextPage,
  prevPage,
  // UI
  setActiveDropdown,
  toggleDropdown,
  closeDropdown,
  openFormModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal,
  // Selected user
  setSelectedUser,
  clearSelectedUser
} = userManagementSlice.actions;

// Selectors
export const selectFilters = (state) => state.userManagement.filters;
export const selectPagination = (state) => state.userManagement.pagination;
export const selectUI = (state) => state.userManagement.ui;
export const selectSelectedUser = (state) => state.userManagement.selectedUser;

export default userManagementSlice.reducer;
