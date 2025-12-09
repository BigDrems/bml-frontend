import { MapPin } from "lucide-react";
import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getAllSightings } from "@/api/sightings";
import { FEATURED_SIGHTINGS_LIMIT, FEATURED_SIGHTINGS_STATUS, FEATURED_STALE_TIME, FALLBACK_IMAGE } from './const';
import { 
  formatLocation, 
  getSightingImage, 
  getSpeciesCommonName, 
  getConservationStatusClasses, 
  formatObservationDate,
  truncateConservationStatus 
} from './utils';

function Featured() {
  const { data: sightingsData, isLoading, isError } = useQuery({
    queryKey: ['featuredSightings'],
    queryFn: () => getAllSightings({ limit: FEATURED_SIGHTINGS_LIMIT, status: FEATURED_SIGHTINGS_STATUS }),
    staleTime: FEATURED_STALE_TIME,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-15 px-4 md:px-0">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col bg-white rounded-[10px] shadow-[4px_4px_8px_#445133] overflow-hidden max-w-[400px] mx-auto w-full animate-pulse">
            <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[392px] bg-gray-200" />
            <div className="p-4 md:p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="flex justify-center pb-4 md:pb-6 mt-3 md:mt-5">
              <div className="w-[110px] md:w-[130px] h-[40px] md:h-[45px] bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center px-4 md:px-0 mt-8 md:mt-15">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">
          Failed to load featured species. Please try again later.
        </div>
      </div>
    );
  }

  const featuredSightings = sightingsData?.data?.slice(0, FEATURED_SIGHTINGS_LIMIT) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-15 px-4 md:px-0">
        {featuredSightings.map((sighting) => {
          const species = sighting.species || {};
          const imageUrl = getSightingImage(sighting, species);
          const location = formatLocation(sighting);
          const commonName = getSpeciesCommonName(species);
          
          return (
            <div 
              key={sighting.id} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-[400px] mx-auto w-full border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-[300px] md:h-[350px]">
                <img 
                  src={imageUrl || FALLBACK_IMAGE} 
                  alt={commonName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Verified Badge - Top Left */}
                {sighting.status === 'VERIFIED' && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold">Verified</span>
                  </div>
                )}

                {/* Species Type Badge - Top Right */}
                {(species.type || species.speciesType) && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-700">{species.type || species.speciesType}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-gray-900 text-xl md:text-2xl font-bold font-inter mb-2 line-clamp-1">
                  {commonName}
                </h2>

                {/* Scientific Name */}
                {species.scientificName && (
                  <p className="text-sm italic text-gray-500 mb-3">{species.scientificName}</p>
                )}
                
                {/* Location */}
                <div className="flex items-start gap-2 text-gray-600 mb-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-green-600" /> 
                  <span className="text-sm line-clamp-2">{location}</span>
                </div>

                {/* Additional Info Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {species.family && (
                    <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                      {species.family}
                    </div>
                  )}
                  {species.conservationStatus && (
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${getConservationStatusClasses(species.conservationStatus)}`}>
                      {truncateConservationStatus(species.conservationStatus)}
                    </div>
                  )}
                </div>

                {/* Observation Date */}
                {sighting.observedAt && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Observed {formatObservationDate(sighting.observedAt)}</span>
                  </div>
                )}

                {/* Verification Badge */}
                {sighting.verificationStatus === 'VERIFIED' && (
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium w-fit mb-4">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Sighting
                  </div>
                )}

                {/* View Details Button */}
                <div className="mt-auto pt-2">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-[#4F8706] to-[#5FA707] hover:from-[#3F6D05] hover:to-[#4F8706] text-white font-semibold py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  > 
                    <Link to={`/species/${species.id || sighting.speciesId}`} className="flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  )
}

export default Featured