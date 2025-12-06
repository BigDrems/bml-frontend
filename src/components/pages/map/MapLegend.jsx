import React from 'react';

export const MapLegend = ({ speciesTypes = [] }) => {
  if (speciesTypes.length === 0) return null;
  
  return (
    <div className="absolute bottom-6 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-[1000] text-sm border border-gray-200">
      <h4 className="font-bold mb-2 text-gray-800 text-xs uppercase tracking-wider">Species</h4>
      <div className="space-y-1.5">
        {speciesTypes.map((species) => (
          <div key={species.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-white shadow-sm" 
              style={{ backgroundColor: species.color }}
            />
            <span className="text-gray-700 text-xs font-medium">{species.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
