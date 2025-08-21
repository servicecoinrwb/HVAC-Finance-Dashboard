import React, { useState, useMemo, useEffect } from 'react';
import { X, PlusCircle, Trash2, User, Mail, Phone } from 'lucide-react';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import { formatCurrency } from '../utils/helpers';
import { STATUS } from '../utils/constants';

const CreateInvoiceModal = ({ onClose }) => {
    const { workOrders, customers, handlers } = useWorkOrderContext();
    
    const [selectedWoId, setSelectedWoId] = useState('');
    const [lineItems, setLineItems] = useState([{ description: 'Service Call', quantity: 1, rate: 150, amount: 150 }]);
    const [description, setDescription] = useState('');

    const associatedWorkOrder = useMemo(() => {
        if (!selectedWoId || !workOrders) return null;
        return workOrders.find(wo => wo.id === selectedWoId);
    }, [selectedWoId, workOrders]);

    const customerForInvoice = useMemo(() => {
        if (!associatedWorkOrder || !customers) return null;
        return customers.find(c => c.name === associatedWorkOrder.Client);
    }, [associatedWorkOrder, customers]);

    useEffect(() => {
        if (associatedWorkOrder) {
            setLineItems(associatedWorkOrder.lineItems || [{ description: `Service for WO# ${associatedWorkOrder['WO#']}`, quantity: 1, rate: 150, amount: 150 }]);
            setDescription(associatedWorkOrder.Task || '');
        } else {
            setLineItems([{ description: 'Service Call', quantity: 1, rate: 150, amount: 150 }]);
            setDescription('');
        }
    }, [associatedWorkOrder]);

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

    const handleSubmit = () => {
        if (!associatedWorkOrder) return alert('Please select a work order.');
        
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const invoiceId = `INV-${Date.now()}`;

        const invoiceData = {
            id: invoiceId,
            workOrderId: associatedWorkOrder.id,
            customerId: customerForInvoice?.id || '',
            customerName: associatedWorkOrder.Client,
            workOrderNumber: associatedWorkOrder['WO#'],
            date: new Date().toISOString(),
            lineItems,
            subtotal,
            discount: 0,
            lateFee: 0,
            total: subtotal,
            status: STATUS.DRAFT,
            description,
        };
        handlers.addInvoice(invoiceData);
        onClose();
    };
    
    const total = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);

    // Guard clause for loading state
    if (!workOrders || !customers) {
        return (
             <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">Loading Data...</div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Invoice</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X size={28} /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Select Work Order to Invoice</label>
                        <select value={selectedWoId} onChange={e => setSelectedWoId(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                            <option value="">-- Select Work Order --</option>
                            {(workOrders || []).filter(wo => wo['Order Status'] === 'Completed').map(wo => <option key={wo.id} value={wo.id}>{wo['WO#']} - {wo.Company}</option>)}
                        </select>
                    </div>

                    {associatedWorkOrder && customerForInvoice && (
                        <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-600 dark:text-gray-400">Bill To</h4>
                                <p className="text-gray-800 dark:text-white">{customerForInvoice.name}</p>
                                <p className="text-gray-600 dark:text-gray-300">{customerForInvoice.billingAddress?.street}</p>
                                <p className="text-gray-600 dark:text-gray-300">{customerForInvoice.billingAddress?.city}, {customerForInvoice.billingAddress?.state} {customerForInvoice.billingAddress?.zip}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600 dark:text-gray-400">Service Location</h4>
                                <p className="text-gray-800 dark:text-white">{associatedWorkOrder.Company} (#{associatedWorkOrder['Loc #']})</p>
                                <p className="text-gray-600 dark:text-gray-300">{associatedWorkOrder.City}, {associatedWorkOrder.State}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Work Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the work performed..." className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" rows="3"></textarea>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        <div className="space-y-2">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                    <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" />
                                    <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" />
                                    <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" />
                                    <span className="col-span-1 text-right font-mono">{formatCurrency(item.amount)}</span>
                                    <button onClick={() => removeItem(index)} className="col-span-1 text-red-500" disabled={lineItems.length === 1}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addItem} className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add Item</button>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg text-right">
                        <p className="font-bold text-lg text-gray-800 dark:text-white">Total: <span className="font-mono">{formatCurrency(total)}</span></p>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700" disabled={!selectedWoId}>Create Invoice</button>
                </div>
            </div>
        </div>
    );
};

export default CreateInvoiceModal;
