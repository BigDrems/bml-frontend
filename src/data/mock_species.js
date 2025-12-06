export const MOCK_SPECIES = [
  {
    id: 'sp-001',
    scientificName: 'Pithecophaga jefferyi',
    commonName: 'Philippine Eagle',
    type: 'birds',
    habitat: 'forest',
    description: 'The Philippine eagle is one of the rarest and most powerful birds in the world.',
    diet: 'Carnivore',
    length: '86-102 cm',
    weight: '4.7-8.0 kg',
    lifespan: '30-60 years',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-001', lat: 11.074, lng: 124.697, date: '2023-10-15' },
      { id: 's-002', lat: 10.875, lng: 124.862, date: '2023-11-02' },
    ]
  },
  {
    id: 'sp-002',
    scientificName: 'Carlito syrichta',
    commonName: 'Philippine Tarsier',
    type: 'mammals',
    habitat: 'forest',
    description: 'A very small primate found in the Philippines.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-003', lat: 10.756, lng: 124.842, date: '2023-09-20' },
      { id: 's-004', lat: 10.533, lng: 124.650, date: '2023-12-05' },
    ]
  },
  {
    id: 'sp-003',
    scientificName: 'Varanus salvator',
    commonName: 'Water Monitor',
    type: 'reptiles',
    habitat: 'wetland',
    description: 'A large lizard native to South and Southeast Asia.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-005', lat: 11.24, lng: 125.00, date: '2023-08-12' },
    ]
  },
  {
    id: 'sp-004',
    scientificName: 'Dugong dugon',
    commonName: 'Dugong',
    type: 'mammals',
    habitat: 'coastal',
    description: 'A medium-sized marine mammal, often called the sea cow.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-006', lat: 11.114, lng: 124.252, date: '2023-07-30' },
    ]
  },
  {
    id: 'sp-005',
    scientificName: 'Rafflesia manillana',
    commonName: 'Rafflesia',
    type: 'plants',
    habitat: 'forest',
    description: 'A parasitic plant genus containing the largest known flower in the world.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-007', lat: 10.875, lng: 124.862, date: '2023-06-15' },
    ]
  },

  // --- NEW SPECIES ADDED BELOW ---

  // MAMMALS
  {
    id: 'sp-006',
    scientificName: 'Acerodon jubatus',
    commonName: 'Golden-crowned Flying Fox',
    type: 'mammals',
    habitat: 'forest',
    description: 'One of the largest bat species in the world, endemic to Philippine forests.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-008', lat: 10.730, lng: 124.785, date: '2023-09-05' }, // Near Baybay forests
      { id: 's-009', lat: 10.650, lng: 124.800, date: '2023-11-12' },
    ]
  },
  {
    id: 'sp-007',
    scientificName: 'Sus philippensis',
    commonName: 'Philippine Warty Pig',
    type: 'mammals',
    habitat: 'forest',
    description: 'A wild pig species endemic to the Philippines, vulnerable to hunting.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-010', lat: 11.150, lng: 124.500, date: '2024-01-20' },
    ]
  },
  {
    id: 'sp-009',
    scientificName: 'Paradoxurus hermaphroditus',
    commonName: 'Asian Palm Civet',
    type: 'mammals',
    habitat: 'forest',
    description: 'A small viverrid native to South and Southeast Asia.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-012', lat: 11.200, lng: 125.050, date: '2023-10-05' },
    ]
  },

  // BIRDS
  {
    id: 'sp-010',
    scientificName: 'Buceros hydrocorax',
    commonName: 'Rufous Hornbill',
    type: 'birds',
    habitat: 'forest',
    description: 'A large hornbill, also known as the Philippine hornbill.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-013', lat: 11.050, lng: 124.700, date: '2024-02-01' },
    ]
  },
  {
    id: 'sp-011',
    scientificName: 'Ceyx argentatus',
    commonName: 'Silvery Kingfisher',
    type: 'birds',
    habitat: 'wetland',
    description: 'A species of bird in the Alcedinidae family, endemic to the Philippines.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-014', lat: 11.080, lng: 124.600, date: '2023-08-22' },
    ]
  },
  {
    id: 'sp-012',
    scientificName: 'Anas luzonica',
    commonName: 'Philippine Duck',
    type: 'birds',
    habitat: 'wetland',
    description: 'A dabbling duck endemic to the Philippines, usually found in freshwater.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-015', lat: 11.120, lng: 124.550, date: '2023-11-30' },
    ]
  },
  {
    id: 'sp-013',
    scientificName: 'Sarcops calvus',
    commonName: 'Coleto',
    type: 'birds',
    habitat: 'forest',
    description: 'A starling species known for its featherless pink head.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-016', lat: 11.250, lng: 124.980, date: '2023-09-10' },
    ]
  },
  {
    id: 'sp-015',
    scientificName: 'Naja samarensis',
    commonName: 'Samar Cobra',
    type: 'reptiles',
    habitat: 'forest',
    description: 'A highly venomous spitting cobra native to the Visayas and Mindanao.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-019', lat: 11.180, lng: 124.900, date: '2023-10-25' },
    ]
  },
  {
    id: 'sp-016',
    scientificName: 'Hydrosaurus pustulatus',
    commonName: 'Philippine Sailfin Lizard',
    type: 'reptiles',
    habitat: 'wetland',
    description: 'An oviparous lizard living near rivers, excellent swimmers.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-020', lat: 10.950, lng: 124.850, date: '2023-08-08' },
    ]
  },
  {
    id: 'sp-017',
    scientificName: 'Malayopython reticulatus',
    commonName: 'Reticulated Python',
    type: 'reptiles',
    habitat: 'forest',
    description: 'The world\'s longest snake, common in Southeast Asian rain forests.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-021', lat: 10.800, lng: 124.750, date: '2023-12-02' },
    ]
  },

  // AMPHIBIANS
  {
    id: 'sp-018',
    scientificName: 'Polypedates leucomystax',
    commonName: 'Common Tree Frog',
    type: 'amphibians',
    habitat: 'forest',
    description: 'A species of frog in the shrub frog family, very common in the region.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-022', lat: 11.000, lng: 124.800, date: '2023-09-18' },
    ]
  },
  {
    id: 'sp-019',
    scientificName: 'Kaloula picta',
    commonName: 'Slender-digit Chorus Frog',
    type: 'amphibians',
    habitat: 'wetland',
    description: 'A narrow-mouthed frog endemic to the Philippines.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-023', lat: 11.050, lng: 124.650, date: '2023-11-11' },
    ]
  },
  {
    id: 'sp-020',
    scientificName: 'Limnonectes magnus',
    commonName: 'Mindanao Fanged Frog',
    type: 'amphibians',
    habitat: 'forest',
    description: 'A large stream frog native to the Philippines.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-024', lat: 10.600, lng: 124.900, date: '2023-07-22' },
    ]
  },

  // INSECTS
  {
    id: 'sp-021',
    scientificName: 'Troides magellanus',
    commonName: 'Magellan Birdwing',
    type: 'insects',
    habitat: 'forest',
    description: 'A large and striking butterfly found in the Philippines.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-025', lat: 10.900, lng: 124.820, date: '2024-01-15' },
    ]
  },
  {
    id: 'sp-022',
    scientificName: 'Attacus atlas',
    commonName: 'Atlas Moth',
    type: 'insects',
    habitat: 'forest',
    description: 'One of the largest moths in the world, with a wingspan up to 24 cm.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-026', lat: 11.100, lng: 124.620, date: '2023-08-30' },
    ]
  },
  {
    id: 'sp-023',
    scientificName: 'Oecophylla smaragdina',
    commonName: 'Weaver Ant',
    type: 'insects',
    habitat: 'forest',
    description: 'Known for their unique nest-building behaviour using larval silk.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-027', lat: 11.220, lng: 125.000, date: '2023-10-10' },
    ]
  },

  // PLANTS
  {
    id: 'sp-024',
    scientificName: 'Nepenthes alata',
    commonName: 'Pitcher Plant',
    type: 'plants',
    habitat: 'forest',
    description: 'A tropical pitcher plant endemic to the Philippines.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-028', lat: 10.880, lng: 124.880, date: '2023-06-20' },
    ]
  },
  {
    id: 'sp-025',
    scientificName: 'Pterocarpus indicus',
    commonName: 'Narra Tree',
    type: 'plants',
    habitat: 'forest',
    description: 'The national tree of the Philippines, known for its hard wood.',
    createdAt: new Date().toISOString(),
    sightings: [
      { id: 's-029', lat: 11.000, lng: 124.950, date: '2023-09-01' },
    ]
  }
];