import React, { useState, useEffect, useMemo } from 'react';
import { Percent, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const MarginCalculatorView = ({ workOrders }) => {
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [revenue, setRevenue] = useState(0);
    const [materialCost, setMaterialCost] = useState(0);
    const [laborCost, setLaborCost] = useState(0);

    const completedOrders = useMemo(() => 
        workOrders.filter(wo => wo['Order Status'] === 'Completed'), 
        [workOrders]
    );

    useEffect(() => {
        const selectedOrder = workOrders.find(wo => wo.id === selectedOrderId);
        if (selectedOrder) {
            setRevenue(selectedOrder.NTE || 0);
            // Assuming you might add these fields to your work orders later
            setMaterialCost(selectedOrder.materialCost || 0);
            setLaborCost(selectedOrder.laborCost || 0);
        } else {
            setRevenue(0);
            setMaterialCost(0);
            setLaborCost(0);
        }
    }, [selectedOrderId, workOrders]);

    const totalCost = materialCost + laborCost;
    const profit = revenue - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

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
                            {completedOrders.map(wo => (
                                <option key={wo.id} value={wo.id}>
                                    {wo['WO#']} - {wo.Company} ({formatCurrency(wo.NTE)})
                                </option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Total Revenue ($)</label>
                        <input type="number" value={revenue} onChange={e => setRevenue(parseFloat(e.target.value) || 0)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Material Cost ($)</label>
                        <input type="number" value={materialCost} onChange={e => setMaterialCost(parseFloat(e.target.value) || 0)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Labor Cost ($)</label>
                        <input type="number" value={laborCost} onChange={e => setLaborCost(parseFloat(e.target.value) || 0)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                </div>

                {/* --- RESULTS --- */}
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg flex flex-col justify-center items-center space-y-4">
                     <div className="text-center">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Profit Margin</h4>
                        <p className={`text-6xl font-bold ${margin >= 25 ? 'text-green-500' : 'text-orange-500'}`}>
                            {margin.toFixed(1)}<span className="text-4xl">%</span>
                        </p>
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
                            <p className="text-lg font-semibold text-green-500">{formatCurrency(profit)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarginCalculatorView;