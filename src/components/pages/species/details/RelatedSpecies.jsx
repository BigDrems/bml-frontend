import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { getRelatedSpecies } from '@/api/species';

export const RelatedSpecies = ({ currentSpeciesId, type }) => {
  const navigate = useNavigate();
  
  const { data: related = [], isLoading } = useQuery({
    queryKey: ['species', 'related', type, currentSpeciesId],
    queryFn: () => getRelatedSpecies(type, currentSpeciesId, 3),
    enabled: !!type && !!currentSpeciesId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4 text-[#445133] font-roboto-serif">Related Species</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-[15px] bg-gray-100 animate-pulse">
              <div className="w-14 h-14 rounded-[10px] bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (related.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-[#445133] font-roboto-serif">Related Species</h3>
      <div className="space-y-3">
        {related.map(species => (
          <div 
            key={species.id} 
            className="group flex items-center gap-4 p-3 rounded-[15px] bg-white border border-gray-100 hover:border-[#90BE54] hover:shadow-md cursor-pointer transition-all duration-300"
            onClick={() => navigate(`/species/${species.id}`)}
          >
            <img 
              src={species.image || "https://placehold.co/100x100/445133/FFF?text=Img"} 
              alt={species.commonName}
              className="w-14 h-14 rounded-[10px] object-cover shadow-sm group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/100x100/445133/FFF?text=Img";
              }}
            />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-800 group-hover:text-[#445133] transition-colors">{species.commonName}</h4>
              <p className="text-xs text-gray-500 italic">{species.scientificName}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#90BE54] transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
