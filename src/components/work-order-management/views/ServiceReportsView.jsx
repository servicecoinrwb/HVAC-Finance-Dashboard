import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Calendar, User, MapPin, Clock, CheckCircle, AlertCircle, FileText, Camera, Wrench } from 'lucide-react';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// --- Utility Functions ---
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

const formatDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 'N/A';
  try {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  } catch {
    return 'N/A';
  }
};

const ServiceReportsView = () => {
  const { serviceReports = [], technicians = [], workOrders = [], customers = [] } = useWorkOrderContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [technicianFilter, setTechnicianFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter and search logic
  const filteredReports = useMemo(() => {
    if (!serviceReports?.length) return [];

    return serviceReports.filter(report => {
      const matchesSearch = !searchTerm || 
        report.workOrderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.technicianName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      
      const matchesTechnician = technicianFilter === 'all' || report.technicianId === technicianFilter;

      const matchesDate = dateFilter === 'all' || (() => {
        const reportDate = new Date(report.completedAt || report.createdAt);
        const today = new Date();
        switch (dateFilter) {
          case 'today':
            return reportDate.toDateString() === today.toDateString();
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return reportDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            return reportDate >= monthAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesTechnician && matchesDate;
    });
  }, [serviceReports, searchTerm, statusFilter, technicianFilter, dateFilter]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  const handleDownloadPDF = (report) => {
    // Implementation would depend on how PDFs are stored/generated
    if (report.pdfUrl) {
      window.open(report.pdfUrl, '_blank');
    } else {
      console.log('Generate PDF for report:', report.id);
    }
  };

  const getTechnicianName = (technicianId) => {
    const tech = technicians.find(t => t.id === technicianId);
    return tech?.name || 'Unknown Technician';
  };

  const getWorkOrderInfo = (workOrderId) => {
    const wo = workOrders.find(w => w.id === workOrderId);
    return wo || {};
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Reports</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View completed service reports from mobile technicians
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredReports.length} of {serviceReports?.length || 0} reports
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Technician Filter */}
          <div>
            <select
              value={technicianFilter}
              onChange={(e) => setTechnicianFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Technicians</option>
              {technicians?.filter(t => t.mobileAccess).map(tech => (
                <option key={tech.id} value={tech.id}>{tech.name}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Work Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Technician
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReports?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <FileText className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">No service reports found</p>
                    <p className="text-sm">Service reports from mobile technicians will appear here</p>
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => {
                  const workOrder = getWorkOrderInfo(report.workOrderId);
                  return (
                    <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.workOrderId}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {report.location || workOrder.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {getTechnicianName(report.technicianId)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {report.technicianEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.customerName || workOrder.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {report.status === 'in_progress' && <Clock className="w-3 h-3 mr-1" />}
                          {report.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {(report.status || 'pending').replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(report.completedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDuration(report.startTime, report.completedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewReport(report)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(report)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Service Report Details
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Work Order: {selectedReport.workOrderId}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Report Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Technician</label>
                    <p className="text-sm text-gray-900 dark:text-white">{getTechnicianName(selectedReport.technicianId)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer</label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedReport.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedReport.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                      {(selectedReport.status || 'pending').replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Completed</label>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedReport.completedAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDuration(selectedReport.startTime, selectedReport.completedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Units Serviced */}
              {selectedReport.units && selectedReport.units.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <Wrench className="w-4 h-4 mr-2" />
                    Units Serviced ({selectedReport.units.length})
                  </h4>
                  <div className="space-y-4">
                    {selectedReport.units.map((unit, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Type</label>
                            <p className="text-sm text-gray-900 dark:text-white">{unit.type}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Model</label>
                            <p className="text-sm text-gray-900 dark:text-white">{unit.model || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Serial</label>
                            <p className="text-sm text-gray-900 dark:text-white">{unit.serial || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Location</label>
                            <p className="text-sm text-gray-900 dark:text-white">{unit.location || 'N/A'}</p>
                          </div>
                        </div>
                        {unit.notes && (
                          <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Notes</label>
                            <p className="text-sm text-gray-900 dark:text-white">{unit.notes}</p>
                          </div>
                        )}
                        {unit.photos && unit.photos.length > 0 && (
                          <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                              Photos ({unit.photos.length})
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {unit.photos.map((photo, photoIndex) => (
                                <img
                                  key={photoIndex}
                                  src={photo.url || photo}
                                  alt={`Unit ${index + 1} Photo ${photoIndex + 1}`}
                                  className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80"
                                  onClick={() => window.open(photo.url || photo, '_blank')}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Punch List */}
              {selectedReport.punchList && selectedReport.punchList.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    Punch List ({selectedReport.punchList.length} items)
                  </h4>
                  <div className="space-y-2">
                    {selectedReport.punchList.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{item.description || item}</span>
                        {item.completed && (
                          <span className="text-xs text-green-600 dark:text-green-400">✓ Completed</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Notes */}
              {selectedReport.notes && (
                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-900 dark:text-white mb-2">
                    Service Notes
                  </label>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                      {selectedReport.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Photos */}
              {selectedReport.photos && selectedReport.photos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    General Photos ({selectedReport.photos.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedReport.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo.url || photo}
                          alt={`Service Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
                          onClick={() => window.open(photo.url || photo, '_blank')}
                        />
                        {photo.caption && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadPDF(selectedReport)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceReportsView;
