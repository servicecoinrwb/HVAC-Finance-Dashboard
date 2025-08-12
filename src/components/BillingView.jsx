import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const formatCurrency = (a) => a === null || a === undefined ? "N/A" : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a);

export const BillingView = ({ invoices, quotes }) => {
    const [activeTab, setActiveTab] = useState('invoices');
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Billing</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Create Quote</button>
            </div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                    <button onClick={() => setActiveTab('invoices')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'invoices' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Invoices</button>
                    <button onClick={() => setActiveTab('quotes')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quotes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Quotes</button>
                </nav>
            </div>
            <div className="mt-6">
                {activeTab === 'invoices' && <div>{invoices.map(inv => <div key={inv.id}>{inv.id} - {inv.customerName} - {formatCurrency(inv.amount)} - {inv.status}</div>)}</div>}
                {activeTab === 'quotes' && <div>{quotes.map(q => <div key={q.id}>{q.id} - {q.customerName} - {formatCurrency(q.amount)} - {q.status}</div>)}</div>}
            </div>
        </div>
    );
};