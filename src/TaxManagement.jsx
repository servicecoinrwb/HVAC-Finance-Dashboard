import React, { useState, useMemo } from 'react';
import { StatCard } from './StatCard'; // Assuming StatCard is in a shared components folder
import { DollarSign, PlusCircle, Edit, Trash2 } from 'lucide-react';

const TaxManagement = ({ jobs, bills, weeklyCosts, taxPayments, openModal, handleDelete }) => {
    const [taxRate, setTaxRate] = useState(15); // Default tax rate of 15%
    const [period, setPeriod] = useState('quarterly');

    const pnlData = useMemo(() => {
        let factor = 1;
        if (period === 'weekly') factor = 1 / 4.33;
        if (period === 'yearly') factor = 12;
        if (period === 'quarterly') factor = 3;
        
        const revenue = jobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = jobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;
        
        const operatingExpenses = bills.reduce((acc, bill) => acc + bill.amount, 0) + (weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * 4.33);
        
        const netProfit = (grossProfit - operatingExpenses) * factor;

        const estimatedTax = netProfit > 0 ? netProfit * (taxRate / 100) : 0;
        
        return { netProfit, estimatedTax };
    }, [jobs, bills, weeklyCosts, taxRate, period]);

    const totalPaid = useMemo(() => {
        return taxPayments.reduce((acc, payment) => acc + (payment.amount || 0), 0);
    }, [taxPayments]);

    const remainingLiability = pnlData.estimatedTax - totalPaid;

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Tax Estimation</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <label htmlFor="taxRate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Estimated Tax Rate (%)</label>
                        <input
                            id="taxRate"
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"
                        />
                    </div>
                    <div className="flex-1">
                         <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Estimation Period</label>
                         <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                               <button onClick={() => setPeriod('weekly')} className={`w-full px-2 py-1 text-xs rounded ${period === 'weekly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Weekly</button>
                               <button onClick={() => setPeriod('monthly')} className={`w-full px-2 py-1 text-xs rounded ${period === 'monthly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Monthly</button>
                               <button onClick={() => setPeriod('quarterly')} className={`w-full px-2 py-1 text-xs rounded ${period === 'quarterly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Quarterly</button>
                               <button onClick={() => setPeriod('yearly')} className={`w-full px-2 py-1 text-xs rounded ${period === 'yearly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Yearly</button>
                           </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <StatCard title={`Estimated ${period} Net Profit`} value={`$${pnlData.netProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<DollarSign />} color="blue" />
                    <StatCard title="Estimated Tax Liability" value={`$${pnlData.estimatedTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<DollarSign />} color="orange" />
                    <StatCard title="Remaining Liability" value={`$${remainingLiability.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<DollarSign />} color={remainingLiability > 0 ? "red" : "green"} />
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Recorded Tax Payments</h3>
                    <button onClick={() => openModal('taxPayment')} className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Record Payment</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Notes</th>
                                <th className="p-3 text-right">Amount</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {taxPayments.map(payment => (
                                <tr key={payment.id} className="border-b border-slate-200 dark:border-slate-700/50">
                                    <td className="p-3 font-medium">{payment.date}</td>
                                    <td className="p-3">{payment.notes}</td>
                                    <td className="p-3 text-right font-mono">${(payment.amount || 0).toFixed(2)}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => openModal('taxPayment', payment)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete('taxPayment', payment.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaxManagement;

