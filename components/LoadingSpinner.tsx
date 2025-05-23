
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-8 app-sans-serif" aria-label="Loading guidance">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-600 mb-3"></div>
      <p className="text-lg text-slate-600">Accessing Insights from Divine Law...</p>
    </div>
  );
};

export default LoadingSpinner;
