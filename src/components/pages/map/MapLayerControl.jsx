
import { Layers, Shield } from "lucide-react";

export const MapLayerControls = ({ opacity, onOpacityChange, showProtectedAreas, onToggleProtectedAreas }) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <Layers className="w-4 h-4 text-blue-600" />
      <span className="font-medium text-sm text-gray-900">Layer Controls</span>
    </div>

    {/* Protected Areas Toggle */}
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${showProtectedAreas ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
          <Shield className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-gray-700">Protected Areas</span>
      </div>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={showProtectedAreas}
          onChange={onToggleProtectedAreas}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
      </label>
    </div>

    {/* Opacity Slider */}
    <div className={`space-y-2 transition-opacity duration-200 ${showProtectedAreas ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
      <div className="flex justify-between text-xs text-gray-500 font-medium">
        <span>Opacity</span>
        <span>{opacity}%</span>
      </div>
      <div className="relative flex items-center w-full h-4">
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={onOpacityChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
      </div>
    </div>
  </div>
);