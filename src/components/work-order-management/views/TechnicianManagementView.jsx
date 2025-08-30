// Enhanced Technician Management - Redirects to working system
import React from 'react';
// Redirect to the working technician management system
// Redirect to the enhanced technician management system
export function TechnicianManagementView() {
  React.useEffect(() => {
    // Automatically redirect to the enhanced technician management page
    window.location.href = '/technicians';
    // Auto-redirect after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = '/technicians';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          🔄 Loading Enhanced Technician Management
        </h2>
        <p className="text-blue-700 mb-4">
          Redirecting to the enhanced technician management system with full user separation and mobile access controls...
          Redirecting to the enhanced technician management system...
        </p>
        <div className="flex items-center space-x-4">
          <a 
-3
+0
            Auto-redirecting in 2 seconds...
          </div>
        </div>
        <div className="mt-3 text-xs text-blue-500">
          ✨ Features: User separation • Mobile access • Firebase Auth • Real-time updates
        </div>
      </div>
    </div>
  );