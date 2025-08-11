import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Edit, Trash2, Plus, Search, Filter, Car, MapPin, Clock, CheckCircle, AlertCircle, XCircle, FileText, Download, BarChart3, TrendingUp, DollarSign, Wrench, Calendar, Bell, AlertTriangle, Upload } from 'lucide-react';

const VehicleManagement = ({ 
  vehicles = [], 
  maintenanceLogs = [], 
  openModal, 
  handleDelete, 
  searchTerm = '', 
  setSearchTerm,
  jobs = [] 
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [localVehicles, setLocalVehicles] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' or 'maintenance'

  // Common service types for HVAC businesses
  const serviceTypes = [
    { value: 'oil_change', label: 'Oil Change', interval: 3000, category: 'Engine', cost: 50 },
    { value: 'tire_rotation', label: 'Tire Rotation', interval: 6000, category: 'Tires', cost: 25 },
    { value: 'brake_service', label: 'Brake Service', interval: 12000, category: 'Brakes', cost: 300 },
    { value: 'transmission', label: 'Transmission Service', interval: 30000, category: 'Transmission', cost: 150 },
    { value: 'coolant_flush', label: 'Coolant Flush', interval: 24000, category: 'Cooling', cost: 100 },
    { value: 'air_filter', label: 'Air Filter', interval: 12000, category: 'Engine', cost: 30 },
    { value: 'spark_plugs', label: 'Spark Plugs', interval: 30000, category: 'Engine', cost: 120 },
    { value: 'belts_hoses', label: 'Belts & Hoses', interval: 24000, category: 'Engine', cost: 200 },
    { value: 'battery', label: 'Battery Service', interval: 36000, category: 'Electrical', cost: 150 },
    { value: 'inspection', label: 'Annual Inspection', interval: 12000, category: 'Legal', cost: 50 },
    { value: 'ac_service', label: 'A/C Service', interval: 12000, category: 'HVAC', cost: 180 },
    { value: 'general_repair', label: 'General Repair', interval: 0, category: 'Repair', cost: 200 },
    { value: 'preventive', label: 'Preventive Maintenance', interval: 6000, category: 'Maintenance', cost: 100 }
  ];

  // Update local state when vehicles prop changes
  useEffect(() => {
    console.log('Vehicles updated:', vehicles.length);
    setLocalVehicles([...vehicles]);
  }, [vehicles]);

  // CSV Import Button Component
  const CSVImportButton = ({ onImport }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onImport(file);
        e.target.value = ''; // Reset input
      }
    };

    return (
      <div className="inline-block">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          <Upload size={16} />
          Import Vehicles
        </button>
      </div>
    );
  };

  // Enhanced CSV Import Handler
  const handleVehicleImport = (file) => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert("CSV file must have at least a header row and one data row.");
          return;
        }

        // Parse CSV
        const parseCSVLine = (line) => {
          const result = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };

        const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim().toLowerCase());
        const vehicles = [];

        // Process each line
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          const vehicle = {};

          // Map common field variations
          headers.forEach((header, index) => {
            const value = values[index] ? values[index].replace(/"/g, '').trim() : '';
            
            if (header.includes('name') || header.includes('vehicle')) {
              vehicle.name = value;
            } else if (header.includes('make')) {
              vehicle.make = value.toUpperCase();
            } else if (header.includes('model')) {
              vehicle.model = value;
            } else if (header.includes('year')) {
              vehicle.year = value;
            } else if (header.includes('license') || header.includes('plate')) {
              vehicle.licensePlate = value;
            } else if (header.includes('vin')) {
              vehicle.vin = value;
            } else if (header.includes('mileage') || header.includes('miles')) {
              vehicle.currentMileage = parseInt(value) || 0;
            } else if (header.includes('status')) {
              vehicle.status = value.toLowerCase() || 'active';
            } else if (header.includes('notes')) {
              vehicle.notes = value;
            }
          });

          // Only add if we have essential data
          if (vehicle.name || (vehicle.make && vehicle.model)) {
            vehicle.name = vehicle.name || `${vehicle.make} ${vehicle.model}`;
            vehicle.status = vehicle.status || 'active';
            vehicles.push(vehicle);
          }
        }

        if (vehicles.length === 0) {
          alert("No valid vehicle records found in the CSV file.");
          return;
        }

        // Process the vehicles through your existing system
        vehicles.forEach(vehicle => {
          openModal('vehicle', vehicle);
          // Note: This will open modals one by one - you might want to implement batch import
        });

        alert(`Found ${vehicles.length} vehicles to import. Please review and save each one.`);

      } catch (error) {
        console.error("Error parsing CSV:", error);
        alert("Error parsing CSV file. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  // Enhanced Export with more fields
  const exportVehicleData = () => {
    if (localVehicles.length === 0) {
      alert("No vehicles to export.");
      return;
    }

    const csvData = localVehicles.map(vehicle => ({
      'Vehicle Name': vehicle.name || '',
      'Make': vehicle.make || '',
      'Model': vehicle.model || '',
      'Year': vehicle.year || '',
      'License Plate': vehicle.licensePlate || '',
      'VIN': vehicle.vin || '',
      'Current Mileage': vehicle.currentMileage || 0,
      'Status': vehicle.status || 'active',
      'Notes': vehicle.notes || '',
      'Date Added': vehicle.createdAt ? new Date(vehicle.createdAt.seconds * 1000).toLocaleDateString() : ''
    }));
    
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape values that contain commas, quotes, or newlines
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vehicle-fleet-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`Exported ${localVehicles.length} vehicles to CSV`);
  };

  // CSV Template Generator
  const exportVehicleTemplate = () => {
    const templateData = [{
      'Vehicle Name': 'Service Truck 1',
      'Make': 'FORD',
      'Model': 'F-150',
      'Year': '2020',
      'License Plate': 'ABC123',
      'VIN': '1FTFW1ET0LKD12345',
      'Current Mileage': '75000',
      'Status': 'active',
      'Notes': 'Primary service vehicle'
    }];
    
    const headers = Object.keys(templateData[0]);
    const csvContent = [
      headers.join(','),
      ...templateData.map(row => 
        headers.map(header => row[header]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle-import-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Enhanced vehicle deletion
  const handleDeleteVehicle = async (vehicleId, vehicleName) => {
    if (!window.confirm('Delete "' + vehicleName + '"?')) {
      return;
    }

    console.log('Starting delete for vehicle:', vehicleId, vehicleName);
    setIsDeleting(true);

    try {
      // Optimistic UI update
      const updatedVehicles = localVehicles.filter(v => v.id !== vehicleId);
      setLocalVehicles(updatedVehicles);

      // Call the actual delete function
      await handleDelete('vehicle', vehicleId);
      
      console.log('Vehicle deleted successfully');
    } catch (error) {
      console.error('Delete failed, reverting UI:', error);
      setLocalVehicles([...vehicles]);
      alert('Failed to delete vehicle: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Get overdue maintenance count - MOVED BEFORE fleetHealthData useMemo
  const getOverdueMaintenanceCount = () => {
    let overdueCount = 0;
    
    localVehicles.forEach(vehicle => {
      serviceTypes.forEach(service => {
        if (service.interval > 0) {
          const lastService = maintenanceLogs
            .filter(log => log.vehicleId === vehicle.id && log.serviceType === service.value)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

          const currentMileage = vehicle.currentMileage || 0;
          const lastServiceMileage = lastService ? (lastService.mileage || 0) : 0;
          const milesSinceService = currentMileage - lastServiceMileage;

          if (milesSinceService >= service.interval) {
            overdueCount++;
          }
        }
      });
    });

    return overdueCount;
  };

  // Fleet health metrics - NOW AFTER getOverdueMaintenanceCount
  const fleetHealthData = useMemo(() => {
    const activeVehicles = localVehicles.filter(v => !v.status || v.status === 'active');
    const totalMileage = localVehicles.reduce((sum, v) => sum + (v.currentMileage || 0), 0);
    const avgMileage = localVehicles.length > 0 ? totalMileage / localVehicles.length : 0;
    
    const currentYear = new Date().getFullYear();
    const totalAge = localVehicles.reduce((sum, v) => sum + (currentYear - parseInt(v.year || currentYear)), 0);
    const avgAge = localVehicles.length > 0 ? totalAge / localVehicles.length : 0;
    
    const highMileageVehicles = localVehicles.filter(v => (v.currentMileage || 0) > 100000).length;

    // Calculate maintenance stats
    const totalMaintenanceCost = maintenanceLogs
      .filter(log => log.date && new Date(log.date).getFullYear() === currentYear)
      .reduce((sum, log) => sum + (log.cost || 0), 0);

    const overdueMaintenance = getOverdueMaintenanceCount(); // ✅ Now this works!

    return {
      totalVehicles: localVehicles.length,
      activeVehicles: activeVehicles.length,
      avgMileage: Math.round(avgMileage),
      avgAge: avgAge.toFixed(1),
      highMileageVehicles,
      totalMaintenanceCost,
      overdueMaintenance
    };
  }, [localVehicles, maintenanceLogs]);

  // Get maintenance alerts for a vehicle
  const getMaintenanceAlerts = (vehicle) => {
    const alerts = [];
    const currentMileage = vehicle.currentMileage || 0;

    serviceTypes.forEach(service => {
      if (service.interval > 0) {
        const lastService = maintenanceLogs
          .filter(log => log.vehicleId === vehicle.id && log.serviceType === service.value)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        const lastServiceMileage = lastService ? (lastService.mileage || 0) : 0;
        const milesSinceService = currentMileage - lastServiceMileage;
        const milesUntilService = service.interval - milesSinceService;

        if (milesSinceService >= service.interval) {
          alerts.push({
            type: 'overdue',
            service: service.label,
            mileage: Math.abs(milesUntilService),
            severity: 'high'
          });
        } else if (milesUntilService <= 1000 && milesUntilService > 0) {
          alerts.push({
            type: 'due_soon',
            service: service.label,
            mileage: milesUntilService,
            severity: 'medium'
          });
        }
      }
    });

    return alerts.sort((a, b) => b.severity === 'high' ? 1 : -1);
  };

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = localVehicles;
    
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
    
    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'mileage':
          aValue = a.currentMileage || 0;
          bValue = b.currentMileage || 0;
          break;
        case 'year':
          aValue = parseInt(a.year || 0);
          bValue = parseInt(b.year || 0);
          break;
        case 'make':
          aValue = a.make || '';
          bValue = b.make || '';
          break;
        default:
          aValue = a.name || '';
          bValue = b.name || '';
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
    
    return sorted;
  }, [localVehicles, searchTerm, filterStatus, sortBy, sortOrder]);

  // Get vehicle status
  const getVehicleStatus = (vehicle) => {
    const status = vehicle.status || 'active';
    
    if (status === 'active') {
      return { 
        status: 'active', 
        color: 'text-green-500', 
        icon: CheckCircle, 
        bg: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
        label: 'Active'
      };
    } else if (status === 'maintenance') {
      return { 
        status: 'maintenance', 
        color: 'text-yellow-500', 
        icon: AlertCircle, 
        bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800',
        label: 'In Maintenance'
      };
    } else {
      return { 
        status: 'inactive', 
        color: 'text-gray-500', 
        icon: XCircle, 
        bg: 'bg-gray-50 border-gray-200 dark:bg-gray-900/10 dark:border-gray-800',
        label: 'Inactive'
      };
    }
  };

  // Fleet Health Card component
  const FleetHealthCard = ({ title, value, icon: Icon, color, subtext, onClick }) => (
    <div 
      className={`bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md ${onClick ? 'cursor-pointer hover:border-blue-300' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className={'text-2xl font-bold ' + color}>{value}</p>
          {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
        </div>
        <Icon size={24} className={color} />
      </div>
    </div>
  );

  // Add Maintenance Modal Component
  const MaintenanceModal = () => {
    const [formData, setFormData] = useState({
      vehicleId: selectedVehicle?.id || '',
      serviceType: '',
      description: '',
      cost: '',
      mileage: '',
      date: new Date().toISOString().split('T')[0],
      nextServiceMileage: '',
      notes: ''
    });

    const selectedService = serviceTypes.find(s => s.value === formData.serviceType);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const maintenanceData = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        mileage: parseInt(formData.mileage) || 0,
        nextServiceMileage: parseInt(formData.nextServiceMileage) || 0,
        createdAt: new Date().toISOString()
      };

      // Add estimated next service mileage if not provided
      if (!maintenanceData.nextServiceMileage && selectedService?.interval) {
        maintenanceData.nextServiceMileage = maintenanceData.mileage + selectedService.interval;
      }

      openModal('maintenanceLog', maintenanceData);
      setShowMaintenanceModal(false);
      setFormData({
        vehicleId: '',
        serviceType: '',
        description: '',
        cost: '',
        mileage: '',
        date: new Date().toISOString().split('T')[0],
        nextServiceMileage: '',
        notes: ''
      });
    };

    useEffect(() => {
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          cost: prev.cost || selectedService.cost.toString(),
          description: prev.description || selectedService.label
        }));
      }
    }, [selectedService]);

    if (!showMaintenanceModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Wrench className="text-blue-500" size={24} />
                Add Service Record
              </h2>
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <XCircle size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Vehicle *
                </label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleId: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {localVehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name || 'Unnamed'} - {vehicle.make} {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Service Type *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Service</option>
                  {serviceTypes.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label} ({service.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Service Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Current Mileage
                </label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 45000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Next Service Mileage
                </label>
                <input
                  type="number"
                  value={formData.nextServiceMileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, nextServiceMileage: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder={selectedService ? `Auto: ${(parseInt(formData.mileage) || 0) + selectedService.interval}` : 'Optional'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the service"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows="3"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Additional notes, parts used, recommendations, etc."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowMaintenanceModal(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                Add Service Record
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Maintenance History Component
  const MaintenanceHistory = () => {
    const sortedLogs = [...maintenanceLogs].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Wrench className="text-blue-500" size={24} />
            Maintenance History
          </h2>
          <button
            onClick={() => {
              setSelectedVehicle(null);
              setShowMaintenanceModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>

        {sortedLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Mileage</th>
                  <th className="p-3">Cost</th>
                  <th className="p-3">Next Due</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedLogs.map(log => {
                  const vehicle = localVehicles.find(v => v.id === log.vehicleId);
                  const serviceType = serviceTypes.find(s => s.value === log.serviceType);
                  
                  return (
                    <tr key={log.id} className="border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="p-3">
                        {log.date ? new Date(log.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-3">
                        <div>
                          <span className="font-medium">{vehicle?.name || 'Unknown Vehicle'}</span>
                          <div className="text-xs text-slate-500">
                            {vehicle?.make} {vehicle?.model}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <span className="font-medium">{serviceType?.label || log.serviceType}</span>
                          {log.description && (
                            <div className="text-xs text-slate-500">{log.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-3 font-mono">
                        {(log.mileage || 0).toLocaleString()}
                      </td>
                      <td className="p-3 font-mono">
                        ${(log.cost || 0).toFixed(2)}
                      </td>
                      <td className="p-3 font-mono">
                        {log.nextServiceMileage ? log.nextServiceMileage.toLocaleString() : 'N/A'}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openModal('maintenanceLog', log)}
                            className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                            title="Edit Service"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete('maintenanceLog', log.id)}
                            className="p-1 text-slate-500 hover:text-red-600 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Wrench size={48} className="text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">
              No maintenance records yet
            </h3>
            <p className="text-slate-400 dark:text-slate-500 mb-4">
              Start tracking your vehicle maintenance and services
            </p>
            <button
              onClick={() => setShowMaintenanceModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add First Service
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Fleet Health Dashboard */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-500" size={24} />
            Fleet Overview
          </h2>
          {localVehicles.length > 0 && (
            <div className="flex items-center gap-2">
              <CSVImportButton onImport={handleVehicleImport} />
              <button
                onClick={exportVehicleData}
                className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Download size={16} />
                Export Vehicles
              </button>
              <button
                onClick={exportVehicleTemplate}
                className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <FileText size={16} />
                CSV Template
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <FleetHealthCard
            title="Total Vehicles"
            value={fleetHealthData.totalVehicles}
            icon={Car}
            color="text-blue-500"
          />
          <FleetHealthCard
            title="Active Fleet"
            value={fleetHealthData.activeVehicles}
            icon={CheckCircle}
            color="text-green-500"
            subtext={((fleetHealthData.activeVehicles / (fleetHealthData.totalVehicles || 1)) * 100).toFixed(0) + '% active'}
          />
          <FleetHealthCard
            title="Avg Mileage"
            value={fleetHealthData.avgMileage.toLocaleString()}
            icon={MapPin}
            color="text-purple-500"
            subtext="miles per vehicle"
          />
          <FleetHealthCard
            title="Fleet Age"
            value={fleetHealthData.avgAge + ' yrs'}
            icon={Clock}
            color="text-orange-500"
            subtext="average age"
          />
          <FleetHealthCard
            title="High Mileage"
            value={fleetHealthData.highMileageVehicles}
            icon={TrendingUp}
            color="text-amber-500"
            subtext=">100k miles"
          />
          <FleetHealthCard
            title="Maintenance Cost"
            value={'$' + fleetHealthData.totalMaintenanceCost.toLocaleString()}
            icon={DollarSign}
            color="text-emerald-500"
            subtext="this year"
          />
          <FleetHealthCard
            title="Overdue Services"
            value={fleetHealthData.overdueMaintenance}
            icon={AlertTriangle}
            color={fleetHealthData.overdueMaintenance > 0 ? "text-red-500" : "text-green-500"}
            subtext="need attention"
            onClick={() => setActiveTab('maintenance')}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'vehicles'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/10'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Car size={18} />
                Vehicles ({localVehicles.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'maintenance'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/10'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wrench size={18} />
                Maintenance ({maintenanceLogs.length})
                {fleetHealthData.overdueMaintenance > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {fleetHealthData.overdueMaintenance}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'vehicles' ? (
            // Vehicles Tab Content
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Vehicle Fleet Management</h2>
                <div className="flex items-center gap-2">
                  {localVehicles.length > 0 && (
                    <button
                      onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                      className="flex items-center gap-2 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg transition-colors"
                    >
                      {viewMode === 'grid' ? <FileText size={16} /> : <Car size={16} />}
                      {viewMode === 'grid' ? 'Table View' : 'Grid View'}
                    </button>
                  )}
                  <button
                    onClick={() => openModal('vehicle')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                    Add Vehicle
                  </button>
                </div>
              </div>

              {localVehicles.length > 0 && (
                /* Search and Filter */
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search by name, make, model, license plate, or VIN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter size={18} className="text-slate-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="maintenance">In Maintenance</option>
                      <option value="retired">Retired</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="mileage">Sort by Mileage</option>
                      <option value="year">Sort by Year</option>
                      <option value="make">Sort by Make</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                      title={'Sort ' + (sortOrder === 'asc' ? 'Descending' : 'Ascending')}
                    >
                      <TrendingUp size={18} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </div>
              )}

              {/* Vehicle Display */}
              {localVehicles.length > 0 ? (
                viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedVehicles.map(vehicle => {
                      const vehicleStatus = getVehicleStatus(vehicle);
                      const alerts = getMaintenanceAlerts(vehicle);

                      return (
                        <div
                          key={vehicle.id}
                          className={'p-5 rounded-lg border-2 transition-all hover:shadow-lg group ' + vehicleStatus.bg + (isDeleting ? ' opacity-50' : '')}
                        >
                          {/* Vehicle Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <vehicleStatus.icon size={24} className={vehicleStatus.color} />
                              <div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                                  {vehicle.name || 'Unnamed Vehicle'}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {vehicleStatus.label}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => {
                                  setSelectedVehicle(vehicle);
                                  setShowMaintenanceModal(true);
                                }}
                                className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                title="Add Service"
                                disabled={isDeleting}
                              >
                                <Wrench size={16} />
                              </button>
                              <button
                                onClick={() => openModal('vehicle', vehicle)}
                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="Edit Vehicle"
                                disabled={isDeleting}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name || 'Unnamed Vehicle')}
                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete Vehicle"
                                disabled={isDeleting}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Maintenance Alerts */}
                          {alerts.length > 0 && (
                            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Bell size={16} className="text-amber-600" />
                                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                  Maintenance Alerts
                                </span>
                              </div>
                              <div className="space-y-1">
                                {alerts.slice(0, 2).map((alert, index) => (
                                  <div key={index} className="text-xs">
                                    <span className={alert.type === 'overdue' ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'}>
                                      {alert.service}: {alert.type === 'overdue' ? `${alert.mileage} miles overdue` : `due in ${alert.mileage} miles`}
                                    </span>
                                  </div>
                                ))}
                                {alerts.length > 2 && (
                                  <div className="text-xs text-amber-600 dark:text-amber-400">
                                    +{alerts.length - 2} more alerts
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Vehicle Details Grid */}
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-slate-600 dark:text-slate-400 block">Make/Model</span>
                              <span className="font-medium">{vehicle.make || 'N/A'} {vehicle.model || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-slate-600 dark:text-slate-400 block">Year</span>
                              <span className="font-medium">{vehicle.year || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-slate-600 dark:text-slate-400 block">License</span>
                              <span className="font-medium">{vehicle.licensePlate || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-slate-600 dark:text-slate-400 block">Mileage</span>
                              <span className="font-medium">{(vehicle.currentMileage || 0).toLocaleString()} mi</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-slate-600 dark:text-slate-400 block">VIN</span>
                              <span className="font-medium text-xs">{vehicle.vin || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Table View - keeping your existing table implementation */
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="p-3">Status</th>
                          <th className="p-3">Vehicle</th>
                          <th className="p-3">Make/Model</th>
                          <th className="p-3">Year</th>
                          <th className="p-3">License</th>
                          <th className="p-3">Mileage</th>
                          <th className="p-3">Alerts</th>
                          <th className="p-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedVehicles.map(vehicle => {
                          const vehicleStatus = getVehicleStatus(vehicle);
                          const alerts = getMaintenanceAlerts(vehicle);

                          return (
                            <tr key={vehicle.id} className={'border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50' + (isDeleting ? ' opacity-50' : '')}>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <vehicleStatus.icon size={16} className={vehicleStatus.color} />
                                  <span className="text-xs">{vehicleStatus.label}</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <div>
                                  <span className="font-medium">{vehicle.name || 'Unnamed'}</span>
                                  {vehicle.vin && (
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                      VIN: {vehicle.vin.slice(-6)}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="p-3">{vehicle.make || 'N/A'} {vehicle.model || 'N/A'}</td>
                              <td className="p-3">{vehicle.year || 'N/A'}</td>
                              <td className="p-3">{vehicle.licensePlate || 'N/A'}</td>
                              <td className="p-3 font-mono">{(vehicle.currentMileage || 0).toLocaleString()}</td>
                              <td className="p-3">
                                {alerts.length > 0 ? (
                                  <div className="flex items-center gap-1">
                                    <Bell size={14} className="text-amber-500" />
                                    <span className="text-xs text-amber-600 dark:text-amber-400">
                                      {alerts.length} alert{alerts.length > 1 ? 's' : ''}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-green-600 dark:text-green-400">✓ Up to date</span>
                                )}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => {
                                      setSelectedVehicle(vehicle);
                                      setShowMaintenanceModal(true);
                                    }}
                                    className="p-1 text-slate-500 hover:text-green-600 transition-colors"
                                    title="Add Service"
                                    disabled={isDeleting}
                                  >
                                    <Wrench size={16} />
                                  </button>
                                  <button
                                    onClick={() => openModal('vehicle', vehicle)}
                                    className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                                    title="Edit Vehicle"
                                    disabled={isDeleting}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name || 'Unnamed Vehicle')}
                                    className="p-1 text-slate-500 hover:text-red-600 transition-colors"
                                    title="Delete Vehicle"
                                    disabled={isDeleting}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full mb-6">
                    <Car size={40} className="text-slate-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-3">
                    No vehicles in your fleet yet
                  </h3>
                  <p className="text-slate-400 dark:text-slate-500 mb-6 max-w-md mx-auto">
                    Start building your fleet by adding your first vehicle. Track maintenance, costs, and manage your entire fleet from one place.
                  </p>
                  <button
                    onClick={() => openModal('vehicle')}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg"
                    disabled={isDeleting}
                  >
                    Add Your First Vehicle
                  </button>
                </div>
              )}
            </>
          ) : (
            // Maintenance Tab Content
            <MaintenanceHistory />
          )}
        </div>
      </div>

      {/* Add Maintenance Modal */}
      <MaintenanceModal />

      {/* Loading State */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-700 dark:text-slate-300">Deleting vehicle...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;