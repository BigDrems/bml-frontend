import React from 'react';
import { 
  MoreHorizontal, 
  Trash2
} from 'lucide-react';

function UserActionDropdown({ 
  user, 
  isOpen, 
  dropdownRef,
  onToggle, 
  onDelete 
}) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="flex justify-end relative" ref={isOpen ? dropdownRef : null}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
      </button>
      
      {/* Modern Dropdown Menu - Opens to the left */}
      {isOpen && (
        <div className="absolute right-full top-0 mr-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-right-2 duration-200">
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</p>
          </div>
          
          {/* Delete Action */}
          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <Trash2 className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-left">
              <p className="font-medium">Delete User</p>
              <p className="text-xs text-red-400">Permanently remove</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserActionDropdown;
