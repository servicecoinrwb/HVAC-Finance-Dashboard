import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export const IncomeSourcesSection = ({ incomes, openModal, handleDelete }) => {
    const columns = [
        { key: 'name', header: 'Source', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'amount', header: 'Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-green-600 dark:text-green-400">${(item.amount || 0).toFixed(2)}</span> },
        { key: 'type', header: 'Type', render: item => <span className="capitalize bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2 py-1 rounded-full">{item.type}</span> },
        { key: 'notes', header: 'Notes', render: item => <span>{item.notes}</span> },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Income Sources</h3>
                <button onClick={() => openModal('income')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors">
                    <PlusCircle size={16} /> Add New Income Source
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            {columns.map(col => <th key={col.key} className={`p-3 ${col.className || ''}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {incomes.map(item => (
                            <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200">
                                {columns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal('income', item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete('income', item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
