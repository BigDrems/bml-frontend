import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-[#90BE54] opacity-20"></div>
          <div className="relative rounded-full bg-card p-4 shadow-lg ring-1 ring-border">
            <Loader2 className="h-8 w-8 animate-spin text-[#90BE54]" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">BioMap Leyte</h3>
          <p className="text-sm text-muted-foreground animate-pulse">Loading resources...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
