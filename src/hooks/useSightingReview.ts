import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllSightings, 
  getSightingById, 
  approveSighting, 
  rejectSighting,
  deleteSighting 
} from '@/api/sightings';
import { toast } from 'sonner';

interface AxiosError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Query keys
export const sightingKeys = {
  all: ['sightings'],
  lists: () => [...sightingKeys.all, 'list'],
  list: (filters: Record<string, unknown>) => [...sightingKeys.lists(), filters],
  details: () => [...sightingKeys.all, 'detail'],
  detail: (id: string) => [...sightingKeys.details(), id],
};

/**
 * Hook to fetch paginated sightings list with filters
 * @param {Object} filters - Query filters (page, limit, status, speciesId, search, startDate, endDate)
 * @returns {Object} Query result with sightings data
 */
export const useSightings = (filters = {}) => {
  return useQuery({
    queryKey: sightingKeys.list(filters),
    queryFn: () => getAllSightings(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sightings: (data.data || []).map((sighting: any) => ({
        ...sighting,
        status: sighting.status?.toLowerCase() || 'pending',
      })),
      pagination: {
        page: data.page || 1,
        limit: data.limit || 10,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.limit || 10)),
      },
    }),
  });
};

/**
 * Hook to fetch a single sighting by ID
 * @param {string} sightingId - Sighting ID
 * @returns {Object} Query result with sighting details
 */
export const useSighting = (sightingId: string) => {
  return useQuery({
    queryKey: sightingKeys.detail(sightingId),
    queryFn: () => getSightingById(sightingId),
    enabled: !!sightingId && sightingId !== 'skip',
    staleTime: 1000 * 60 * 5, // 5 minutes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (data: any) => ({
      ...data,
      status: data?.status?.toLowerCase() || 'pending',
    }),
  });
};

/**
 * Hook to approve a sighting
 * @returns {Object} Mutation object with approve function
 */
export const useApproveSighting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sightingId: string) => approveSighting(sightingId),
    onMutate: async (sightingId: string) => {
      // Show optimistic loading toast
      toast.loading('Approving sighting...', { id: `approve-${sightingId}` });
    },
    onSuccess: (_data, sightingId: string) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: sightingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sightingKeys.detail(sightingId) });
      
      // Show success toast
      toast.success('Sighting approved successfully!', { 
        id: `approve-${sightingId}`,
        description: 'The sighting has been verified and is now visible to all users.',
      });
    },
    onError: (error: AxiosError, sightingId: string) => {
      const errorMessage = error?.response?.data?.message || 'Failed to approve sighting';
      toast.error('Approval failed', { 
        id: `approve-${sightingId}`,
        description: errorMessage,
      });
    },
  });
};

/**
 * Hook to reject a sighting
 * @returns {Object} Mutation object with reject function
 */
export const useRejectSighting = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, { sightingId: string; reason: string }>({
    mutationFn: ({ sightingId, reason }) => rejectSighting(sightingId, reason),
    onMutate: async ({ sightingId }) => {
      toast.loading('Rejecting sighting...', { id: `reject-${sightingId}` });
    },
    onSuccess: (_data, { sightingId }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: sightingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sightingKeys.detail(sightingId) });
      
      toast.success('Sighting rejected', { 
        id: `reject-${sightingId}`,
        description: 'The user will be notified about the rejection.',
      });
    },
    onError: (error, { sightingId }) => {
      const errorMessage = error?.response?.data?.message || 'Failed to reject sighting';
      toast.error('Rejection failed', { 
        id: `reject-${sightingId}`,
        description: errorMessage,
      });
    },
  });
};

/**
 * Hook to delete a sighting
 * @returns {Object} Mutation object with delete function
 */
export const useDeleteSighting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sightingId: string) => deleteSighting(sightingId),
    onMutate: async (sightingId: string) => {
      toast.loading('Deleting sighting...', { id: `delete-${sightingId}` });
    },
    onSuccess: (_data, sightingId: string) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: sightingKeys.lists() });
      queryClient.removeQueries({ queryKey: sightingKeys.detail(sightingId) });
      
      toast.success('Sighting deleted', { 
        id: `delete-${sightingId}`,
        description: 'The sighting has been permanently removed.',
      });
    },
    onError: (error: AxiosError, sightingId: string) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete sighting';
      toast.error('Deletion failed', { 
        id: `delete-${sightingId}`,
        description: errorMessage,
      });
    },
  });
};

/**
 * Hook for batch operations on sightings
 * @returns {Object} Mutation object for batch approve/reject
 */
export const useBatchApproveSightings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sightingIds: string[]) => {
      return Promise.all(sightingIds.map((id: string) => approveSighting(id)));
    },
    onMutate: () => {
      toast.loading('Approving multiple sightings...', { id: 'batch-approve' });
    },
    onSuccess: (_data, sightingIds: string[]) => {
      queryClient.invalidateQueries({ queryKey: sightingKeys.lists() });
      
      toast.success(`${sightingIds.length} sightings approved!`, { 
        id: 'batch-approve',
        description: 'All selected sightings have been verified.',
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error?.response?.data?.message || 'Failed to approve sightings';
      toast.error('Batch approval failed', { 
        id: 'batch-approve',
        description: errorMessage,
      });
    },
  });
};
