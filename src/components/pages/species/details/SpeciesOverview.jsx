import React, { useState } from 'react';
import { KeyFacts } from './KeyFacts';
import { DistributionMap } from './DistributionMap';
import { SpeciesIdentification } from './SpeciesIdentification';
import { SpeciesHabitat } from './SpeciesHabitat';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'identification', label: 'Identification' },
  { id: 'habitat', label: 'Habitat & Distribution' },
];

export const SpeciesOverview = ({ species }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'identification':
        return <SpeciesIdentification species={species} />;
      case 'habitat':
        return <SpeciesHabitat species={species} />;
      case 'overview':
      default:
        return (
          <>
            {/* Description */}
            <div className="prose max-w-none text-gray-600 leading-loose font-inter text-lg">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#445133] first-letter:mr-3 first-letter:float-left">
                {species.description}
              </p>
              <p className="mt-6">
                <span className="font-semibold text-[#445133]">{species.commonName}</span> (<span className="italic">{species.scientificName}</span>) is a unique species found in the Leyte region. 
                It plays a vital role in the local ecosystem. Observers have noted its distinct behaviors 
                and characteristics which make it a subject of interest for both researchers and enthusiasts.
              </p>
            </div>

            {/* Key Facts Module */}
            <KeyFacts species={species} />

            {/* Distribution Map */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Distribution Map</h3>
              <div className="w-full aspect-video bg-gray-100 rounded-[20px] overflow-hidden relative shadow-inner border border-gray-200 z-0">
                <DistributionMap species={species} />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-10">
      {/* Tabs - Now functional */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-base font-medium transition-colors ${
              activeTab === tab.id
                ? 'font-bold text-[#445133] border-b-4 border-[#90BE54]'
                : 'text-gray-500 hover:text-[#445133]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};
