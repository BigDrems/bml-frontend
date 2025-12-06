import React from 'react';
import { Badge } from '@/components/ui/badge';

export const ConservationStatus = ({ status, species }) => {
  // Get status from props or species object with different possible field names
  const conservationStatus = status || species?.status || species?.conservationStatus || species?.iucnStatus || 'Not Evaluated';
  
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'least concern': return 'bg-[#90BE54] text-white border-none';
      case 'vulnerable': return 'bg-[#FD6D6D] text-white border-none';
      case 'endangered': return 'bg-orange-500 text-white border-none';
      case 'critically endangered': return 'bg-red-600 text-white border-none';
      default: return 'bg-gray-500 text-white border-none';
    }
  };

  return (
    <div className="bg-[#445133] p-6 rounded-[20px] shadow-green text-white mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <h3 className="text-xl font-bold mb-4 font-roboto-serif">Conservation Status</h3>
      <Badge className={`${getStatusColor(conservationStatus)} px-4 py-1.5 mb-4 text-sm font-medium rounded-full`}>
        {conservationStatus}
      </Badge>
      <p className="text-sm text-gray-200 leading-relaxed font-inter opacity-90">
        This species is listed as <span className="font-bold lowercase text-[#34FB02]">{conservationStatus}</span>. 
        Conservation efforts are ongoing to monitor and protect its population in the wild.
      </p>
    </div>
  );
};
