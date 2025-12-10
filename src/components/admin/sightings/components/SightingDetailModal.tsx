import React, { useEffect } from 'react';
import { X, MapPin, Calendar, User, FileText, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useSighting } from '@/hooks/useSightingReview';

interface MediaItem {
  id: string;
  url: string;
  mimetype: string;
  createdAt: string;
  sightingId: string;
}

interface SightingData {
  id: string;
  species?: {
    commonName: string;
    scientificName: string;
  };
  location?: {
    name: string;
    coordinates: [number, number];
  };
  user?: {
    name: string;
    email: string;
  };
  observedAt: string;
  status: string;
  media?: MediaItem[];
  notes?: string;
  createdAt: string;
}

interface SightingDetailModalProps {
  sightingId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const SightingDetailModal: React.FC<SightingDetailModalProps> = ({
  sightingId,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const { data: sighting, isLoading } = useSighting(sightingId || 'skip');
  const sightingData = sighting as SightingData | undefined;

  // Debug: Log sighting data to console
  useEffect(() => {
    if (sightingData) {
      console.log('Sighting Data:', sightingData);
      console.log('Media URLs:', sightingData.media);
    }
  }, [sightingData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      verified: { bg: 'bg-green-100', text: 'text-green-800', label: 'Verified' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Sighting Details</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              {isLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ) : sightingData ? (
                <div className="space-y-6">
                  {/* Photos */}
                  {sightingData.media && sightingData.media.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Photos ({sightingData.media.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sightingData.media.map((mediaItem: MediaItem, index: number) => (
                          <div key={mediaItem.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={mediaItem.url}
                              alt={`Sighting photo ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                              onClick={() => window.open(mediaItem.url, '_blank')}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Species Information */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Species Information</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Common Name</label>
                        <p className="text-base text-gray-900 font-medium">
                          {sightingData.species?.commonName || 'Unknown'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Scientific Name</label>
                        <p className="text-base text-gray-900 italic">
                          {sightingData.species?.scientificName || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Location
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location Name</label>
                        <p className="text-base text-gray-900">
                          {sightingData.location?.name || 'Unknown Location'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Coordinates</label>
                        <p className="text-base text-gray-900 font-mono">
                          {sightingData.location?.coordinates
                            ? `${sightingData.location.coordinates[1].toFixed(6)}, ${sightingData.location.coordinates[0].toFixed(6)}`
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Observation Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Observation Details
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Observed At</label>
                        <p className="text-base text-gray-900">
                          {format(new Date(sightingData.observedAt), 'MMMM dd, yyyy h:mm a')}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <div className="mt-1">{getStatusBadge(sightingData.status)}</div>
                      </div>
                    </div>
                  </div>

                  {/* User Information */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Submitted By
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Name</label>
                        <p className="text-base text-gray-900">
                          {sightingData.user?.name || 'Anonymous'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-base text-gray-900">
                          {sightingData.user?.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {sightingData.notes && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Notes
                      </h3>
                      <p className="text-base text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                        {sightingData.notes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Sighting not found</p>
                </div>
              )}
            </div>

            {/* Footer - Action Buttons */}
            {sightingData && sightingData.status === 'pending' && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    onReject(sightingData.id);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
                <button
                  onClick={() => {
                    onApprove(sightingData.id);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#90BE54] text-white rounded-lg hover:bg-[#7DA045] transition-colors font-medium"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SightingDetailModal;
