import React, { useState } from 'react';
import { X, PlusCircle, Trash2 } from 'lucide-react';

const CreateQuoteModal = ({ customers, onClose, onAddQuote }) => {
    const [customerName, setCustomerName] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [notes, setNotes] = useState('');
    const [lineItems, setLineItems] = useState([
        { description: '', quantity: 1, rate: 0, amount: 0 }
    ]);
    const [taxRate, setTaxRate] = useState(0);

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeLineItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const updateLineItem = (index, field, value) => {
        const updated = [...lineItems];
        updated[index][field] = value;
        
        if (field === 'quantity' || field === 'rate') {
            updated[index].amount = updated[index].quantity * updated[index].rate;
        }
        
        setLineItems(updated);
    };

    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const quoteData = {
            id: `QT-${Date.now()}`,
            customerName,
            date: new Date().toISOString(),
            status: 'Draft',
            lineItems,
            subtotal,
            tax,
            total,
            validUntil: validUntil ? new Date(validUntil).toISOString() : null,
            notes
        };

        onAddQuote(quoteData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Quote</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                        <input 
                            type="text" 
                            value={customerName} 
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            required
                            placeholder="Enter customer name"
                        />
                    </div>

                    {/* Line Items Section */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Line Items</h3>
                            <button 
                                type="button" 
                                onClick={addLineItem}
                                className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                            >
                                <PlusCircle size={16} /> Add Item
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                    <div className="md:col-span-2">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Description</label>
                                        <input 
                                            type="text" 
                                            value={item.description}
                                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                            placeholder="Service description"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Quantity</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            step="1"
                                            value={item.quantity}
                                            onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Rate ($)</label>
                                        <input 
                                            type="number" 
                                            min="0"
                                            step="0.01"
                                            value={item.rate}
                                            onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Amount ($)</label>
                                        <input 
                                            type="text" 
                                            value={item.amount.toFixed(2)}
                                            readOnly
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-gray-100 dark:bg-slate-500 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button 
                                            type="button" 
                                            onClick={() => removeLineItem(index)}
                                            disabled={lineItems.length === 1}
                                            className="w-full p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tax, Dates, and Totals */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Tax Rate (%)</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    step="0.01"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Valid Until (Optional)</label>
                                <input 
                                    type="date" 
                                    value={validUntil} 
                                    onChange={(e) => setValidUntil(e.target.value)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Additional Notes</label>
                            <textarea 
                                value={notes} 
                                onChange={(e) => setNotes(e.target.value)}
                                rows="3"
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder="Any additional notes or terms..."
                            />
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
                            <div className="flex justify-end space-y-2">
                                <div className="text-right">
                                    <div className="flex justify-between w-48"><span className="text-gray-600 dark:text-gray-400">Subtotal:</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between w-48"><span className="text-gray-600 dark:text-gray-400">Tax:</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
                                    <div className="flex justify-between w-48 text-lg font-bold border-t pt-2"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">
                        Create Quote
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuoteModal;