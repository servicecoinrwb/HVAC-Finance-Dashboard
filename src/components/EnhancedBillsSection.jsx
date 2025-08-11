import React, { useState, useMemo } from 'react';
import { CheckCircle, Circle, Edit, Trash2, MessageSquare, Paperclip, PlusCircle, FileText, Upload, Search, Filter, SortAsc, SortDesc, Calendar, DollarSign, X, ChevronDown } from 'lucide-react';

const EnhancedBillsSection = ({ 
    bills, 
    paidStatus, 
    selectedCategory, 
    setSelectedCategory, 
    handleTogglePaid, 
    handleSort, 
    openModal, 
    handleDelete, 
    handleEnhancedExportCSV 
}) => {
    // Enhanced filtering state
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('dueDay');
    const [sortDirection, setSortDirection] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('all'); // all, paid, unpaid
    const [dueDateFilter, setDueDateFilter] = useState('all'); // all, thisWeek, nextWeek, thisMonth, overdue
    const [amountFilter, setAmountFilter] = useState('all'); // all, under100, 100to500, over500
    const [showFilters, setShowFilters] = useState(false);

    // Get current date for date filtering
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    const startOfNextWeek = new Date(endOfWeek.getTime() + 1 * 24 * 60 * 60 * 1000);
    const endOfNextWeek = new Date(startOfNextWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Enhanced filtering logic
    const filteredAndSortedBills = useMemo(() => {
        let filtered = bills.filter(bill => {
            // Category filter (existing)
            if (selectedCategory && bill.category !== selectedCategory) return false;

            // Search filter
            if (searchTerm && !bill.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

            // Status filter
            if (statusFilter === 'paid' && !paidStatus[bill.id]) return false;
            if (statusFilter === 'unpaid' && paidStatus[bill.id]) return false;

            // Amount filter
            if (amountFilter === 'under100' && bill.amount >= 100) return false;
            if (amountFilter === '100to500' && (bill.amount < 100 || bill.amount > 500)) return false;
            if (amountFilter === 'over500' && bill.amount <= 500) return false;

            // Due date filter
            if (dueDateFilter !== 'all' && bill.dueDay) {
                const billDueDate = new Date(today.getFullYear(), today.getMonth(), bill.dueDay);
                
                // Adjust for next month if due day has passed
                if (billDueDate < today) {
                    billDueDate.setMonth(billDueDate.getMonth() + 1);
                }

                switch (dueDateFilter) {
                    case 'overdue':
                        if (billDueDate >= today) return false;
                        break;
                    case 'thisWeek':
                        if (billDueDate < startOfWeek || billDueDate > endOfWeek) return false;
                        break;
                    case 'nextWeek':
                        if (billDueDate < startOfNextWeek || billDueDate > endOfNextWeek) return false;
                        break;
                    case 'thisMonth':
                        if (billDueDate < startOfMonth || billDueDate > endOfMonth) return false;
                        break;
                    default:
                        break;
                }
            }

            return true;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Handle special sorting cases
            if (sortBy === 'status') {
                aValue = paidStatus[a.id] ? 'paid' : 'unpaid';
                bValue = paidStatus[b.id] ? 'paid' : 'unpaid';
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            let comparison = 0;
            if (aValue < bValue) comparison = -1;
            if (aValue > bValue) comparison = 1;

            return sortDirection === 'desc' ? -comparison : comparison;
        });

        return filtered;
    }, [bills, selectedCategory, searchTerm, statusFilter, dueDateFilter, amountFilter, sortBy, sortDirection, paidStatus, today]);

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortDirection('asc');
        }
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSortBy('dueDay');
        setSortDirection('asc');
        setStatusFilter('all');
        setDueDateFilter('all');
        setAmountFilter('all');
        setSelectedCategory(null);
    };

    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (searchTerm) count++;
        if (selectedCategory) count++;
        if (statusFilter !== 'all') count++;
        if (dueDateFilter !== 'all') count++;
        if (amountFilter !== 'all') count++;
        return count;
    }, [searchTerm, selectedCategory, statusFilter, dueDateFilter, amountFilter]);

    const CSVImportButton = ({ type, label }) => {
        const fileInputRef = React.useRef(null);
        return (
            <div className="inline-block">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            window.handleEnhancedCSVImport?.(e.target.files[0], type);
                            e.target.value = '';
                        }
                    }}
                    style={{ display: 'none' }}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                >
                    <Upload size={16} />
                    {label}
                </button>
            </div>
        );
    };

    return (
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Monthly Bills</h3>
                    {selectedCategory && (
                        <button 
                            onClick={() => setSelectedCategory(null)} 
                            className="text-sm text-cyan-500 dark:text-cyan-400 hover:underline"
                        >
                            Clear Filter: {selectedCategory}
                        </button>
                    )}
                    {activeFiltersCount > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    <CSVImportButton type="bill" label="Import" />
                    <button 
                        onClick={() => handleEnhancedExportCSV(filteredAndSortedBills, 'bills')} 
                        className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                    >
                        <FileText size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Enhanced Search and Filter Bar */}
            <div className="space-y-4 mb-6">
                {/* Main Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search bills by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                            showFilters 
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                                : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        <Filter size={16} />
                        Filters
                        <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
                    </button>

                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Advanced Filters Panel */}
                {showFilters && (
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Sort By */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Sort By
                                </label>
                                <select
                                    value={`${sortBy}-${sortDirection}`}
                                    onChange={(e) => {
                                        const [field, direction] = e.target.value.split('-');
                                        setSortBy(field);
                                        setSortDirection(direction);
                                    }}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="dueDay-asc">Due Date (Early)</option>
                                    <option value="dueDay-desc">Due Date (Late)</option>
                                    <option value="amount-asc">Amount (Low-High)</option>
                                    <option value="amount-desc">Amount (High-Low)</option>
                                    <option value="status-asc">Status (Unpaid First)</option>
                                    <option value="status-desc">Status (Paid First)</option>
                                </select>
                            </div>

                            {/* Payment Status */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Payment Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Bills</option>
                                    <option value="unpaid">Unpaid Only</option>
                                    <option value="paid">Paid Only</option>
                                </select>
                            </div>

                            {/* Due Date Range */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Due Date
                                </label>
                                <select
                                    value={dueDateFilter}
                                    onChange={(e) => setDueDateFilter(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Dates</option>
                                    <option value="overdue">Overdue</option>
                                    <option value="thisWeek">This Week</option>
                                    <option value="nextWeek">Next Week</option>
                                    <option value="thisMonth">This Month</option>
                                </select>
                            </div>

                            {/* Amount Range */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Amount Range
                                </label>
                                <select
                                    value={amountFilter}
                                    onChange={(e) => setAmountFilter(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Amounts</option>
                                    <option value="under100">Under $100</option>
                                    <option value="100to500">$100 - $500</option>
                                    <option value="over500">Over $500</option>
                                </select>
                            </div>
                        </div>

                        {/* Filter Summary */}
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Showing {filteredAndSortedBills.length} of {bills.length} bills
                                {activeFiltersCount > 0 && ` with ${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''} applied`}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bills Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="p-3">
                                <button
                                    onClick={() => handleSortChange('status')}
                                    className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300"
                                >
                                    Status
                                    {sortBy === 'status' && (
                                        sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                                    )}
                                </button>
                            </th>
                            <th className="p-3">
                                <button
                                    onClick={() => handleSortChange('name')}
                                    className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300"
                                >
                                    Name
                                    {sortBy === 'name' && (
                                        sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                                    )}
                                </button>
                            </th>
                            <th className="p-3">Notes</th>
                            <th className="p-3">Receipt</th>
                            <th className="p-3 text-right">
                                <button
                                    onClick={() => handleSortChange('amount')}
                                    className="flex items-center gap-1 ml-auto hover:text-slate-700 dark:hover:text-slate-300"
                                >
                                    Amount
                                    {sortBy === 'amount' && (
                                        sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                                    )}
                                </button>
                            </th>
                            <th className="p-3 text-center">
                                <button
                                    onClick={() => handleSortChange('dueDay')}
                                    className="flex items-center gap-1 mx-auto hover:text-slate-700 dark:hover:text-slate-300"
                                >
                                    Due Day
                                    {sortBy === 'dueDay' && (
                                        sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                                    )}
                                </button>
                            </th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedBills.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    {bills.length === 0 ? (
                                        <div>
                                            <p className="text-lg font-medium mb-2">No bills added yet</p>
                                            <p className="text-sm">Click "Add New Bill" to get started</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-lg font-medium mb-2">No bills match your filters</p>
                                            <p className="text-sm">Try adjusting your search or filter criteria</p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedBills.map(bill => (
                                <tr 
                                    key={bill.id} 
                                    className={`border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                                        paidStatus[bill.id] ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'
                                    }`}
                                >
                                    <td className="p-3">
                                        <button 
                                            onClick={() => handleTogglePaid(bill.id)}
                                            className="hover:scale-110 transition-transform"
                                        >
                                            {paidStatus[bill.id] ? (
                                                <CheckCircle className="text-green-500" size={20} />
                                            ) : (
                                                <Circle className="text-slate-400 dark:text-slate-600" size={20} />
                                            )}
                                        </button>
                                    </td>
                                    <td className={`p-3 font-medium ${paidStatus[bill.id] ? 'line-through' : ''}`}>
                                        {bill.name}
                                        {bill.category && (
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {bill.category}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        {bill.notes && (
                                            <div className="group relative flex justify-center">
                                                <MessageSquare size={16} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" />
                                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                    {bill.notes}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        {bill.attachmentURL ? (
                                            <a 
                                                href={bill.attachmentURL} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="hover:scale-110 transition-transform inline-block"
                                            >
                                                <Paperclip size={16} className="text-cyan-500 dark:text-cyan-400" />
                                            </a>
                                        ) : (
                                            <Paperclip size={16} className="text-slate-400 dark:text-slate-600" />
                                        )}
                                    </td>
                                    <td className="p-3 text-right font-mono font-semibold">
                                        ${(bill.amount || 0).toFixed(2)}
                                    </td>
                                    <td className="p-3 text-center font-medium">
                                        {bill.dueDay}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                onClick={() => openModal('bill', bill)} 
                                                className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 p-1 rounded transition-colors"
                                                title="Edit bill"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete('bill', bill.id)} 
                                                className="text-slate-500 dark:text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                                                title="Delete bill"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add New Bill Button */}
            <button 
                onClick={() => openModal('bill')} 
                className="mt-4 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-semibold transition-colors"
            >
                <PlusCircle size={18} /> 
                Add New Bill
            </button>
        </div>
    );
};

export default EnhancedBillsSection;