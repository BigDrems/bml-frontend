import type { Species, CreateSpeciesInput, SpeciesFilters } from '../../../../types/species';

export interface SpeciesFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  species: Species | null;
  onClose: () => void;
  onSubmit: (data: CreateSpeciesInput) => void;
  isLoading: boolean;
}

export interface SpeciesFiltersProps {
  filters: SpeciesFilters;
  onUpdateFilter: (key: keyof SpeciesFilters, value: string) => void;
  onClearFilters: () => void;
}

export interface SpeciesTableProps {
  species: Species[];
  isLoading: boolean;
  onEdit: (species: Species) => void;
  onDelete: (species: Species) => void;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  species: Species | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}
