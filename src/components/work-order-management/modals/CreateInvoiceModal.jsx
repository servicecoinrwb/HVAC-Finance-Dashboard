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
    // THIS LINE WAS LIKELY MISSING: It defines the 'selectedOrder' variable.
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
                    {/* The full JSX for the form goes here */}
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">
                        Create Invoice
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateInvoiceModal;