/**
 * Utility functions for species management
 */

import type { Species } from '../../../types/species';

/**
 * Get conservation status color class
 */
export const getConservationStatusColor = (status?: string): string => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  const lowerStatus = status.toLowerCase();
  
  if (lowerStatus.includes('critically endangered')) {
    return 'bg-red-100 text-red-800';
  }
  if (lowerStatus.includes('endangered')) {
    return 'bg-orange-100 text-orange-800';
  }
  if (lowerStatus.includes('vulnerable')) {
    return 'bg-yellow-100 text-yellow-800';
  }
  if (lowerStatus.includes('near threatened')) {
    return 'bg-yellow-50 text-yellow-700';
  }
  if (lowerStatus.includes('least concern')) {
    return 'bg-green-100 text-green-800';
  }
  if (lowerStatus.includes('extinct')) {
    return 'bg-black text-white';
  }
  
  return 'bg-gray-100 text-gray-800';
};

/**
 * Format species name for display
 */
export const formatSpeciesName = (species: Species): string => {
  return `${species.commonName} (${species.scientificName})`;
};

/**
 * Get unique taxonomic values
 */
export const getUniqueTaxonomicValues = (
  species: Species[],
  field: 'family' | 'order' | 'class'
): string[] => {
  const values = species
    .map((s) => s[field])
    .filter((value): value is string => Boolean(value));
  
  return Array.from(new Set(values)).sort();
};

/**
 * Filter species by search term
 */
export const filterSpeciesBySearch = (
  species: Species[],
  searchTerm: string
): Species[] => {
  if (!searchTerm.trim()) return species;
  
  const term = searchTerm.toLowerCase();
  
  return species.filter(
    (s) =>
      s.commonName.toLowerCase().includes(term) ||
      s.scientificName.toLowerCase().includes(term) ||
      s.family?.toLowerCase().includes(term) ||
      s.order?.toLowerCase().includes(term)
  );
};

/**
 * Sort species by field
 */
export const sortSpecies = (
  species: Species[],
  field: keyof Species,
  order: 'asc' | 'desc' = 'asc'
): Species[] => {
  return [...species].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return 0;
  });
};

/**
 * Export species to CSV
 */
export const exportSpeciesToCSV = (species: Species[]): void => {
  const headers = [
    'ID',
    'Common Name',
    'Scientific Name',
    'Family',
    'Order',
    'Class',
    'Conservation Status',
    'Created At',
  ];
  
  const rows = species.map((s) => [
    s.id,
    s.commonName,
    s.scientificName,
    s.family || '',
    s.order || '',
    s.class || '',
    s.conservationStatus || '',
    s.createdAt,
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `species_export_${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
