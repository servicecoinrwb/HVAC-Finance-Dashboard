import React, { useState, useMemo } from 'react'; // <-- Import useMemo
import { FileText, PlusCircle, ... } from 'lucide-react';
import { STATUS } from '../utils/constants'; // <-- NEW: Import constants
// ... other imports

const BillingView = ({ invoices, quotes, ... }) => {
    // ... all other states and functions ...

    // --- UPDATED: Memoized Calculations ---
    const financialSummary = useMemo(() => {
        const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const paidInvoices = invoices.filter(inv => inv.status === STATUS.PAID);
        const unpaidInvoices = invoices.filter(inv => inv.status !== STATUS.PAID);
        const totalPaidAmount = paidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const totalUnpaidAmount = unpaidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
        const pendingQuotes = quotes.filter(q => q.status === STATUS.SENT || q.status === STATUS.PENDING);
        const pendingQuotesAmount = pendingQuotes.reduce((sum, q) => sum + (q.total || 0), 0);

        return {
            totalInvoiceAmount,
            paidInvoicesCount: paidInvoices.length,
            unpaidInvoicesCount: unpaidInvoices.length,
            totalPaidAmount,
            totalUnpaidAmount,
            pendingQuotesCount: pendingQuotes.length,
            pendingQuotesAmount,
        };
    }, [invoices, quotes]);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
                {/* ... Header and buttons ... */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* These now use the memoized values */}
                    <div>Total Invoices: {invoices.length} ({formatCurrency(financialSummary.totalInvoiceAmount)})</div>
                    <div>Paid Invoices: {financialSummary.paidInvoicesCount} ({formatCurrency(financialSummary.totalPaidAmount)})</div>
                    <div>Outstanding: {financialSummary.unpaidInvoicesCount} ({formatCurrency(financialSummary.totalUnpaidAmount)})</div>
                    <div>Pending Quotes: {financialSummary.pendingQuotesCount} ({formatCurrency(financialSummary.pendingQuotesAmount)})</div>
                </div>
            </div>
            {/* ... Rest of the JSX for tables and modals ... */}
        </div>
    );
};

export default BillingView;