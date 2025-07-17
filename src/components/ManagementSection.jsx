import React from 'react';
import { Upload, FileText, PlusCircle, Edit, Trash2 } from 'lucide-react';

export const ManagementSection = ({ title, data, columns, type, searchTerm, setSearchTerm, handleImportCSV, handleExportCSV, openModal, handleDelete, debtPayoffStrategies }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white" />
                    {(type === 'client' || type === 'job' || type === 'inventory' || type === 'invoice') && <>
                        <input type="file" id={`csv-importer-${type}`} className="hidden" accept=".csv" onChange={e => handleImportCSV(e.target.files[0], type)} />
                        <label htmlFor={`csv-importer-${type}`} className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"><Upload size={16} /> Import CSV</label>
                    </>}
                    <button onClick={() => handleExportCSV(data, type)} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
                    <button onClick={() => openModal(type)} className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New</button>
                </div>
            </div>
            {type === 'debt' && debtPayoffStrategies && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                        <h4 className="font-bold text-lg text-cyan-600 dark:text-cyan-400 mb-2">Avalanche Method</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Pay off debts with the highest interest rate first to save the most money over time.</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            {debtPayoffStrategies.avalanche.map(d => <li key={d.id}>{d.name} <span className="text-slate-500 dark:text-slate-400">({d.interestRate}%)</span></li>)}
                        </ol>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-green-600 dark:text-green-400 mb-2">Snowball Method</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Pay off debts with the smallest balance first for quick wins and motivation.</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            {debtPayoffStrategies.snowball.map(d => <li key={d.id}>{d.name} <span className="text-slate-500 dark:text-slate-400">(${(d.totalAmount - d.paidAmount).toFixed(2)})</span></li>)}
                        </ol>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            {columns.map(col => <th key={col.key} className={`p-3 ${col.className || ''}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map(item => (
                            <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200">
                                {columns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal(type, item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(type, item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
