import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  setSearchTerm,
  setTypeFilter,
  setHabitatFilter,
  setStatusFilter,
  setCurrentPage,
  resetFilters,
  selectFilters,
  selectPagination,
} from "@/store/slices/speciesExplorerSlice";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch species from API
const fetchSpecies = async () => {
  const response = await fetch(`${API_URL}/species`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  // Backend returns { page, limit, total, data } - extract the data array
  return result.data || result;
};

export const useSpeciesExplorer = () => {
  const dispatch = useDispatch();

  // Redux selectors for filters and pagination state
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);

  // TanStack Query for data fetching
  const {
    data: allSpecies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["species"],
    queryFn: fetchSpecies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter species based on Redux filter state
  const filteredSpecies = useMemo(() => {
    const { searchTerm, typeFilter, habitatFilter, statusFilter } = filters;

    return allSpecies.filter((s) => {
      const matchesSearch =
        s.commonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.scientificName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "All" ||
        s.speciesType?.toLowerCase() === typeFilter.toLowerCase();
      const matchesHabitat =
        habitatFilter === "All" ||
        s.habitat?.toLowerCase().includes(habitatFilter.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        s.conservationStatus?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesType && matchesHabitat && matchesStatus;
    });
  }, [allSpecies, filters]);

  // Paginate filtered species
  const paginatedSpecies = useMemo(() => {
    const { currentPage, itemsPerPage } = pagination;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSpecies.slice(start, start + itemsPerPage);
  }, [filteredSpecies, pagination]);

  // Pagination info
  const paginationInfo = useMemo(() => {
    const { currentPage, itemsPerPage } = pagination;
    const totalItems = filteredSpecies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      startItem: totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0,
      endItem: Math.min(currentPage * itemsPerPage, totalItems),
    };
  }, [filteredSpecies.length, pagination]);

  // Actions
  const updateSearchTerm = useCallback(
    (value) => dispatch(setSearchTerm(value)),
    [dispatch]
  );

  const updateTypeFilter = useCallback(
    (value) => dispatch(setTypeFilter(value)),
    [dispatch]
  );

  const updateHabitatFilter = useCallback(
    (value) => dispatch(setHabitatFilter(value)),
    [dispatch]
  );

  const updateStatusFilter = useCallback(
    (value) => dispatch(setStatusFilter(value)),
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(
    () => dispatch(resetFilters()),
    [dispatch]
  );

  return {
    // Filters
    searchTerm: filters.searchTerm,
    typeFilter: filters.typeFilter,
    habitatFilter: filters.habitatFilter,
    statusFilter: filters.statusFilter,

    // Filter actions
    setSearchTerm: updateSearchTerm,
    setTypeFilter: updateTypeFilter,
    setHabitatFilter: updateHabitatFilter,
    setStatusFilter: updateStatusFilter,
    resetFilters: handleResetFilters,

    // Data
    species: paginatedSpecies,
    isLoading,
    error: error?.message || null,

    // Pagination
    ...paginationInfo,
    onPageChange: handlePageChange,
  };
};
