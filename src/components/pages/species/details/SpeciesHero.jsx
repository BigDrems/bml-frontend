import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const SpeciesHero = ({ species }) => {
  const navigate = useNavigate();
  
  // Handle different image URL field names from API
  const imageUrl = species.imageUrl || species.image_url || species.image || species.photo_url || species.photoUrl;

  return (
    <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-lg group">
      <img
        src={imageUrl || "https://placehold.co/1200x600/e2e8f0/1e293b?text=No+Image"}
        alt={species.commonName}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/1200x600/e2e8f0/1e293b?text=No+Image";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#445133]/90 via-black/20 to-transparent" />
      
      <div className="absolute top-6 left-6 z-10">
         <Button 
            variant="ghost" 
            className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:text-white border border-white/30 rounded-full px-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
        <div className="max-w-7xl mx-auto transform translate-y-0 transition-transform duration-500">
          <h1 className="text-5xl md:text-7xl font-bold mb-3 font-roboto-serif tracking-tight drop-shadow-lg">{species.commonName}</h1>
          <p className="text-2xl md:text-3xl italic opacity-90 font-light font-inter text-[#90BE54]">{species.scientificName}</p>
        </div>
      </div>
    </div>
  );
};
