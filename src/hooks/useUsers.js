import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  updateUserRole, 
  updateUserStatus 
} from '@/api/users';
import {
  selectFilters,
  selectPagination,
  selectUI,
  selectSelectedUser,
  setSearch,
  setRoleFilter,
  setStatusFilter,
  resetFilters,
  setPage,
  toggleDropdown,
  closeDropdown,
  openFormModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal
} from '@/store/slices/userManagementSlice';

// Query keys
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), filters],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],
};

/**
 * Hook to fetch paginated users list
 * @param {Object} filters - Query filters
 * @returns {Object} Query result
 */
export const useUsers = (filters = {}) => {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => getUsers(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: (previousData) => previousData,
  });
};

/**
 * Hook to fetch a single user by ID
 * @param {string} userId - User ID
 * @returns {Object} Query result
 */
export const useUser = (userId) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to update an existing user
 * @returns {Object} Mutation result
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.userId), data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * Hook to delete a user
 * @returns {Object} Mutation result
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, userId) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * Hook to update user role
 * @returns {Object} Mutation result
 */
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.userId), data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * Hook to update user status
 * @returns {Object} Mutation result
 */
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }) => updateUserStatus(userId, status),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.userId), data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * Combined hook for User Management with Redux state and TanStack Query
 * @returns {Object} User management state and actions
 */
export const useUserManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  // Redux state
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const ui = useSelector(selectUI);
  const selectedUser = useSelector(selectSelectedUser);
  
  // TanStack Query
  const usersQuery = useUsers({
    page: pagination.page,
    limit: pagination.limit,
    search: filters.search,
    role: filters.role,
    status: filters.status
  });
  
  const deleteUserMutation = useDeleteUser();
  const updateStatusMutation = useUpdateUserStatus();
  const updateUserMutation = useUpdateUser();
  
  // Actions
  const actions = {
    // Filter actions
    handleSearch: (value) => dispatch(setSearch(value)),
    handleRoleFilter: (value) => dispatch(setRoleFilter(value === 'all' ? '' : value)),
    handleStatusFilter: (value) => dispatch(setStatusFilter(value === 'all' ? '' : value)),
    handleResetFilters: () => dispatch(resetFilters()),
    
    // Pagination actions
    handlePageChange: (page) => dispatch(setPage(page)),
    handleNextPage: () => dispatch(setPage(pagination.page + 1)),
    handlePrevPage: () => dispatch(setPage(Math.max(1, pagination.page - 1))),
    
    // Dropdown actions
    handleToggleDropdown: (userId) => dispatch(toggleDropdown(userId)),
    handleCloseDropdown: () => dispatch(closeDropdown()),
    
    // Modal actions
    handleEdit: (user) => dispatch(openFormModal(user)),
    handleCloseFormModal: () => dispatch(closeFormModal()),
    handleOpenDeleteModal: (user) => dispatch(openDeleteModal(user)),
    handleCloseDeleteModal: () => dispatch(closeDeleteModal()),
    
    // Async actions
    handleDeleteUser: async () => {
      if (!selectedUser) return;
      await deleteUserMutation.mutateAsync(selectedUser.id);
      dispatch(closeDeleteModal());
    },
    
    handleToggleStatus: async (user) => {
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      await updateStatusMutation.mutateAsync({ userId: user.id, status: newStatus });
      dispatch(closeDropdown());
    },
    
    handleRefetch: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    }
  };
  
  return {
    // State
    filters,
    pagination,
    ui,
    selectedUser,
    
    // Query data - Handle different API response structures
    // Could be: { data: [...] }, { users: [...] }, or just [...]
    users: usersQuery.data?.data || usersQuery.data?.users || (Array.isArray(usersQuery.data) ? usersQuery.data : []),
    total: usersQuery.data?.total || usersQuery.data?.totalCount || usersQuery.data?.data?.length || 0,
    totalPages: usersQuery.data?.totalPages || usersQuery.data?.pages || 1,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    isFetching: usersQuery.isFetching,
    
    // Mutations
    deleteUserMutation,
    updateStatusMutation,
    updateUserMutation,
    
    // Actions
    ...actions
  };
};
