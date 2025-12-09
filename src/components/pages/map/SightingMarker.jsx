import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { POPUP_CONFIG, DEFAULT_FALLBACK_IMAGE } from './const';
import { createSightingIcon, formatSightingDate, getSightingImageUrl, getUnsplashFallback } from './utils';

export const SightingMarker = ({ species, sighting }) => {
  const navigate = useNavigate();
  const icon = createSightingIcon(species.type);

  // Get the image URL from sighting media or species image
  const imageUrl = getSightingImageUrl(sighting, species);

  const handleViewDetails = () => {
    navigate(`/species/${species.id}`);
  };

  return (
    <Marker position={[sighting.lat, sighting.lng]} icon={icon}>
      <Popup 
        className="custom-popup" 
        minWidth={POPUP_CONFIG.minWidth} 
        maxWidth={POPUP_CONFIG.maxWidth}
        autoPanPadding={POPUP_CONFIG.autoPanPadding}
        autoPan={POPUP_CONFIG.autoPan}
      >
        <div className="overflow-hidden rounded-lg">
          {/* Image Header */}
          <div className="h-32 w-full bg-gray-100 relative">
            <img 
              src={imageUrl || getUnsplashFallback(species.commonName)}
              alt={species.commonName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = DEFAULT_FALLBACK_IMAGE;
              }}
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
              {formatSightingDate(sighting.date)}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 bg-white">
            <h3 className="font-bold text-xl text-gray-900 mb-1">{species.commonName}</h3>
            <p className="italic text-sm text-gray-500 mb-2">{species.scientificName}</p>
            
            {sighting.locationName && (
              <p className="text-xs text-gray-500 mb-2">📍 {sighting.locationName}</p>
            )}
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {sighting.notes || species.description}
            </p>

            <button 
              onClick={handleViewDetails}
              className="w-full text-center text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
