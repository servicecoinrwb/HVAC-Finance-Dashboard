import React, { useMemo } from 'react';

export const PnLStatement = ({ jobs, bills, weeklyCosts, reportingPeriod, dateRange }) => {

    const pnlData = useMemo(() => {
        const filteredJobs = jobs.filter(job => {
            if (!job.date) return false;
            const jobDate = new Date(job.date);
            return jobDate >= dateRange.start && jobDate <= dateRange.end;
        });

        const revenue = filteredJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = filteredJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;

        const periodExpenseFactor = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24 * 30.44);
        
        const expensesByCategory = bills.reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});

        const weeklyCostsTotal = weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * periodExpenseFactor;
        if(weeklyCostsTotal > 0) {
            expensesByCategory['Weekly & Misc'] = (expensesByCategory['Weekly & Misc'] || 0) + weeklyCostsTotal;
        }

        const operatingExpenses = Object.values(expensesByCategory).reduce((acc, val) => acc + val, 0);
        
        const netProfit = grossProfit - operatingExpenses;
        
        const grossProfitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
        const netProfitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

        return { 
            revenue, 
            cogs, 
            grossProfit, 
            operatingExpenses, 
            expensesByCategory,
            netProfit, 
            grossProfitMargin,
            netProfitMargin
        };
    }, [jobs, bills, weeklyCosts, dateRange]);

    const formatPeriod = () => {
        const options = { month: 'long', year: 'numeric' };
        if (reportingPeriod === 'monthly') {
            return `For the Month of ${dateRange.start.toLocaleString('default', options)}`;
        }
        if (reportingPeriod === 'quarterly') {
            const endOptions = { month: 'long', day: 'numeric', year: 'numeric' };
            return `For the Quarter Ending ${dateRange.end.toLocaleDateString('default', endOptions)}`;
        }
        if (reportingPeriod === 'yearly') {
            return `For the Year ${dateRange.start.getFullYear()}`;
        }
        return '';
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Profit & Loss Statement</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{formatPeriod()}</p>
            
            <div className="space-y-2 text-sm">
                {/* Revenue Section */}
                <div className="flex justify-between items-center p-3 font-semibold">
                    <span>Total Revenue</span>
                    <span className="font-mono">${pnlData.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-600 dark:text-slate-400">Cost of Goods Sold (COGS)</span>
                    <span className="font-mono">(${pnlData.cogs.toFixed(2)})</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700 my-2"/>

                {/* Gross Profit Section */}
                <div className="flex justify-between items-center p-3 font-bold text-lg">
                    <span>Gross Profit</span>
                    <span className="font-mono">${pnlData.grossProfit.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between items-center p-1 pl-8 text-xs text-slate-500">
                    <span>Gross Profit Margin</span>
                    <span className="font-mono">{pnlData.grossProfitMargin.toFixed(1)}%</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700 my-2"/>

                {/* Operating Expenses Section */}
                <div className="p-3 font-semibold">
                    <span>Operating Expenses</span>
                </div>
                {Object.entries(pnlData.expensesByCategory).map(([category, amount]) => (
                     <div key={category} className="flex justify-between items-center p-1 pl-8">
                        <span className="text-slate-600 dark:text-slate-400">{category}</span>
                        <span className="font-mono">(${amount.toFixed(2)})</span>
                    </div>
                ))}
                 <div className="flex justify-between items-center p-3 pl-8 font-semibold">
                    <span>Total Operating Expenses</span>
                    <span className="font-mono">(${pnlData.operatingExpenses.toFixed(2)})</span>
                </div>
                <hr className="border-slate-300 dark:border-slate-600 my-2 border-2"/>

                {/* Net Profit Section */}
                <div className="flex justify-between items-center p-3 font-bold text-xl" style={{ color: pnlData.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                    <span>Net Profit</span>
                    <span className="font-mono">
                        {pnlData.netProfit < 0 ? `-$${Math.abs(pnlData.netProfit).toFixed(2)}` : `$${pnlData.netProfit.toFixed(2)}`}
                    </span>
                </div>
                 <div className="flex justify-between items-center p-1 pl-8 text-xs text-slate-500">
                    <span>Net Profit Margin</span>
                    <span className="font-mono">{pnlData.netProfitMargin.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    );
};
