// This file exists for GitHub repository compatibility
// The actual technician management is now handled by client/src/pages/technician-management.tsx

import React from 'react';

// Simple redirect component to avoid build errors
export default function TechnicianManagementView() {
  return (
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Technician Management Moved
        </h2>
        <p className="text-blue-700">
          The technician management system has been moved to the main application.
          Please use the updated interface in the main dashboard.
        </p>
        <p className="text-blue-600 text-sm mt-2">
          Location: client/src/pages/technician-management.tsx
        </p>
      </div>
    </div>
  );
}