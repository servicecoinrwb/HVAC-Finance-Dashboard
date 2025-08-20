import React, { useState, useMemo } from 'react';
import { FileText, PlusCircle, Download, Upload, RefreshCw, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import CreateInvoiceModal from '../modals/CreateInvoiceModal';
import CreateQuoteModal from '../modals/CreateQuoteModal';
import CSVImportModal from '../modals/CSVImportModal';
import { formatCurrency } from '../utils/helpers';
import { STATUS } from '../utils/constants';

const BillingView = ({ invoices, quotes, workOrders, customers, onAddInvoice, onAddQuote, onEditInvoice, onEditQuote, onMarkInvoicePaid }) => {
    const [activeTab, setActiveTab] = useState('invoices');
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showCreateQuote, setShowCreateQuote] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importType, setImportType] = useState('invoices');
    const [expandedRows, setExpandedRows] = useState(new Set());

    const financialSummary = useMemo(() => {
        const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const paidInvoices = invoices.filter(inv => inv.status === STATUS.PAID);
        const unpaidInvoices = invoices.filter(inv => inv.status !== STATUS.PAID);
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
        [STATUS.PAID]: 'bg-green-100 text-green-800',
        [STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
        [STATUS.OVERDUE]: 'bg-red-100 text-red-800',
        [STATUS.DRAFT]: 'bg-gray-100 text-gray-800',
    }[status] || 'bg-gray-100 text-gray-800');

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Billing & Invoicing</h3>
                    <div className="flex gap-3">
                        <button onClick={() => setShowCreateInvoice(true)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"><FileText size={20} /> Create Invoice</button>
                        <button onClick={() => setShowCreateQuote(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Create Quote</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border rounded-lg text-center"><h4 className="text-sm font-medium">Total Invoiced</h4><p className="text-2xl font-bold">{formatCurrency(financialSummary.totalInvoiceAmount)}</p></div>
                    <div className="p-4 border rounded-lg text-center"><h4 className="text-sm font-medium">Collected</h4><p className="text-2xl font-bold text-green-600">{formatCurrency(financialSummary.totalPaidAmount)}</p></div>
                    <div className="p-4 border rounded-lg text-center"><h4 className="text-sm font-medium">Outstanding</h4><p className="text-2xl font-bold text-red-600">{formatCurrency(financialSummary.totalUnpaidAmount)}</p></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <div className="border-b"><nav className="-mb-px flex gap-6 px-6">{/* ... Tabs ... */}</nav></div>
                <div className="p-6">
                    {activeTab === 'invoices' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>{/* ... Table Headers ... */}</thead>
                                <tbody>
                                    {invoices.map(invoice => (
                                        <React.Fragment key={invoice.id}>
                                            <tr>
                                                <td>{invoice.id}</td>
                                                <td>{invoice.customerName}</td>
                                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                                <td><button onClick={() => toggleRowExpansion(invoice.id)}>{invoice.lineItems?.length || 0} items <ChevronDown /></button></td>
                                                <td>{formatCurrency(invoice.total)}</td>
                                                <td><span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(invoice.status)}`}>{invoice.status}</span></td>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        {invoice.status !== STATUS.PAID ? (
                                                            <button onClick={() => onMarkInvoicePaid(invoice.id, true)} className="flex items-center gap-1 text-green-600"><CheckCircle size={16} /> Mark Paid</button>
                                                        ) : (
                                                            <button onClick={() => onMarkInvoicePaid(invoice.id, false)} className="flex items-center gap-1 text-orange-600"><XCircle size={16} /> Mark Unpaid</button>
                                                        )}
                                                        <button onClick={() => onEditInvoice(invoice)}>Edit</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedRows.has(invoice.id) && (<tr><td colSpan="7">{/* ... expanded view ... */}</td></tr>)}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {showCreateInvoice && <CreateInvoiceModal workOrders={workOrders} customers={customers} onClose={() => setShowCreateInvoice(false)} onAddInvoice={onAddInvoice} />}
            {showCreateQuote && <CreateQuoteModal customers={customers} onClose={() => setShowCreateQuote(false)} onAddQuote={onAddQuote} />}
        </div>
    );
};

export default BillingView;