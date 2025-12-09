import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import * as speciesAPI from '../api/species';
import type { Species, CreateSpeciesInput, UpdateSpeciesInput, SpeciesFilters } from '../types/species';
import {
  openCreateModal,
  openEditModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal,
  setFilters,
  updateFilter,
  clearFilters,
} from '../store/slices/speciesManagementSlice';
import { toast } from 'react-hot-toast';

// Toast notification helper
const showToast = {
  success: (message: string) => {
    toast.success(message) 
  },
  error: (message: string) => {
    toast.error(message);
  },
};

// RootState type 
interface RootState {
  speciesManagement: {
    selectedSpecies: Species | null;
    isFormModalOpen: boolean;
    isDeleteModalOpen: boolean;
    filters: SpeciesFilters;
    mode: 'create' | 'edit';
  };
}

// API Error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

/**
 * Custom hook for species management with TanStack Query and Redux
 */
export const useSpeciesManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const { selectedSpecies, isFormModalOpen, isDeleteModalOpen, filters, mode } = useSelector(
    (state: RootState) => state.speciesManagement
  );

  // Query: Fetch all species
  const {
    data: species = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Species[]>({
    queryKey: ['species', filters],
    queryFn: () => speciesAPI.getAllSpecies(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query: Fetch single species
  const useSpeciesById = (id: string | undefined) => {
    return useQuery<Species>({
      queryKey: ['species', id],
      queryFn: () => speciesAPI.getSpeciesById(id!),
      enabled: !!id,
    });
  };

  // Mutation: Create species
  const createMutation = useMutation({
    mutationFn: (data: CreateSpeciesInput) => speciesAPI.createSpecies(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['species'] });
      dispatch(closeFormModal());
      showToast.success(response.message || 'Species created successfully');
    },
    onError: (error: ApiError) => {
      showToast.error(error.response?.data?.message || 'Failed to create species');
    },
  });

  // Mutation: Update species
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpeciesInput }) =>
      speciesAPI.updateSpecies(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['species'] });
      dispatch(closeFormModal());
      showToast.success(response.message || 'Species updated successfully');
    },
    onError: (error: ApiError) => {
      showToast.error(error.response?.data?.message || 'Failed to update species');
    },
  });

  // Mutation: Delete species
  const deleteMutation = useMutation({
    mutationFn: (id: string) => speciesAPI.deleteSpecies(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['species'] });
      dispatch(closeDeleteModal());
      showToast.success(response.message || 'Species deleted successfully');
    },
    onError: (error: ApiError) => {
      showToast.error(error.response?.data?.message || 'Failed to delete species');
    },
  });

  // Handler functions
  const handleCreateSpecies = (data: CreateSpeciesInput) => {
    createMutation.mutate(data);
  };

  const handleUpdateSpecies = (id: string, data: UpdateSpeciesInput) => {
    updateMutation.mutate({ id, data });
  };

  const handleDeleteSpecies = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleOpenCreateModal = () => {
    dispatch(openCreateModal());
  };

  const handleOpenEditModal = (species: Species) => {
    dispatch(openEditModal(species));
  };

  const handleCloseFormModal = () => {
    dispatch(closeFormModal());
  };

  const handleOpenDeleteModal = (species: Species) => {
    dispatch(openDeleteModal(species));
  };

  const handleCloseDeleteModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleSetFilters = (newFilters: SpeciesFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleUpdateFilter = (key: keyof SpeciesFilters, value: string) => {
    dispatch(updateFilter({ key, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return {
    // Data
    species,
    selectedSpecies,
    isLoading,
    isError,
    error,
    
    // Modal states
    isFormModalOpen,
    isDeleteModalOpen,
    mode,
    filters,
    
    // Query hooks
    useSpeciesById,
    
    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,
    
    // Actions
    handleCreateSpecies,
    handleUpdateSpecies,
    handleDeleteSpecies,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseFormModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleSetFilters,
    handleUpdateFilter,
    handleClearFilters,
    refetch,
  };
};
