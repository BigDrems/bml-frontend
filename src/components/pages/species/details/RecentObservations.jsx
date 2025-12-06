import React from 'react';
import { MapPin } from 'lucide-react';

export const RecentObservations = ({ sightings = [], speciesName, speciesId }) => {
  
  // Get the image URL from sighting data (Supabase storage)
  const getSightingImage = (sighting, index) => {
    if (Array.isArray(sighting.mediaUrls) && sighting.mediaUrls.length > 0) {
      return sighting.mediaUrls[0];
    }
    if (Array.isArray(sighting.media) && sighting.media.length > 0) {
      return typeof sighting.media[0] === 'string' ? sighting.media[0] : sighting.media[0]?.url;
    }
    // Check for single image properties
    if (sighting.imageUrl || sighting.image_url || sighting.image) {
      return sighting.imageUrl || sighting.image_url || sighting.image;
    }
    // Fallback to placeholder
    return `https://placehold.co/400x300/445133/FFF?text=${encodeURIComponent(speciesName)}`;
  };

  if (!sightings || sightings.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-[#445133] font-roboto-serif">Recent Observations</h3>
        <div className="bg-gray-50 rounded-[15px] p-6 text-center border border-dashed border-gray-300">
          <p className="text-sm text-gray-400 italic">No recent observations recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-[#445133] font-roboto-serif">Recent Observations</h3>
      <div className="grid grid-cols-2 gap-4">
        {sightings.slice(0, 2).map((sighting, index) => (
          <div 
            key={sighting.id} 
            className="relative rounded-[15px] overflow-hidden aspect-square group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => handleSightingClick(sighting)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSightingClick(sighting)}
          >
            <img 
              src={getSightingImage(sighting, index)} 
              alt={`Sighting ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center text-xs text-white font-bold mb-1">
                <MapPin className="w-3 h-3 mr-1 text-[#90BE54]" />
                <span>{sighting.locationName || 'Leyte, PH'}</span>
              </div>
              <p className="text-[10px] text-gray-300 font-mono">
                {sighting.observedAt 
                  ? new Date(sighting.observedAt).toLocaleDateString() 
                  : 'Date unknown'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
