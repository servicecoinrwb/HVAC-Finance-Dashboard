import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Trash2, Printer, FileText, XCircle } from 'lucide-react';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import { formatCurrency } from '../utils/helpers';
import * as api from '../services/firestore';
import { generateQuotePdf } from '../utils/pdfGenerator';

// ✅ Define STATUS constants locally to fix the build error.
const STATUS = {
    DRAFT: 'Draft',
    PENDING: 'Pending',
    PAID: 'Paid',
    OVERDUE: 'Overdue',
    CONVERTED: 'Converted',
};

const EditQuoteModal = () => {
    const { editingQuote, setEditingQuote, db, userId, customers, handlers } = useWorkOrderContext();
    const [lineItems, setLineItems] = useState([]);

    useEffect(() => {
        if (editingQuote) {
            setLineItems(editingQuote.lineItems || [{ description: '', quantity: 1, rate: 0, amount: 0 }]);
        }
    }, [editingQuote]);

    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        const currentItem = items[index];
        currentItem[field] = value;
        
        const quantity = parseFloat(currentItem.quantity) || 0;
        const rate = parseFloat(currentItem.rate) || 0;
        currentItem.amount = quantity * rate;
        
        setLineItems(items);
    };

    const addItem = () => setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSave = () => {
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const updatedQuote = { ...editingQuote, lineItems, subtotal, total: subtotal };
        api.updateQuote(db, userId, editingQuote.id, updatedQuote);
        setEditingQuote(null);
    };

    const convertToInvoice = () => {
        if (!editingQuote) return;
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const invoiceData = {
            id: `INV-${Date.now()}`,
            quoteId: editingQuote.id,
            customerId: editingQuote.customerId,
            customerName: editingQuote.customerName,
            date: new Date().toISOString(),
            lineItems,
            subtotal,
            discount: 0,
            lateFee: 0,
            total: subtotal,
            status: STATUS.DRAFT,
        };
        handlers.addInvoice(invoiceData);
        // Update the quote status to 'Converted'
        handlers.updateQuote({ ...editingQuote, status: STATUS.CONVERTED });
        setEditingQuote(null);
    };
    
    const handleClose = () => setEditingQuote(null);

    if (!editingQuote) return null;

    const total = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Quote #{editingQuote.id}</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Customer: <span className="font-semibold text-gray-800 dark:text-white">{editingQuote.customerName}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: <span className="font-semibold text-gray-800 dark:text-white">{new Date(editingQuote.date).toLocaleDateString()}</span>
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        <div className="space-y-2">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                    <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                                    <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                                    <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" />
                                    <span className="col-span-1 text-right font-mono text-gray-800 dark:text-white">{formatCurrency(item.amount)}</span>
                                    <button onClick={() => removeItem(index)} className="col-span-1 text-red-500 hover:text-red-400 disabled:opacity-50" disabled={lineItems.length === 1}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addItem} className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add Item</button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg text-right">
                        <p className="font-bold text-lg text-gray-800 dark:text-white">Total: <span className="font-mono">{formatCurrency(total)}</span></p>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-between items-center">
                    <button onClick={() => generateQuotePdf(editingQuote, customers)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        <Printer size={16} /> View as PDF
                    </button>
                    <div className="flex gap-3">
                        <button onClick={convertToInvoice} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 flex items-center gap-2">
                            <FileText size={16} /> Convert to Invoice
                        </button>
                        <button onClick={handleClose} className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300">Cancel</button>
                        <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuoteModal;
