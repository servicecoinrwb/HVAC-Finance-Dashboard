import React, { useState, useMemo } from 'react';
import { FileText, PlusCircle, Download, Upload, RefreshCw, ChevronDown, CheckCircle, XCircle, Printer, Trash2 } from 'lucide-react';
import CreateInvoiceModal from '../modals/CreateInvoiceModal';
import CreateQuoteModal from '../modals/CreateQuoteModal';
import { formatCurrency } from '../utils/helpers';
import { STATUS } from '../utils/constants';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import * as api from '../services/firestore'; // Import the api for PDF generation

// --- UPGRADED EDIT INVOICE MODAL ---
const EditInvoiceModal = () => {
    const { editingInvoice, setEditingInvoice, handlers, db, userId } = useWorkOrderContext();
    const [lineItems, setLineItems] = useState(editingInvoice.lineItems || []);
    const [discount, setDiscount] = useState(editingInvoice.discount || 0);
    const [lateFee, setLateFee] = useState(editingInvoice.lateFee || 0);

    const handleItemChange = (index, field, value) => {
        const items = [...lineItems];
        items[index][field] = value;
        if (field !== 'description') {
            items[index].amount = (items[index].quantity || 0) * (items[index].rate || 0);
        }
        setLineItems(items);
    };
    const addItem = () => setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    const removeItem = (index) => setLineItems(lineItems.filter((_, i) => i !== index));

    const handleSave = () => {
        api.updateInvoiceItems(db, userId, editingInvoice.id, lineItems, discount, lateFee);
        setEditingInvoice(null);
    };

    if (!editingInvoice) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Invoice #{editingInvoice.id}</h2>
                    <button onClick={() => setEditingInvoice(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><XCircle /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    {/* Line Items */}
                    <div>
                        <h3 className="font-semibold mb-2">Line Items</h3>
                        {lineItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                                <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-6 p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                                <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', parseFloat(e.target.value))} className="col-span-2 p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                                <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', parseFloat(e.target.value))} className="col-span-2 p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                                <span className="col-span-1 text-right font-mono">{formatCurrency(item.amount)}</span>
                                <button onClick={() => removeItem(index)} className="col-span-1 text-red-500"><Trash2 size={18} /></button>
                            </div>
                        ))}
                        <button onClick={addItem} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add Item</button>
                    </div>
                    {/* Fees and Discounts */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-slate-600">
                        <div><label>Discount ($)</label><input type="number" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" /></div>
                        <div><label>Late Fee ($)</label><input type="number" value={lateFee} onChange={e => setLateFee(parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" /></div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-between items-center">
                    <button onClick={() => api.generateInvoicePdf(editingInvoice)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><Printer size={16} /> View as PDF</button>
                    <div>
                        <button onClick={() => setEditingInvoice(null)} className="font-bold py-2 px-4">Cancel</button>
                        <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const BillingView = () => {
    const { invoices, quotes, workOrders, customers, handlers, setEditingInvoice, setEditingQuote } = useWorkOrderContext();
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
                <div className="border-b dark:border-slate-700"><nav className="-mb-px flex gap-6 px-6">{/* ... Tabs ... */}</nav></div>
                <div className="p-6">
                    {activeTab === 'invoices' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>{/* ... Table Headers ... */}</thead>
                                <tbody>
                                    {invoices.map(invoice => (
                                        <React.Fragment key={invoice.id}>
                                            <tr>
                                                <td className="p-3">{invoice.id}</td>
                                                <td className="p-3">{invoice.customerName}</td>
                                                <td className="p-3">{new Date(invoice.date).toLocaleDateString()}</td>
                                                <td className="p-3"><button onClick={() => toggleRowExpansion(invoice.id)} className="flex items-center gap-1">{invoice.lineItems?.length || 0} items <ChevronDown size={14} /></button></td>
                                                <td className="p-3">{formatCurrency(invoice.total)}</td>
                                                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(invoice.status)}`}>{invoice.status}</span></td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-3">
                                                        {invoice.status !== STATUS.PAID ? (
                                                            <button onClick={() => handlers.markInvoicePaid(invoice.id, true)} className="flex items-center gap-1 text-green-600 hover:text-green-500"><CheckCircle size={16} /> Mark Paid</button>
                                                        ) : (
                                                            <button onClick={() => handlers.markInvoicePaid(invoice.id, false)} className="flex items-center gap-1 text-orange-600 hover:text-orange-500"><XCircle size={16} /> Mark Unpaid</button>
                                                        )}
                                                        <button onClick={() => setEditingInvoice(invoice)} className="font-semibold text-blue-600 hover:text-blue-500">Edit</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedRows.has(invoice.id) && (<tr><td colSpan="7" className="p-4 bg-gray-50 dark:bg-slate-900/50">{/* ... expanded view ... */}</td></tr>)}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {showCreateInvoice && <CreateInvoiceModal />}
            {showCreateQuote && <CreateQuoteModal />}
        </div>
    );
};

export default BillingView;
