import { Circle, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
export const ProtectedAreaCircle = ({ area, opacity }) => (
  <Circle
    center={[area.lat, area.lng]}
    radius={area.radius}
    pathOptions={{
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: opacity / 200,
      weight: 2
    }}
  >
    <Popup>{area.name}</Popup>
  </Circle>
);
