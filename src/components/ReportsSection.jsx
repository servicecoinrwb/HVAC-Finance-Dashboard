import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export const ReportsSection = ({ clients, jobs, bills, inventory }) => {
    const clientProfitability = useMemo(() => {
        return clients.map(client => {
            const clientJobs = jobs.filter(job => job.clientId === client.id);
            const totalRevenue = clientJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
            const totalCost = clientJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
            return {
                name: client.name,
                netProfit: totalRevenue - totalCost,
            };
        }).sort((a,b) => b.netProfit - a.netProfit);
    }, [clients, jobs]);

    const trendData = useMemo(() => {
        const dataByMonth = {};
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        jobs.forEach(job => {
            if(job.date && new Date(job.date) > twelveMonthsAgo) {
                const month = new Date(job.date).toISOString().slice(0, 7);
                if(!dataByMonth[month]) dataByMonth[month] = { revenue: 0, expenses: 0 };
                dataByMonth[month].revenue += job.revenue || 0;
            }
        });

        bills.forEach(bill => {
             const createdAt = bill.createdAt?.toDate ? bill.createdAt.toDate() : new Date();
             if(createdAt > twelveMonthsAgo) {
                const month = createdAt.toISOString().slice(0,7);
                if(!dataByMonth[month]) dataByMonth[month] = { revenue: 0, expenses: 0 };
                dataByMonth[month].expenses += bill.amount || 0;
             }
        });

        return Object.keys(dataByMonth).map(month => ({
            month,
            Revenue: dataByMonth[month].revenue,
            Expenses: dataByMonth[month].expenses,
        })).sort((a,b) => a.month.localeCompare(b.month));
    }, [jobs, bills]);

    const inventoryValue = useMemo(() => {
        return inventory.map(item => ({
            name: item.name,
            totalValue: (item.quantity || 0) * (item.cost || 0)
        })).sort((a,b) => b.totalValue - a.totalValue);
    }, [inventory]);

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Revenue vs. Expenses Trend (Last 12 Months)</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" tickFormatter={(value) => `$${(value/1000)}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="Revenue" fill="#22c55e" />
                        <Bar dataKey="Expenses" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Client Profitability</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr><th className="p-3">Client</th><th className="p-3 text-right">Net Profit</th></tr>
                        </thead>
                        <tbody>
                            {clientProfitability.map(client => (
                                <tr key={client.name} className="border-b border-slate-200 dark:border-slate-700/50">
                                    <td className="p-3 font-medium">{client.name}</td>
                                    <td className={`p-3 text-right font-mono ${client.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>${client.netProfit.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Inventory Value</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr><th className="p-3">Item</th><th className="p-3 text-center">Quantity</th><th className="p-3 text-right">Total Value</th></tr>
                        </thead>
                        <tbody>
                            {inventoryValue.map(item => (
                                <tr key={item.name} className="border-b border-slate-200 dark:border-slate-700/50">
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3 text-center">{inventory.find(i => i.name === item.name)?.quantity}</td>
                                    <td className="p-3 text-right font-mono">${item.totalValue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
