import Auth from './components/Auth.jsx';
import React, { useMemo } from 'react';
import { Upload, FileText, PlusCircle, Edit, Trash2, CheckCircle, Circle } from 'lucide-react';

export const InvoiceManagement = ({ invoices, openModal, handleDelete, handleBulkDelete, searchTerm, setSearchTerm, selectedIds, setSelectedIds, handleImportCSV, handleExportCSV, handleToggleInvoicePaid }) => {
    const invoiceColumns = [ 
        { key: 'status', header: 'Status', render: item => (
            <button onClick={() => handleToggleInvoicePaid(item.id, item.status)}>
                {item.status === 'Paid' ? <CheckCircle className="text-green-500" /> : <Circle className="text-slate-400 dark:text-slate-600" />}
            </button>
        )},
        { key: 'billTo', header: 'Bill To', render: item => <span className={`font-medium ${item.status === 'Paid' ? 'line-through' : ''}`}>{item.billTo}</span> }, 
        { key: 'customer', header: 'Customer', render: item => <span className={item.status === 'Paid' ? 'line-through' : ''}>{item.customer}</span> }, 
        { key: 'grandTotal', header: 'Amount', className: 'text-right', render: item => <span className={`font-mono ${item.status === 'Paid' ? 'line-through' : ''}`}>${(item.grandTotal || 0).toFixed(2)}</span> }, 
        { key: 'dueDate', header: 'Due Date', className: 'text-center', render: item => <span className={item.status === 'Paid' ? 'line-through' : ''}>{item.dueDate}</span> },
    ];
    const filteredInvoices = useMemo(() => invoices.filter(i => (i.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) || (i.billTo || '').toLowerCase().includes(searchTerm.toLowerCase())), [invoices, searchTerm]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredInvoices.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Invoice Management</h3>
                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Search Invoices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white" />
                    {selectedIds.length > 0 && <button onClick={() => handleBulkDelete('invoice', selectedIds)} className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><Trash2 size={16} /> Delete ({selectedIds.length})</button>}
                    <input type="file" id="csv-importer-invoice" className="hidden" accept=".csv" onChange={e => handleImportCSV(e.target.files[0], 'invoice')} />
                    <label htmlFor="csv-importer-invoice" className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"><Upload size={16} /> Import CSV</label>
                    <button onClick={() => handleExportCSV(invoices, 'invoices')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
                    <button onClick={() => openModal('invoice')} className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="p-3"><input type="checkbox" onChange={handleSelectAll} /></th>
                            {invoiceColumns.map(col => <th key={col.key} className={`p-3 ${col.className || ''}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredInvoices.map(item => (
                            <tr key={item.id} className={`border-b border-slate-200 dark:border-slate-700/50 ${item.status === 'Paid' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                                <td className="p-3"><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => {
                                    setSelectedIds(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])
                                }} /></td>
                                {invoiceColumns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal('invoice', item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete('invoice', item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
