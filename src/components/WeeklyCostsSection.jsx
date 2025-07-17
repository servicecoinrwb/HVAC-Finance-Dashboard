import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export const WeeklyCostsSection = ({ weeklyCosts, openModal, handleDelete }) => {
    const columns = [
        { key: 'name', header: 'Item', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'amount', header: 'Weekly Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-red-600 dark:text-red-400">${(item.amount || 0).toFixed(2)}</span> },
        { key: 'notes', header: 'Notes', render: item => <span>{item.notes}</span> },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Recurring Weekly Costs</h3>
                <button onClick={() => openModal('weekly')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors">
                    <PlusCircle size={16} /> Add New Weekly Cost
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
                        {weeklyCosts.map(item => (
                            <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200">
                                {columns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal('weekly', item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete('weekly', item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
