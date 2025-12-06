import { Popup, Marker }  from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
export const CityMarker = ({ city }) => (
  <Marker position={[city.lat, city.lng]}>
    <Popup>{city.name}</Popup>
  </Marker>
);
