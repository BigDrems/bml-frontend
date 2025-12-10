import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sightingId: string | null;
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Approve Sighting</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Are you sure you want to approve this sighting? Once approved, it will be marked as verified 
                and will be visible to all users on the map and species pages.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> The user who submitted this sighting will be notified of the approval.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50 rounded-b-2xl">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 bg-[#90BE54] text-white rounded-lg hover:bg-[#7DA045] transition-colors font-medium"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproveModal;
