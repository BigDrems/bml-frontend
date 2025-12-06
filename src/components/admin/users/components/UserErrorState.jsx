import React from 'react';

function UserErrorState({ onRetry }) {
  return (
    <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200">
      <h3 className="font-semibold mb-2">Error Loading Users</h3>
      <p>Failed to load user data. Please try again later.</p>
      <button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

export default UserErrorState;
