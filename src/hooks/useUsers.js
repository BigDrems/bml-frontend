import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  updateUserRole, 
  updateUserStatus 
} from '@/api/users';

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
 * Combined hook for User Management with local state and TanStack Query
 * @returns {Object} User management state and actions
 */
export const useUserManagement = () => {
  const queryClient = useQueryClient();
  
  // Local state instead of Redux
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: ''
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });
  
  const [ui, setUI] = useState({
    activeDropdown: null,
    isFormModalOpen: false,
    isDeleteModalOpen: false
  });
  
  const [selectedUser, setSelectedUser] = useState(null);
  
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
    handleSearch: (value) => {
      setFilters(prev => ({ ...prev, search: value }));
      setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on search
    },
    handleRoleFilter: (value) => {
      setFilters(prev => ({ ...prev, role: value === 'all' ? '' : value }));
      setPagination(prev => ({ ...prev, page: 1 }));
    },
    handleStatusFilter: (value) => {
      setFilters(prev => ({ ...prev, status: value === 'all' ? '' : value }));
      setPagination(prev => ({ ...prev, page: 1 }));
    },
    handleResetFilters: () => {
      setFilters({ search: '', role: '', status: '' });
      setPagination(prev => ({ ...prev, page: 1 }));
    },
    
    // Pagination actions
    handlePageChange: (page) => {
      setPagination(prev => ({ ...prev, page }));
    },
    handleNextPage: () => {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    },
    handlePrevPage: () => {
      setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
    },
    
    // Dropdown actions
    handleToggleDropdown: (userId) => {
      setUI(prev => ({
        ...prev,
        activeDropdown: prev.activeDropdown === userId ? null : userId
      }));
    },
    handleCloseDropdown: () => {
      setUI(prev => ({ ...prev, activeDropdown: null }));
    },
    
    // Modal actions
    handleEdit: (user) => {
      setSelectedUser(user);
      setUI(prev => ({ ...prev, isFormModalOpen: true }));
    },
    handleCloseFormModal: () => {
      setUI(prev => ({ ...prev, isFormModalOpen: false }));
      setSelectedUser(null);
    },
    handleOpenDeleteModal: (user) => {
      setSelectedUser(user);
      setUI(prev => ({ ...prev, isDeleteModalOpen: true }));
    },
    handleCloseDeleteModal: () => {
      setUI(prev => ({ ...prev, isDeleteModalOpen: false }));
      setSelectedUser(null);
    },
    
    // Async actions
    handleDeleteUser: async () => {
      if (!selectedUser) return;
      await deleteUserMutation.mutateAsync(selectedUser.id);
      setUI(prev => ({ ...prev, isDeleteModalOpen: false }));
      setSelectedUser(null);
    },
    
    handleToggleStatus: async (user) => {
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      await updateStatusMutation.mutateAsync({ userId: user.id, status: newStatus });
      setUI(prev => ({ ...prev, activeDropdown: null }));
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
