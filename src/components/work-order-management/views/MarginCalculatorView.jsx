import React, { useState, useEffect, useMemo } from 'react';
import { Percent, DollarSign, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

const MarginCalculatorView = () => {
    // Get both work orders and invoices from context
    const { workOrders, invoices } = useWorkOrderContext();

    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [revenue, setRevenue] = useState(0);
    const [materialCost, setMaterialCost] = useState(0);
    const [laborCost, setLaborCost] = useState(0);
    const [useInvoiceData, setUseInvoiceData] = useState(true);

    if (!workOrders) {
        return <div className="p-6">Loading calculator data...</div>;
    }

    const completedOrders = useMemo(() => 
        (workOrders || []).filter(wo => wo['Order Status'] === 'Completed'), 
        [workOrders]
    );

    // Find invoices for the selected work order
    const associatedInvoices = useMemo(() => {
        if (!selectedOrderId || !invoices) return [];
        return invoices.filter(invoice => invoice.workOrderId === selectedOrderId);
    }, [selectedOrderId, invoices]);

    // Calculate total invoiced amount
    const totalInvoicedAmount = useMemo(() => {
        return associatedInvoices.reduce((sum, invoice) => sum + (invoice.total || 0), 0);
    }, [associatedInvoices]);

    useEffect(() => {
        const selectedOrder = workOrders.find(wo => wo.id === selectedOrderId);
        if (selectedOrder) {
            // Use invoice total if available and preference is set, otherwise use work order NTE
            const revenueAmount = useInvoiceData && totalInvoicedAmount > 0 
                ? totalInvoicedAmount 
                : (selectedOrder.NTE || 0);
            
            setRevenue(revenueAmount);
            setMaterialCost(selectedOrder.materialCost || 0);
            setLaborCost(selectedOrder.laborCost || 0);
        } else {
            setRevenue(0);
            setMaterialCost(0);
            setLaborCost(0);
        }
    }, [selectedOrderId, workOrders, totalInvoicedAmount, useInvoiceData]);

    const totalCost = materialCost + laborCost;
    const profit = revenue - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    const selectedOrder = workOrders.find(wo => wo.id === selectedOrderId);

    return (
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Profit & Margin Calculator</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* --- INPUTS --- */}
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Load Data from Completed Work Order (Optional)
                        </label>
                        <select
                            value={selectedOrderId}
                            onChange={(e) => setSelectedOrderId(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="">-- Manual Entry --</option>
                            {completedOrders.map(wo => {
                                const invoiceCount = invoices ? invoices.filter(inv => inv.workOrderId === wo.id).length : 0;
                                const invoiceTotal = invoices ? invoices.filter(inv => inv.workOrderId === wo.id).reduce((sum, inv) => sum + (inv.total || 0), 0) : 0;
                                
                                return (
                                    <option key={wo.id} value={wo.id}>
                                        {wo['WO#']} - {wo.Company} 
                                        {invoiceCount > 0 ? ` [${invoiceCount} invoice(s): ${formatCurrency(invoiceTotal)}]` : ` [NTE: ${formatCurrency(wo.NTE)}]`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Show invoice/work order toggle when both are available */}
                    {selectedOrder && associatedInvoices.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Revenue Source:</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="useInvoiceData"
                                        checked={useInvoiceData}
                                        onChange={(e) => setUseInvoiceData(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="useInvoiceData" className="text-sm text-blue-700 dark:text-blue-300">
                                        Use Invoice Total
                                    </label>
                                </div>
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                <div className="flex justify-between">
                                    <span>Work Order NTE:</span>
                                    <span className="font-mono">{formatCurrency(selectedOrder.NTE || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Invoiced ({associatedInvoices.length} invoice{associatedInvoices.length !== 1 ? 's' : ''}):</span>
                                    <span className="font-mono">{formatCurrency(totalInvoicedAmount)}</span>
                                </div>
                                {associatedInvoices.map((invoice, index) => (
                                    <div key={invoice.id} className="flex justify-between text-xs ml-4">
                                        <span>• Invoice #{invoice.id}:</span>
                                        <span className="font-mono">{formatCurrency(invoice.total || 0)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Total Revenue ($)
                            {selectedOrder && (
                                <span className="ml-2 text-xs text-gray-500">
                                    {useInvoiceData && totalInvoicedAmount > 0 ? '(from invoices)' : '(from work order NTE)'}
                                </span>
                            )}
                        </label>
                        <input 
                            type="number" 
                            value={revenue} 
                            onChange={e => setRevenue(parseFloat(e.target.value) || 0)} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Material Cost ($)</label>
                        <input 
                            type="number" 
                            value={materialCost} 
                            onChange={e => setMaterialCost(parseFloat(e.target.value) || 0)} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Labor Cost ($)</label>
                        <input 
                            type="number" 
                            value={laborCost} 
                            onChange={e => setLaborCost(parseFloat(e.target.value) || 0)} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                </div>

                {/* --- RESULTS --- */}
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg flex flex-col justify-center items-center space-y-4">
                    <div className="text-center">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Profit Margin</h4>
                        <p className={`text-6xl font-bold ${margin >= 25 ? 'text-green-500' : margin >= 15 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {margin.toFixed(1)}<span className="text-4xl">%</span>
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {margin >= 25 && "Excellent margin"}
                            {margin >= 15 && margin < 25 && "Good margin"}
                            {margin < 15 && margin >= 0 && "Low margin"}
                            {margin < 0 && "Loss"}
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
                            <p className="text-lg font-semibold text-blue-500">{formatCurrency(revenue)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Cost</p>
                            <p className="text-lg font-semibold text-red-500">{formatCurrency(totalCost)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Net Profit</p>
                            <p className={`text-lg font-semibold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {formatCurrency(profit)}
                            </p>
                        </div>
                    </div>

                    {/* Revenue variance indicator */}
                    {selectedOrder && associatedInvoices.length > 0 && (
                        <div className="w-full text-center text-xs">
                            {totalInvoicedAmount !== (selectedOrder.NTE || 0) && (
                                <div className={`px-2 py-1 rounded ${
                                    totalInvoicedAmount > (selectedOrder.NTE || 0) 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                    {totalInvoicedAmount > (selectedOrder.NTE || 0) ? '↗' : '↘'} 
                                    {formatCurrency(Math.abs(totalInvoicedAmount - (selectedOrder.NTE || 0)))} 
                                    {totalInvoicedAmount > (selectedOrder.NTE || 0) ? ' over NTE' : ' under NTE'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarginCalculatorView;