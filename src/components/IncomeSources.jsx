import React, { useState, useMemo } from 'react';
import { PlusCircle, Edit, Trash2, FileText, TrendingUp, DollarSign, Target, Search, Filter, BarChart3, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const IncomeSourcesSection = ({ incomes, openModal, handleDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'amount', direction: 'desc' });

    // Income types and statuses
    const incomeTypes = ['all', 'monthly', 'weekly', 'quarterly', 'annually', 'one-time', 'project-based'];
    const incomeStatuses = ['all', 'active', 'pending', 'completed', 'paused'];

    // Filter and sort income sources
    const filteredAndSortedIncomes = useMemo(() => {
        let filtered = incomes.filter(income => {
            const matchesSearch = income.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 (income.notes && income.notes.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = selectedType === 'all' || income.type === selectedType;
            const matchesStatus = selectedStatus === 'all' || income.status === selectedStatus;
            return matchesSearch && matchesType && matchesStatus;
        });

        return filtered.sort((a, b) => {
            if (sortConfig.key === 'amount') {
                const aVal = parseFloat(a.amount) || 0;
                const bVal = parseFloat(b.amount) || 0;
                return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
            if (sortConfig.key === 'name') {
                return sortConfig.direction === 'asc' 
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return 0;
        });
    }, [incomes, searchTerm, selectedType, selectedStatus, sortConfig]);

    // Calculate analytics
    const analytics = useMemo(() => {
        const activeIncomes = incomes.filter(income => income.status !== 'completed' && income.status !== 'paused');
        
        // Calculate monthly equivalent for all income types
        const monthlyEquivalents = activeIncomes.map(income => {
            const amount = parseFloat(income.amount) || 0;
            switch (income.type) {
                case 'weekly': return amount * 4.33;
                case 'quarterly': return amount / 3;
                case 'annually': return amount / 12;
                case 'monthly':
                default: return amount;
            }
        });

        const totalMonthlyIncome = monthlyEquivalents.reduce((sum, amount) => sum + amount, 0);
        const totalAnnualIncome = totalMonthlyIncome * 12;
        
        // Income by type breakdown
        const typeBreakdown = incomes.reduce((acc, income) => {
            const type = income.type || 'monthly';
            const amount = parseFloat(income.amount) || 0;
            acc[type] = (acc[type] || 0) + amount;
            return acc;
        }, {});

        // Status breakdown
        const statusBreakdown = incomes.reduce((acc, income) => {
            const status = income.status || 'active';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const highestIncome = incomes.reduce((max, income) => {
            const amount = parseFloat(income.amount) || 0;
            return amount > max.amount ? { name: income.name, amount } : max;
        }, { name: 'None', amount: 0 });

        return {
            totalMonthlyIncome,
            totalAnnualIncome,
            typeBreakdown,
            statusBreakdown,
            highestIncome,
            activeCount: activeIncomes.length,
            totalCount: incomes.length,
            averageIncome: activeIncomes.length > 0 ? totalMonthlyIncome / activeIncomes.length : 0
        };
    }, [incomes]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle size={14} className="text-green-500" />;
            case 'pending': return <Clock size={14} className="text-yellow-500" />;
            case 'completed': return <CheckCircle size={14} className="text-blue-500" />;
            case 'paused': return <AlertCircle size={14} className="text-red-500" />;
            default: return <CheckCircle size={14} className="text-green-500" />;
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            'monthly': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
            'weekly': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
            'quarterly': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
            'annually': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
            'one-time': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200',
            'project-based': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200'
        };
        return colors[type] || colors['monthly'];
    };

    const calculateMonthlyEquivalent = (amount, type) => {
        const numAmount = parseFloat(amount) || 0;
        switch (type) {
            case 'weekly': return numAmount * 4.33;
            case 'quarterly': return numAmount / 3;
            case 'annually': return numAmount / 12;
            case 'monthly':
            default: return numAmount;
        }
    };

    const handleExportCSV = () => {
        if (incomes.length === 0) {
            alert("No income sources to export.");
            return;
        }

        try {
            const headers = ['Source Name', 'Amount', 'Type', 'Monthly Equivalent', 'Annual Equivalent', 'Status', 'Recurring', 'Notes'];
            const csvData = incomes.map(income => [
                income.name || '',
                (parseFloat(income.amount) || 0).toFixed(2),
                income.type || 'monthly',
                calculateMonthlyEquivalent(income.amount, income.type).toFixed(2),
                (calculateMonthlyEquivalent(income.amount, income.type) * 12).toFixed(2),
                income.status || 'active',
                income.isRecurring ? 'Yes' : 'No',
                income.notes || ''
            ]);

            const csvContent = [
                headers.join(','),
                ...csvData.map(row => row.map(cell => 
                    typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
                ).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `income_sources_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            alert(`Successfully exported ${incomes.length} income sources!`);
        } catch (error) {
            console.error("Error exporting CSV:", error);
            alert("Failed to export CSV: " + error.message);
        }
    };

    return (
        <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Monthly Income</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${analytics.totalMonthlyIncome.toLocaleString()}
                            </p>
                        </div>
                        <DollarSign className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {analytics.activeCount} active sources
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Annual Projection</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ${analytics.totalAnnualIncome.toLocaleString()}
                            </p>
                        </div>
                        <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Based on current rates
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Average Income</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                ${analytics.averageIncome.toLocaleString()}
                            </p>
                        </div>
                        <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Per active source/month
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Top Source</p>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400 truncate">
                                {analytics.highestIncome.name}
                            </p>
                        </div>
                        <Target className="text-orange-600 dark:text-orange-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        ${analytics.highestIncome.amount.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Income Sources Management */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Income Sources</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Track and manage your revenue streams and income sources
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <FileText size={16} />
                            Export CSV
                        </button>
                        <button 
                            onClick={() => openModal('income')} 
                            className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <PlusCircle size={16} /> 
                            Add Income Source
                        </button>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search income sources..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-slate-400" size={16} />
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                        >
                            {incomeTypes.map(type => (
                                <option key={type} value={type}>
                                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                        >
                            {incomeStatuses.map(status => (
                                <option key={status} value={status}>
                                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Income Sources Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th 
                                    className="p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Income Source
                                        {sortConfig.key === 'name' && (
                                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="p-3 text-right cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => handleSort('amount')}
                                >
                                    <div className="flex items-center justify-end gap-1">
                                        Amount
                                        {sortConfig.key === 'amount' && (
                                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="p-3">Type</th>
                                <th className="p-3 text-right">Monthly Equiv.</th>
                                <th className="p-3 text-right">Annual Equiv.</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Recurring</th>
                                <th className="p-3">Notes</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredAndSortedIncomes.length > 0 ? (
                                filteredAndSortedIncomes.map(income => {
                                    const amount = parseFloat(income.amount) || 0;
                                    const monthlyEquiv = calculateMonthlyEquivalent(amount, income.type);
                                    const annualEquiv = monthlyEquiv * 12;
                                    
                                    return (
                                        <tr key={income.id} className="border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="p-3">
                                                <span className="font-medium text-slate-900 dark:text-white">
                                                    {income.name}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="font-mono font-bold text-green-600 dark:text-green-400">
                                                    ${amount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(income.type)}`}>
                                                    {(income.type || 'monthly').replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="font-mono text-blue-600 dark:text-blue-400">
                                                    ${monthlyEquiv.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="font-mono text-purple-600 dark:text-purple-400">
                                                    ${annualEquiv.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(income.status)}
                                                    <span className="text-xs capitalize">
                                                        {income.status || 'active'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    income.isRecurring 
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                                                        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
                                                }`}>
                                                    {income.isRecurring ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="p-3 max-w-xs">
                                                <span className="text-slate-600 dark:text-slate-400 truncate">
                                                    {income.notes && income.notes.length > 30 ? 
                                                        `${income.notes.substring(0, 30)}...` : 
                                                        income.notes || '—'}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button 
                                                        onClick={() => openModal('income', income)} 
                                                        className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 p-1 rounded transition-colors"
                                                        title="Edit income source"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete('income', income.id)} 
                                                        className="text-slate-500 dark:text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                                                        title="Delete income source"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="9" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        {searchTerm || selectedType !== 'all' || selectedStatus !== 'all' ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Search size={24} className="text-slate-400" />
                                                <span>No income sources match your search criteria</span>
                                                <button 
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setSelectedType('all');
                                                        setSelectedStatus('all');
                                                    }}
                                                    className="text-cyan-600 hover:text-cyan-500 text-sm font-medium"
                                                >
                                                    Clear filters
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <DollarSign size={24} className="text-slate-400" />
                                                <span>No income sources added yet</span>
                                                <button 
                                                    onClick={() => openModal('income')}
                                                    className="text-cyan-600 hover:text-cyan-500 text-sm font-medium"
                                                >
                                                    Add your first income source
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary Footer */}
                {filteredAndSortedIncomes.length > 0 && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border">
                        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-slate-600 dark:text-slate-400">
                                    Showing {filteredAndSortedIncomes.length} of {incomes.length} income sources
                                </span>
                            </div>
                            <div className="flex items-center gap-6 font-medium">
                                <span className="text-green-600 dark:text-green-400">
                                    Monthly: ${filteredAndSortedIncomes.reduce((sum, income) => 
                                        sum + calculateMonthlyEquivalent(income.amount, income.type), 0
                                    ).toFixed(2)}
                                </span>
                                <span className="text-blue-600 dark:text-blue-400">
                                    Annual: ${(filteredAndSortedIncomes.reduce((sum, income) => 
                                        sum + calculateMonthlyEquivalent(income.amount, income.type), 0
                                    ) * 12).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Income Diversification Alert */}
            {analytics.totalCount >= 1 && analytics.highestIncome.amount > (analytics.totalMonthlyIncome * 0.7) && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="text-amber-600 dark:text-amber-400" size={20} />
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200">Income Diversification Alert</h4>
                    </div>
                    <p className="text-amber-700 dark:text-amber-300 text-sm mt-2">
                        Your top income source ({analytics.highestIncome.name}) represents over 70% of your total income. 
                        Consider diversifying your income streams to reduce financial risk.
                    </p>
                </div>
            )}
        </div>
    );
};