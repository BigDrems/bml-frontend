export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  family?: string;
  order?: string;
  class?: string;
  conservationStatus?: string;
  description?: string;
  habitat?: string;
  distribution?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpeciesInput {
  commonName: string;
  scientificName: string;
  family?: string;
  order?: string;
  class?: string;
  conservationStatus?: string;
  description?: string;
  habitat?: string;
  distribution?: string;
  imageUrl?: string;
}

export type UpdateSpeciesInput = Partial<CreateSpeciesInput>;

export interface SpeciesFilters {
  search?: string;
  conservationStatus?: string;
  family?: string;
  order?: string;
  class?: string;
}

export interface SpeciesManagementState {
  selectedSpecies: Species | null;
  isFormModalOpen: boolean;
  isDeleteModalOpen: boolean;
  filters: SpeciesFilters;
  mode: 'create' | 'edit';
}
