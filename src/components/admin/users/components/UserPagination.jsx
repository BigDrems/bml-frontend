import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function UserPagination({ pagination, total, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const { page, limit } = pagination;
  const startItem = ((page - 1) * limit) + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        Showing {startItem} to {endItem} of {total} users
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === i + 1
                  ? 'bg-[#90BE54] text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default UserPagination;
