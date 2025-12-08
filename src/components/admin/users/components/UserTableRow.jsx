import React from 'react';
import { getRoleBadgeColor, getStatusBadgeColor } from '../utils';
import UserActionDropdown from './UserActionDropdown';

function UserTableRow({ 
  user, 
  isDropdownOpen, 
  dropdownRef,
  onToggleDropdown, 
  onDelete 
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#90BE54]/20 flex items-center justify-center">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-[#4F8706] font-semibold text-sm">
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">{user.displayName || 'Unknown'}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
          {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(user.status)}`}>
          {user.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <UserActionDropdown
          user={user}
          isOpen={isDropdownOpen}
          dropdownRef={dropdownRef}
          onToggle={() => onToggleDropdown(user.id)}
          onDelete={() => onDelete(user)}
        />
      </td>
    </tr>
  );
}

export default UserTableRow;
