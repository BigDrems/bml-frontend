import  { SearchInput}  from "./SearchInput";
import  {SpeciesCheckbox}  from './SpeciesCheckBox'

export const SpeciesFilter = ({ speciesTypes = [], selectedSpecies, onToggleSpecies, onToggleAll, searchTerm, onSearchChange }) => {
  const filteredSpecies = speciesTypes.filter(sp =>
    sp.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const areAllSelected = speciesTypes.length > 0 && speciesTypes.every(sp => selectedSpecies[sp.id]);

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-gray-700">Species</span>
        <button 
          onClick={() => onToggleAll(!areAllSelected)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {areAllSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <SearchInput value={searchTerm} onChange={onSearchChange} />

      <div className="space-y-2">
        {filteredSpecies.map(species => (
          <SpeciesCheckbox
            key={species.id}
            species={species}
            checked={selectedSpecies[species.id]}
            onChange={() => onToggleSpecies(species.id)}
          />
        ))}
      </div>
    </div>
  );
};