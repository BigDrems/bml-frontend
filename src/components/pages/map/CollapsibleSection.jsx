import { ChevronDown } from "lucide-react";

export const CollapsibleSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      onClick={onToggle}
      className={`w-full px-4 py-4 flex items-center justify-between transition-colors duration-200 group ${
        isOpen ? 'bg-gray-50/50' : 'hover:bg-gray-50'
      }`}
    >
      <span className={`font-medium text-sm transition-colors ${
        isOpen ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
      }`}>
        {title}
      </span>
      <ChevronDown 
        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${
          isOpen ? 'rotate-180 text-gray-600' : 'group-hover:text-gray-600'
        }`} 
      />
    </button>
    
    <div 
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-4 pb-4 pt-1">
          {children}
        </div>
      </div>
    </div>
  </div>
);
