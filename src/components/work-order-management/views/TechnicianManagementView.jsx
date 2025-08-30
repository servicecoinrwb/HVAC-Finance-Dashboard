import React from 'react';

export function TechnicianManagementView() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/technicians';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Loading Enhanced Technician Management
        </h2>
        <p className="text-blue-700 mb-4">
          Redirecting to the enhanced technician management system...
        </p>
        <div className="flex items-center space-x-4">
          <a 
            href="/technicians" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Technician Management
          </a>
          <div className="text-sm text-blue-600">
            Auto-redirecting in 2 seconds...
          </div>
        </div>
      </div>
    </div>
  );
}