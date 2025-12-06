import { Search } from 'lucide-react';

export const SearchInput = ({ value, onChange }) => (
  <div className="relative mb-3">
    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search species..."
      value={value}
      onChange={onChange}
      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
