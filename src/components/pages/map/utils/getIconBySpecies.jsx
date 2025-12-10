import L from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// Added Leaf (for plants) and Snail (for invertebrates)
import { Bird, PawPrint, Turtle, Fish, Bug, MapPin, Leaf, Snail,Worm } from 'lucide-react'; 
import { getSightingSpeciesColor } from './markerHelpers';

export const getIconBySpecies = (type) => {
  const color = getSightingSpeciesColor(type);
  const size = 28; 

  let IconComponent;

  // Select the appropriate Lucide icon component
  switch (type?.toLowerCase()) {
    case 'bird':
      IconComponent = <Bird size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    case 'mammal':
      IconComponent = <PawPrint size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
     case 'reptile':
      // Lucide does not have a 'Snake' icon yet, so 'Worm' is the closest visual match for a snake shape
      IconComponent = <Worm size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    case 'amphibian':
      IconComponent = <Turtle size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    case 'fish':
    case 'marine':
      IconComponent = <Fish size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    case 'insect':
      IconComponent = <Bug size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    case 'plant':
      IconComponent = <Leaf size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    case 'invertebrate':
      IconComponent = <Snail size={size} color={color} fill={color} fillOpacity={0.2} />;
      break;
    default:
      IconComponent = <MapPin size={size} color={color} fill={color} fillOpacity={0.2} />;
  }

  const svgString = renderToStaticMarkup(IconComponent);

  return L.divIcon({
    className: 'custom-sighting-marker',
    html: `<div style="display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">${svgString}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};