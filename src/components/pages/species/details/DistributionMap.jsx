import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import leyteGeoJSON from '@/data/geojson/leyte-boundary.json';
import { getSightingsGeoJSON } from '@/api/sightings';
import L from 'leaflet';

// Create custom map marker icon
const createMarkerIcon = (color = '#e74c3c') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="filter: drop-shadow(0 3px 3px rgba(0,0,0,0.4));">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="${color}">
        <path d="M12 0c-4.418 0-8 3.582-8 8 0 5.018 7.2 15.8 8 16 .8-.2 8-10.982 8-16 0-4.418-3.582-8-8-8z" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3.5" fill="white"/>
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

// Component to fit map bounds to Leyte
const FitBounds = ({ geoJson }) => {
  const map = useMap();

  useEffect(() => {
    if (geoJson) {
      const layer = L.geoJSON(geoJson);
      const bounds = layer.getBounds();
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [geoJson, map]);

  return null;
};

export const DistributionMap = ({ species }) => {
  const defaultCenter = [11.0, 124.8]; // Approx center of Leyte

  // Fetch sightings GeoJSON from API using TanStack Query
  const { data: sightingsGeoJSON, isLoading } = useQuery({
    queryKey: ['sightings', 'geojson', species?.id],
    queryFn: () => getSightingsGeoJSON({ speciesId: species.id }),
    enabled: !!species?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Leyte boundary style
  const leyteStyle = {
    color: '#90BE54',
    weight: 2,
    opacity: 0.6,
    fillColor: '#90BE54',
    fillOpacity: 0.1,
    dashArray: '5, 5',
  };

  // Create marker icon
  const markerIcon = createMarkerIcon('#e74c3c');

  // Convert GeoJSON points to Markers with popups
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: markerIcon });
  };

  // Bind popup to each feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const props = feature.properties;
      const date = props.observedAt 
        ? new Date(props.observedAt).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })
        : 'Unknown date';
      
      // Get image URL from Supabase storage - check common field names
      // API may return: mediaUrls (array), media (array), imageUrl, image_url, etc.
      let imageUrl = null;
      
      // Check for array of media URLs (Supabase storage)
      if (Array.isArray(props.mediaUrls) && props.mediaUrls.length > 0) {
        imageUrl = props.mediaUrls[0];
      } else if (Array.isArray(props.media) && props.media.length > 0) {
        // Could be array of objects with url property or array of strings
        imageUrl = typeof props.media[0] === 'string' ? props.media[0] : props.media[0]?.url;
      } else if (Array.isArray(props.images) && props.images.length > 0) {
        imageUrl = typeof props.images[0] === 'string' ? props.images[0] : props.images[0]?.url;
      }
      
      // Fallback to single image fields
      if (!imageUrl) {
        imageUrl = props.imageUrl || props.image_url || props.image || props.photo || species?.image;
      }
      
      // Final fallback to placeholder
      if (!imageUrl) {
        imageUrl = `https://placehold.co/400x200/445133/FFF?text=${encodeURIComponent(species?.commonName || 'Species')}`;
      }
      
      layer.bindPopup(`
        <div class="overflow-hidden rounded-lg" style="min-width: 250px; max-width: 280px;">
          <div style="height: 120px; width: 100%; background: #f3f4f6;">
            <img 
              src="${imageUrl}"
              alt="${species?.commonName || 'Species'}"
              style="width: 100%; height: 100%; object-fit: cover;"
              onerror="this.src='https://placehold.co/400x200/445133/FFF?text=No+Image'"
            />
          </div>
          <div style="padding: 12px; background: white;">
            <h3 style="font-weight: bold; font-size: 16px; color: #1f2937; margin: 0 0 4px 0;">${species?.commonName || 'Species'}</h3>
            <p style="font-size: 12px; color: #6b7280; font-style: italic; margin: 0 0 8px 0;">${species?.scientificName || ''}</p>
            <p style="font-size: 11px; color: #4b5563; margin: 0 0 4px 0;">${props.village || props.barangay || props.locationName || 'Unknown location'}</p>
            <p style="font-size: 11px; color: #9ca3af; margin: 0;">${date}</p>
          </div>
        </div>
      `, {
        maxWidth: 300,
        className: 'custom-popup'
      });
    }
  };

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100/80 z-[1000] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#90BE54]"></div>
        </div>
      )}
      <MapContainer 
        center={defaultCenter} 
        zoom={9} 
        scrollWheelZoom={false} 
        className="w-full h-full"
        style={{ background: '#f3f4f6' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <GeoJSON data={leyteGeoJSON} style={leyteStyle} />

        {sightingsGeoJSON && (
          <GeoJSON 
            key={species?.id}
            data={sightingsGeoJSON} 
            pointToLayer={pointToLayer}
            onEachFeature={onEachFeature}
          />
        )}

        <FitBounds geoJson={leyteGeoJSON} />
      </MapContainer>
    </div>
  );
};
