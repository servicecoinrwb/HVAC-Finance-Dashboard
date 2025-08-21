import React, { useState, useMemo, useEffect } from 'react';
import { FileText, PlusCircle, ChevronDown, CheckCircle, XCircle, Printer, Trash2, HardHat, Building, Edit2, User, Mail, Phone } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { STATUS } from '../utils/constants';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import * as api from '../services/firestore';
import { generateInvoicePdf, generateQuotePdf } from '../utils/pdfGenerator';

// --- MODALS ---

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

const CreateQuoteModal = ({ onClose }) => {
    const { customers, handlers } = useWorkOrderContext();
    const [customerId, setCustomerId] = useState('');
    const [lineItems, setLineItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
    
    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        const currentItem = items[index];
        currentItem[field] = value;
        if (field !== 'description') {
            const quantity = parseFloat(currentItem.quantity) || 0;
            const rate = parseFloat(currentItem.rate) || 0;
            currentItem.amount = quantity * rate;
        }
        setLineItems(items);
    };

    const addItem = () => setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    const removeItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = () => {
        const customer = (customers || []).find(c => c.id === customerId);
        if (!customer) return alert('Please select a customer.');
        
        const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const quoteId = `QUO-${Date.now()}`;

        const quoteData = {
            id: quoteId,
            customerId: customer.id,
            customerName: customer.name,
            date: new Date().toISOString(),
            lineItems,
            subtotal,
            total: subtotal,
            status: 'Draft',
        };
        handlers.addQuote(quoteData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Quote</h2></div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Select Customer</label>
                    <select value={customerId} onChange={e => setCustomerId(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                        <option value="">-- Select Customer --</option>
                        {(customers || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <div className="pt-4 border-t dark:border-slate-600">
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Line Items</h3>
                        {lineItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                                <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-6 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" />
                                <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" />
                                <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} className="col-span-2 p-2 border rounded bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" />
                                <span className="col-span-1 text-right font-mono dark:text-gray-300">{formatCurrency(item.amount)}</span>
                                <button onClick={() => removeItem(index)} className="col-span-1 text-red-500"><Trash2 size={18} /></button>
                            </div>
                        ))}
                        <button onClick={addItem} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add Item</button>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="font-bold py-2 px-4 text-gray-700 dark:text-gray-300">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Create Quote</button>
                </div>
            </div>
        </div>
    );
};

// ... (Rest of BillingView.jsx)



const BillingView = () => {
    const { invoices, quotes, workOrders, customers, handlers, setEditingInvoice, setEditingQuote } = useWorkOrderContext();
    const [activeTab, setActiveTab] = useState('invoices');
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showCreateQuote, setShowCreateQuote] = useState(false);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [isPdfReady, setIsPdfReady] = useState(false);

    useEffect(() => {
        const checkPdfLibrary = () => {
            if (window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.autoTable) {
                setIsPdfReady(true);
            } else {
                setTimeout(checkPdfLibrary, 200);
            }
        };
        checkPdfLibrary();
    }, []);

    const financialSummary = useMemo(() => {
        const safeInvoices = invoices || [];
        const totalInvoiceAmount = safeInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const paidInvoices = safeInvoices.filter(inv => inv.status === STATUS.PAID);
        const unpaidInvoices = safeInvoices.filter(inv => inv.status !== STATUS.PAID);
        const totalPaidAmount = paidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const totalUnpaidAmount = unpaidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        return { totalInvoiceAmount, paidInvoicesCount: paidInvoices.length, unpaidInvoicesCount: unpaidInvoices.length, totalPaidAmount, totalUnpaidAmount };
    }, [invoices]);

    const toggleRowExpansion = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) newExpanded.delete(id);
        else newExpanded.add(id);
        setExpandedRows(newExpanded);
    };

    const getStatusStyles = (status) => ({
        [STATUS.PAID]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
        [STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
        [STATUS.OVERDUE]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
        [STATUS.DRAFT]: 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200',
    }[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200');

    if (!invoices || !quotes || !workOrders || !customers) {
        return <div className="p-6">Loading billing data...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Billing & Invoicing</h3>
                    <div className="flex gap-3">
                        <button onClick={() => setShowCreateInvoice(true)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"><FileText size={20} /> Create Invoice</button>
                        <button onClick={() => setShowCreateQuote(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Create Quote</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center"><h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoiced</h4><p className="text-2xl font-bold text-gray-800 dark:text-white">{formatCurrency(financialSummary.totalInvoiceAmount)}</p></div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center"><h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Collected</h4><p className="text-2xl font-bold text-green-600">{formatCurrency(financialSummary.totalPaidAmount)}</p></div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center"><h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</h4><p className="text-2xl font-bold text-red-600">{formatCurrency(financialSummary.totalUnpaidAmount)}</p></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="border-b dark:border-slate-700">
                    <nav className="-mb-px flex gap-6 px-6">
                        <button onClick={() => setActiveTab('invoices')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'invoices' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}>Invoices</button>
                        <button onClick={() => setActiveTab('quotes')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quotes' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}>Quotes</button>
                    </nav>
                </div>
                <div className="p-6">
                    {activeTab === 'invoices' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-3">Invoice ID</th><th scope="col" className="p-3">Customer</th><th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Items</th><th scope="col" className="p-3">Total</th><th scope="col" className="p-3">Status</th><th scope="col" className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map(invoice => (
                                        <React.Fragment key={invoice.id}>
                                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                                <td className="p-3 font-medium text-gray-900 dark:text-white">{invoice.id}</td>
                                                <td className="p-3">{invoice.customerName}</td>
                                                <td className="p-3">{new Date(invoice.date).toLocaleDateString()}</td>
                                                <td className="p-3"><button onClick={() => toggleRowExpansion(invoice.id)} className="flex items-center gap-1">{invoice.lineItems?.length || 0} items <ChevronDown size={14} /></button></td>
                                                <td className="p-3 font-mono">{formatCurrency(invoice.total)}</td>
                                                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(invoice.status)}`}>{invoice.status}</span></td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => generateInvoicePdf(invoice, workOrders, customers)} className="flex items-center gap-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white disabled:opacity-50" disabled={!isPdfReady}>
                                                            <Printer size={16} /> {isPdfReady ? '' : '...'}
                                                        </button>
                                                        {invoice.status !== STATUS.PAID ? (
                                                            <button onClick={() => handlers.markInvoicePaid(invoice.id, true)} className="flex items-center gap-1 text-green-600 hover:text-green-500"><CheckCircle size={16} /> Mark Paid</button>
                                                        ) : (
                                                            <button onClick={() => handlers.markInvoicePaid(invoice.id, false)} className="flex items-center gap-1 text-orange-600 hover:text-orange-500"><XCircle size={16} /> Mark Unpaid</button>
                                                        )}
                                                        <button onClick={() => setEditingInvoice(invoice)} className="font-semibold text-blue-600 hover:text-blue-500">Edit</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedRows.has(invoice.id) && (
                                                <tr className="bg-gray-50 dark:bg-slate-900/50">
                                                    <td colSpan="7" className="p-4">
                                                        <h4 className="font-bold mb-2 text-gray-800 dark:text-white">Invoice Details:</h4>
                                                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                                                            {(invoice.lineItems || []).map((item, i) => <li key={i}>{item.quantity}x {item.description} @ {formatCurrency(item.rate)} = {formatCurrency(item.amount)}</li>)}
                                                        </ul>
                                                        <div className="mt-2 pt-2 border-t dark:border-slate-600 text-right text-gray-800 dark:text-white">
                                                            <p>Subtotal: {formatCurrency(invoice.subtotal)}</p>
                                                            {invoice.discount > 0 && <p className="text-green-600">Discount: -{formatCurrency(invoice.discount)}</p>}
                                                            {invoice.lateFee > 0 && <p className="text-red-600">Late Fee: +{formatCurrency(invoice.lateFee)}</p>}
                                                            <p className="font-bold">Total: {formatCurrency(invoice.total)}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                     {activeTab === 'quotes' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-3">Quote ID</th><th scope="col" className="p-3">Customer</th><th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Total</th><th scope="col" className="p-3">Status</th><th scope="col" className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quotes.map(quote => (
                                        <tr key={quote.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                            <td className="p-3 font-medium text-gray-900 dark:text-white">{quote.id}</td>
                                            <td className="p-3">{quote.customerName}</td>
                                            <td className="p-3">{new Date(quote.date).toLocaleDateString()}</td>
                                            <td className="p-3 font-mono">{formatCurrency(quote.total)}</td>
                                            <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(quote.status)}`}>{quote.status}</span></td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => generateQuotePdf(quote, customers)} className="flex items-center gap-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white disabled:opacity-50" disabled={!isPdfReady}>
                                                        <Printer size={16} /> {isPdfReady ? '' : '...'}
                                                    </button>
                                                    <button onClick={() => setEditingQuote(quote)} className="font-semibold text-blue-600 hover:text-blue-500">Edit</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {showCreateInvoice && <CreateInvoiceModal onClose={() => setShowCreateInvoice(false)} />}
            {showCreateQuote && <CreateQuoteModal onClose={() => setShowCreateQuote(false)} />}
            {<EditInvoiceModal />}
            {<EditQuoteModal />}
        </div>
    );
};

export default BillingView;
