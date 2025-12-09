import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { PROTECTED_AREAS, CITIES } from '@/data/constant/location';
import { ProtectedAreaCircle } from '@/components/pages/map/ProtectedAreaCircle';
import { CityMarker } from '@/components/pages/map/CityMarker';
import { SightingMarker } from '@/components/pages/map/SightingMarker';
import { MapLegend } from '@/components/pages/map/MapLegend';
import leyteGeoJSON from '@/data/geojson/leyte-boundary.json';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { MAP_CENTER, MAP_ZOOM, LEYTE_BOUNDS, MAP_SETTINGS, geoJSONStyle, highlightStyle, CLUSTER_CONFIG } from './const';
import { createClusterCustomIcon, createGeoJSONEventHandlers } from './utils';


export const MapView = ({ protectedAreaOpacity, showProtectedAreas, species = [], speciesTypes = [] }) => {
  // Event handlers for GeoJSON
  const onEachFeature = (feature, layer) => {
    createGeoJSONEventHandlers(feature, layer, { geoJSONStyle, highlightStyle });
  };

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        className="h-full w-full"
        zoomControl={false}
        minZoom={MAP_SETTINGS.minZoom}
        maxZoom={MAP_SETTINGS.maxZoom}
        maxBounds={LEYTE_BOUNDS}
        maxBoundsViscosity={MAP_SETTINGS.maxBoundsViscosity}
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
          maxClusterRadius={CLUSTER_CONFIG.maxClusterRadius}
          spiderfyOnMaxZoom={CLUSTER_CONFIG.spiderfyOnMaxZoom}
          showCoverageOnHover={CLUSTER_CONFIG.showCoverageOnHover}
          zoomToBoundsOnClick={CLUSTER_CONFIG.zoomToBoundsOnClick}
          disableClusteringAtZoom={CLUSTER_CONFIG.disableClusteringAtZoom}
        >
          {species.map((sp) => (
            sp.sightings.map((sighting) => (
              <SightingMarker 
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