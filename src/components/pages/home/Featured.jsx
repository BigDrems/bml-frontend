import { MapPin } from "lucide-react";
import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getAllSightings } from "@/api/sightings";

function Featured() {
  const { data: sightingsData, isLoading, isError } = useQuery({
    queryKey: ['featuredSightings'],
    queryFn: () => getAllSightings({ limit: 3, status: 'VERIFIED' }),
    staleTime: 1000 * 60 * 5, // 5 minutes
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

  const featuredSightings = sightingsData?.data?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-15 px-4 md:px-0">
        {featuredSightings.map((sighting) => {
          const species = sighting.species || {};
          const imageUrl = sighting.mediaUrls?.[0] || species.imageUrl || species.image_url || species.image;
          const location = sighting.locationName || "Leyte, Philippines";
          
          return (
            <div key={sighting.id} className="flex flex-col bg-white rounded-[10px] shadow-[4px_4px_8px_#445133] overflow-hidden max-w-[400px] mx-auto w-full">
              <img 
                src={imageUrl || "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image"} 
                alt={species.commonName || "Species"} 
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[392px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image";
                }}
              />
              <div className="p-4 md:p-6">
                <h2 className="text-black text-[18px] md:text-[20px] lg:text-[24px] font-inter font-bold">{species.commonName || "Unknown Species"}</h2>
                <p className="text-green-900 text-[9px] md:text-[15px] italic font-inter">{species.type || species.speciesType}</p>
                <p className="text-black text-[12px] md:text-[13px] font-inter italic flex items-center pt-2">
                  <MapPin size={18} className="mr-2 md:mr-2" color="green" /> 
                  <span className="md:hidden">{location.length > 30 ? location.substring(0, 30) + '...' : location}</span>
                  <span className="hidden md:inline">{location}</span>
                </p>
              </div>
              <div className="flex justify-center pb-4 md:pb-6 mt-3 md:mt-5">
                <Button asChild variant="outline" className="w-[110px] md:w-[130px] h-[40px] md:h-[45px] !bg-[#4F8706] !text-white text-[14px] md:text-[16px] border-none"> 
                  <Link to={`/species/${species.id || sighting.speciesId}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  )
}

export default Featured