import React, { useState, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';

// Import services and hooks
import useFirestoreCollection from './hooks/useFirestoreCollection';
import * as api from './services/firestore';

// Import views
import DashboardView from './views/DashboardView';
import DispatchView from './views/DispatchView';
import RoutePlanningView from './views/RoutePlanningView';
import CustomerManagementView from './views/CustomerManagementView';
import TechnicianManagementView from './views/TechnicianManagementView';
import BillingView from './views/BillingView';
import ReportingView from './views/ReportingView';
import MarginCalculatorView from './views/MarginCalculatorView';

// Import modals
import AddWorkOrderModal from './modals/AddWorkOrderModal';
import WorkOrderDetailModal from './modals/WorkOrderDetailModal';
import EditInvoiceModal from './modals/EditInvoiceModal'; // <-- NEW
import EditQuoteModal from './modals/EditQuoteModal';   // <-- NEW

const WorkOrderManagement = ({ userId, db }) => {
    // --- DATA FETCHING ---
    const { data: workOrders, loading: loadingOrders } = useFirestoreCollection(db, userId, 'workOrders');
    const { data: customers, loading: loadingCustomers } = useFirestoreCollection(db, userId, 'customers');
    const { data: technicians, loading: loadingTechs } = useFirestoreCollection(db, userId, 'technicians');
    const { data: invoices, loading: loadingInvoices } = useFirestoreCollection(db, userId, 'invoices');
    const { data: quotes, loading: loadingQuotes } = useFirestoreCollection(db, userId, 'quotes');

    // --- UI STATE ---
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingInvoice, setEditingInvoice] = useState(null); // <-- NEW
    const [editingQuote, setEditingQuote] = useState(null);     // <-- NEW

    // --- MEMOIZED DATA ---
    const filteredOrders = useMemo(() =>
        workOrders.filter(order =>
            (statusFilter === 'All' || order['Order Status'] === statusFilter) &&
            Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [workOrders, searchTerm, statusFilter]
    );

    // --- HANDLER FUNCTIONS ---
    const handleUpdateOrder = (orderId, payload) => api.updateWorkOrder(db, userId, orderId, payload).catch(console.error);
    const handleAddNote = (orderId, noteText, callback) => api.addNoteToWorkOrder(db, userId, orderId, noteText).then(callback).catch(console.error);
    const handleAddNewOrder = (newOrderData) => api.addWorkOrder(db, userId, newOrderData).then(() => setIsAddingOrder(false)).catch(console.error);
    const handleAddCustomer = (customerData) => api.addCustomer(db, userId, customerData).catch(console.error);
    const handleUpdateCustomer = (customer) => api.updateCustomer(db, userId, customer.id, customer).catch(console.error);
    const handleAddTechnician = (techData) => api.addTechnician(db, userId, techData).catch(console.error);
    const handleUpdateTechnician = (tech) => api.updateTechnician(db, userId, tech.id, tech).catch(console.error);
    const handleDeleteTechnician = (techId) => { if (window.confirm("Are you sure?")) { api.deleteTechnician(db, userId, techId, workOrders).catch(console.error); }};
    const handleAddInvoice = (invoiceData) => api.addInvoice(db, userId, invoiceData).catch(console.error);
    const handleAddQuote = (quoteData) => api.addQuote(db, userId, quoteData).catch(console.error);
    const handleUpdateInvoice = (invoice) => api.updateInvoice(db, userId, invoice.id, invoice).catch(console.error);
    const handleUpdateQuote = (quote) => api.updateQuote(db, userId, quote.id, quote).catch(console.error);
    const handleMarkInvoicePaid = (invoiceId, isPaid) => {
        const payload = { status: isPaid ? 'Paid' : 'Pending', paidDate: isPaid ? new Date().toISOString() : null };
        api.updateInvoice(db, userId, invoiceId, payload).catch(console.error);
    };

    // --- RENDER LOGIC ---
    const renderContent = () => {
        const loading = loadingOrders || loadingCustomers || loadingTechs || loadingInvoices || loadingQuotes;
        if (loading) { return <div>Loading...</div>; }

        switch (currentView) {
            case 'customers': return <CustomerManagementView customers={customers} onAddCustomer={handleAddCustomer} onUpdateCustomer={handleUpdateCustomer} onAddLocation={handleUpdateCustomer} />;
            case 'dispatch': return <DispatchView workOrders={workOrders} technicians={technicians} onSelectOrder={setSelectedOrder} onUpdateOrder={handleUpdateOrder} />;
            case 'technicians': return <TechnicianManagementView technicians={technicians} onAddTechnician={handleAddTechnician} onUpdateTechnician={handleUpdateTechnician} onDeleteTechnician={handleDeleteTechnician} />;
            case 'route': return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'reporting': return <ReportingView workOrders={workOrders} technicians={technicians} />;
            case 'billing': return <BillingView invoices={invoices} quotes={quotes} workOrders={workOrders} customers={customers} onAddInvoice={handleAddInvoice} onAddQuote={handleAddQuote} onEditInvoice={setEditingInvoice} onEditQuote={setEditingQuote} onMarkInvoicePaid={handleMarkInvoicePaid} />;
            case 'margin': return <MarginCalculatorView workOrders={workOrders} />;
            case 'dashboard':
            default: return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    const navButtons = [ { view: 'dashboard', label: 'Dashboard' }, { view: 'dispatch', label: 'Dispatch' }, { view: 'route', label: 'Route' }, { view: 'customers', label: 'Customers' }, { view: 'technicians', label: 'Technicians' }, { view: 'billing', label: 'Billing' }, { view: 'reporting', label: 'Reports' }, { view: 'margin', label: 'Margin Calculator' }, ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Work Order Management</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">A self-contained module for all operational tasks.</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {navButtons.map(btn => (
                            <button key={btn.view} onClick={() => setCurrentView(btn.view)} className={`px-3 py-1 rounded text-sm font-medium ${currentView === btn.view ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300'}`}>{btn.label}</button>
                        ))}
                        <button onClick={() => setIsAddingOrder(true)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"><PlusCircle size={20} /> Add Work Order</button>
                    </div>
                </div>
                {renderContent()}
            </div>
            {/* --- MODALS --- */}
            {selectedOrder && <WorkOrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={handleUpdateOrder} onAddNote={handleAddNote} technicians={technicians} />}
            {isAddingOrder && <AddWorkOrderModal customers={customers} onAddOrder={handleAddNewOrder} onClose={() => setIsAddingOrder(false)} />}
            {editingInvoice && <EditInvoiceModal invoice={editingInvoice} onClose={() => setEditingInvoice(null)} onUpdateInvoice={handleUpdateInvoice} />}
            {editingQuote && <EditQuoteModal quote={editingQuote} onClose={() => setEditingQuote(null)} onUpdateQuote={handleUpdateQuote} />}
        </div>
    );
};

export default WorkOrderManagement;