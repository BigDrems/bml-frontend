import React from 'react';

function ObservationsChart({ data, total, percentChange }) {
  // Find max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Generate SVG path for the area chart
  const generatePath = () => {
    const width = 400;
    const height = 150;
    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = height - padding - (d.value / maxValue) * chartHeight;
      return { x, y };
    });
    
    // Line path
    const linePath = points.reduce((path, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      
      // Create smooth curves
      const prev = points[i - 1];
      const cpX = (prev.x + point.x) / 2;
      return `${path} Q ${cpX} ${prev.y} ${point.x} ${point.y}`;
    }, '');
    
    // Area path (close the shape)
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;
    
    return { linePath, areaPath };
  };
  
  const { linePath, areaPath } = generatePath();

  return (
    <div className="bg-white rounded-xl p-6 border border-[#90BE54]/30 shadow-sm">
      <div className="mb-4">
        <h3 className="text-gray-500 text-sm font-medium">Observations Over Last 30 Days</h3>
        <p className="text-gray-800 text-3xl font-bold mt-1">{total?.toLocaleString()}</p>
        <p className="text-[#4F8706] text-sm mt-1">
          Last 30 Days <span className="font-medium">+{percentChange}%</span>
        </p>
      </div>
      
      {/* Chart */}
      <div className="mt-6">
        <svg viewBox="0 0 400 150" className="w-full h-40">
          {/* Gradient */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F8706" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4F8706" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area */}
          <path d={areaPath} fill="url(#chartGradient)" />
          
          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#4F8706"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between text-gray-500 text-xs mt-2 px-2">
          {data.map((d, i) => (
            <span key={i}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ObservationsChart;
