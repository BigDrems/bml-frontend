import React from 'react';
import type { DeleteConfirmModalProps } from './types';

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  species,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen || !species) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Species</h3>
            <p className="text-sm text-gray-500">This action cannot be undone</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{species.commonName}</span>
            {' '}(<span className="italic">{species.scientificName}</span>)?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            All associated data will be permanently removed from the database.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            Delete Species
          </button>
        </div>
      </div>
    </div>
  );
};
