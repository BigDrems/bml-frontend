import { Filter } from "lucide-react";

export const FilterHeader = () => (
  <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
      <Filter className="w-4 h-4 text-emerald-800" />
    </div>
    <span className="font-semibold text-gray-700">Filter Observations</span>
  </div>
);
