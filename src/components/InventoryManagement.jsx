import React, { useMemo } from 'react';
import { Upload, FileText, PlusCircle, Edit, Trash2 } from 'lucide-react';

export const InventoryManagement = ({ inventory, openModal, handleDelete, handleBulkDelete, searchTerm, setSearchTerm, selectedIds, setSelectedIds, handleImportCSV, handleExportCSV }) => {
    const inventoryColumns = [ { key: 'name', header: 'Item Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'quantity', header: 'Quantity on Hand', className: 'text-center', render: item => <span>{item.quantity}</span> }, { key: 'cost', header: 'Cost per Item', className: 'text-right', render: item => <span className="font-mono">${(item.cost || 0).toFixed(2)}</span> }, ];
    const filteredInventory = useMemo(() => inventory.filter(i => (i.name || '').toLowerCase().includes(searchTerm.toLowerCase())), [inventory, searchTerm]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredInventory.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Inventory Management</h3>
                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Search Inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white" />
                    {selectedIds.length > 0 && <button onClick={() => handleBulkDelete('inventory', selectedIds)} className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><Trash2 size={16} /> Delete ({selectedIds.length})</button>}
                    <input type="file" id="csv-importer-inventory" className="hidden" accept=".csv" onChange={e => handleImportCSV(e.target.files[0], 'inventory')} />
                    <label htmlFor="csv-importer-inventory" className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"><Upload size={16} /> Import CSV</label>
                    <button onClick={() => handleExportCSV(inventory, 'inventory')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
                    <button onClick={() => openModal('inventory')} className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="p-3"><input type="checkbox" onChange={handleSelectAll} /></th>
                            {inventoryColumns.map(col => <th key={col.key} className={`p-3 ${col.className || ''}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredInventory.map(item => (
                            <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200">
                                <td className="p-3"><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => {
                                    setSelectedIds(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])
                                }} /></td>
                                {inventoryColumns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal('inventory', item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete('inventory', item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};