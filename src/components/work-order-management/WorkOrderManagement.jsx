import React, { useState, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import useFirestoreCollection from './hooks/useFirestoreCollection';
import * as api from './services/firestore';
import { DashboardView } from './views/DashboardView.jsx';
import DispatchView from './views/DispatchView.jsx';
import { RoutePlanningView } from './views/RoutePlanningView.jsx';
import CustomerManagementView from './views/CustomerManagementView';
import TechnicianManagementView from './views/TechnicianManagementView';
import BillingView from './views/BillingView';
import ReportingView from './views/ReportingView';
import MarginCalculatorView from './views/MarginCalculatorView';
import AddWorkOrderModal from './modals/AddWorkOrderModal';
import WorkOrderDetailModal from './modals/WorkOrderDetailModal';
import EditInvoiceModal from './modals/EditInvoiceModal';
import EditQuoteModal from './modals/EditQuoteModal';

const WorkOrderManagement = ({ userId, db, inventory }) => {
    const { data: workOrders, loading: loadingOrders } = useFirestoreCollection(db, userId, 'workOrders');
    const { data: customers, loading: loadingCustomers } = useFirestoreCollection(db, userId, 'customers');
    const { data: technicians, loading: loadingTechs } = useFirestoreCollection(db, userId, 'technicians');
    const { data: invoices, loading: loadingInvoices } = useFirestoreCollection(db, userId, 'invoices');
    const { data: quotes, loading: loadingQuotes } = useFirestoreCollection(db, userId, 'quotes');

    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [editingQuote, setEditingQuote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredOrders = useMemo(() => workOrders.filter(order => (statusFilter === 'All' || order['Order Status'] === statusFilter) && Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [workOrders, searchTerm, statusFilter]);

    const handlers = {
        updateOrder: (id, payload) => api.updateWorkOrder(db, userId, id, payload),
        addNote: (id, text, cb) => api.addNoteToWorkOrder(db, userId, id, text).then(cb),
        addNewOrder: (data) => api.addWorkOrder(db, userId, data).then(() => setIsAddingOrder(false)),
        addCustomer: (data) => api.addCustomer(db, userId, data),
        updateCustomer: (customer) => api.updateCustomer(db, userId, customer.id, customer),
        addTechnician: (data) => api.addTechnician(db, userId, data),
        updateTechnician: (tech) => api.updateTechnician(db, userId, tech.id, tech),
        deleteTechnician: (id) => { if (window.confirm("Are you sure?")) api.deleteTechnician(db, userId, id, workOrders); },
        addInvoice: (data) => api.addInvoice(db, userId, data),
        addQuote: (data) => api.addQuote(db, userId, data),
        updateInvoice: (invoice) => api.updateInvoice(db, userId, invoice.id, invoice),
        updateQuote: (quote) => api.updateQuote(db, userId, quote.id, quote),
        markInvoicePaid: (id, isPaid) => api.updateInvoice(db, userId, id, { status: isPaid ? 'Paid' : 'Pending', paidDate: isPaid ? new Date().toISOString() : null }),
    };
    
    const navButtons = [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'dispatch', label: 'Dispatch Board' },
        { key: 'route', label: 'Route Planning' },
        { key: 'customers', label: 'Customers' },
        { key: 'technicians', label: 'Technicians' },
        { key: 'billing', label: 'Billing' },
        { key: 'reporting', label: 'Reporting' },
        { key: 'margin-calculator', label: 'Margin Calculator' },
    ];

    const renderContent = () => {
        if (loadingOrders || loadingCustomers || loadingTechs || loadingInvoices || loadingQuotes) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
        switch (currentView) {
            case 'dashboard': return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
            case 'dispatch': return <DispatchView workOrders={workOrders} technicians={technicians} onUpdateOrder={handlers.updateOrder} />;
            case 'route': return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'customers': return <CustomerManagementView customers={customers} onAddCustomer={handlers.addCustomer} onUpdateCustomer={handlers.updateCustomer} />;
            case 'technicians': return <TechnicianManagementView technicians={technicians} onAddTechnician={handlers.addTechnician} onUpdateTechnician={handlers.updateTechnician} onDeleteTechnician={handlers.deleteTechnician} />;
            case 'billing': return <BillingView invoices={invoices} quotes={quotes} workOrders={workOrders} customers={customers} onAddInvoice={handlers.addInvoice} onAddQuote={handlers.addQuote} onEditInvoice={setEditingInvoice} onEditQuote={setEditingQuote} onMarkInvoicePaid={handlers.markInvoicePaid} />;
            case 'reporting': return <ReportingView workOrders={workOrders} invoices={invoices} />;
            case 'margin-calculator': return <MarginCalculatorView />;
            default: return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div><h2 className="text-2xl font-bold">Work Order Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">Operational tasks module.</p></div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                            {navButtons.map(btn => (
                                <button 
                                    key={btn.key}
                                    onClick={() => setCurrentView(btn.key)} 
                                    className={`px-3 py-1 text-xs rounded ${currentView === btn.key ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setIsAddingOrder(true)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusCircle size={20} /> Add Work Order
                        </button>
                    </div>
                </div>
                {renderContent()}
            </div>
            {selectedOrder && <WorkOrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={handlers.updateOrder} onAddNote={handlers.addNote} technicians={technicians} />}
            {isAddingOrder && <AddWorkOrderModal customers={customers} inventory={inventory || []} onAddOrder={handlers.addNewOrder} onClose={() => setIsAddingOrder(false)} />}
            {editingInvoice && <EditInvoiceModal invoice={editingInvoice} onClose={() => setEditingInvoice(null)} onUpdateInvoice={handlers.updateInvoice} />}
            {editingQuote && <EditQuoteModal quote={editingQuote} onClose={() => setEditingQuote(null)} onUpdateQuote={handlers.updateQuote} />}
        </div>
    );
};

export default WorkOrderManagement;
