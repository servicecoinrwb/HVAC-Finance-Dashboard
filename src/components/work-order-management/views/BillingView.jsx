import React, { useState, useMemo, useEffect } from 'react';
import { FileText, PlusCircle, ChevronDown, CheckCircle, XCircle, Printer, Edit2 } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { STATUS } from '../utils/constants';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import * as api from '../services/firestore';
import { generateInvoicePdf, generateQuotePdf } from '../utils/pdfGenerator';
import CreateInvoiceModal from '../modals/CreateInvoiceModal.jsx';
import CreateQuoteModal from '../modals/CreateQuoteModal.jsx';
import EditInvoiceModal from '../modals/EditInvoiceModal.jsx';
import EditQuoteModal from '../modals/EditQuoteModal.jsx';


const BillingView = () => {
    const { 
        invoices, 
        quotes, 
        workOrders, 
        customers, 
        handlers, 
        editingInvoice, 
        setEditingInvoice, 
        editingQuote, 
        setEditingQuote 
    } = useWorkOrderContext();
    
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
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading billing data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Billing & Invoicing</h3>
                    <div className="flex gap-3">
                        <button onClick={() => setShowCreateInvoice(true)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
                            <FileText size={20} /> Create Invoice
                        </button>
                        <button onClick={() => setShowCreateQuote(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                            <PlusCircle size={20} /> Create Quote
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoiced</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{formatCurrency(financialSummary.totalInvoiceAmount)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{(invoices || []).length} invoices</p>
                    </div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Collected</h4>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(financialSummary.totalPaidAmount)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{financialSummary.paidInvoicesCount} paid</p>
                    </div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</h4>
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(financialSummary.totalUnpaidAmount)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{financialSummary.unpaidInvoicesCount} unpaid</p>
                    </div>
                    <div className="p-4 border dark:border-slate-700 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Quotes Pending</h4>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(financialSummary.totalQuoteAmount)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{financialSummary.pendingQuotesCount} pending</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="border-b dark:border-slate-700">
                    <nav className="-mb-px flex gap-6 px-6">
                        <button onClick={() => setActiveTab('invoices')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'invoices' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                            Invoices ({(invoices || []).length})
                        </button>
                        <button onClick={() => setActiveTab('quotes')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quotes' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                            Quotes ({(quotes || []).length})
                        </button>
                    </nav>
                </div>
                
                <div className="p-6">
                    {activeTab === 'invoices' && (
                        <div className="overflow-x-auto">
                            {/* ... Invoice Table JSX ... */}
                        </div>
                    )}
                     {activeTab === 'quotes' && (
                        <div className="overflow-x-auto">
                           {/* ... Quote Table JSX ... */}
                        </div>
                    )}
                </div>
            </div>

            {showCreateInvoice && <CreateInvoiceModal onClose={() => setShowCreateInvoice(false)} />}
            {showCreateQuote && <CreateQuoteModal onClose={() => setShowCreateQuote(false)} />}
            {editingInvoice && <EditInvoiceModal />}
            {editingQuote && <EditQuoteModal />}
        </div>
    );
};

export default BillingView;
