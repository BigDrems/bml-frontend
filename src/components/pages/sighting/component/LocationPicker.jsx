import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import leyteGeoJSON from '@/data/geojson/leyte-boundary.json';
import { toast } from 'sonner';
import { LEYTE_CENTER, LEYTE_BOUNDS, MAP_CONFIG, DEFAULT_MARKER_ICON, GEOJSON_STYLE } from '../const';
import { isPointInGeoJSON, formatCoordinate } from '../utils';

// Set default marker icon
L.Marker.prototype.options.icon = DEFAULT_MARKER_ICON;

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      // Check if point is inside Leyte GeoJSON
      const isInside = isPointInGeoJSON(e.latlng.lat, e.latlng.lng, leyteGeoJSON);

      if (isInside) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      } else {
        toast.error("Please select a location within Leyte.");
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

export const LocationPicker = ({ name = 'location' }) => {
  const [position, setPosition] = useState(null);
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-[#445133]">
        Where did you see it?
        <span className="block text-xs text-gray-500 font-normal mt-1">Drop a pin on the map or enter coordinates.</span>
      </label>
      
      {/* Hidden input to store location data */}
      <input 
        type="hidden" 
        name={name} 
        value={position ? JSON.stringify(position) : ''} 
      />
      
      <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
        <MapContainer 
          center={LEYTE_CENTER} 
          zoom={MAP_CONFIG.zoom} 
          scrollWheelZoom={MAP_CONFIG.scrollWheelZoom} 
          className="h-full w-full"
          maxBounds={LEYTE_BOUNDS}
          maxBoundsViscosity={MAP_CONFIG.maxBoundsViscosity}
          minZoom={MAP_CONFIG.minZoom}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <GeoJSON data={leyteGeoJSON} style={GEOJSON_STYLE} />
          
          <LocationMarker position={position} setPosition={setPosition} />
          
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Latitude</label>
          <input
            type="number"
            value={formatCoordinate(position?.lat)}
            readOnly
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
            placeholder="0.000000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Longitude</label>
          <input
            type="number"
            value={formatCoordinate(position?.lng)}
            readOnly
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
            placeholder="0.000000"
          />
        </div>
      </div>
    </div>
  );
};
