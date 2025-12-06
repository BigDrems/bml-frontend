import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PROTECTED_AREAS, CITIES } from '@/data/constant/location';
import { ProtectedAreaCircle } from '@/components/pages/map/ProtectedAreaCircle';
import { CityMarker } from '@/components/pages/map/CityMarker';
import { SpeciesMarker } from '@/components/pages/map/SpeciesMarker';
import { MapLegend } from '@/components/pages/map/MapLegend';
import leyteGeoJSON from '@/data/geojson/leyte-boundary.json';
import { GeoJSON } from 'react-leaflet/GeoJSON';


const MAP_CENTER = [11.2, 124.8];
const MAP_ZOOM = 9;


const LEYTE_BOUNDS = [
  [9.5, 123.5],  
  [12.5, 126.0] 
];

// GeoJSON style
const geoJSONStyle = {
  color: '#09ff00ff',           // Border color
  weight: 3,                  // Border width
  opacity: 0.8,               // Border opacity
  fillColor: '#deffb3ff',       // Fill color
  fillOpacity: 0.1,           // Fill opacity
  dashArray: '5, 5',          // dashed line
};

// Hover style
const highlightStyle = {
  weight: 5,
  color: '#FFF71A',
  fillOpacity: 0.2,
};

// Custom cluster icon
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  let size = 'small';
  let dimensions = 36;
  
  if (count >= 10 && count < 50) {
    size = 'medium';
    dimensions = 44;
  } else if (count >= 50) {
    size = 'large';
    dimensions = 52;
  }
  
  return L.divIcon({
    html: `<div class="cluster-icon cluster-${size}">
      <span>${count}</span>
    </div>`,
    className: 'custom-cluster-marker',
    iconSize: L.point(dimensions, dimensions, true),
  });
};


export const MapView = ({ protectedAreaOpacity, showProtectedAreas, species = [], speciesTypes = [] }) => {
  // Event handlers for GeoJSON
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
    }

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle(highlightStyle);
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(geoJSONStyle);
      },
    });
  };

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        className="h-full w-full"
        zoomControl={false}
        minZoom={9}
        maxZoom={18}
        maxBounds={LEYTE_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Leyte Boundary GeoJSON */}
        <GeoJSON
          data={leyteGeoJSON}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />

        {showProtectedAreas && PROTECTED_AREAS.map((area, idx) => (
          <ProtectedAreaCircle key={idx} area={area} opacity={protectedAreaOpacity} />
        ))}

        {CITIES.map((city, idx) => (
          <CityMarker key={idx} city={city} />
        ))}

        {/* Clustered Species Markers */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          disableClusteringAtZoom={16}
        >
          {species.map((sp) => (
            sp.sightings.map((sighting) => (
              <SpeciesMarker 
                key={sighting.id} 
                species={sp} 
                sighting={sighting} 
              />
            ))
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      
      <MapLegend speciesTypes={speciesTypes} />
    </div>
  );
};