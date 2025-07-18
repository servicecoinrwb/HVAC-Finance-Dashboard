import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export const ForecastSection = ({ invoices = [], bills = [], weeklyCosts = [], currentBankBalance = 0, setCurrentBankBalance }) => {
    const pendingInvoices = invoices.filter(inv => inv.status === 'Unpaid');
    const pendingRevenue = pendingInvoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
    const monthlyBills = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
    const monthlyWeeklyCosts = weeklyCosts.reduce((sum, cost) => sum + (cost.amount || 0), 0) * 4.33;
    const totalMonthlyExpenses = monthlyBills + monthlyWeeklyCosts;
    const projectedBalance = currentBankBalance + pendingRevenue - totalMonthlyExpenses;

    const handleBalanceUpdate = () => {
        const newBalance = prompt('Enter current bank balance:', currentBankBalance);
        if (newBalance && !isNaN(newBalance)) {
            setCurrentBankBalance(parseFloat(newBalance));
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Cash Flow Forecast</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Current Balance</p>
                                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                    ${currentBankBalance.toLocaleString()}
                                </p>
                            </div>
                            <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <button 
                            onClick={handleBalanceUpdate}
                            className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Update Balance
                        </button>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Pending Revenue</p>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                                    ${pendingRevenue.toLocaleString()}
                                </p>
                            </div>
                            <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            {pendingInvoices.length} unpaid invoices
                        </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Monthly Expenses</p>
                                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                                    ${totalMonthlyExpenses.toLocaleString()}
                                </p>
                            </div>
                            <TrendingDown className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            Bills + Weekly costs
                        </p>
                    </div>

                    <div className={`${projectedBalance >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'} p-4 rounded-lg`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-medium ${projectedBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    Projected Balance
                                </p>
                                <p className={`text-2xl font-bold ${projectedBalance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                    ${projectedBalance.toLocaleString()}
                                </p>
                            </div>
                            {projectedBalance >= 0 ? 
                                <TrendingUp className="text-green-600 dark:text-green-400" size={24} /> :
                                <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
                            }
                        </div>
                        <p className={`text-xs mt-1 ${projectedBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            After collections & expenses
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Pending Collections</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {pendingInvoices.length > 0 ? (
                                pendingInvoices.map((invoice, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                        <div>
                                            <p className="font-medium text-slate-800 dark:text-white">
                                                {invoice.billTo || invoice.customer || 'Unknown Client'}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Due: {invoice.dueDate || 'No date'}
                                            </p>
                                        </div>
                                        <p className="font-bold text-green-600 dark:text-green-400">
                                            ${(invoice.grandTotal || 0).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                                    No pending invoices
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Monthly Obligations</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <span className="text-slate-700 dark:text-slate-300">Monthly Bills</span>
                                <span className="font-bold text-red-600 dark:text-red-400">
                                    ${monthlyBills.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <span className="text-slate-700 dark:text-slate-300">Weekly Costs (Monthly)</span>
                                <span className="font-bold text-red-600 dark:text-red-400">
                                    ${monthlyWeeklyCosts.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-600 rounded-lg border-t-2 border-slate-300 dark:border-slate-500">
                                <span className="font-semibold text-slate-800 dark:text-white">Total Expenses</span>
                                <span className="font-bold text-red-700 dark:text-red-300 text-lg">
                                    ${totalMonthlyExpenses.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {projectedBalance < 0 && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                            <h4 className="font-semibold text-red-800 dark:text-red-200">Cash Flow Alert</h4>
                        </div>
                        <p className="text-red-700 dark:text-red-300 mt-2">
                            Your projected balance is negative. Consider following up on pending invoices or reducing expenses.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};