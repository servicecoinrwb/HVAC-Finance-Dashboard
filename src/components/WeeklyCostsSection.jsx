import React, { useState, useMemo } from 'react';
import { PlusCircle, Edit, Trash2, FileText, TrendingUp, DollarSign, Calendar, Search, Filter, BarChart3, AlertTriangle } from 'lucide-react';

export const WeeklyCostsSection = ({ weeklyCosts, openModal, handleDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'amount', direction: 'desc' });

    // Enhanced categories for weekly costs
    const categories = [
        'all', 'Payroll', 'Fuel & Maintenance', 'Equipment Rental', 
        'Utilities', 'Insurance', 'Marketing', 'Office Expenses', 
        'Supplies', 'Contractors', 'Other'
    ];

    // Filter and sort weekly costs
    const filteredAndSortedCosts = useMemo(() => {
        let filtered = weeklyCosts.filter(cost => {
            const matchesSearch = cost.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 (cost.notes && cost.notes.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'all' || cost.category === selectedCategory;
            return matchesSearch && matchesCategory;
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
    }, [weeklyCosts, searchTerm, selectedCategory, sortConfig]);

    // Calculate analytics
    const analytics = useMemo(() => {
        const totalWeekly = weeklyCosts.reduce((sum, cost) => sum + (parseFloat(cost.amount) || 0), 0);
        const totalMonthly = totalWeekly * 4.33; // Average weeks per month
        const totalAnnual = totalWeekly * 52;
        const highestCost = weeklyCosts.reduce((max, cost) => 
            (parseFloat(cost.amount) || 0) > max ? (parseFloat(cost.amount) || 0) : max, 0
        );
        const averageCost = weeklyCosts.length > 0 ? totalWeekly / weeklyCosts.length : 0;
        
        // Category breakdown
        const categoryTotals = weeklyCosts.reduce((acc, cost) => {
            const category = cost.category || 'Other';
            acc[category] = (acc[category] || 0) + (parseFloat(cost.amount) || 0);
            return acc;
        }, {});

        const topCategory = Object.entries(categoryTotals).reduce((max, [cat, amount]) => 
            amount > (max.amount || 0) ? { category: cat, amount } : max, 
            { category: 'None', amount: 0 }
        );

        return {
            totalWeekly,
            totalMonthly,
            totalAnnual,
            highestCost,
            averageCost,
            categoryTotals,
            topCategory,
            itemCount: weeklyCosts.length
        };
    }, [weeklyCosts]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleExportCSV = () => {
        if (weeklyCosts.length === 0) {
            alert("No weekly costs to export.");
            return;
        }

        try {
            const headers = ['Name', 'Weekly Amount', 'Monthly Amount (4.33x)', 'Annual Amount (52x)', 'Category', 'Notes'];
            const csvData = weeklyCosts.map(cost => [
                cost.name || '',
                (parseFloat(cost.amount) || 0).toFixed(2),
                ((parseFloat(cost.amount) || 0) * 4.33).toFixed(2),
                ((parseFloat(cost.amount) || 0) * 52).toFixed(2),
                cost.category || 'Other',
                cost.notes || ''
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
            link.setAttribute('download', `weekly_costs_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            alert(`Successfully exported ${weeklyCosts.length} weekly costs!`);
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
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Weekly Total</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                ${analytics.totalWeekly.toLocaleString()}
                            </p>
                        </div>
                        <Calendar className="text-red-600 dark:text-red-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {analytics.itemCount} cost items
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Monthly Impact</p>
                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                ${analytics.totalMonthly.toLocaleString()}
                            </p>
                        </div>
                        <TrendingUp className="text-orange-600 dark:text-orange-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        x4.33 weeks/month
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Annual Impact</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                ${analytics.totalAnnual.toLocaleString()}
                            </p>
                        </div>
                        <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        x52 weeks/year
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Top Category</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {analytics.topCategory.category}
                            </p>
                        </div>
                        <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        ${analytics.topCategory.amount.toLocaleString()}/week
                    </p>
                </div>
            </div>

            {/* Weekly Costs Management */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Recurring Weekly Costs</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Track and manage your regular weekly business expenses
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
                            onClick={() => openModal('weekly')} 
                            className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <PlusCircle size={16} /> 
                            Add Weekly Cost
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
                                placeholder="Search weekly costs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-slate-400" size={16} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Costs Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th 
                                    className="p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Cost Item
                                        {sortConfig.key === 'name' && (
                                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="p-3">Category</th>
                                <th 
                                    className="p-3 text-right cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => handleSort('amount')}
                                >
                                    <div className="flex items-center justify-end gap-1">
                                        Weekly Amount
                                        {sortConfig.key === 'amount' && (
                                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="p-3 text-right">Monthly Impact</th>
                                <th className="p-3 text-right">Annual Impact</th>
                                <th className="p-3">Notes</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredAndSortedCosts.length > 0 ? (
                                filteredAndSortedCosts.map(cost => {
                                    const weeklyAmount = parseFloat(cost.amount) || 0;
                                    const monthlyAmount = weeklyAmount * 4.33;
                                    const annualAmount = weeklyAmount * 52;
                                    
                                    return (
                                        <tr key={cost.id} className="border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="p-3">
                                                <span className="font-medium text-slate-900 dark:text-white">
                                                    {cost.name}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                                                    {cost.category || 'Other'}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="font-mono font-bold text-red-600 dark:text-red-400">
                                                    ${weeklyAmount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="font-mono text-orange-600 dark:text-orange-400">
                                                    ${monthlyAmount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="font-mono text-purple-600 dark:text-purple-400">
                                                    ${annualAmount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="p-3 max-w-xs">
                                                <span className="text-slate-600 dark:text-slate-400 truncate">
                                                    {cost.notes && cost.notes.length > 50 ? 
                                                        `${cost.notes.substring(0, 50)}...` : 
                                                        cost.notes || '—'}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button 
                                                        onClick={() => openModal('weekly', cost)} 
                                                        className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 p-1 rounded transition-colors"
                                                        title="Edit cost"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete('weekly', cost.id)} 
                                                        className="text-slate-500 dark:text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                                                        title="Delete cost"
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
                                    <td colSpan="7" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        {searchTerm || selectedCategory !== 'all' ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Search size={24} className="text-slate-400" />
                                                <span>No weekly costs match your search criteria</span>
                                                <button 
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setSelectedCategory('all');
                                                    }}
                                                    className="text-cyan-600 hover:text-cyan-500 text-sm font-medium"
                                                >
                                                    Clear filters
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <DollarSign size={24} className="text-slate-400" />
                                                <span>No weekly costs added yet</span>
                                                <button 
                                                    onClick={() => openModal('weekly')}
                                                    className="text-cyan-600 hover:text-cyan-500 text-sm font-medium"
                                                >
                                                    Add your first weekly cost
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
                {filteredAndSortedCosts.length > 0 && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border">
                        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-slate-600 dark:text-slate-400">
                                    Showing {filteredAndSortedCosts.length} of {weeklyCosts.length} costs
                                </span>
                            </div>
                            <div className="flex items-center gap-6 font-medium">
                                <span className="text-red-600 dark:text-red-400">
                                    Weekly: ${filteredAndSortedCosts.reduce((sum, cost) => sum + (parseFloat(cost.amount) || 0), 0).toFixed(2)}
                                </span>
                                <span className="text-orange-600 dark:text-orange-400">
                                    Monthly: ${(filteredAndSortedCosts.reduce((sum, cost) => sum + (parseFloat(cost.amount) || 0), 0) * 4.33).toFixed(2)}
                                </span>
                                <span className="text-purple-600 dark:text-purple-400">
                                    Annual: ${(filteredAndSortedCosts.reduce((sum, cost) => sum + (parseFloat(cost.amount) || 0), 0) * 52).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* High-Cost Alert */}
            {analytics.highestCost > 1000 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-amber-600 dark:text-amber-400" size={20} />
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200">High Weekly Cost Alert</h4>
                    </div>
                    <p className="text-amber-700 dark:text-amber-300 text-sm mt-2">
                        You have a weekly cost of ${analytics.highestCost.toLocaleString()}, which amounts to ${(analytics.highestCost * 52).toLocaleString()} annually. 
                        Consider reviewing this expense for potential savings opportunities.
                    </p>
                </div>
            )}
        </div>
    );
};