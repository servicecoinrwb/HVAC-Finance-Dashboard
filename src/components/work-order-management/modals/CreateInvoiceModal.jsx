import React, { useState } from 'react';
import { X, PlusCircle, Trash2 } from 'lucide-react';

const CreateInvoiceModal = ({ workOrders, customers, onClose, onAddInvoice }) => {
    const [selectedWorkOrder, setSelectedWorkOrder] = useState('');
    const [customCustomer, setCustomCustomer] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [useCustomCustomer, setUseCustomCustomer] = useState(false);
    const [lineItems, setLineItems] = useState([
        { description: '', quantity: 1, rate: 0, amount: 0 }
    ]);
    const [taxRate, setTaxRate] = useState(0);

    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    const selectedOrder = completedOrders.find(wo => wo.id === selectedWorkOrder);

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
        const targetItem = updated[index];
        targetItem[field] = value;
        
        if (field === 'quantity' || field === 'rate') {
            const quantity = parseFloat(targetItem.quantity) || 0;
            const rate = parseFloat(targetItem.rate) || 0;
            targetItem.amount = quantity * rate;
        }
        
        setLineItems(updated);
    };

    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const invoiceData = {
            id: `INV-${Date.now()}`,
            workOrderId: selectedWorkOrder || null,
            customerName: useCustomCustomer ? customCustomer : (selectedOrder ? selectedOrder.Client : ''),
            date: new Date().toISOString(),
            status: 'Draft',
            lineItems,
            subtotal,
            tax,
            total,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null
        };

        onAddInvoice(invoiceData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Invoice</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <label className="flex items-center gap-2 mb-3">
                            <input
                                type="checkbox"
                                checked={useCustomCustomer}
                                onChange={(e) => setUseCustomCustomer(e.target.checked)}
                            />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Create invoice for custom customer (not from work order)</span>
                        </label>
                    </div>

                    {!useCustomCustomer ? (
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Select Completed Work Order</label>
                            <select
                                value={selectedWorkOrder}
                                onChange={(e) => setSelectedWorkOrder(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                required={!useCustomCustomer}
                            >
                                <option value="">Select a completed work order...</option>
                                {completedOrders.map(wo => (
                                    <option key={wo.id} value={wo.id}>
                                        {wo['WO#']} - {wo.Client} - {wo.Company}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                            <input
                                type="text"
                                value={customCustomer}
                                onChange={(e) => setCustomCustomer(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                required={useCustomCustomer}
                                placeholder="Enter customer name"
                            />
                        </div>
                    )}

                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Line Items</h3>
                            <button type="button" onClick={addLineItem} className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700">
                                <PlusCircle size={16} /> Add Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md