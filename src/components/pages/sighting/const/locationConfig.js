import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

/**
 * Location picker map configuration
 */

export const LEYTE_CENTER = [11.0, 124.8];

export const LEYTE_BOUNDS = L.latLngBounds(
  [9.9, 124.2], // South West
  [11.6, 125.4] // North East
);

export const MAP_CONFIG = {
  zoom: 8,
  minZoom: 8,
  maxBoundsViscosity: 1.0,
  scrollWheelZoom: true,
};

// Default marker icon configuration
export const DEFAULT_MARKER_ICON = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// GeoJSON style for Leyte boundary
export const GEOJSON_STYLE = {
  color: '#90BE54',
  weight: 2,
  opacity: 0.6,
  fillColor: '#90BE54',
  fillOpacity: 0.1,
  dashArray: '5, 5',
};
