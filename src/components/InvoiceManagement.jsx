import React, { useMemo, useState } from 'react';
import { Upload, FileText, PlusCircle, Edit, Trash2, CheckCircle, Circle, RefreshCw, AlertTriangle, DollarSign, Clock, Filter, Eye, Calendar, Building, MapPin } from 'lucide-react';

export const InvoiceManagement = ({ 
    invoices, 
    openModal, 
    handleDelete, 
    handleBulkDelete, 
    searchTerm, 
    setSearchTerm, 
    selectedIds, 
    setSelectedIds, 
    handleImportCSV, 
    handleExportCSV, 
    handleToggleInvoicePaid 
}) => {
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [showAppSheetSync, setShowAppSheetSync] = useState(false);

    // Enhanced invoice columns aligned with AppSheet data structure
    const invoiceColumns = [
        { 
            key: 'status', 
            header: 'Status', 
            render: item => (
                <div className="flex items-center gap-2">
                    <button onClick={() => handleToggleInvoicePaid(item.id, item.status)}>
                        {item.status === 'Paid' ? 
                            <CheckCircle className="text-green-500" size={20} /> : 
                            <Circle className="text-slate-400 dark:text-slate-600" size={20} />
                        }
                    </button>
                    <StatusBadge status={item.invoiceStatus || item.status} />
                </div>
            )
        },
        { 
            key: 'invoiceNumber', 
            header: 'Invoice #', 
            render: item => (
                <div className={item.status === 'Paid' ? 'opacity-60' : ''}>
                    <div className="font-medium text-slate-900 dark:text-white">
                        {item.invoiceNumber || `INV-${item.id}`}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Job: {item.jobNumber || 'N/A'}
                    </div>
                </div>
            )
        },
        { 
            key: 'customer', 
            header: 'Customer', 
            render: item => (
                <div className={item.status === 'Paid' ? 'opacity-60' : ''}>
                    <div className={`font-medium ${item.status === 'Paid' ? 'line-through' : ''}`}>
                        {item.customer}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.billTo && item.billTo !== item.customer ? `Bill to: ${item.billTo}` : ''}
                    </div>
                </div>
            )
        },
        { 
            key: 'jobType', 
            header: 'Job Type', 
            render: item => (
                <div className="flex flex-col gap-1">
                    <JobTypeBadge jobType={item.jobType} />
                    <PriorityBadge priority={item.priority} />
                </div>
            )
        },
        { 
            key: 'grandTotal', 
            header: 'Amount', 
            className: 'text-right', 
            render: item => (
                <div className={`text-right ${item.status === 'Paid' ? 'opacity-60' : ''}`}>
                    <div className={`font-mono font-bold ${item.status === 'Paid' ? 'line-through text-green-600' : 'text-slate-900 dark:text-white'}`}>
                        ${parseFloat(item.grandTotal?.toString().replace(/[$,]/g, '') || item.grandTotal || 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.netTerms || 'Net 30'}
                    </div>
                </div>
            )
        },
        { 
            key: 'dueDate', 
            header: 'Due Date', 
            className: 'text-center', 
            render: item => (
                <div className={`text-center ${item.status === 'Paid' ? 'opacity-60' : ''}`}>
                    <div className={item.status === 'Paid' ? 'line-through' : ''}>
                        {item.dueDate || 'N/A'}
                    </div>
                    {item.daysElapsed > 0 && item.status !== 'Paid' && (
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                            {item.daysElapsed} days elapsed
                        </div>
                    )}
                    {isOverdue(item) && (
                        <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                            OVERDUE
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'description',
            header: 'Description',
            render: item => (
                <div className={`max-w-xs ${item.status === 'Paid' ? 'opacity-60' : ''}`}>
                    <div className="text-sm truncate" title={item.description}>
                        {item.description || 'No description'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.serviceAddress && (
                            <div className="flex items-center gap-1 mt-1">
                                <MapPin size={10} />
                                <span className="truncate">{item.serviceAddress}</span>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    ];

    // Status Badge Component
    const StatusBadge = ({ status }) => {
        const getStatusStyle = (status) => {
            switch (status) {
                case 'Paid': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200';
                case 'Sent': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200';
                case 'Open': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200';
                case 'Overdue': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200';
                default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200';
            }
        };

        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}>
                {status || 'Unknown'}
            </span>
        );
    };

    // Job Type Badge Component
    const JobTypeBadge = ({ jobType }) => {
        const getJobTypeStyle = (type) => {
            switch (type) {
                case 'Service Call': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                case 'Planned Maintenance': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                case 'Installation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
                case 'Emergency': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            }
        };

        return (
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getJobTypeStyle(jobType)}`}>
                {jobType || 'N/A'}
            </span>
        );
    };

    // Priority Badge Component
    const PriorityBadge = ({ priority }) => {
        if (!priority) return null;
        
        const getPriorityStyle = (priority) => {
            switch (priority) {
                case 'ER': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200';
                case 'URG': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200';
                case 'STD': return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200';
                default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200';
            }
        };

        return (
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border ${getPriorityStyle(priority)}`}>
                {priority}
            </span>
        );
    };

    // Helper function to check if invoice is overdue
    const isOverdue = (invoice) => {
        if (invoice.status === 'Paid' || !invoice.dueDate) return false;
        const dueDate = new Date(invoice.dueDate);
        const today = new Date();
        return dueDate < today;
    };

    // Calculate invoice metrics
    const invoiceMetrics = useMemo(() => {
        const totalAmount = invoices.reduce((sum, inv) => {
            const amount = parseFloat(inv.grandTotal?.toString().replace(/[$,]/g, '') || 0);
            return sum + amount;
        }, 0);

        const paidInvoices = invoices.filter(inv => inv.status === 'Paid' || inv.invoiceStatus === 'Paid');
        const paidAmount = paidInvoices.reduce((sum, inv) => {
            const amount = parseFloat(inv.grandTotal?.toString().replace(/[$,]/g, '') || 0);
            return sum + amount;
        }, 0);

        const outstandingInvoices = invoices.filter(inv => inv.status !== 'Paid' && inv.invoiceStatus !== 'Paid');
        const outstandingAmount = outstandingInvoices.reduce((sum, inv) => {
            const amount = parseFloat(inv.grandTotal?.toString().replace(/[$,]/g, '') || 0);
            return sum + amount;
        }, 0);

        const overdueInvoices = invoices.filter(inv => isOverdue(inv));

        return {
            totalInvoices: invoices.length,
            totalAmount,
            paidAmount,
            outstandingAmount,
            overdueCount: overdueInvoices.length,
            paidCount: paidInvoices.length,
        };
    }, [invoices]);

    // Enhanced filtering
    const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = !searchTerm || 
        String(invoice.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(invoice.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(invoice.vehicleId || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || invoice.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [invoices, searchTerm, statusFilter, priorityFilter]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredInvoices.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Enhanced AppSheet CSV export with all fields
    const handleEnhancedExportCSV = () => {
        const csvHeaders = [
            'Invoice Number', 'Job Number', 'Customer', 'Bill To', 'Grand Total',
            'Total Cost', 'Net Terms', 'Transaction Date', 'Due Date', 'Payment Date',
            'Completed On', 'Invoice Status', 'Terms', 'Priority', 'Description',
            'Service Address', 'Location Type', 'Job Type', 'Line Items', 'Payments',
            'Days Elapsed', 'Company', 'Division'
        ];

        const csvData = filteredInvoices.map(inv => [
            inv.invoiceNumber || `INV-${inv.id}`,
            inv.jobNumber || '',
            inv.customer || '',
            inv.billTo || '',
            inv.grandTotal || '',
            inv.totalCost || '',
            inv.netTerms || '',
            inv.transactionDate || '',
            inv.dueDate || '',
            inv.paymentDate || '',
            inv.completedOn || '',
            inv.invoiceStatus || inv.status || '',
            inv.terms || '',
            inv.priority || '',
            inv.description || '',
            inv.serviceAddress || '',
            inv.locationType || '',
            inv.jobType || '',
            inv.lineItems || '',
            inv.payments || '',
            inv.daysElapsed || 0,
            inv.company || 'Mechanical Temp',
            inv.division || 'HVAC & Refrigeration'
        ]);

        const csvContent = [csvHeaders, ...csvData]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `appsheet_invoices_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* AppSheet Integration Status */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <RefreshCw className="text-blue-600 dark:text-blue-400" size={20} />
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100">AppSheet Integration</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                {invoices.length} invoices • Last sync: 2 hours ago
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowAppSheetSync(!showAppSheetSync)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        <RefreshCw size={16} />
                        Sync Now
                    </button>
                </div>
            </div>

            {/* Invoice Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <FileText className="text-slate-500" size={16} />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{invoiceMetrics.totalInvoices}</div>
                    <div className="text-sm text-slate-500">${invoiceMetrics.totalAmount.toLocaleString()}</div>
                </div>
                
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Paid</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{invoiceMetrics.paidCount}</div>
                    <div className="text-sm text-green-600">${invoiceMetrics.paidAmount.toLocaleString()}</div>
                </div>
                
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock className="text-orange-500" size={16} />
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Outstanding</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{invoices.length - invoiceMetrics.paidCount}</div>
                    <div className="text-sm text-orange-600">${invoiceMetrics.outstandingAmount.toLocaleString()}</div>
                </div>
                
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <AlertTriangle className="text-red-500" size={16} />
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">Overdue</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{invoiceMetrics.overdueCount}</div>
                    <div className="text-sm text-red-600">Needs attention</div>
                </div>
            </div>

            {/* Header and Controls */}
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Invoice Management</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Showing {filteredInvoices.length} of {invoices.length} invoices
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="Search invoices..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white"
                        />
                        
                        <select 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white"
                        >
                            <option value="All">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Sent">Sent</option>
                            <option value="Open">Open</option>
                            <option value="Overdue">Overdue</option>
                        </select>

                        <select 
                            value={priorityFilter} 
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white"
                        >
                            <option value="All">All Priority</option>
                            <option value="ER">Emergency</option>
                            <option value="URG">Urgent</option>
                            <option value="STD">Standard</option>
                        </select>

                        {selectedIds.length > 0 && (
                            <button 
                                onClick={() => handleBulkDelete('invoice', selectedIds)} 
                                className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <Trash2 size={16} /> Delete ({selectedIds.length})
                            </button>
                        )}

                        <input 
                            type="file" 
                            id="csv-importer-invoice" 
                            className="hidden" 
                            accept=".csv" 
                            onChange={e => handleImportCSV(e.target.files[0], 'invoice')} 
                        />
                        <label 
                            htmlFor="csv-importer-invoice" 
                            className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"
                        >
                            <Upload size={16} /> Import CSV
                        </label>

                        <button 
                            onClick={handleEnhancedExportCSV} 
                            className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <FileText size={16} /> Export AppSheet CSV
                        </button>

                        <button 
                            onClick={() => openModal('invoice')} 
                            className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <PlusCircle size={16} /> Add New
                        </button>
                    </div>
                </div>

                {/* Enhanced Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-3">
                                    <input 
                                        type="checkbox" 
                                        onChange={handleSelectAll}
                                        checked={selectedIds.length === filteredInvoices.length && filteredInvoices.length > 0}
                                        className="rounded border-slate-300 dark:border-slate-600"
                                    />
                                </th>
                                {invoiceColumns.map(col => (
                                    <th key={col.key} className={`p-3 ${col.className || ''}`}>
                                        {col.header}
                                    </th>
                                ))}
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredInvoices.map(item => (
                                <tr 
                                    key={item.id} 
                                    className={`border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                                        item.status === 'Paid' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'
                                    }`}
                                >
                                    <td className="p-3">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(item.id)} 
                                            onChange={() => {
                                                setSelectedIds(prev => 
                                                    prev.includes(item.id) 
                                                        ? prev.filter(id => id !== item.id) 
                                                        : [...prev, item.id]
                                                )
                                            }}
                                            className="rounded border-slate-300 dark:border-slate-600"
                                        />
                                    </td>
                                    {invoiceColumns.map(col => (
                                        <td key={col.key} className={`p-3 ${col.className || ''}`}>
                                            {col.render(item)}
                                        </td>
                                    ))}
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => {/* Handle view */}} 
                                                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button 
                                                onClick={() => openModal('invoice', item)} 
                                                className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                                                title="Edit Invoice"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete('invoice', item.id)} 
                                                className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
                                                title="Delete Invoice"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredInvoices.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="mx-auto text-slate-400 mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No invoices found</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {searchTerm || statusFilter !== 'All' || priorityFilter !== 'All' 
                                ? 'Try adjusting your search or filters' 
                                : 'Get started by importing your AppSheet invoice data'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};