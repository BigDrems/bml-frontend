import { SPECIES_LIST } from "@/data/constant/species";

/**
 * Get color for a species type based on SPECIES_LIST
 * @param {string} type - Species type (e.g., 'bird', 'mammal')
 * @returns {string} Hex color code
 */
export const getTypeColor = (type) => {
  const found = SPECIES_LIST.find(s => s.id === type?.toLowerCase());
  return found?.color || '#7f8c8d';
};

/**
 * Categorize habitat from a description string
 * @param {string} habitatDesc - Full habitat description from API
 * @returns {string} Habitat category
 */
export const categorizeHabitat = (habitatDesc) => {
  if (!habitatDesc || habitatDesc === 'unknown') return 'unknown';
  
  const desc = habitatDesc.toLowerCase();
  
  const habitatPatterns = [
    { category: 'forest', keywords: ['forest', 'woodland', 'tree'] },
    { category: 'coastal', keywords: ['coastal', 'marine', 'ocean', 'sea'] },
    { category: 'wetland', keywords: ['wetland', 'marsh', 'swamp', 'pond', 'lake', 'river', 'freshwater'] },
    { category: 'grassland', keywords: ['grassland', 'meadow', 'savanna', 'prairie'] },
    { category: 'mountain', keywords: ['mountain', 'highland', 'alpine'] },
    { category: 'urban', keywords: ['urban', 'city', 'garden'] },
    { category: 'agricultural', keywords: ['agricultural', 'farm', 'rice', 'paddy', 'crop'] },
    { category: 'cave', keywords: ['cave', 'underground'] },
  ];
  
  for (const { category, keywords } of habitatPatterns) {
    if (keywords.some(keyword => desc.includes(keyword))) {
      return category;
    }
  }
  
  return 'other';
};

/**
 * Transform GeoJSON features to species-grouped format
 * @param {Object} geoJSON - GeoJSON FeatureCollection from API
 * @returns {Object} { speciesData, speciesTypes, habitatTypes }
 */
export const transformGeoJSONToSpeciesData = (geoJSON) => {
  if (!geoJSON?.features) {
    return { speciesData: [], speciesTypes: [], habitatTypes: [] };
  }
  
  const speciesMap = new Map();
  const typesSet = new Set();
  const habitatsSet = new Set();
  
  geoJSON.features.forEach(feature => {
    const props = feature.properties;
    const speciesId = props.speciesId;
    
    if (!speciesId) return;
    
    const speciesObj = props.species || {};
    const speciesType = (speciesObj.speciesType || 'unknown').toLowerCase();
    const habitatCategory = categorizeHabitat(speciesObj.habitat);
    
    typesSet.add(speciesType);
    habitatsSet.add(habitatCategory);
    
    if (!speciesMap.has(speciesId)) {
      speciesMap.set(speciesId, {
        id: speciesId,
        commonName: speciesObj.commonName || 'Unknown Species',
        scientificName: speciesObj.scientificName || '',
        type: speciesType,
        habitat: habitatCategory,
        habitatDescription: speciesObj.habitat || '',
        description: speciesObj.description || '',
        conservationStatus: speciesObj.conservationStatus || '',
        image: speciesObj.imageUrl || props.imageUrl,
        sightings: []
      });
    }
    
    speciesMap.get(speciesId).sightings.push({
      id: props.id,
      lat: props.latitude,
      lng: props.longitude,
      date: props.observedAt,
      locationName: props.locationName,
      notes: props.notes,
      imageUrl: props.imageUrl,
      media: props.media
    });
  });
  
  // Create species types list with colors
  const speciesTypes = Array.from(typesSet).map(type => ({
    id: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: getTypeColor(type)
  }));
  
  // Create habitat types list (excluding unknown)
  const habitatTypes = Array.from(habitatsSet)
    .filter(h => h !== 'unknown')
    .map(habitat => ({
      value: habitat,
      label: habitat.charAt(0).toUpperCase() + habitat.slice(1)
    }));
  
  return {
    speciesData: Array.from(speciesMap.values()),
    speciesTypes,
    habitatTypes
  };
};
