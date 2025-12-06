import React, { useEffect, useRef } from 'react';
import { useUserManagement } from '@/hooks/useUsers';
import { toast } from 'sonner';
import UserFormModal from './UserFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
  UserHeader,
  UserFilters,
  UserTable,
  UserPagination,
  UserLoadingSkeleton,
  UserErrorState
} from './components';

function UserManagement() {
  const dropdownRef = useRef(null);
  
  // Use the combined hook for Redux state and TanStack Query
  const {
    // Redux State
    filters,
    pagination,
    ui,
    selectedUser,
    
    // TanStack Query data
    users,
    total,
    totalPages,
    isLoading,
    isError,
    
    // Mutations
    deleteUserMutation,
    
    // Actions
    handleSearch,
    handleRoleFilter,
    handleStatusFilter,
    handlePageChange,
    handleToggleDropdown,
    handleCloseDropdown,
    handleEdit,
    handleCloseFormModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteUser,
    handleToggleStatus,
    handleRefetch
  } = useUserManagement();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleCloseDropdown]);

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteUser();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleStatusToggle = async (user) => {
    try {
      await handleToggleStatus(user);
      toast.success(`User ${user.status === 'active' ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  if (isLoading) {
    return <UserLoadingSkeleton />;
  }

  if (isError) {
    return <UserErrorState onRetry={handleRefetch} />;
  }

  return (
    <div className="space-y-6">
      <UserHeader />

      <UserFilters
        filters={filters}
        onSearch={handleSearch}
        onRoleFilter={handleRoleFilter}
        onStatusFilter={handleStatusFilter}
      />

      <div className="bg-white rounded-xl border border-[#90BE54]/30 overflow-visible">
        <UserTable
          users={users}
          activeDropdown={ui.activeDropdown}
          dropdownRef={dropdownRef}
          onToggleDropdown={handleToggleDropdown}
          onDelete={handleOpenDeleteModal}
        />

        <UserPagination
          pagination={pagination}
          total={total}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      {ui.isFormModalOpen && (
        <UserFormModal
          user={selectedUser}
          isOpen={ui.isFormModalOpen}
          onClose={handleCloseFormModal}
        />
      )}

      {ui.isDeleteModalOpen && (
        <DeleteConfirmModal
          isOpen={ui.isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          isLoading={deleteUserMutation.isPending}
          title="Delete User"
          message={`Are you sure you want to delete "${selectedUser?.displayName}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
}

export default UserManagement;
