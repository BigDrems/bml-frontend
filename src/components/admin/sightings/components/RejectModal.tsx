import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  sightingId: string | null;
}

const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    onConfirm(reason);
    handleClose();
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const commonReasons = [
    'Poor image quality',
    'Incorrect species identification',
    'Duplicate submission',
    'Insufficient evidence',
    'Invalid location data',
    'Does not meet verification standards',
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Reject Sighting</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Please provide a reason for rejecting this sighting. This will help the user understand 
                why their submission was not approved.
              </p>

              {/* Quick select reasons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Common Reasons (click to use)
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonReasons.map((commonReason) => (
                    <button
                      key={commonReason}
                      onClick={() => setReason(commonReason)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                        reason === commonReason
                          ? 'bg-red-50 border-red-300 text-red-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {commonReason}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom reason textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter the reason for rejection..."
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> The user will receive a notification with this reason. 
                  Please be clear and constructive in your feedback.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50 rounded-b-2xl">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectModal;
