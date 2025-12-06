import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/pages/map/Sidebar";
import { MapView } from "@/components/pages/map/MapView";
import { MapSkeleton } from "@/components/pages/map/MapSkeleton";
import { useSpeciesFilter } from "@/hooks/useSpeciesFilter";
import { getSightingsGeoJSON } from "@/api/sightings";
import { transformGeoJSONToSpeciesData } from "@/utils/mapHelpers";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

const MapPage = () => {
  const { data: sightingsGeoJSON, isPending } = useQuery({
    queryKey: ["sightings-geojson"],
    queryFn: getSightingsGeoJSON,
    staleTime: STALE_TIME,
  });

  const { speciesData, speciesTypes, habitatTypes } = useMemo(
    () => transformGeoJSONToSpeciesData(sightingsGeoJSON),
    [sightingsGeoJSON]
  );

  const {
    filters,
    updateFilter,
    toggleSpeciesType,
    toggleAllTypes,
    filteredSpecies,
  } = useSpeciesFilter(speciesData, speciesTypes);

  const uiState = {
    showObsDate: filters.ui?.showObsDate ?? false,
    showMapLayer: filters.ui?.showMapLayer ?? false,
    protectedAreaOpacity: filters.mapLayer?.opacity ?? 50,
    showProtectedAreas: filters.mapLayer?.showProtectedAreas ?? true,
  };

  const handleUpdateUI = (key, value) => {
    const uiKeys = ["showObsDate", "showMapLayer"];
    const mapLayerKeys = {
      protectedAreaOpacity: "opacity",
      showProtectedAreas: "showProtectedAreas",
    };

    if (uiKeys.includes(key)) {
      updateFilter("ui", { [key]: value });
    } else if (mapLayerKeys[key]) {
      updateFilter("mapLayer", { [mapLayerKeys[key]]: value });
    }
  };

  if (isPending) return <MapSkeleton />;

  return (
    <div className="relative flex h-[calc(100vh-4rem)] bg-gray-100 mb-10 mt-2 shadow-lg rounded-lg overflow-hidden">
      <Sidebar
        filters={filters}
        uiState={uiState}
        speciesTypes={speciesTypes}
        habitatTypes={habitatTypes}
        onUpdateUI={handleUpdateUI}
        onUpdateFilter={updateFilter}
        onToggleSpecies={toggleSpeciesType}
        onToggleAll={toggleAllTypes}
      />
      <MapView
        protectedAreaOpacity={uiState.protectedAreaOpacity}
        showProtectedAreas={uiState.showProtectedAreas}
        species={filteredSpecies}
        speciesTypes={speciesTypes}
      />
    </div>
  );
};

export default MapPage;