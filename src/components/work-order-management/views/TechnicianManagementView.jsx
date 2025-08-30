import React, { useState, useEffect } from 'react';
import { Users, Smartphone, Clock, AlertTriangle, Plus, Search, Bell } from 'lucide-react';
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

// Import your Firebase and enhanced functions
// import { db, auth } from '../firebase';
// import { 
//   addTechnicianWithAuth, 
//   getTechniciansListener, 
//   checkEmailConflict,
//   getTechnicianStats,
//   updateTechnicianEnhanced,
//   deleteTechnicianEnhanced
// } from '../enhanced-technician-functions';

export default function TechnicianManagement({ 
  db, 
  auth, 
  addTechnicianWithAuth,
  getTechniciansListener,
  checkEmailConflict,
  getTechnicianStats,
  updateTechnicianEnhanced,
  deleteTechnicianEnhanced,
  createTechnicianAuth // Firebase Auth function
}) {
  const [technicians, setTechnicians] = useState([]);
  const [stats, setStats] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Get current user ID (adjust based on your user management)
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    // Set up real-time listener for technicians
    const unsubscribe = getTechniciansListener(db, userId, (technicianData) => {
      setTechnicians(technicianData);
      setLoading(false);
    });

    // Load stats
    loadStats();

    return () => unsubscribe();
  }, [userId]);

  const loadStats = async () => {
    try {
      const statsData = await getTechnicianStats(db, userId);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleAddTechnician = async (technicianData) => {
    try {
      if (!userId) throw new Error('User not authenticated');

      // Check for email conflicts
      const conflict = await checkEmailConflict(db, userId, technicianData.email);
      if (conflict.conflict) {
        throw new Error(conflict.message);
      }

      let firebaseUid = null;

      // Create Firebase Auth user if mobile access is enabled
      if (technicianData.mobileAccess && technicianData.password) {
        console.log('🔧 Creating TECHNICIAN Firebase Auth user (separate from main app users)...');
        
        const authResult = await createTechnicianAuth({
          email: technicianData.email,
          password: technicianData.password,
          name: technicianData.name,
          userType: 'technician',
          role: technicianData.role,
          department: technicianData.department
        });
        
        firebaseUid = authResult.uid;
        console.log('✅ Technician Firebase Auth user created successfully:', {
          uid: authResult.uid,
          email: authResult.email,
          userType: 'TECHNICIAN',
          separatedFromMainApp: true
        });
      }

      // Create technician document in Firestore
      const newTechnician = await addTechnicianWithAuth(db, userId, {
        ...technicianData,
        firebaseUid
      });

      console.log('✅ Technician created successfully:', newTechnician);
      setShowModal(false);
      
      // Refresh stats
      loadStats();

    } catch (error) {
      console.error('Failed to create technician:', error);
      throw error; // Let the modal handle the error display
    }
  };

  const handleToggleMobileAccess = async (technicianId) => {
    try {
      const technician = technicians.find(t => t.id === technicianId);
      if (technician) {
        await updateTechnicianEnhanced(db, userId, technicianId, {
          mobileAccess: !technician.mobileAccess
        });
        console.log('✅ Mobile access toggled for technician:', technician.email);
      }
    } catch (error) {
      console.error('Failed to toggle mobile access:', error);
    }
  };

  const handleDeleteTechnician = async (technicianId) => {
    if (confirm('Are you sure you want to delete this technician? This action cannot be undone.')) {
      try {
        await deleteTechnicianEnhanced(db, userId, technicianId, []);
        console.log('✅ Technician deleted successfully');
        loadStats();
      } catch (error) {
        console.error('Failed to delete technician:', error);
      }
    }
  };

  // Filter technicians based on search and status
  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = tech.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 dark:text-gray-400">Loading technicians...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Technician Management</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage technicians separate from main app users</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" data-testid="button-notifications">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-testid="card-active-technicians">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Technicians</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-active-count">{stats.active || 0}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-testid="card-mobile-access">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile Access</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-mobile-count">{stats.mobileEnabled || 0}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-testid="card-pending-setup">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Setup</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-pending-count">{stats.pending || 0}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-testid="card-auth-issues">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Auth Issues</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400" data-testid="text-auth-issues-count">{stats.authFailed || 0}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search technicians..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-testid="input-search"
              />
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="select-status-filter"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            data-testid="button-add-technician"
          >
            <Plus className="w-4 h-4" />
            <span>Add Technician</span>
          </button>
        </div>

        {/* Technicians Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Contact</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Department</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Mobile Access</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Auth Status</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredTechnicians.map((technician) => (
                  <tr key={technician.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-testid={`row-technician-${technician.id}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {technician.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'T'}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white" data-testid={`text-name-${technician.id}`}>
                            {technician.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400" data-testid={`text-id-${technician.id}`}>
                            ID: {technician.id?.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white" data-testid={`text-email-${technician.id}`}>
                        {technician.email}
                      </div>
                      {technician.phone && (
                        <div className="text-sm text-gray-500 dark:text-gray-400" data-testid={`text-phone-${technician.id}`}>
                          {technician.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 dark:text-white">{technician.department}</span>
                    </td>
                    <td className="px-6 py-4" data-testid={`status-${technician.id}`}>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        technician.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {technician.status || 'inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleMobileAccess(technician.id)}
                        className={`flex items-center space-x-1 text-sm ${
                          technician.mobileAccess 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>{technician.mobileAccess ? 'Enabled' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4" data-testid={`auth-status-${technician.id}`}>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          technician.authStatus === 'connected' ? 'bg-green-500' :
                          technician.authStatus === 'pending' ? 'bg-amber-500' :
                          technician.authStatus === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {technician.authStatus === 'connected' ? 'Connected' :
                           technician.authStatus === 'pending' ? 'Pending' :
                           technician.authStatus === 'failed' ? 'Failed' : 'None'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDeleteTechnician(technician.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
                        data-testid={`button-delete-${technician.id}`}
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTechnicians.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No technicians found. Click "Add Technician" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Technician Modal */}
        <AddTechnicianModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAddTechnician}
        />
      </div>
    </div>
  );
}