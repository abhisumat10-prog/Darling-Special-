import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      <div className="h-10 bg-carbon-800 rounded-xl w-full"></div>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-14 bg-carbon-900 border border-carbon-800 rounded-xl w-full flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-carbon-800"></div>
            <div className="w-32 h-4 rounded bg-carbon-800"></div>
          </div>
          <div className="w-20 h-4 rounded bg-carbon-800"></div>
          <div className="w-16 h-4 rounded bg-carbon-800 hidden sm:block"></div>
        </div>
      ))}
    </div>
  );
};
