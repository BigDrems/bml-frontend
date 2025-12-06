import React from 'react';
import { Eye, Palette, Footprints, Volume2, Feather, Scan } from 'lucide-react';

export const SpeciesIdentification = ({ species }) => {
  const identificationFeatures = [
    {
      icon: <Palette className="w-6 h-6 text-[#34FB02]" />,
      label: 'Coloration',
      value: species.coloration || 'Varies by subspecies. Typically features earth tones that blend with natural habitat.',
    },
    {
      icon: <Scan className="w-6 h-6 text-[#34FB02]" />,
      label: 'Body Shape',
      value: species.bodyShape || 'Distinctive body structure adapted to its environment.',
    },
    {
      icon: <Eye className="w-6 h-6 text-[#34FB02]" />,
      label: 'Distinguishing Marks',
      value: species.distinguishingMarks || 'Look for unique patterns and markings that set this species apart.',
    },
    {
      icon: <Feather className="w-6 h-6 text-[#34FB02]" />,
      label: 'Physical Features',
      value: species.physicalFeatures || 'Notable physical characteristics help in field identification.',
    },
    {
      icon: <Footprints className="w-6 h-6 text-[#34FB02]" />,
      label: 'Tracks & Signs',
      value: species.tracks || 'Look for distinctive tracks, droppings, or other field signs.',
    },
    {
      icon: <Volume2 className="w-6 h-6 text-[#34FB02]" />,
      label: 'Vocalizations',
      value: species.vocalizations || 'Listen for characteristic calls and sounds.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Introduction */}
      <div className="prose max-w-none text-gray-600 leading-loose font-inter text-lg">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#445133] first-letter:mr-3 first-letter:float-left">
          Identifying <span className="font-semibold text-[#445133]">{species.commonName}</span> in 
          the field requires attention to several key characteristics. This guide will help you 
          distinguish this species from similar ones found in the Leyte region.
        </p>
      </div>

      {/* Identification Features Grid */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Field Identification Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {identificationFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 p-6 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#445133] p-3 rounded-full">{feature.icon}</div>
                <span className="text-sm text-[#445133] uppercase tracking-widest font-bold">{feature.label}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Species Section */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Similar Species</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-[20px] p-6">
          <p className="text-amber-800 leading-relaxed">
            <span className="font-semibold">Note:</span> When identifying {species.commonName} in the field, 
            be careful not to confuse it with similar species in the area. Pay close attention to the 
            distinguishing features listed above, particularly coloration patterns and body shape.
          </p>
        </div>
      </div>

      {/* Observation Tips */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Observation Tips</h3>
        <div className="bg-[#445133]/5 rounded-[20px] p-6">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#90BE54] font-bold text-lg">•</span>
              <span>Best observed during early morning or late afternoon when activity levels are highest.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#90BE54] font-bold text-lg">•</span>
              <span>Bring binoculars or a camera with a good zoom lens for detailed observation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#90BE54] font-bold text-lg">•</span>
              <span>Move quietly and avoid sudden movements to prevent startling the animal.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#90BE54] font-bold text-lg">•</span>
              <span>Document your sightings with photos and notes for species verification.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
