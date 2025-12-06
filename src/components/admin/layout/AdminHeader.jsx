import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function AdminHeader({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white text-gray-800 placeholder-gray-400 pl-10 pr-4 py-2 rounded-full border border-[#90BE54] focus:outline-none focus:border-[#4F8706] focus:ring-2 focus:ring-[#90BE54]/20"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-[#4F8706] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#90BE54] flex items-center justify-center overflow-hidden">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-medium">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
