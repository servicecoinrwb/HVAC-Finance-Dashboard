import React, { useState, useEffect, useMemo } from 'react';
import { X, PlusCircle, Trash2, Printer, FileText, XCircle } from 'lucide-react';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import { formatCurrency } from '../utils/helpers';
import * as api from '../services/firestore';
import { generateInvoicePdf } from '../utils/pdfGenerator';
import { STATUS } from '../utils/constants.jsx';

const EditInvoiceModal = () => {
    const { editingInvoice, setEditingInvoice, db, userId, workOrders, customers } = useWorkOrderContext();
    
    const [lineItems, setLineItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [lateFee, setLateFee] = useState(0);
    const [description, setDescription] = useState('');

    const associatedWorkOrder = useMemo(() => {
        if (!editingInvoice || !workOrders) return null;
        return workOrders.find(wo => wo.id === editingInvoice.workOrderId);
    }, [editingInvoice, workOrders]);

    const serviceLocationAssets = useMemo(() => {
        if (!associatedWorkOrder || !customers) return [];
        const customer = customers.find(c => c.name === associatedWorkOrder.Client);
        const location = customer?.locations?.find(l => l.name === associatedWorkOrder.Company && l.locNum === associatedWorkOrder['Loc #']);
        return location?.assets || [];
    }, [associatedWorkOrder, customers]);

    useEffect(() => {
        if (editingInvoice) {
            setLineItems(editingInvoice.lineItems || [{ description: '', quantity: 1, rate: 0, amount: 0, asset: '' }]);
            setDiscount(editingInvoice.discount || 0);
            setLateFee(editingInvoice.lateFee || 0);
            setDescription(editingInvoice.description || associatedWorkOrder?.Task || '');
        }
    }, [editingInvoice, associatedWorkOrder]);

    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        const currentItem = items[index];
        currentItem[field] = value;
        
        const quantity = parseFloat(currentItem.quantity) || 0;
        const rate = parseFloat(currentItem.rate) || 0;
        currentItem.amount = quantity * rate;
        
        setLineItems(items);
    };

    const addItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0, asset: '' }]);
    };

    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSave = () => {
        const payload = {
            ...editingInvoice,
            lineItems,
            discount,
            lateFee,
            description
        };
        api.updateInvoice(db, userId, editingInvoice.id, payload);
        setEditingInvoice(null);
    };
    
    const handleClose = () => setEditingInvoice(null);

    if (!editingInvoice) {
        return null;
    }

    const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const total = subtotal - discount + lateFee;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Invoice #{editingInvoice.id}</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Customer: <span className="font-semibold text-gray-800 dark:text-white">{editingInvoice.customerName}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: <span className="font-semibold text-gray-800 dark:text-white">{new Date(editingInvoice.date).toLocaleDateString()}</span>
                        </p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Work Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe the work performed..."
                            className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                            rows="3"
                        ></textarea>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        <div className="space-y-2">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                    <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-5 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                                    <select value={item.asset || ''} onChange={e => handleItemChange(index, 'asset', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white">
                                        <option value="">-- No Asset --</option>
                                        {serviceLocationAssets.map(asset => <option key={asset.name} value={asset.name}>{asset.name}</option>)}
                                    </select>
                                    <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="col-span-1 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                                    <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                                    <span className="col-span-1 text-right font-mono text-gray-800 dark:text-white">{formatCurrency(item.amount)}</span>
                                    <button onClick={() => removeItem(index)} className="col-span-1 text-red-500 hover:text-red-400 disabled:opacity-50" disabled={lineItems.length === 1}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addItem} className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add Item</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t dark:border-slate-600">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Discount ($)</label>
                            <input type="number" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Late Fee ($)</label>
                            <input type="number" value={lateFee} onChange={e => setLateFee(parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg text-right">
                            <p>Subtotal: <span className="font-mono">{formatCurrency(subtotal)}</span></p>
                            <p className="font-bold text-lg">Total: <span className="font-mono">{formatCurrency(total)}</span></p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-between items-center">
                    <button onClick={() => generateInvoicePdf(editingInvoice, workOrders, customers)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        <Printer size={16} /> View as PDF
                    </button>
                    <div className="flex gap-3">
                        <button onClick={handleClose} className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300">Cancel</button>
                        <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInvoiceModal;
