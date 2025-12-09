import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { SightingStatus } from '@/store/slices/sightingReviewSlice';
import {
  setSearch,
  setStatusFilter,
  setSpeciesFilter,
  setDateRange,
  resetFilters,
  setPage,
  setLimit,
  setActiveDropdown,
  viewSightingDetails,
  initializeRejectSighting,
  initializeApproveSighting,
  closeDetailModal,
  closeRejectModal,
  closeApproveModal,
} from '@/store/slices/sightingReviewSlice';
import {
  useSightings,
  useApproveSighting,
  useRejectSighting,
  useDeleteSighting,
} from '@/hooks/useSightingReview';
import {
  FilterBar,
  SightingsTable,
  Pagination,
  SightingDetailModal,
  RejectModal,
  ApproveModal,
} from './components';
import { ClipboardCheck, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface RootState {
  sightingReview: {
    filters: {
      search: string;
      status: SightingStatus;
      speciesId: string;
      startDate: string;
      endDate: string;
    };
    pagination: {
      page: number;
      limit: number;
    };
    ui: {
      isDetailModalOpen: boolean;
      isRejectModalOpen: boolean;
      isApproveModalOpen: boolean;
      activeDropdown: string | null;
    };
    selectedSightingId: string | null;
  };
}

interface Sighting {
  id: string;
  status: string;
}

const SightingReview: React.FC = () => {
  const dispatch = useDispatch();

  // Redux state
  const filters = useSelector((state: RootState) => state.sightingReview.filters);
  const pagination = useSelector((state: RootState) => state.sightingReview.pagination);
  const ui = useSelector((state: RootState) => state.sightingReview.ui);
  const selectedSightingId = useSelector((state: RootState) => state.sightingReview.selectedSightingId);

  // Build query parameters
  const queryParams = useMemo(() => {
    const params: Record<string, unknown> = {
      page: pagination.page,
      limit: pagination.limit,
    };

    if (filters.search) params.search = filters.search;
    if (filters.status && filters.status !== 'all') params.status = filters.status.toUpperCase();
    if (filters.speciesId) params.speciesId = filters.speciesId;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    return params;
  }, [filters, pagination.page, pagination.limit]);

  // Fetch data
  const { data, isLoading, isError, error } = useSightings(queryParams);

  // Mutations
  const approveMutation = useApproveSighting();
  const rejectMutation = useRejectSighting();
  const deleteMutation = useDeleteSighting();

  // Event handlers
  const handleApprove = (sightingId: string) => {
    dispatch(initializeApproveSighting(sightingId));
  };

  const handleConfirmApprove = () => {
    if (selectedSightingId) {
      approveMutation.mutate(selectedSightingId);
    }
  };

  const handleReject = (sightingId: string) => {
    dispatch(initializeRejectSighting(sightingId));
  };

  const handleConfirmReject = (reason: string) => {
    if (selectedSightingId) {
      rejectMutation.mutate({ sightingId: selectedSightingId, reason });
    }
  };

  const handleDelete = (sightingId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this sighting?')) {
      deleteMutation.mutate(sightingId);
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const sightings = data?.sightings || [];
    const total = data?.pagination?.total || 0;
    
    return {
      total,
      pending: sightings.filter((s: Sighting) => s.status === 'pending').length,
      verified: sightings.filter((s: Sighting) => s.status === 'verified').length,
      rejected: sightings.filter((s: Sighting) => s.status === 'rejected').length,
    };
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ClipboardCheck className="w-8 h-8 text-[#90BE54]" />
          Sighting Review
        </h1>
        <p className="text-gray-600 mt-2">
          Review, approve, or reject wildlife sightings submitted by users
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sightings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-yellow-200 bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-green-200 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Verified</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{stats.verified}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-red-200 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Rejected</p>
              <p className="text-3xl font-bold text-red-900 mt-2">{stats.rejected}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onSearchChange={(value) => dispatch(setSearch(value))}
        onStatusChange={(value) => dispatch(setStatusFilter(value))}
        onSpeciesChange={(value) => dispatch(setSpeciesFilter(value))}
        onDateRangeChange={(start, end) => dispatch(setDateRange({ startDate: start, endDate: end }))}
        onResetFilters={() => dispatch(resetFilters())}
      />

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Error Loading Sightings</h3>
              <p className="text-red-700 text-sm mt-1">
                {error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sightings Table */}
      <SightingsTable
        sightings={data?.sightings || []}
        onViewDetails={(id) => dispatch(viewSightingDetails(id))}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        activeDropdown={ui.activeDropdown}
        onToggleDropdown={(id) => dispatch(setActiveDropdown(id))}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {!isLoading && data && data.pagination.total > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={data.pagination.totalPages}
          totalItems={data.pagination.total}
          itemsPerPage={pagination.limit}
          onPageChange={(page) => dispatch(setPage(page))}
          onItemsPerPageChange={(limit) => dispatch(setLimit(limit))}
        />
      )}

      {/* Detail Modal */}
      <SightingDetailModal
        sightingId={selectedSightingId}
        isOpen={ui.isDetailModalOpen}
        onClose={() => dispatch(closeDetailModal())}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Reject Modal */}
      <RejectModal
        isOpen={ui.isRejectModalOpen}
        onClose={() => dispatch(closeRejectModal())}
        onConfirm={handleConfirmReject}
        sightingId={selectedSightingId}
      />

      {/* Approve Modal */}
      <ApproveModal
        isOpen={ui.isApproveModalOpen}
        onClose={() => dispatch(closeApproveModal())}
        onConfirm={handleConfirmApprove}
        sightingId={selectedSightingId}
      />
    </div>
  );
};

export default SightingReview;
