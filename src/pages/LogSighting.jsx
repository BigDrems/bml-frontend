import React from 'react';
import { LogSightingForm } from '../components/pages/sighting/LogSightingForm';

const LogSighting = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <LogSightingForm />
      </div>
    </div>
  );
};

export default LogSighting;
