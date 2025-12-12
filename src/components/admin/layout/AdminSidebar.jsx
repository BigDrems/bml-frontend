import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PawPrint, 
  ClipboardCheck, 
  FileText, 
  Settings,
  X
} from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/users', icon: Users, label: 'User Management' },
  { to: '/admin/species', icon: PawPrint, label: 'Species Management' },
  { to: '/admin/sightings', icon: ClipboardCheck, label: 'Sighting Review' },
  { to: '/admin/reports', icon: FileText, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

function AdminSidebar({ isOpen, onClose }) {
  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-64 bg-white min-h-screen flex flex-col border-r border-gray-200
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#90BE54] rounded-lg flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-lg">Wildlife Tracker</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>
          {/* Close button - mobile only */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#90BE54] text-black'
                      : 'text-gray-700 hover:bg-[#90BE54]/10 hover:text-[#4F8706]'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
