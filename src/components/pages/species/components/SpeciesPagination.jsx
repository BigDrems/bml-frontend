import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSpeciesExplorer } from '@/hooks/useSpeciesExplorerRedux';

export const SpeciesPagination = () => {
  const { 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalItems, 
    itemsPerPage 
  } = useSpeciesExplorer();

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    // Simple pagination logic: show all if small, or window around current
    // For simplicity, let's show max 5 buttons
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            currentPage === i
              ? 'bg-[#90BE54] hover:bg-[#7da845] text-white'
              : 'bg-white border border-input hover:bg-accent text-foreground'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
      <span>
        Showing {startItem}-{endItem} of {totalItems} results
      </span>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded bg-white border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-white border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
