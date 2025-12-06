import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import leyteGeoJSON from '@/data/geojson/leyte-boundary.json';
import { toast } from 'sonner';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Leyte Bounds
const LEYTE_BOUNDS = L.latLngBounds(
  [9.9, 124.2], // South West
  [11.6, 125.4] // North East
);

// Ray-casting algorithm to check if point is in polygon
const isPointInPolygon = (lat, lng, polygon) => {
  const x = lng, y = lat;
  let inside = false;
  
  // Handle MultiPolygon and Polygon
  const polygons = polygon.type === 'MultiPolygon' 
    ? polygon.coordinates 
    : [polygon.coordinates];

  for (const poly of polygons) {
    // For each polygon, the first ring is the outer boundary
    const vs = polygon.type === 'MultiPolygon' ? poly[0] : poly[0];
    
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      
      const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    if (inside) return true; // If inside any polygon part
  }
  
  return inside;
};

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      // Check if point is inside Leyte GeoJSON
      const isInside = leyteGeoJSON.features.some(feature => 
        isPointInPolygon(e.latlng.lat, e.latlng.lng, feature.geometry)
      );

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

export const LocationPicker = ({ position, setPosition }) => {
  const defaultCenter = [11.0, 124.8]; // Leyte center

  const geoJSONStyle = {
    color: '#90BE54',
    weight: 2,
    opacity: 0.6,
    fillColor: '#90BE54',
    fillOpacity: 0.1,
    dashArray: '5, 5',
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-[#445133]">
        Where did you see it?
        <span className="block text-xs text-gray-500 font-normal mt-1">Drop a pin on the map or enter coordinates.</span>
      </label>
      
      <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
        <MapContainer 
          center={defaultCenter} 
          zoom={8} 
          scrollWheelZoom={true} 
          className="h-full w-full"
          maxBounds={LEYTE_BOUNDS}
          maxBoundsViscosity={1.0}
          minZoom={8}
          zoomControl={false} // We'll add it manually to position it
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <GeoJSON data={leyteGeoJSON} style={geoJSONStyle} />
          
          <LocationMarker position={position} setPosition={setPosition} />
          
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Latitude</label>
          <input
            type="number"
            value={position ? position.lat.toFixed(6) : ''}
            readOnly
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
            placeholder="0.000000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Longitude</label>
          <input
            type="number"
            value={position ? position.lng.toFixed(6) : ''}
            readOnly
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
            placeholder="0.000000"
          />
        </div>
      </div>
    </div>
  );
};
