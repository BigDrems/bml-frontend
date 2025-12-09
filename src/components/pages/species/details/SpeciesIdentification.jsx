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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Best Viewing Times</h4>
                <p className="text-sm text-gray-600">Early morning or late afternoon when activity levels are highest.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Equipment</h4>
                <p className="text-sm text-gray-600">Bring binoculars or a camera with a good zoom lens for detailed observation.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Behavior</h4>
                <p className="text-sm text-gray-600">Move quietly and avoid sudden movements to prevent startling the animal.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-amber-500 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Documentation</h4>
                <p className="text-sm text-gray-600">Document your sightings with photos and notes for species verification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
