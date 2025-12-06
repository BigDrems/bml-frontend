import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StatsCard({ title, value, percentChange, isPositive = true }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#90BE54]/30 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <p className="text-gray-800 text-3xl font-bold mb-2">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {percentChange !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#4F8706]' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{isPositive ? '+' : ''}{percentChange}%</span>
        </div>
      )}
    </div>
  );
}

export default StatsCard;
