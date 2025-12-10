import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapPin, Info, Calendar, ArrowRight } from 'lucide-react';
import { POPUP_CONFIG, DEFAULT_FALLBACK_IMAGE } from './const';
import { formatSightingDate, getSightingImageUrl, getUnsplashFallback, getFullLocation} from './utils';
import { formatLocation } from '../home/utils/featuredHelpers';
import { getIconBySpecies } from './utils/getIconBySpecies';

export const SightingMarker = ({ species, sighting }) => {
    
  const navigate = useNavigate();
  const icon = getIconBySpecies(species.type);
  const imageUrl = getSightingImageUrl(sighting, species);


  const handleViewDetails = () => {
    navigate(`/species/${species.id}`);
  };

  return (
    <Marker position={[sighting.lat, sighting.lng]} icon={icon}>
      <Popup 
        className="custom-popup" 
        minWidth={260} 
        maxWidth={260}
        autoPanPadding={POPUP_CONFIG.autoPanPadding}
        autoPan={POPUP_CONFIG.autoPan}
      >
        <div className="overflow-hidden rounded-xl shadow-lg">
          {/* Image Header with Gradient Overlay */}
          <div className="relative w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200">
            <img 
              src={imageUrl || getUnsplashFallback(species.commonName)}
              alt={species.commonName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = DEFAULT_FALLBACK_IMAGE;
              }}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Species type badge */}
            {species.type && (
              <div className="absolute top-2 left-2 bg-green-600/90 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg uppercase tracking-wide">
                {species.type}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 bg-white">
            {/* Species Names */}
            <div className="mb-3">
              <h3 className="font-bold text-base text-gray-900 mb-1 leading-tight">
                {species.commonName?.split(',')[0]?.trim() || species.commonName}
              </h3>
              <p className="italic text-xs text-gray-500">{species.scientificName}</p>
            </div>

            {/* Location Information */}

            <div className="space-y-2 mb-3">
              {(sighting.locationName || sighting.municipality) && (
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium leading-tight line-clamp-2">{getFullLocation(sighting)}</span>
                </div>
              )}

              {/* Conservation Status */}
              {species.conservationStatus && (
                <div className="flex items-center gap-2 text-xs">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-700 leading-tight">
                    {species.conservationStatus}
                  </span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 py-2 text-xs">
                <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className="text-gray-700 leading-tight">
                  {formatSightingDate(sighting.date)}
                </span>
              </div>
            </div>

            {/* View Details Button */}
            <button 
              onClick={handleViewDetails}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
