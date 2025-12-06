import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { SpeciesHero } from '@/components/pages/species/details/SpeciesHero';
import { SpeciesOverview } from '@/components/pages/species/details/SpeciesOverview';
import { ConservationStatus } from '@/components/pages/species/details/ConservationStatus';
import { RecentObservations } from '@/components/pages/species/details/RecentObservations';
import { RelatedSpecies } from '@/components/pages/species/details/RelatedSpecies';
import { getSpeciesById } from '@/api/species';
import { getAllSightings } from '@/api/sightings';

const SpeciesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Try to get species from cached list first (from Species Explorer)
  const getCachedSpecies = () => {
    const cachedList = queryClient.getQueryData(['species']);
    if (cachedList && Array.isArray(cachedList)) {
      return cachedList.find(s => s.id === id || s.id === parseInt(id));
    }
    return undefined;
  };

  // Fetch species data - uses cache as initial/placeholder data
  const { 
    data: species, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['species', id],
    queryFn: () => getSpeciesById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: getCachedSpecies, // Use cached data immediately if available
  });

  // Fetch recent sightings for this species
  const { data: sightingsData } = useQuery({
    queryKey: ['sightings', 'species', id],
    queryFn: () => getAllSightings({ speciesId: id, limit: 5 }),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const sightings = sightingsData?.data || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90BE54] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading species details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
        <h1 className="text-3xl font-bold mb-4 font-roboto-serif text-red-500">Error loading species</h1>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button 
          onClick={() => navigate('/species')}
          className="bg-[#90BE54] hover:bg-[#7da845] text-white"
        >
          Back to Explorer
        </Button>
      </div>
    );
  }

  if (!species) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
        <h1 className="text-3xl font-bold mb-4 font-roboto-serif text-[#445133]">Species not found</h1>
        <Button 
          onClick={() => navigate('/species')}
          className="bg-[#90BE54] hover:bg-[#7da845] text-white"
        >
          Back to Explorer
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <SpeciesHero species={species} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <SpeciesOverview species={species} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-10">
            <ConservationStatus status={species.conservationStatus || 'Least Concern'} species={species} />
            <RecentObservations sightings={sightings} speciesName={species.commonName} speciesId={species.id} />
            <RelatedSpecies currentSpeciesId={species.id} type={species.type} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetails;
