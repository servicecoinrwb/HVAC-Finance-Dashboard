import React, { useState } from 'react';
import { FileText, PlusCircle, Download, Upload, RefreshCw, ChevronDown } from 'lucide-react';
import CreateInvoiceModal from '../modals/CreateInvoiceModal';
import CreateQuoteModal from '../modals/CreateQuoteModal';
import CSVImportModal from '../modals/CSVImportModal';

const BillingView = ({ invoices, quotes, workOrders, customers, onAddInvoice, onAddQuote, onEditInvoice, onEditQuote }) => {
    const [activeTab, setActiveTab] = useState('invoices');
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showCreateQuote, setShowCreateQuote] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importType, setImportType] = useState('invoices');
    const [expandedRows, setExpandedRows] = useState(new Set());
    
    const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + (inv.total || inv.amount || 0), 0);
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const unpaidInvoices = invoices.filter(inv => inv.status !== 'Paid');
    const totalQuoteAmount = quotes.reduce((sum, q) => sum + (q.total || q.amount || 0), 0);
    const pendingQuotes = quotes.filter(q => q.status === 'Sent' || q.status === 'Pending');

    const toggleRowExpansion = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    const getInvoiceStatusStyles = (status) => {
        const styles = {
            'paid': 'bg-green-100 text-green-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'overdue': 'bg-red-100 text-red-800',
            'draft': 'bg-gray-100 text-gray-800'
        };
        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const getQuoteStatusStyles = (status) => {
        const styles = {
            'sent': 'bg-blue-100 text-blue-800',
            'accepted': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'draft': 'bg-gray-100 text-gray-800'
        };
        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const exportInvoicesToCSV = () => {
        // ... (Your export logic here)
        alert('Exporting invoices...');
    };

    const exportQuotesToCSV = () => {
        // ... (Your export logic here)
        alert('Exporting quotes...');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Billing & Invoicing</h3>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowCreateInvoice(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            <FileText size={20} /> Create Invoice
                        </button>
                        <button 
                            onClick={() => setShowCreateQuote(true)}
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                        >
                            <PlusCircle size={20} /> Create Quote
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</h4>
                        <p className="text-2xl font-bold text-blue-600">{invoices.length}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(totalInvoiceAmount)}</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Invoices</h4>
                        <p className="text-2xl font-bold text-green-600">{paidInvoices.length}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(paidInvoices.reduce((sum, inv) => sum + (inv.total || inv.amount || 0), 0))}</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</h4>
                        <p className="text-2xl font-bold text-red-600">{unpaidInvoices.length}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(unpaidInvoices.reduce((sum, inv) => sum + (inv.total || inv.amount || 0), 0))}</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Quotes</h4>
                        <p className="text-2xl font-bold text-yellow-600">{pendingQuotes.length}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(pendingQuotes.reduce((sum, q) => sum + (q.total || q.amount || 0), 0))}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-slate-600">
                    <nav className="-mb-px flex gap-6 px-6">
                        <button 
                            onClick={() => setActiveTab('invoices')} 
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'invoices' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                            }`}
                        >
                            Invoices ({invoices.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('quotes')} 
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'quotes' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                            }`}
                        >
                            Quotes ({quotes.length})
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {/* Invoice Table */}
                    {activeTab === 'invoices' && (
                        <div>
                            {/* ... Invoice Table JSX ... */}
                        </div>
                    )}
                    {/* Quote Table */}
                    {activeTab === 'quotes' && (
                        <div>
                            {/* ... Quote Table JSX ... */}
                        </div>
                    )}
                </div>
            </div>
            
            {showCreateInvoice && (
                <CreateInvoiceModal 
                    workOrders={workOrders}
                    customers={customers}
                    onClose={() => setShowCreateInvoice(false)}
                    onAddInvoice={onAddInvoice}
                />
            )}
            
            {showCreateQuote && (
                <CreateQuoteModal 
                    customers={customers}
                    onClose={() => setShowCreateQuote(false)}
                    onAddQuote={onAddQuote}
                />
            )}

            {showImportModal && (
                <CSVImportModal 
                    type={importType}
                    onClose={() => setShowImportModal(false)}
                    onImport={(data) => {
                        if (importType === 'invoices') {
                            data.forEach(invoice => onAddInvoice(invoice));
                        } else if (importType === 'quotes') {
                            data.forEach(quote => onAddQuote(quote));
                        }
                    }}
                />
            )}
        </div>
    );
};

export default BillingView;