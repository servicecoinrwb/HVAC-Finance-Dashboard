import React, { useMemo } from 'react';
import { formatCurrency, excelDateToJSDateString } from './work-order-management/utils/helpers.jsx';
export const PnLStatement = ({ workOrders, bills, weeklyCosts, reportingPeriod, dateRange }) => {

    // ✅ Guard Clause: Add a check at the top of the component
    if (!workOrders || !bills || !weeklyCosts) {
        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Profit & Loss Statement</h3>
                <p className="text-slate-500 dark:text-slate-400">Loading data...</p>
            </div>
        );
    }

    const pnlData = useMemo(() => {
        const filteredOrders = (workOrders || []).filter(order => {
            if (order['Order Status'] !== 'Completed' || !order['Completed Date']) return false;
            const completedDate = new Date(excelDateToJSDateString(order['Completed Date']));
            return completedDate >= dateRange.start && completedDate <= dateRange.end;
        });

        const revenue = filteredOrders.reduce((acc, order) => acc + (order.NTE || 0), 0);
        
        // Calculate COGS from line items if available, otherwise use older fields
        const cogs = filteredOrders.reduce((acc, order) => {
            if (order.lineItems && Array.isArray(order.lineItems)) {
                const itemsCost = order.lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
                return acc + itemsCost;
            }
            return acc + (order.materialCost || 0) + (order.laborCost || 0);
        }, 0);

        const grossProfit = revenue - cogs;

        const periodExpenseFactor = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24 * 30.44);
        
        const expensesByCategory = (bills || []).reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});

        const weeklyCostsTotal = (weeklyCosts || []).reduce((acc, cost) => acc + cost.amount, 0) * periodExpenseFactor;
        if(weeklyCostsTotal > 0) {
            expensesByCategory['Weekly & Misc'] = (expensesByCategory['Weekly & Misc'] || 0) + weeklyCostsTotal;
        }

        const operatingExpenses = Object.values(expensesByCategory).reduce((acc, val) => acc + val, 0);
        
        const netProfit = grossProfit - operatingExpenses;
        
        const grossProfitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
        const netProfitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

        return { 
            revenue, cogs, grossProfit, operatingExpenses, 
            expensesByCategory, netProfit, grossProfitMargin, netProfitMargin
        };
    }, [workOrders, bills, weeklyCosts, dateRange]);

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
                    <span className="font-mono">{formatCurrency(pnlData.revenue)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-600 dark:text-slate-400">Cost of Goods Sold (COGS)</span>
                    <span className="font-mono">({formatCurrency(pnlData.cogs)})</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700 my-2"/>

                {/* Gross Profit Section */}
                <div className="flex justify-between items-center p-3 font-bold text-lg">
                    <span>Gross Profit</span>
                    <span className="font-mono">{formatCurrency(pnlData.grossProfit)}</span>
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
                        <span className="font-mono">({formatCurrency(amount)})</span>
                    </div>
                ))}
                <div className="flex justify-between items-center p-3 pl-8 font-semibold">
                    <span>Total Operating Expenses</span>
                    <span className="font-mono">({formatCurrency(pnlData.operatingExpenses)})</span>
                </div>
                <hr className="border-slate-300 dark:border-slate-600 my-2 border-2"/>

                {/* Net Profit Section */}
                <div className="flex justify-between items-center p-3 font-bold text-xl" style={{ color: pnlData.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                    <span>Net Profit</span>
                    <span className="font-mono">
                        {formatCurrency(pnlData.netProfit)}
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
