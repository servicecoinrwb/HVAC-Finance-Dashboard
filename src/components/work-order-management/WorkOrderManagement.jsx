import React, { useState, useMemo, useCallback, createContext, useContext } from 'react';
import { PlusCircle } from 'lucide-react';
import useFirestoreCollection from './hooks/useFirestoreCollection';
import * as api from './services/firestore';

// --- CORRECTED IMPORTS ---
import { DashboardView } from './views/DashboardView.jsx';
import DispatchView from './views/DispatchView.jsx';
import RoutePlanningView from './views/RoutePlanningView.jsx';
import { CustomerManagementView } from './views/CustomerManagementView.jsx';
import { TechnicianManagementView } from './views/TechnicianManagementView.jsx';
import BillingView from './views/BillingView.jsx';
import ReportingView from './views/ReportingView.jsx';
import MarginCalculatorView from './views/MarginCalculatorView.jsx';
// ✅ Corrected the modal imports to match their export types
import { AddWorkOrderModal } from './modals/AddWorkOrderModal.jsx';
import WorkOrderDetailModal from './modals/WorkOrderDetailModal.jsx';
import EditInvoiceModal from './modals/EditInvoiceModal.jsx';
import EditQuoteModal from './modals/EditQuoteModal.jsx';

// 1. Create a Context to hold all our shared data and functions
const WorkOrderContext = createContext(null);
export const useWorkOrderContext = () => useContext(WorkOrderContext);

const WorkOrderManagement = ({ userId, db, inventory }) => {
    // --- DATA FETCHING ---
    const { data: workOrders, loading: loadingOrders } = useFirestoreCollection(db, userId, 'workOrders');
    const { data: customers, loading: loadingCustomers } = useFirestoreCollection(db, userId, 'customers');
    const { data: technicians, loading: loadingTechs } = useFirestoreCollection(db, userId, 'technicians');
    const { data: invoices, loading: loadingInvoices } = useFirestoreCollection(db, userId, 'invoices');
    const { data: quotes, loading: loadingQuotes } = useFirestoreCollection(db, userId, 'quotes');

    // --- STATE MANAGEMENT ---
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [editingQuote, setEditingQuote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // --- MEMOIZED VALUES ---
    const filteredOrders = useMemo(() => (workOrders || []).filter(order => (statusFilter === 'All' || order['Order Status'] === statusFilter) && Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [workOrders, searchTerm, statusFilter]);
    
    // 2. Wrap all handlers in useCallback for performance
    const handlers = useMemo(() => ({
        updateOrder: (id, payload) => api.updateWorkOrder(db, userId, id, payload),
        addNote: (id, text, cb) => api.addNoteToWorkOrder(db, userId, id, text).then(cb),
        addNewOrder: (data) => api.addWorkOrder(db, userId, data).then(() => setIsAddingOrder(false)),
        addCustomer: (data) => api.addCustomer(db, userId, data),
        updateCustomer: (customer) => api.updateCustomer(db, userId, customer.id, customer),
        deleteCustomer: (id) => api.deleteCustomer(db, userId, id),
        addTechnician: (data) => api.addTechnician(db, userId, data),
        updateTechnician: (tech) => api.updateTechnician(db, userId, tech.id, tech),
        deleteTechnician: (id) => { if (window.confirm("Are you sure?")) api.deleteTechnician(db, userId, id, workOrders); },
        addInvoice: (data) => api.addInvoice(db, userId, data),
        addQuote: (data) => api.addQuote(db, userId, data),
        updateInvoice: (invoice) => api.updateInvoice(db, userId, invoice.id, invoice),
        updateQuote: (quote) => api.updateQuote(db, userId, quote.id, quote),
        markInvoicePaid: (id, isPaid) => api.updateInvoice(db, userId, id, { status: isPaid ? 'Paid' : 'Pending', paidDate: isPaid ? new Date().toISOString() : null }),
    }), [db, userId, workOrders]);
    
    // 3. Bundle everything into a single context value object
    const contextValue = {
        workOrders, customers, technicians, invoices, quotes, inventory,
        filteredOrders, loading: loadingOrders || loadingCustomers || loadingTechs || loadingInvoices || loadingQuotes,
        currentView, setCurrentView,
        selectedOrder, setSelectedOrder,
        isAddingOrder, setIsAddingOrder,
        editingInvoice, setEditingInvoice,
        editingQuote, setEditingQuote,
        searchTerm, setSearchTerm,
        statusFilter, setStatusFilter,
        handlers,
    };

    return (
        <WorkOrderContext.Provider value={contextValue}>
            <WorkOrderUI />
        </WorkOrderContext.Provider>
    );
};

// This new component handles just the UI, getting all its data from the context.
const WorkOrderUI = () => {
    const {
        loading, currentView, setCurrentView,
        selectedOrder, isAddingOrder, editingInvoice, editingQuote, setIsAddingOrder
    } = useWorkOrderContext();

    const navButtons = useMemo(() => [
        { key: 'dashboard', label: 'Dashboard' }, { key: 'dispatch', label: 'Dispatch Board' },
        { key: 'route', label: 'Route Planning' }, { key: 'customers', label: 'Customers' },
        { key: 'technicians', label: 'Technicians' }, { key: 'billing', label: 'Billing' },
        { key: 'reporting', label: 'Reporting' }, { key: 'margin-calculator', label: 'Margin Calculator' },
    ], []);

    const renderContent = () => {
        if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
        switch (currentView) {
            case 'dashboard': return <DashboardView />;
            case 'dispatch': return <DispatchView />;
            case 'route': return <RoutePlanningView />;
            case 'customers': return <CustomerManagementView />;
            case 'technicians': return <TechnicianManagementView />;
            case 'billing': return <BillingView />;
            case 'reporting': return <ReportingView />;
            case 'margin-calculator': return <MarginCalculatorView />;
            default: return <DashboardView />;
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
                                <button key={btn.key} onClick={() => setCurrentView(btn.key)} className={`px-3 py-1 text-xs rounded ${currentView === btn.key ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>
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
            
            {selectedOrder && <WorkOrderDetailModal />}
            {isAddingOrder && <AddWorkOrderModal />}
            {editingInvoice && <EditInvoiceModal />}
            {editingQuote && <EditQuoteModal />}
        </div>
    );
};

export default WorkOrderManagement;
