// Create this file as: src/components/Forecast.jsx

import React from 'react';

export const ForecastSection = ({ invoices, bills, weeklyCosts, currentBankBalance, setCurrentBankBalance }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Financial Forecast</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Current Bank Balance</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">${currentBankBalance.toLocaleString()}</span>
                        <button 
                            onClick={() => {
                                const newBalance = prompt('Enter new bank balance:', currentBankBalance);
                                if (newBalance && !isNaN(newBalance)) {
                                    setCurrentBankBalance(parseFloat(newBalance));
                                }
                            }}
                            className="text-sm text-cyan-600 hover:text-cyan-500"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Forecast Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Pending Invoices:</span>
                            <span className="font-semibold">
                                ${invoices.filter(inv => inv.status === 'Unpaid').reduce((sum, inv) => sum + (inv.grandTotal || 0), 0).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Monthly Bills:</span>
                            <span className="font-semibold text-red-600">
                                ${bills.reduce((sum, bill) => sum + (bill.amount || 0), 0).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Weekly Costs (Monthly):</span>
                            <span className="font-semibold text-red-600">
                                ${(weeklyCosts.reduce((sum, cost) => sum + (cost.amount || 0), 0) * 4.33).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};