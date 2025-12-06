import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SPECIES_LIST } from '@/data/constant/species';
import { useNavigate } from 'react-router-dom';

const getSpeciesColor = (type) => {
  const species = SPECIES_LIST.find(s => s.id === type?.toLowerCase());
  return species ? species.color : '#7f8c8d';
};

const createSpeciesIcon = (type) => {
  const color = getSpeciesColor(type);
  
  return L.divIcon({
    className: 'custom-species-marker',
    html: `<div style="filter: drop-shadow(0 3px 3px rgba(0,0,0,0.4));">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="${color}">
        <path d="M12 0c-4.418 0-8 3.582-8 8 0 5.018 7.2 15.8 8 16 .8-.2 8-10.982 8-16 0-4.418-3.582-8-8-8z" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3.5" fill="white"/>
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

export const SpeciesMarker = ({ species, sighting }) => {
  const navigate = useNavigate();
  const icon = createSpeciesIcon(species.type);

  // Get the image URL from sighting media or species image
  const imageUrl = sighting.imageUrl || 
    (sighting.media && sighting.media.length > 0 ? sighting.media[0].url : null) ||
    species.image;

  const handleViewDetails = () => {
    navigate(`/species/${species.id}`);
  };

  return (
    <Marker position={[sighting.lat, sighting.lng]} icon={icon}>
      <Popup 
        className="custom-popup" 
        minWidth={280} 
        maxWidth={280}
        autoPanPadding={[50, 50]}
        autoPan={true}
      >
        <div className="overflow-hidden rounded-lg">
          {/* Image Header */}
          <div className="h-32 w-full bg-gray-100 relative">
            <img 
              src={imageUrl || `https://source.unsplash.com/400x300/?${species.commonName?.replace(' ', '+')}`}
              alt={species.commonName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop';
              }}
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
              {sighting.date ? new Date(sighting.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown date'}
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
