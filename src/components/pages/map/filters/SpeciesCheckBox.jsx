import { Check } from "lucide-react";

export const SpeciesCheckbox = ({ species, checked, onChange }) => (
  <label className="group flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:bg-gray-50 hover:border-gray-100 cursor-pointer transition-all duration-200">
    <div className="flex items-center gap-3">
      <div 
        className={`
          w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shadow-sm
          ${checked ? 'border-transparent' : 'border-gray-300 bg-white group-hover:border-gray-400'}
        `}
        style={{ backgroundColor: checked ? species.color : undefined }}
      >
        <Check 
          className={`w-3.5 h-3.5 text-white stroke-[3] transition-transform duration-200 ${checked ? 'scale-100' : 'scale-0'}`} 
        />
      </div>
      <span className={`text-sm font-medium transition-colors ${checked ? 'text-gray-900' : 'text-gray-600'}`}>
        {species.label}
      </span>
    </div>
    
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
  </label>
);