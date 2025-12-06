import React, { useState, useMemo, createContext, useContext, useEffect } from 'react';

const SpeciesExplorerContext = createContext();

export const useSpeciesExplorerContext = () => {
  const context = useContext(SpeciesExplorerContext);
  if (!context) {
    throw new Error('useSpeciesExplorerContext must be used within a SpeciesExplorerProvider');
  }
  return context;
};

// Fetch species from API
async function fetchSpecies() {
  try {
    const response = await fetch('http://localhost:5000/api/species');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
}

export const SpeciesExplorerProvider = ({ children }) => {
  const [allSpecies, setAllSpecies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [habitatFilter, setHabitatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8; 

  // Fetch species data from API on mount
  useEffect(() => {
    const loadSpecies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchSpecies();
        setAllSpecies(data || []);
      } catch (err) {
        setError(err.message);
        setAllSpecies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpecies();
  }, []);

  const filteredSpecies = useMemo(() => {
    return allSpecies.filter(s => {
      const matchesSearch = s.commonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           s.scientificName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || s.type === typeFilter;
      const matchesHabitat = habitatFilter === 'All' || s.habitat === habitatFilter;
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      
      return matchesSearch && matchesType && matchesHabitat && matchesStatus;
    });
  }, [allSpecies, searchTerm, typeFilter, habitatFilter, statusFilter]);

  const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
  
  const paginatedSpecies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSpecies.slice(start, start + itemsPerPage);
  }, [filteredSpecies, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = {
    searchTerm, setSearchTerm,
    typeFilter, setTypeFilter,
    habitatFilter, setHabitatFilter,
    statusFilter, setStatusFilter,
    species: paginatedSpecies,
    totalItems: filteredSpecies.length,
    currentPage, 
    totalPages,
    onPageChange: handlePageChange,
    itemsPerPage,
    isLoading,
    error
  };

  return (
    <SpeciesExplorerContext.Provider value={value}>
      {children}
    </SpeciesExplorerContext.Provider>
  );
};
