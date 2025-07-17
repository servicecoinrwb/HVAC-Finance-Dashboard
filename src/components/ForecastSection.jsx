import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

export const ForecastSection = ({ invoices, bills, weeklyCosts, currentBankBalance, setCurrentBankBalance }) => {

    const forecastData = useMemo(() => {
        const forecast = [
            { name: 'Next 30 Days', Inflow: 0, Outflow: 0 },
            { name: 'Next 60 Days', Inflow: 0, Outflow: 0 },
            { name: 'Next 90 Days', Inflow: 0, Outflow: 0 },
        ];
        
        const now = new Date();
        
        const recurringOutflow = bills.filter(b => b.isRecurring).reduce((acc, b) => acc + b.amount, 0) + (weeklyCosts.reduce((acc, c) => acc + c.amount, 0) * 4.33);

        forecast[0].Outflow = recurringOutflow;
        forecast[1].Outflow = recurringOutflow * 2;
        forecast[2].Outflow = recurringOutflow * 3;

        invoices.forEach(invoice => {
            if (invoice.status !== 'Paid' && invoice.dueDate) {
                try {
                    const dueDate = new Date(invoice.dueDate);
                    if (isNaN(dueDate.getTime())) {
                        // Invalid date format in invoice, skip it
                        return;
                    }
                    const daysUntilDue = (dueDate - now) / (1000 * 60 * 60 * 24);

                    if (daysUntilDue <= 30) forecast[0].Inflow += invoice.grandTotal || 0;
                    if (daysUntilDue <= 60) forecast[1].Inflow += invoice.grandTotal || 0;
                    if (daysUntilDue <= 90) forecast[2].Inflow += invoice.grandTotal || 0;
                } catch (e) {
                    console.error("Error parsing due date for invoice:", invoice, e);
                }
            }
        });

        return forecast.map(f => ({...f, 'Net Change': f.Inflow - f.Outflow, 'Projected Balance': currentBankBalance + f.Inflow - f.Outflow }));

    }, [invoices, bills, weeklyCosts, currentBankBalance]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Smarter Cash Flow Forecast</h3>
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Enter Current Bank Balance ($)</label>
                <input 
                    type="number"
                    value={currentBankBalance}
                    onChange={(e) => setCurrentBankBalance(parseFloat(e.target.value) || 0)}
                    className="w-full max-w-xs bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"
                />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">This forecast projects your future bank balance based on unpaid invoices and recurring expenses.</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `$${(value/1000)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} />
                    <Legend />
                    <Line type="monotone" dataKey="Projected Balance" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Inflow" stroke="#22c55e" />
                    <Line type="monotone" dataKey="Outflow" stroke="#ef4444" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};