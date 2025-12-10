import React from 'react';
import { useSpeciesManagement } from '../../../hooks/useSpeciesManagement';
import type { CreateSpeciesInput, UpdateSpeciesInput } from '../../../types/species';
import {
  SpeciesTable,
  SpeciesFormModal,
  DeleteConfirmModal,
  SpeciesFiltersComponent,
} from './components';

export const SpeciesManagement: React.FC = () => {
  const {
    species,
    selectedSpecies,
    isLoading,
    isFormModalOpen,
    isDeleteModalOpen,
    mode,
    filters,
    uniqueFamilies,
    uniqueClasses,
    createMutation,
    updateMutation,
    deleteMutation,
    handleCreateSpecies,
    handleUpdateSpecies,
    handleDeleteSpecies,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseFormModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleUpdateFilter,
    handleClearFilters,
  } = useSpeciesManagement();

  // Ensure species is always an array
  const speciesArray = Array.isArray(species) ? species : [];


  const handleFormSubmit = (data: CreateSpeciesInput) => {
    if (mode === 'create') {
      handleCreateSpecies(data);
    } else if (selectedSpecies) {
      handleUpdateSpecies(selectedSpecies.id, data as UpdateSpeciesInput);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedSpecies) {
      handleDeleteSpecies(selectedSpecies.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Species Management</h1>
          <p className="text-gray-600 mt-1">
            Manage species database and taxonomic information
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Species
        </button>
      </div>

      {/* Filters */}
      <SpeciesFiltersComponent
        filters={filters}
        onUpdateFilter={handleUpdateFilter}
        onClearFilters={handleClearFilters}
        uniqueFamilies={uniqueFamilies}
        uniqueClasses={uniqueClasses}
      />

      {/* Stats */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{speciesArray.length}</p>
            <p className="text-sm text-gray-600">Total Species</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">
              {speciesArray.filter((s) => s.conservationStatus?.includes('Endangered')).length}
            </p>
            <p className="text-sm text-gray-600">Endangered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {speciesArray.filter((s) => s.conservationStatus === 'Vulnerable').length}
            </p>
            <p className="text-sm text-gray-600">Vulnerable</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {new Set(speciesArray.map((s) => s.family).filter(Boolean)).size}
            </p>
            <p className="text-sm text-gray-600">Families</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <SpeciesTable
          species={speciesArray}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </div>

      {/* Form Modal */}
      <SpeciesFormModal
        isOpen={isFormModalOpen}
        mode={mode}
        species={selectedSpecies}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        species={selectedSpecies}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
