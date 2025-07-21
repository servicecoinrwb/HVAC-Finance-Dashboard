import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Plus, Search, Filter, AlertTriangle, Wrench, Calendar, DollarSign, TrendingUp, Car, MapPin, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const VehicleManagement = ({ 
  vehicles, 
  maintenanceLogs, 
  openModal, 
  handleDelete, 
  searchTerm, 
  setSearchTerm,
  jobs = [] 
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMaintenanceAlerts, setShowMaintenanceAlerts] = useState(true);

  console.log('DEBUG: Vehicles in component:', vehicles);
  console.log('DEBUG: Maintenance logs in component:', maintenanceLogs);

  // Simple vehicle deletion - let App.jsx handle the complex logic
  const handleDeleteVehicle = async (vehicleId, vehicleName) => {
    if (!window.confirm(`Are you sure you want to delete "${vehicleName}"?`)) {
      return;
    }
    
    try {
      await handleDelete('vehicle', vehicleId);
      console.log(`Vehicle ${vehicleName} deleted successfully`);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle. Please try again.');
    }
  };

  // Calculate fleet health metrics
  const fleetHealthData = useMemo(() => {
    const activeVehicles = vehicles.filter(v => !v.status || v.status === 'active');
    const totalMileage = vehicles.reduce((sum, v) => sum + (v.currentMileage || 0), 0);
    const avgMileage = vehicles.length > 0 ? totalMileage / vehicles.length : 0;
    
    // Calculate average age
    const currentYear = new Date().getFullYear();
    const totalAge = vehicles.reduce((sum, v) => sum + (currentYear - parseInt(v.year || currentYear)), 0);
    const avgAge = vehicles.length > 0 ? totalAge / vehicles.length : 0;
    
    // Calculate monthly maintenance cost
    const currentMonth = new Date().getMonth();
    const currentYearLogs = maintenanceLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
    });
    const monthlyMaintenanceCost = currentYearLogs.reduce((sum, log) => sum + (log.cost || 0), 0);
    
    // Vehicle utilization (jobs using vehicles this month)
    const vehiclesInUse = new Set(jobs.map(job => job.vehicleId).filter(Boolean));
    const utilizationRate = vehicles.length > 0 ? (vehiclesInUse.size / vehicles.length) * 100 : 0;

    return {
      totalVehicles: vehicles.length,
      activeVehicles: activeVehicles.length,
      avgMileage: Math.round(avgMileage),
      avgAge: avgAge.toFixed(1),
      monthlyMaintenanceCost,
      utilizationRate: utilizationRate.toFixed(1)
    };
  }, [vehicles, maintenanceLogs, jobs]);

  // Generate maintenance alerts
  const maintenanceAlerts = useMemo(() => {
    const alerts = [];
    
    vehicles.forEach(vehicle => {
      const vehicleLogs = maintenanceLogs.filter(log => log.vehicleId === vehicle.id);
      
      // Oil change alerts (every 5000 miles)
      const lastOilChange = vehicleLogs
        .filter(log => log.workPerformed?.toLowerCase().includes('oil'))
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      
      if (lastOilChange) {
        const milesSinceOilChange = (vehicle.currentMileage || 0) - (lastOilChange.mileage || 0);
        if (milesSinceOilChange > 5000) {
          alerts.push({
            id: `oil-${vehicle.id}`,
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            type: 'oil_change',
            severity: milesSinceOilChange > 6000 ? 'critical' : 'warning',
            message: `Oil change overdue by ${milesSinceOilChange - 5000} miles`,
            milesSinceService: milesSinceOilChange
          });
        } else if (milesSinceOilChange > 4000) {
          alerts.push({
            id: `oil-due-${vehicle.id}`,
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            type: 'oil_change_due',
            severity: 'info',
            message: `Oil change due in ${5000 - milesSinceOilChange} miles`,
            milesSinceService: milesSinceOilChange
          });
        }
      } else if (vehicle.currentMileage > 5000) {
        alerts.push({
          id: `oil-never-${vehicle.id}`,
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          type: 'oil_change',
          severity: 'critical',
          message: 'No oil change record found',
          milesSinceService: vehicle.currentMileage
        });
      }

      // High mileage alerts (over 100k miles)
      if (vehicle.currentMileage > 100000) {
        alerts.push({
          id: `mileage-${vehicle.id}`,
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          type: 'high_mileage',
          severity: vehicle.currentMileage > 150000 ? 'critical' : 'warning',
          message: `High mileage vehicle (${vehicle.currentMileage?.toLocaleString()} miles)`,
          mileage: vehicle.currentMileage
        });
      }
    });

    return alerts.sort((a, b) => {
      const severityOrder = { critical: 3, warning: 2, info: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }, [vehicles, maintenanceLogs]);

  // Filter vehicles based on search and status
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;
    
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(vehicle => {
        const status = vehicle.status || 'active';
        return status === filterStatus;
      });
    }
    
    return filtered;
  }, [vehicles, searchTerm, filterStatus]);

  // Get vehicle status color and icon
  const getVehicleStatus = (vehicle) => {
    const status = vehicle.status || 'active';
    const alerts = maintenanceAlerts.filter(alert => alert.vehicleId === vehicle.id);
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
    
    if (criticalAlerts.length > 0) {
      return { status: 'critical', color: 'text-red-500', icon: XCircle, bg: 'bg-red-50 border-red-200' };
    } else if (alerts.length > 0) {
      return { status: 'warning', color: 'text-yellow-500', icon: AlertCircle, bg: 'bg-yellow-50 border-yellow-200' };
    } else if (status === 'active') {
      return { status: 'active', color: 'text-green-500', icon: CheckCircle, bg: 'bg-green-50 border-green-200' };
    } else {
      return { status: 'inactive', color: 'text-gray-500', icon: XCircle, bg: 'bg-gray-50 border-gray-200' };
    }
  };

  const FleetHealthCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
        </div>
        <Icon size={24} className={color} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Fleet Health Dashboard */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Car className="text-blue-500" size={24} />
          Fleet Health Dashboard
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <FleetHealthCard
            title="Total Vehicles"
            value={fleetHealthData.totalVehicles}
            icon={Car}
            color="text-blue-500"
          />
          <FleetHealthCard
            title="Active"
            value={fleetHealthData.activeVehicles}
            icon={CheckCircle}
            color="text-green-500"
          />
          <FleetHealthCard
            title="Avg Mileage"
            value={fleetHealthData.avgMileage.toLocaleString()}
            icon={MapPin}
            color="text-purple-500"
            subtext="miles"
          />
          <FleetHealthCard
            title="Avg Age"
            value={`${fleetHealthData.avgAge} yrs`}
            icon={Clock}
            color="text-orange-500"
          />
          <FleetHealthCard
            title="Monthly Maintenance"
            value={`$${fleetHealthData.monthlyMaintenanceCost.toLocaleString()}`}
            icon={DollarSign}
            color="text-red-500"
          />
          <FleetHealthCard
            title="Utilization"
            value={`${fleetHealthData.utilizationRate}%`}
            icon={TrendingUp}
            color="text-cyan-500"
          />
        </div>
      </div>

      {/* Maintenance Alerts */}
      {showMaintenanceAlerts && maintenanceAlerts.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              Maintenance Alerts ({maintenanceAlerts.length})
            </h3>
            <button
              onClick={() => setShowMaintenanceAlerts(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {maintenanceAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'critical' 
                    ? 'bg-red-50 border-red-400 dark:bg-red-900/20' 
                    : alert.severity === 'warning'
                    ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20'
                    : 'bg-blue-50 border-blue-400 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${
                      alert.severity === 'critical' 
                        ? 'text-red-800 dark:text-red-200' 
                        : alert.severity === 'warning'
                        ? 'text-yellow-800 dark:text-yellow-200'
                        : 'text-blue-800 dark:text-blue-200'
                    }`}>
                      {alert.vehicleName}
                    </p>
                    <p className={`text-sm ${
                      alert.severity === 'critical' 
                        ? 'text-red-600 dark:text-red-300' 
                        : alert.severity === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-300'
                        : 'text-blue-600 dark:text-blue-300'
                    }`}>
                      {alert.message}
                    </p>
                  </div>
                  <button
                    onClick={() => openModal('maintenanceLog', { vehicleId: alert.vehicleId })}
                    className={`p-2 rounded-md hover:bg-opacity-80 ${
                      alert.severity === 'critical' 
                        ? 'bg-red-200 text-red-800 hover:bg-red-300' 
                        : alert.severity === 'warning'
                        ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                        : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                    }`}
                  >
                    <Wrench size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle Management */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Vehicle Fleet Management</h2>
          <button
            onClick={() => openModal('vehicle')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add Vehicle
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">In Maintenance</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          <p>DEBUG: Total vehicles: {vehicles.length}</p>
          <p>DEBUG: Filtered vehicles: {filteredVehicles.length}</p>
          <p>DEBUG: Sample vehicle: {JSON.stringify(vehicles[0])}</p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map(vehicle => {
            const vehicleStatus = getVehicleStatus(vehicle);
            const vehicleAlerts = maintenanceAlerts.filter(alert => alert.vehicleId === vehicle.id);
            const lastMaintenance = maintenanceLogs
              .filter(log => log.vehicleId === vehicle.id)
              .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            return (
              <div
                key={vehicle.id}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${vehicleStatus.bg}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <vehicleStatus.icon size={20} className={vehicleStatus.color} />
                    <h3 className="font-semibold text-slate-800 dark:text-white">{vehicle.name || 'Unnamed Vehicle'}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal('vehicle', vehicle)}
                      className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                      title="Edit Vehicle"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name || 'Unnamed Vehicle')}
                      className="p-1 text-slate-500 hover:text-red-600 transition-colors"
                      title="Delete Vehicle"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Make/Model:</span>
                    <span className="font-medium">{vehicle.make || 'N/A'} {vehicle.model || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Year:</span>
                    <span className="font-medium">{vehicle.year || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">License:</span>
                    <span className="font-medium">{vehicle.licensePlate || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Mileage:</span>
                    <span className="font-medium">{vehicle.currentMileage?.toLocaleString() || '0'} mi</span>
                  </div>
                  
                  {lastMaintenance && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Last Service:</span>
                      <span className="font-medium">{new Date(lastMaintenance.date).toLocaleDateString()}</span>
                    </div>
                  )}

                  {vehicleAlerts.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-600">
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {vehicleAlerts.length} Alert{vehicleAlerts.length > 1 ? 's' : ''}:
                      </p>
                      {vehicleAlerts.slice(0, 2).map(alert => (
                        <p key={alert.id} className={`text-xs ${
                          alert.severity === 'critical' ? 'text-red-600' : 
                          alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                        }`}>
                          • {alert.message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openModal('maintenanceLog', { vehicleId: vehicle.id })}
                    className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <Wrench size={14} />
                    Service
                  </button>
                  <button
                    onClick={() => setSelectedVehicleId(selectedVehicleId === vehicle.id ? null : vehicle.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <Calendar size={14} />
                    History
                  </button>
                </div>

                {/* Maintenance History (Expandable) */}
                {selectedVehicleId === vehicle.id && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-600">
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Recent Maintenance</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {maintenanceLogs
                        .filter(log => log.vehicleId === vehicle.id)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 5)
                        .map(log => (
                          <div key={log.id} className="text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded">
                            <div className="flex justify-between items-start">
                              <span className="font-medium">{log.workPerformed}</span>
                              <span className="text-green-600 font-medium">${log.cost}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                              <span>{new Date(log.date).toLocaleDateString()}</span>
                              {log.mileage && <span>{log.mileage?.toLocaleString()} mi</span>}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">No vehicles found</h3>
            <p className="text-slate-400 dark:text-slate-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first vehicle to get started'}
            </p>
            <button
              onClick={() => openModal('vehicle')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add Vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;