import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ActionItems({ pendingSightings = [], recentActivity = [] }) {
  const [activeTab, setActiveTab] = useState('pending');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border border-[#90BE54]/30 shadow-sm h-full">
      <h3 className="text-gray-800 text-base md:text-lg font-semibold mb-4">Action Items</h3>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTabClick('pending');
          }}
          className={`flex-1 pb-2 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'pending'
              ? 'text-[#4F8706] border-b-2 border-[#90BE54]'
              : 'text-gray-500 hover:text-[#4F8706]'
          }`}
        >
          Pending Sighting
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTabClick('recent');
          }}
          className={`flex-1 pb-2 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'recent'
              ? 'text-[#4F8706] border-b-2 border-[#90BE54]'
              : 'text-gray-500 hover:text-[#4F8706]'
          }`}
        >
          Recent Activity
        </button>
      </div>
      
      {/* Content */}
      <div className="space-y-3 max-h-[250px] md:max-h-[300px] overflow-y-auto">
        {activeTab === 'pending' ? (
          pendingSightings.length > 0 ? (
            pendingSightings.map((sighting) => (
              <div
                key={sighting.id}
                className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg gap-2 hover:bg-[#90BE54]/10 transition-colors"
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <img
                    src={sighting.imageUrl || 'https://placehold.co/48x48/90BE54/ffffff?text=🦅'}
                    alt={sighting.speciesName}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-gray-800 font-medium text-xs md:text-sm truncate">{sighting.speciesName}</p>
                    <p className="text-gray-500 text-xs truncate">{sighting.location}</p>
                  </div>
                </div>
                <Link
                  to={`/admin/sightings/${sighting.id}`}
                  className="text-[#4F8706] hover:text-[#90BE54] text-xs md:text-sm font-medium flex-shrink-0"
                >
                  Review
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">No pending sightings</p>
          )
        ) : (
          recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#90BE54]/10 transition-colors"
              >
                <div className="w-2 h-2 bg-[#90BE54] rounded-full"></div>
                <div>
                  <p className="text-gray-800 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
          )
        )}
      </div>
    </div>
  );
}

export default ActionItems;
