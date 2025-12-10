/**
 * Analytics configuration constants
 */

export const ANALYTICS_ITEMS_CONFIG = [
  {
    key: 'totalSpecies',
    title: 'Total Species',
    percentKey: 'species',
  },
  {
    key: 'totalObservations',
    title: 'Total Observations',
    percentKey: 'observations',
  },
  {
    key: 'activeContributors',
    title: 'Active Contributors',
    percentKey: 'contributors',
  },
  {
    key: 'protectedAreas',
    title: 'Protected Areas',
    percentKey: 'protectedAreas',
  },
];

export const ANALYTICS_STALE_TIME = 1000 * 60 * 5; // 5 minutes
