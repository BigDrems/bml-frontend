import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const SpeciesHero = ({ species }) => {
  const navigate = useNavigate();
  
  // Handle different image URL field names from API
  const imageUrl = species.imageUrl || species.image_url || species.image || species.photo_url || species.photoUrl;

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
         <Button 
            variant="ghost" 
            className="bg-white shadow-lg text-gray-900 hover:bg-gray-50 border border-gray-200 rounded-full px-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="order-2 lg:order-1 space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-roboto-serif tracking-tight text-gray-900">
                {species.commonName?.split(',')[0]?.trim() || species.commonName}
              </h1>
              <p className="text-2xl md:text-3xl italic font-light font-inter text-[#90BE54]">
                {species.scientificName}
              </p>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-3">
              {species.family && (
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {species.family}
                </div>
              )}
              {species.class && (
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                 {species.class}
                </div>
              )}
              {species.conservationStatus && (
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  species.conservationStatus?.includes('Endangered') 
                    ? 'bg-red-100 text-red-800'
                    : species.conservationStatus === 'Vulnerable'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {species.conservationStatus?.split(' ').slice(0, 2).join(' ')}
                </div>
              )}
            </div>

            {/* Description Preview */}
            {species.description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {species.description.split(/[.!?]/)[0]?.trim() + '.'}
              </p>
            )}
          </div>

          {/* Image - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <img
                src={imageUrl || "https://placehold.co/800x600/e2e8f0/1e293b?text=No+Image"}
                alt={species.commonName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x600/e2e8f0/1e293b?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
