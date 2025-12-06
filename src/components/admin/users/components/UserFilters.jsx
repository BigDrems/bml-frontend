import React from 'react';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function UserFilters({ filters, onSearch, onRoleFilter, onStatusFilter }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#90BE54] transition-colors" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90BE54]/30 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
          />
        </div>
        
        {/* Role Filter */}
        <Select 
          value={filters.role || 'all'} 
          onValueChange={onRoleFilter}
        >
          <SelectTrigger className="w-full md:w-44 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#90BE54]/30 focus:bg-white">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100 shadow-lg">
            <SelectItem value="all">Role</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="researcher">Researcher</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Status Filter */}
        <Select 
          value={filters.status || 'all'} 
          onValueChange={onStatusFilter}
        >
          <SelectTrigger className="w-full md:w-40 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#90BE54]/30 focus:bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100 shadow-lg">
            <SelectItem value="all">Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default UserFilters;
