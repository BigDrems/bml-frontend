import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SpeciesCard = ({ species }) => {
  const navigate = useNavigate();
  
  // Handle different image URL field names from API
  const imageUrl = species.imageUrl || species.image_url || species.image || species.photo_url || species.photoUrl;

  return (
    <div
      onClick={() => navigate(`/species/${species.id}`)}
      className="bg-white border border-border rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl || "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image"} 
          alt={species.commonName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-foreground line-clamp-1">
          {species.commonName?.split(',')[0]?.trim() || species.commonName}
        </h3>
        <p className="text-muted-foreground text-sm italic mb-2">{species.scientificName}</p>
        {species.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {species.description.split(/[.!?]/)[0]?.trim() + (species.description.split(/[.!?]/)[0]?.trim() ? '.' : '')}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-xs">
          {species.family && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {species.family}
            </span>
          )}
          {species.class && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
              {species.class}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
