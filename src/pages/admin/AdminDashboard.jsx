import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAdminDashboardStats } from '@/api/admin';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import ObservationsChart from '@/components/admin/dashboard/ObservationsChart';
import ActionItems from '@/components/admin/dashboard/ActionItems';
import { useAuth } from '@/context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: getAdminDashboardStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-[#90BE54]/30">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>

        {/* Chart and Actions Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 h-80 animate-pulse border border-[#90BE54]/30"></div>
          <div className="bg-white rounded-xl p-6 h-80 animate-pulse border border-[#90BE54]/30"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200">
        <h3 className="font-semibold mb-2">Error Loading Dashboard</h3>
        <p>Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }

  const { stats, chartData, pendingSightings, recentActivity } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-800 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {user?.displayName || 'Admin'}! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Observations"
          value={stats.totalObservations}
          percentChange={stats.observationsChange}
          isPositive={stats.observationsChange >= 0}
        />
        <StatsCard
          title="New Species (Month)"
          value={stats.newSpecies}
          percentChange={stats.newSpeciesChange}
          isPositive={stats.newSpeciesChange >= 0}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          percentChange={stats.activeUsersChange}
          isPositive={stats.activeUsersChange >= 0}
        />
        <StatsCard
          title="Pending Sightings"
          value={stats.pendingSightings}
          percentChange={stats.pendingSightingsChange}
          isPositive={true}
        />
      </div>

      {/* Chart and Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ObservationsChart
            data={chartData.weeklyData}
            total={chartData.total}
            percentChange={chartData.percentChange}
          />
        </div>
        <div>
          <ActionItems
            pendingSightings={pendingSightings}
            recentActivity={recentActivity}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
