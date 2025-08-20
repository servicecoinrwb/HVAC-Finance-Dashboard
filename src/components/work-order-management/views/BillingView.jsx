import React, { useState, useMemo, useEffect } from 'react';
import { FileText, PlusCircle, ChevronDown, CheckCircle, XCircle, Printer, Trash2, Edit2, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { STATUS } from '../utils/constants';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import * as api from '../services/firestore';

// --- MODALS ---

const CreateInvoiceModal = ({ onClose }) => {
    const { workOrders, customers, handlers } = useWorkOrderContext();
    const [selectedWoId, setSelectedWoId] = useState('');
    const [lineItems, setLineItems] = useState([{ description: 'Service Call', quantity: 1, rate: 0, amount: 0 }]);

    useEffect(() => {
        const wo = (workOrders || []).find(w => w.id === selectedWoId);
        if (wo) {
            // Pre-populate with service call line item
            setLineItems([{ 
                description: `Service Call - ${wo['Job Description'] || 'General Service'}`, 
                quantity: 1, 
                rate: 150, // Default service rate
                amount: 150 
            }]);
        } else {
            setLineItems([{ description: 'Service Call', quantity: 1, rate: 0, amount: 0 }]);
        }
    }, [selectedWoId, workOrders]);

    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        items[index][field] = value;
        if (field !== 'description') {
            const quantity = parseFloat(items[index].quantity) || 0;
            const rate = parseFloat(items[index].rate) || 0;
            items[index].amount = quantity * rate;
        }
        setLineItems(items);
    };

    const addItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = () => {
        const wo = (workOrders || []).find(w => w.id === selectedWoId);
        if (!wo) return alert('Please select a work order.');
        
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const customer = (customers || []).find(c => c.name === wo.Client || c.name === wo.Company);
        
        const invoiceData = {
            workOrderId: wo.id,
            customerId: customer?.id || '',
            customerName: wo.Client || wo.Company,
            workOrderNumber: wo['WO#'],
            date: new Date().toISOString(),
            lineItems,
            subtotal,
            discount: 0,
            lateFee: 0,
            total: subtotal,
            status: STATUS.DRAFT,
        };
        
        handlers.addInvoice(invoiceData);
        onClose();
    };

    const completedWorkOrders = (workOrders || []).filter(wo => wo['Order Status'] === 'Completed');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Invoice</h2>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Select Work Order to Invoice
                        </label>
                        <select 
                            value={selectedWoId} 
                            onChange={e => setSelectedWoId(e.target.value)}
                            className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                        >
                            <option value="">-- Select Work Order --</option>
                            {completedWorkOrders.map(wo => (
                                <option key={wo.id} value={wo.id}>
                                    {wo['WO#']} - {wo.Company || wo.Client} - {wo['Job Description']}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedWoId && (
                        <div className="pt-4 border-t dark:border-slate-600">
                            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                                    <input 
                                        type="text" 
                                        placeholder="Description" 
                                        value={item.description} 
                                        onChange={e => handleItemChange(index, 'description', e.target.value)}
                                        className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Qty" 
                                        value={item.quantity} 
                                        onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                                        className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Rate" 
                                        value={item.rate} 
                                        onChange={e => handleItemChange(index, 'rate', e.target.value)}
                                        className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                    />
                                    <span className="col-span-1 text-right font-mono text-gray-800 dark:text-white">
                                        {formatCurrency(item.amount)}
                                    </span>
                                    <button 
                                        onClick={() => removeItem(index)} 
                                        className="col-span-1 text-red-500 hover:text-red-400"
                                        disabled={lineItems.length === 1}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <button 
                                onClick={addItem} 
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                + Add Item
                            </button>
                            <div className="mt-4 pt-4 border-t dark:border-slate-600 text-right">
                                <p className="text-lg font-bold text-gray-800 dark:text-white">
                                    Total: {formatCurrency(lineItems.reduce((sum, item) => sum + (item.amount || 0), 0))}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={!selectedWoId || lineItems.length === 0}
                    >
                        Create Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreateQuoteModal = ({ onClose }) => {
    const { customers, handlers } = useWorkOrderContext();
    const [customerId, setCustomerId] = useState('');
    const [lineItems, setLineItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
    
    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        items[index][field] = value;
        if (field !== 'description') {
            const quantity = parseFloat(items[index].quantity) || 0;
            const rate = parseFloat(items[index].rate) || 0;
            items[index].amount = quantity * rate;
        }
        setLineItems(items);
    };

    const addItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = () => {
        const customer = (customers || []).find(c => c.id === customerId);
        if (!customer) return alert('Please select a customer.');
        
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const quoteData = {
            customerId: customer.id,
            customerName: customer.name,
            date: new Date().toISOString(),
            lineItems,
            subtotal,
            total: subtotal,
            status: 'Draft',
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        };
        
        handlers.addQuote(quoteData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Quote</h2>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Select Customer
                        </label>
                        <select 
                            value={customerId} 
                            onChange={e => setCustomerId(e.target.value)}
                            className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                        >
                            <option value="">-- Select Customer --</option>
                            {(customers || []).map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 border-t dark:border-slate-600">
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        {lineItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                                <input 
                                    type="text" 
                                    placeholder="Description" 
                                    value={item.description} 
                                    onChange={e => handleItemChange(index, 'description', e.target.value)}
                                    className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Qty" 
                                    value={item.quantity} 
                                    onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                                    className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Rate" 
                                    value={item.rate} 
                                    onChange={e => handleItemChange(index, 'rate', e.target.value)}
                                    className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <span className="col-span-1 text-right font-mono text-gray-800 dark:text-white">
                                    {formatCurrency(item.amount)}
                                </span>
                                <button 
                                    onClick={() => removeItem(index)} 
                                    className="col-span-1 text-red-500 hover:text-red-400"
                                    disabled={lineItems.length === 1}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={addItem} 
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            + Add Item
                        </button>
                        <div className="mt-4 pt-4 border-t dark:border-slate-600 text-right">
                            <p className="text-lg font-bold text-gray-800 dark:text-white">
                                Total: {formatCurrency(lineItems.reduce((sum, item) => sum + (item.amount || 0), 0))}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSubmit}
                        className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        disabled={!customerId || lineItems.length === 0}
                    >
                        Create Quote
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditInvoiceModal = () => {
    const { editingInvoice, setEditingInvoice, db, userId, handlers } = useWorkOrderContext();
    const [lineItems, setLineItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [lateFee, setLateFee] = useState(0);

    useEffect(() => {
        if (editingInvoice) {
            setLineItems(editingInvoice.lineItems || [{ description: '', quantity: 1, rate: 0, amount: 0 }]);
            setDiscount(editingInvoice.discount || 0);
            setLateFee(editingInvoice.lateFee || 0);
        }
    }, [editingInvoice]);

    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        items[index][field] = value;
        if (field !== 'description') {
            const quantity = parseFloat(items[index].quantity) || 0;
            const rate = parseFloat(items[index].rate) || 0;
            items[index].amount = quantity * rate;
        }
        setLineItems(items);
    };

    const addItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSave = async () => {
        try {
            await api.updateInvoiceItems(db, userId, editingInvoice.id, lineItems, discount, lateFee);
            // Refresh the invoice data in the context
            if (handlers.refreshInvoices) {
                handlers.refreshInvoices();
            }
            setEditingInvoice(null);
        } catch (error) {
            console.error('Error updating invoice:', error);
            alert('Failed to update invoice. Please try again.');
        }
    };

    if (!editingInvoice) return null;

    const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const total = subtotal - discount + lateFee;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Edit Invoice #{editingInvoice.id}
                    </h2>
                    <button 
                        onClick={() => setEditingInvoice(null)} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XCircle size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Customer: <span className="font-semibold text-gray-800 dark:text-white">{editingInvoice.customerName}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: <span className="font-semibold text-gray-800 dark:text-white">{new Date(editingInvoice.date).toLocaleDateString()}</span>
                        </p>
                        {editingInvoice.workOrderNumber && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Work Order: <span className="font-semibold text-gray-800 dark:text-white">{editingInvoice.workOrderNumber}</span>
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        {lineItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                                <input 
                                    type="text" 
                                    placeholder="Description" 
                                    value={item.description} 
                                    onChange={e => handleItemChange(index, 'description', e.target.value)}
                                    className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Qty" 
                                    value={item.quantity} 
                                    onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                                    className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Rate" 
                                    value={item.rate} 
                                    onChange={e => handleItemChange(index, 'rate', e.target.value)}
                                    className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <span className="col-span-1 text-right font-mono text-gray-800 dark:text-white">
                                    {formatCurrency(item.amount)}
                                </span>
                                <button 
                                    onClick={() => removeItem(index)} 
                                    className="col-span-1 text-red-500 hover:text-red-400"
                                    disabled={lineItems.length === 1}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={addItem} 
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            + Add Item
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-slate-600">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                                Discount ($)
                            </label>
                            <input 
                                type="number" 
                                value={discount} 
                                onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                                Late Fee ($)
                            </label>
                            <input 
                                type="number" 
                                value={lateFee} 
                                onChange={e => setLateFee(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                        <div className="text-right space-y-1">
                            <p className="text-gray-600 dark:text-gray-400">
                                Subtotal: <span className="font-mono">{formatCurrency(subtotal)}</span>
                            </p>
                            {discount > 0 && (
                                <p className="text-green-600">
                                    Discount: <span className="font-mono">-{formatCurrency(discount)}</span>
                                </p>
                            )}
                            {lateFee > 0 && (
                                <p className="text-red-600">
                                    Late Fee: <span className="font-mono">+{formatCurrency(lateFee)}</span>
                                </p>
                            )}
                            <p className="text-lg font-bold text-gray-800 dark:text-white">
                                Total: <span className="font-mono">{formatCurrency(total)}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-between items-center">
                    <button 
                        onClick={() => api.generateInvoicePdf(editingInvoice)} 
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                        <Printer size={16} /> View as PDF
                    </button>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setEditingInvoice(null)}
                            className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditQuoteModal = () => {
    const { editingQuote, setEditingQuote, db, userId, handlers } = useWorkOrderContext();
    const [lineItems, setLineItems] = useState([]);

    useEffect(() => {
        if (editingQuote) {
            setLineItems(editingQuote.lineItems || [{ description: '', quantity: 1, rate: 0, amount: 0 }]);
        }
    }, [editingQuote]);

    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        items[index][field] = value;
        if (field !== 'description') {
            const quantity = parseFloat(items[index].quantity) || 0;
            const rate = parseFloat(items[index].rate) || 0;
            items[index].amount = quantity * rate;
        }
        setLineItems(items);
    };

    const addItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSave = async () => {
        try {
            const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
            const updatedQuote = { 
                ...editingQuote, 
                lineItems, 
                subtotal, 
                total: subtotal 
            };
            
            await api.updateQuote(db, userId, editingQuote.id, updatedQuote);
            
            // Refresh the quote data in the context
            if (handlers.refreshQuotes) {
                handlers.refreshQuotes();
            }
            setEditingQuote(null);
        } catch (error) {
            console.error('Error updating quote:', error);
            alert('Failed to update quote. Please try again.');
        }
    };

    const convertToInvoice = () => {
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const invoiceData = {
            customerId: editingQuote.customerId,
            customerName: editingQuote.customerName,
            date: new Date().toISOString(),
            lineItems,
            subtotal,
            discount: 0,
            lateFee: 0,
            total: subtotal,
            status: STATUS.DRAFT,
            convertedFromQuote: editingQuote.id,
        };
        
        handlers.addInvoice(invoiceData);
        setEditingQuote(null);
    };

    if (!editingQuote) return null;

    const total = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Edit Quote #{editingQuote.id}
                    </h2>
                    <button 
                        onClick={() => setEditingQuote(null)} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XCircle size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Customer: <span className="font-semibold text-gray-800 dark:text-white">{editingQuote.customerName}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: <span className="font-semibold text-gray-800 dark:text-white">{new Date(editingQuote.date).toLocaleDateString()}</span>
                        </p>
                        {editingQuote.validUntil && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Valid Until: <span className="font-semibold text-gray-800 dark:text-white">{new Date(editingQuote.validUntil).toLocaleDateString()}</span>
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        {lineItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                                <input 
                                    type="text" 
                                    placeholder="Description" 
                                    value={item.description} 
                                    onChange={e => handleItemChange(index, 'description', e.target.value)}
                                    className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Qty" 
                                    value={item.quantity} 
                                    onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                                    className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Rate" 
                                    value={item.rate} 
                                    onChange={e => handleItemChange(index, 'rate', e.target.value)}
                                    className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white" 
                                />
                                <span className="col-span-1 text-right font-mono text-gray-800 dark:text-white">
                                    {formatCurrency(item.amount)}
                                </span>
                                <button 
                                    onClick={() => removeItem(index)} 
                                    className="col-span-1 text-red-500 hover:text-red-400"
                                    disabled={lineItems.length === 1}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={addItem} 
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            + Add Item
                        </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                        <div className="text-right">
                            <p className="text-lg font-bold text-gray-800 dark:text-white">
                                Total: <span className="font-mono">{formatCurrency(total)}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-between items-center">
                    <div className="flex gap-3">
                        <button 
                            onClick={() => api.generateQuotePdf(editingQuote)} 
                            className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        >
                            <Printer size={16} /> View as PDF
                        </button>
                        <button 
                            onClick={convertToInvoice}
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 text-sm"
                        >
                            <FileText size={16} /> Convert to Invoice
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setEditingQuote(null)}
                            className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BillingView = () => {
    const { 
        invoices, 
        quotes, 
        workOrders, 
        customers, 
        handlers, 
        setEditingInvoice, 
        setEditingQuote 
    } = useWorkOrderContext();
    
    const [activeTab, setActiveTab] = useState('invoices');
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showCreateQuote, setShowCreateQuote] = useState(false);
    const [expandedRows, setExpandedRows] = useState(new Set());

    const financialSummary = useMemo(() => {
        const safeInvoices = invoices || [];
        const totalInvoiceAmount = safeInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const paidInvoices = safeInvoices.filter(inv => inv.status === STATUS.PAID);
        const unpaidInvoices = safeInvoices.filter(inv => inv.status !== STATUS.PAID);
        const totalPaidAmount = paidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const totalUnpaidAmount = unpaidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        
        const safeQuotes = quotes || [];
        const totalQuoteAmount = safeQuotes.reduce((sum, quote) => sum + (quote.total || 0), 0);
        const pendingQuotes = safeQuotes.filter(quote => quote.status === 'Draft' || quote.status === 'Pending');
        
        return { 
            totalInvoiceAmount, 
            paidInvoicesCount: paidInvoices.length, 
            unpaidInvoicesCount: unpaidInvoices.length, 
            totalPaidAmount, 
            totalUnpaidAmount,
            totalQuoteAmount,
            pendingQuotesCount: pendingQuotes.length
        };
    }, [invoices, quotes]);

    const toggleRowExpansion = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    const getStatusStyles = (status) => {
        const styles = {
            [STATUS.PAID]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
            [STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
            [STATUS.OVERDUE]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
            [STATUS.DRAFT]: 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200',
            'Draft': 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200',
            'Approved': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
            'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
        };
        return styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200';
    };

    if (!invoices || !quotes || !workOrders || !customers) {
        return (
            <div className="p-6 text-center">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto"></div>
                    <div className="mt-2 h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6 mx-auto"></div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading billing data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header and Summary */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Billing & Invoicing</h3>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowCreateInvoice(true)} 
                            className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FileText size={20} /> Create Invoice
                        </button>
                        <button 
                            onClick={() => setShowCreateQuote(true)} 
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <PlusCircle size={20} /> Create Quote
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoiced</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                            {formatCurrency(financialSummary.totalInvoiceAmount)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(invoices || []).length} invoices
                        </p>
                    </div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Collected</h4>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(financialSummary.totalPaidAmount)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {financialSummary.paidInvoicesCount} paid
                        </p>
                    </div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</h4>
                        <p className="text-2xl font-bold text-red-600">
                            {formatCurrency(financialSummary.totalUnpaidAmount)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {financialSummary.unpaidInvoicesCount} unpaid
                        </p>
                    </div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Quotes Pending</h4>
                        <p className="text-2xl font-bold text-blue-600">
                            {formatCurrency(financialSummary.totalQuoteAmount)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {financialSummary.pendingQuotesCount} pending
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs and Content */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="border-b dark:border-slate-700">
                    <nav className="-mb-px flex gap-6 px-6">
                        <button 
                            onClick={() => setActiveTab('invoices')} 
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'invoices' 
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            Invoices ({(invoices || []).length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('quotes')} 
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'quotes' 
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            Quotes ({(quotes || []).length})
                        </button>
                    </nav>
                </div>
                
                <div className="p-6">
                    {activeTab === 'invoices' && (
                        <div className="overflow-x-auto">
                            {(invoices || []).length === 0 ? (
                                <div className="text-center py-8">
                                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">No invoices found</p>
                                    <button 
                                        onClick={() => setShowCreateInvoice(true)}
                                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                                    >
                                        Create Your First Invoice
                                    </button>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="p-3">Invoice ID</th>
                                            <th scope="col" className="p-3">Customer</th>
                                            <th scope="col" className="p-3">Date</th>
                                            <th scope="col" className="p-3">Items</th>
                                            <th scope="col" className="p-3">Total</th>
                                            <th scope="col" className="p-3">Status</th>
                                            <th scope="col" className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map(invoice => (
                                            <React.Fragment key={invoice.id}>
                                                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                    <td className="p-3 font-medium text-gray-900 dark:text-white">
                                                        #{invoice.id}
                                                    </td>
                                                    <td className="p-3">{invoice.customerName}</td>
                                                    <td className="p-3">{new Date(invoice.date).toLocaleDateString()}</td>
                                                    <td className="p-3">
                                                        <button 
                                                            onClick={() => toggleRowExpansion(invoice.id)} 
                                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-500"
                                                        >
                                                            {invoice.lineItems?.length || 0} items 
                                                            <ChevronDown 
                                                                size={14} 
                                                                className={`transition-transform ${
                                                                    expandedRows.has(invoice.id) ? 'rotate-180' : ''
                                                                }`} 
                                                            />
                                                        </button>
                                                    </td>
                                                    <td className="p-3 font-mono font-semibold">
                                                        {formatCurrency(invoice.total)}
                                                    </td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(invoice.status)}`}>
                                                            {invoice.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-3">
                                                            <button 
                                                                onClick={() => api.generateInvoicePdf(invoice)} 
                                                                className="flex items-center gap-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                                                                title="View PDF"
                                                            >
                                                                <Printer size={16} />
                                                            </button>
                                                            {invoice.status !== STATUS.PAID ? (
                                                                <button 
                                                                    onClick={() => handlers.markInvoicePaid(invoice.id, true)} 
                                                                    className="flex items-center gap-1 text-green-600 hover:text-green-500 text-xs"
                                                                >
                                                                    <CheckCircle size={16} /> Mark Paid
                                                                </button>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => handlers.markInvoicePaid(invoice.id, false)} 
                                                                    className="flex items-center gap-1 text-orange-600 hover:text-orange-500 text-xs"
                                                                >
                                                                    <XCircle size={16} /> Mark Unpaid
                                                                </button>
                                                            )}
                                                            <button 
                                                                onClick={() => setEditingInvoice(invoice)} 
                                                                className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-500 text-xs"
                                                            >
                                                                <Edit2 size={16} /> Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedRows.has(invoice.id) && (
                                                    <tr className="bg-gray-50 dark:bg-slate-900/50">
                                                        <td colSpan="7" className="p-4">
                                                            <h4 className="font-bold mb-2 text-gray-800 dark:text-white">Invoice Details:</h4>
                                                            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                                                {(invoice.lineItems || []).map((item, i) => (
                                                                    <li key={i}>
                                                                        {item.quantity}x {item.description} @ {formatCurrency(item.rate)} = {formatCurrency(item.amount)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div className="mt-2 pt-2 border-t dark:border-slate-600 text-right text-gray-800 dark:text-white">
                                                                <p>Subtotal: {formatCurrency(invoice.subtotal)}</p>
                                                                {invoice.discount > 0 && (
                                                                    <p className="text-green-600">Discount: -{formatCurrency(invoice.discount)}</p>
                                                                )}
                                                                {invoice.lateFee > 0 && (
                                                                    <p className="text-red-600">Late Fee: +{formatCurrency(invoice.lateFee)}</p>
                                                                )}
                                                                <p className="font-bold text-lg">Total: {formatCurrency(invoice.total)}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {activeTab === 'quotes' && (
                        <div className="overflow-x-auto">
                            {(quotes || []).length === 0 ? (
                                <div className="text-center py-8">
                                    <PlusCircle size={48} className="mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">No quotes found</p>
                                    <button 
                                        onClick={() => setShowCreateQuote(true)}
                                        className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                                    >
                                        Create Your First Quote
                                    </button>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="p-3">Quote ID</th>
                                            <th scope="col" className="p-3">Customer</th>
                                            <th scope="col" className="p-3">Date</th>
                                            <th scope="col" className="p-3">Valid Until</th>
                                            <th scope="col" className="p-3">Total</th>
                                            <th scope="col" className="p-3">Status</th>
                                            <th scope="col" className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotes.map(quote => (
                                            <tr key={quote.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                <td className="p-3 font-medium text-gray-900 dark:text-white">
                                                    #{quote.id}
                                                </td>
                                                <td className="p-3">{quote.customerName}</td>
                                                <td className="p-3">{new Date(quote.date).toLocaleDateString()}</td>
                                                <td className="p-3">
                                                    {quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="p-3 font-mono font-semibold">
                                                    {formatCurrency(quote.total)}
                                                </td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(quote.status)}`}>
                                                        {quote.status}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-3">
                                                        <button 
                                                            onClick={() => api.generateQuotePdf(quote)} 
                                                            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                                                            title="View PDF"
                                                        >
                                                            <Printer size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => setEditingQuote(quote)} 
                                                            className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-500 text-xs"
                                                        >
                                                            <Edit2 size={16} /> Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showCreateInvoice && <CreateInvoiceModal onClose={() => setShowCreateInvoice(false)} />}
            {showCreateQuote && <CreateQuoteModal onClose={() => setShowCreateQuote(false)} />}
            <EditInvoiceModal />
            <EditQuoteModal />
        </div>
    );
};

export default BillingView;