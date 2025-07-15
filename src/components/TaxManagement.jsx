import React, { useState, useMemo, useEffect } from 'react';
import { StatCard } from './StatCard'; 
import { DollarSign, PlusCircle, Edit, Trash2, Info, ChevronDown } from 'lucide-react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const TAX_RATE_PRESETS = {
    'single': 15,
    'jointly': 12,
    'hoh': 14,
};

const TaxManagement = ({ jobs, bills, weeklyCosts, taxPayments, openModal, handleDelete }) => {
    const [taxRate, setTaxRate] = useState(15);
    const [filingStatus, setFilingStatus] = useState('single');
    const [period, setPeriod] = useState('quarterly');
    const [showBreakdown, setShowBreakdown] = useState(false);

    useEffect(() => {
        setTaxRate(TAX_RATE_PRESETS[filingStatus]);
    }, [filingStatus]);

    const dateRange = useMemo(() => {
        const now = new Date();
        let start, end;

        switch(period) {
            case 'weekly':
                start = new Date(now.setDate(now.getDate() - now.getDay()));
                end = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                break;
            case 'monthly':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'quarterly':
                const quarter = Math.floor(now.getMonth() / 3);
                start = new Date(now.getFullYear(), quarter * 3, 1);
                end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
                break;
            case 'yearly':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31);
                break;
            default:
                start = new Date();
                end = new Date();
        }
        return { start, end };

    }, [period]);

    const pnlData = useMemo(() => {
        const filteredJobs = jobs.filter(job => {
            if (!job.date) return false;
            const jobDate = new Date(job.date);
            return jobDate >= dateRange.start && jobDate <= dateRange.end;
        });
        
        const operatingExpenses = bills.reduce((acc, bill) => acc + bill.amount, 0) + (weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * 4.33);
        const periodExpenseFactor = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24 * 30.44); // monthly factor
        const periodOperatingExpenses = operatingExpenses * periodExpenseFactor;

        const revenue = filteredJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = filteredJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;
        
        const netProfit = grossProfit - periodOperatingExpenses;
        const estimatedTax = netProfit > 0 ? netProfit * (taxRate / 100) : 0;
        
        return { netProfit, estimatedTax, grossProfit, periodOperatingExpenses };
    }, [jobs, bills, weeklyCosts, taxRate, dateRange]);

    const totalPaidThisPeriod = useMemo(() => {
        return taxPayments
            .filter(p => {
                const paymentDate = new Date(p.date);
                return paymentDate >= dateRange.start && paymentDate <= dateRange.end;
            })
            .reduce((acc, payment) => acc + (payment.amount || 0), 0);
    }, [taxPayments, dateRange]);

    const remainingLiability = pnlData.estimatedTax - totalPaidThisPeriod;

    const chartData = [
        {
            name: 'Tax Liability',
            'Estimated Tax': pnlData.estimatedTax,
            'Taxes Paid': totalPaidThisPeriod,
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Tax Estimation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label htmlFor="filingStatus" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Filing Status</label>
                        <select
                            id="filingStatus"
                            value={filingStatus}
                            onChange={(e) => setFilingStatus(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"
                        >
                            <option value="single">Single</option>
                            <option value="jointly">Married Filing Jointly</option>
                            <option value="hoh">Head of Household</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="taxRate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Estimated Tax Rate (%)</label>
                        <input
                            id="taxRate"
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"
                        />
                    </div>
                    <div>
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
                    <StatCard title="Estimated Tax Liability" value={`$${pnlData.estimatedTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<DollarSign />} color="orange" 
                        subtext={pnlData.netProfit <= 0 ? "No tax on negative profit" : ""}
                    />
                    <StatCard title="Remaining Liability" value={`$${remainingLiability.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<DollarSign />} color={remainingLiability >= 0 ? "red" : "green"} />
                </div>
                
                <div className="mt-4">
                    <button onClick={() => setShowBreakdown(!showBreakdown)} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:underline">
                        Show Calculation Breakdown <ChevronDown className={`transition-transform ${showBreakdown ? 'rotate-180' : ''}`} size={16} />
                    </button>
                    {showBreakdown && (
                        <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm space-y-2 animate-fade-in">
                            <div className="flex justify-between"><span>Gross Profit (from Jobs):</span> <span className="font-mono">${pnlData.grossProfit.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>- Est. Operating Expenses:</span> <span className="font-mono">${pnlData.periodOperatingExpenses.toFixed(2)}</span></div>
                            <hr className="border-slate-300 dark:border-slate-600"/>
                            <div className="flex justify-between font-bold"><span>= Estimated Net Profit:</span> <span className="font-mono">${pnlData.netProfit.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>x Tax Rate ({taxRate}%):</span> <span className="font-mono">${pnlData.estimatedTax.toFixed(2)}</span></div>
                        </div>
                    )}
                </div>

                 {pnlData.netProfit <= 0 && (
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/50 border border-blue-400 dark:border-blue-700 text-blue-800 dark:text-blue-200 rounded-lg flex items-center gap-3">
                        <Info size={20} />
                        <p className="text-sm">Your estimated tax is $0.00 because your estimated net profit is negative. The tax rate will apply once your profit is positive.</p>
                    </div>
                )}
                 <div className="mt-6">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Liability vs. Payments</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="Estimated Tax" fill="#f97316" />
                            <Bar dataKey="Taxes Paid" fill="#16a34a" />
                        </BarChart>
                    </ResponsiveContainer>
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
