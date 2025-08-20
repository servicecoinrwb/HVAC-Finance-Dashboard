import React, { useState } from 'react';
import { X } from 'lucide-react';

// This is a simplified edit modal. You can expand it to edit line items later.
const EditInvoiceModal = ({ invoice, onClose, onUpdateInvoice }) => {
    const [status, setStatus] = useState(invoice.status || 'Pending');
    const [customerName, setCustomerName] = useState(invoice.customerName || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateInvoice({
            ...invoice,
            status,
            customerName,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Invoice {invoice.id}</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                        <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                            <option>Draft</option>
                            <option>Pending</option>
                            <option>Paid</option>
                            <option>Overdue</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditInvoiceModal;