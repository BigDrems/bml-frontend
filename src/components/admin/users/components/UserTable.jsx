import React from 'react';
import { Users } from 'lucide-react';
import UserTableRow from './UserTableRow';

function UserTable({ 
  users, 
  activeDropdown,
  dropdownRef,
  onToggleDropdown, 
  onDelete 
}) {
  return (
    <div className="overflow-x-auto overflow-y-visible">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">User</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Joined</th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No users found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <UserTableRow
                key={user.id || `user-${index}`}
                user={user}
                isDropdownOpen={activeDropdown === user.id}
                dropdownRef={dropdownRef}
                onToggleDropdown={onToggleDropdown}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
