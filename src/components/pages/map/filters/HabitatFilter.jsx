import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Trees } from "lucide-react";

export const HabitatFilter = ({ value, onChange, habitatTypes = [] }) => {
  const handleValueChange = (newValue) => {
    onChange({ target: { value: newValue } });
  };

  // Build options list with "All Habitats" first, then dynamic habitats
  const options = [
    { value: 'all', label: 'All Habitats' },
    ...habitatTypes
  ];

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trees className="w-4 h-4 text-green-600" />
        <span className="font-medium text-sm text-gray-900">Habitat Types</span>
      </div>
      
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger 
          className="w-full inline-flex items-center justify-between px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-gray-700 transition-all duration-200 data-[placeholder]:text-gray-400"
        >
          <Select.Value placeholder="Select habitat" />
          <Select.Icon className="text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content 
            className="overflow-hidden bg-white rounded-lg shadow-lg border border-gray-100 w-[var(--radix-select-trigger-width)] z-[1300] animate-in fade-in-0 zoom-in-95 duration-200"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="p-1">
              {options.map((item) => (
                <Select.Item 
                  key={item.value} 
                  value={item.value}
                  className="relative flex items-center h-9 px-8 py-2 text-sm text-gray-700 rounded-md select-none hover:bg-green-50 hover:text-green-900 focus:bg-green-50 focus:text-green-900 focus:outline-none cursor-pointer data-[state=checked]:font-medium data-[state=checked]:text-green-900"
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center text-green-600">
                    <Check className="w-4 h-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};