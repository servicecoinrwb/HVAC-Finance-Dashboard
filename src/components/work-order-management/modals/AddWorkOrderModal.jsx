import React, { useState, useMemo, useEffect } from 'react';
import { X, PlusCircle, Trash2 } from 'lucide-react';
import { yyyymmddToExcel } from '../utils/helpers';

const AddWorkOrderModal = ({ onClose, onAddOrder, customers, inventory }) => {
    // ... existing state for the modal ...
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Regular');
    // ... etc ...

    // --- NEW: State for Line Items ---
    const [lineItems, setLineItems] = useState([{ description: 'General Labor', quantity: 1, rate: 0, amount: 0, inventoryId: null }]);

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0, inventoryId: null }]);
    };

    const removeLineItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleInventorySelect = (index, inventoryId) => {
        const item = inventory.find(i => i.id === inventoryId);
        const updated = [...lineItems];
        if (item) {
            updated[index].description = item.name;
            updated[index].rate = item.price || 0;
            updated[index].inventoryId = inventoryId;
            updated[index].amount = updated[index].quantity * (item.price || 0);
        } else {
            updated[index].inventoryId = null;
        }
        setLineItems(updated);
    };

    const updateLineItem = (index, field, value) => {
        const updated = [...lineItems];
        updated[index][field] = value;
        if (field === 'quantity' || field === 'rate') {
            const quantity = parseFloat(updated[index].quantity) || 0;
            const rate = parseFloat(updated[index].rate) || 0;
            updated[index].amount = quantity * rate;
        }
        setLineItems(updated);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // ... existing handleSubmit logic ...

        const orderData = { 
            // ... existing order data ...
            lineItems: lineItems, // <-- Add line items to the data
        };
        
        onAddOrder(orderData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* ... Modal Header ... */}
                <div className="p-6 overflow-y-auto space-y-4">
                    {/* ... Existing form fields for customer, task, priority etc. ... */}
                    
                    {/* --- NEW: Line Items Section --- */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Line Items</h3>
                            <button type="button" onClick={addLineItem} className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700">
                                <PlusCircle size={16} /> Add Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                    <div className="col-span-4">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Inventory Part</label>
                                        <select onChange={(e) => handleInventorySelect(index, e.target.value)} className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white">
                                            <option value="">-- Select from Inventory --</option>
                                            {inventory.map(invItem => <option key={invItem.id} value={invItem.id}>{invItem.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-span-4">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Description</label>
                                        <input type="text" value={item.description} onChange={(e) => updateLineItem(index, 'description', e.target.value)} className="w-full p-2 text-sm border ..." placeholder="Or type custom item" required />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Qty</label>
                                        <input type="number" value={item.quantity} onChange={(e) => updateLineItem(index, 'quantity', e.target.value)} className="w-full p-2 text-sm border ..." />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Rate ($)</label>
                                        <input type="number" value={item.rate} onChange={(e) => updateLineItem(index, 'rate', e.target.value)} className="w-full p-2 text-sm border ..." />
                                    </div>
                                    <div className="col-span-1 flex items-end">
                                        <button type="button" onClick={() => removeLineItem(index)} disabled={lineItems.length === 1} className="w-full p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded disabled:opacity-50 ...">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                {/* ... Modal Footer and Submit Button ... */}
            </form>
        </div>
    );
};

export default AddWorkOrderModal;