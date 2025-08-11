import React, { useState, useMemo } from 'react';
import { PlusCircle, Download, Upload, Search, Edit, Trash2, TrendingUp, TrendingDown, DollarSign, Percent, Calendar, Target, AlertCircle, CheckCircle, Calculator, BarChart3, CreditCard, Zap } from 'lucide-react';

const DebtManagement = ({ 
    debts = [], 
    openModal, 
    handleDelete, 
    searchTerm, 
    setSearchTerm, 
    handleImportCSV, 
    handleExportCSV, 
    debtPayoffStrategies = { avalanche: [], snowball: [] }
}) => {
    const [activeView, setActiveView] = useState('overview');
    const [selectedStrategy, setSelectedStrategy] = useState('avalanche');
    const [monthlyPayment, setMonthlyPayment] = useState(500);

    // Calculate debt statistics
    const debtStats = useMemo(() => {
        const totalDebt = debts.reduce((sum, debt) => sum + (debt.totalAmount || 0), 0);
        const totalPaid = debts.reduce((sum, debt) => sum + (debt.paidAmount || 0), 0);
        const totalRemaining = totalDebt - totalPaid;
        const avgInterestRate = debts.length > 0 
            ? debts.reduce((sum, debt) => sum + (debt.interestRate || 0), 0) / debts.length 
            : 0;
        const highestInterest = Math.max(...debts.map(debt => debt.interestRate || 0));
        const lowestBalance = Math.min(...debts.map(debt => (debt.totalAmount || 0) - (debt.paidAmount || 0)));

        return {
            totalDebt,
            totalPaid,
            totalRemaining,
            avgInterestRate,
            highestInterest,
            lowestBalance: lowestBalance === Infinity ? 0 : lowestBalance,
            payoffProgress: totalDebt > 0 ? (totalPaid / totalDebt) * 100 : 0
        };
    }, [debts]);

    // Calculate payoff timeline
    const calculatePayoffTimeline = (strategy) => {
        const strategyDebts = debtPayoffStrategies[strategy] || [];
        let timeline = [];
        let totalMonthsToPayoff = 0;
        let remainingPayment = monthlyPayment;

        strategyDebts.forEach((debt, index) => {
            const remaining = (debt.totalAmount || 0) - (debt.paidAmount || 0);
            const monthlyInterest = (debt.interestRate || 0) / 100 / 12;
            
            if (remaining > 0 && remainingPayment > 0) {
                // Simple calculation - could be more sophisticated
                const monthsToPayoff = Math.ceil(
                    Math.log(1 + (remaining * monthlyInterest) / remainingPayment) / Math.log(1 + monthlyInterest)
                );
                
                timeline.push({
                    ...debt,
                    monthsToPayoff: isFinite(monthsToPayoff) ? monthsToPayoff : 0,
                    order: index + 1,
                    remaining
                });
                
                totalMonthsToPayoff = Math.max(totalMonthsToPayoff, monthsToPayoff);
            }
        });

        return { timeline, totalMonthsToPayoff };
    };

    const avalancheTimeline = calculatePayoffTimeline('avalanche');
    const snowballTimeline = calculatePayoffTimeline('snowball');

    // Filter debts based on search
    const filteredDebts = useMemo(() => {
        if (!searchTerm) return debts;
        return debts.filter(debt => 
            debt.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            debt.creditor?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [debts, searchTerm]);

    const getDebtStatusColor = (debt) => {
        const remaining = (debt.totalAmount || 0) - (debt.paidAmount || 0);
        if (remaining <= 0) return 'text-green-600 dark:text-green-400';
        if (debt.interestRate > 20) return 'text-red-600 dark:text-red-400';
        if (debt.interestRate > 10) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-blue-600 dark:text-blue-400';
    };

    const getDebtPriorityIcon = (debt) => {
        if (debt.interestRate > 20) return <AlertCircle className="text-red-500" size={16} />;
        if (debt.interestRate > 10) return <TrendingUp className="text-yellow-500" size={16} />;
        return <CheckCircle className="text-green-500" size={16} />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Debt Management</h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Track debts, plan payoffs, and achieve financial freedom
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleImportCSV && handleImportCSV()}
                        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                    >
                        <Upload size={16} />
                        Import
                    </button>
                    <button
                        onClick={() => handleExportCSV && handleExportCSV(debts, 'debts')}
                        className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                    >
                        <Download size={16} />
                        Export
                    </button>
                    <button
                        onClick={() => openModal('debt')}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <PlusCircle size={18} />
                        Add Debt
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Debt</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                ${debtStats.totalDebt.toLocaleString()}
                            </p>
                        </div>
                        <CreditCard className="text-red-600 dark:text-red-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Remaining: ${debtStats.totalRemaining.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Paid Off</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${debtStats.totalPaid.toLocaleString()}
                            </p>
                        </div>
                        <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {debtStats.payoffProgress.toFixed(1)}% complete
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Avg Interest</p>
                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                {debtStats.avgInterestRate.toFixed(1)}%
                            </p>
                        </div>
                        <Percent className="text-orange-600 dark:text-orange-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Highest: {debtStats.highestInterest}%
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Debts</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {debts.filter(d => (d.totalAmount - d.paidAmount) > 0).length}
                            </p>
                        </div>
                        <BarChart3 className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        of {debts.length} total
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex space-x-1">
                    <button
                        onClick={() => setActiveView('overview')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeView === 'overview'
                                ? 'bg-purple-600 text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <CreditCard size={16} />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveView('strategies')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeView === 'strategies'
                                ? 'bg-purple-600 text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <Target size={16} />
                        Payoff Strategies
                    </button>
                    <button
                        onClick={() => setActiveView('calculator')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeView === 'calculator'
                                ? 'bg-purple-600 text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <Calculator size={16} />
                        Calculator
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeView === 'overview' && (
                <div className="space-y-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search debts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Debts List */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        {filteredDebts.length === 0 ? (
                            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                                <CreditCard size={48} className="mx-auto mb-4 opacity-50" />
                                <h4 className="text-lg font-semibold mb-2">No debts found</h4>
                                <p className="mb-4">Add your debts to start tracking and planning payoffs.</p>
                                <button
                                    onClick={() => openModal('debt')}
                                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Add First Debt
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Debt Details
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Interest Rate
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Total Amount
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Paid
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Remaining
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Progress
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {filteredDebts.map((debt) => {
                                            const remaining = (debt.totalAmount || 0) - (debt.paidAmount || 0);
                                            const progress = debt.totalAmount > 0 ? ((debt.paidAmount || 0) / debt.totalAmount) * 100 : 0;
                                            
                                            return (
                                                <tr key={debt.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {getDebtPriorityIcon(debt)}
                                                            <div>
                                                                <div className="font-medium text-slate-900 dark:text-white">
                                                                    {debt.name}
                                                                </div>
                                                                {debt.creditor && (
                                                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                                                        {debt.creditor}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`font-mono font-semibold ${getDebtStatusColor(debt)}`}>
                                                            {(debt.interestRate || 0).toFixed(1)}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="font-mono text-slate-900 dark:text-white">
                                                            ${(debt.totalAmount || 0).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="font-mono text-green-600 dark:text-green-400">
                                                            ${(debt.paidAmount || 0).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                                                            ${remaining.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                                                            <div 
                                                                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                                            />
                                                        </div>
                                                        <div className="text-xs text-center mt-1 text-slate-500 dark:text-slate-400">
                                                            {progress.toFixed(1)}%
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => openModal('debt', debt)}
                                                                className="text-slate-400 hover:text-blue-500 transition-colors"
                                                                title="Edit debt"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete('debt', debt.id)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                                                title="Delete debt"
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
                        )}
                    </div>
                </div>
            )}

            {activeView === 'strategies' && (
                <div className="space-y-6">
                    {/* Strategy Selection */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                            Debt Payoff Strategies
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Avalanche Strategy */}
                            <div 
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                    selectedStrategy === 'avalanche' 
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                                }`}
                                onClick={() => setSelectedStrategy('avalanche')}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <TrendingDown className="text-purple-600" size={20} />
                                    <h4 className="font-semibold text-slate-800 dark:text-white">
                                        Debt Avalanche
                                    </h4>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    Pay off debts with highest interest rates first. Saves more money on interest.
                                </p>
                                <div className="text-xs text-slate-500 dark:text-slate-500">
                                    Estimated timeline: {avalancheTimeline.totalMonthsToPayoff} months
                                </div>
                            </div>

                            {/* Snowball Strategy */}
                            <div 
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                    selectedStrategy === 'snowball' 
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                                }`}
                                onClick={() => setSelectedStrategy('snowball')}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap className="text-purple-600" size={20} />
                                    <h4 className="font-semibold text-slate-800 dark:text-white">
                                        Debt Snowball
                                    </h4>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    Pay off smallest balances first. Builds momentum and motivation.
                                </p>
                                <div className="text-xs text-slate-500 dark:text-slate-500">
                                    Estimated timeline: {snowballTimeline.totalMonthsToPayoff} months
                                </div>
                            </div>
                        </div>

                        {/* Monthly Payment Input */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Monthly Debt Payment Budget
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="number"
                                    value={monthlyPayment}
                                    onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    placeholder="500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Strategy Timeline */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                            {selectedStrategy === 'avalanche' ? 'Avalanche' : 'Snowball'} Payoff Plan
                        </h3>

                        <div className="space-y-4">
                            {(selectedStrategy === 'avalanche' ? avalancheTimeline.timeline : snowballTimeline.timeline).map((debt, index) => (
                                <div key={debt.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        {debt.order}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="font-medium text-slate-900 dark:text-white">
                                            {debt.name}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            ${debt.remaining.toLocaleString()} remaining at {debt.interestRate}%
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                                            {debt.monthsToPayoff} months
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            to pay off
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'calculator' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                        Debt Payoff Calculator
                    </h3>
                    <div className="text-center text-slate-500 dark:text-slate-400 py-12">
                        <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Advanced debt calculator coming soon!</p>
                        <p className="text-sm mt-2">Calculate exact payoff dates, interest savings, and payment schedules.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DebtManagement;