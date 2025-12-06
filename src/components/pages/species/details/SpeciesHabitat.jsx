import React from 'react';
import { TreePine, Mountain, Droplets, Thermometer, Cloud, MapPin } from 'lucide-react';
import { DistributionMap } from './DistributionMap';

export const SpeciesHabitat = ({ species }) => {
  const habitatFeatures = [
    {
      icon: <TreePine className="w-6 h-6 text-[#34FB02]" />,
      label: 'Habitat Type',
      value: species.habitat,
    },
    {
      icon: <Mountain className="w-6 h-6 text-[#34FB02]" />,
      label: 'Elevation Range',
      value: species.elevationRange || 'Sea level to mountain forests.',
    },
    {
      icon: <Thermometer className="w-6 h-6 text-[#34FB02]" />,
      label: 'Climate Preference',
      value: species.climate || 'Tropical climate with warm temperatures year-round.',
    },
    {
      icon: <Droplets className="w-6 h-6 text-[#34FB02]" />,
      label: 'Water Requirements',
      value: species.waterRequirements || 'Requires access to freshwater sources.',
    },
  ];

  const distributionInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-[#90BE54]" />,
      label: 'Primary Range',
      value: species.primaryRange || 'Leyte Island, Philippines',
    },
    {
      icon: <Cloud className="w-5 h-5 text-[#90BE54]" />,
      label: 'Seasonal Presence',
      value: species.seasonalPresence || 'Year-round resident',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Introduction */}
      <div className="prose max-w-none text-gray-600 leading-loose font-inter text-lg">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#445133] first-letter:mr-3 first-letter:float-left">
          Understanding the habitat and distribution of <span className="font-semibold text-[#445133]">{species.commonName}</span> is 
          essential for conservation efforts and successful field observation. This species has adapted to 
          specific environmental conditions found in the Leyte region.
        </p>
      </div>

      {/* Habitat Characteristics */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Habitat Characteristics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habitatFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-[#445133]/5 to-[#90BE54]/10 border border-[#90BE54]/20 p-6 rounded-[20px] hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#445133] p-3 rounded-full">{feature.icon}</div>
                <span className="text-sm text-[#445133] uppercase tracking-widest font-bold">{feature.label}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{feature.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Information */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Geographic Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {distributionInfo.map((info, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-xl"
            >
              <div className="bg-[#445133]/10 p-2 rounded-full">{info.icon}</div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</span>
                <p className="text-[#445133] font-semibold">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Distribution Map */}
        <div className="w-full aspect-video bg-gray-100 rounded-[20px] overflow-hidden relative shadow-inner border border-gray-200 z-0">
          <DistributionMap species={species} />
        </div>
      </div>

      {/* Conservation Status in Habitat */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Habitat Conservation</h3>
        <div className="bg-[#445133] rounded-[20px] p-6 text-white">
          <p className="leading-relaxed mb-4">
            The natural habitat of {species.commonName} faces various pressures including deforestation, 
            climate change, and human encroachment. Conservation efforts in the Leyte region focus on 
            protecting key habitats and establishing wildlife corridors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <span className="text-[#90BE54] text-2xl font-bold">Protected</span>
              <p className="text-sm text-white/80 mt-1">Key Areas Preserved</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <span className="text-[#90BE54] text-2xl font-bold">Monitored</span>
              <p className="text-sm text-white/80 mt-1">Regular Surveys</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <span className="text-[#90BE54] text-2xl font-bold">Restored</span>
              <p className="text-sm text-white/80 mt-1">Habitat Recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Threats to Habitat */}
      <div className="py-8">
        <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Threats to Habitat</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
            <h4 className="font-semibold text-red-800">Deforestation</h4>
            <p className="text-red-700 text-sm mt-1">Loss of forest cover due to logging and agricultural expansion.</p>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl">
            <h4 className="font-semibold text-orange-800">Climate Change</h4>
            <p className="text-orange-700 text-sm mt-1">Shifting weather patterns affecting habitat suitability.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
            <h4 className="font-semibold text-yellow-800">Human Encroachment</h4>
            <p className="text-yellow-700 text-sm mt-1">Expanding settlements and infrastructure development.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
