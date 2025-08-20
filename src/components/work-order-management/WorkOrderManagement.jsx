import React, { useState, useMemo } from 'react';
import { collection, doc, getDoc, writeBatch, serverTimestamp, deleteDoc } from 'firebase/firestore';
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

// Import modals
import AddWorkOrderModal from './modals/AddWorkOrderModal';
import WorkOrderDetailModal from './modals/WorkOrderDetailModal';

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

    // --- MEMOIZED DATA ---
    const filteredOrders = useMemo(() =>
        workOrders.filter(order =>
            (statusFilter === 'All' || order['Order Status'] === statusFilter) &&
            Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [workOrders, searchTerm, statusFilter]
    );

    // --- DATA SYNCING LOGIC ---
    const syncToMainDashboard = async (workOrder, invoice = null) => { /* ... your sync logic ... */ };
    const bulkSyncExistingData = async () => { /* ... your bulk sync logic ... */ };

    // --- HANDLER FUNCTIONS ---
    const handleUpdateOrder = (orderId, payload) => {
        api.updateWorkOrder(db, userId, orderId, payload).catch(console.error);
    };
    
    const handleAddNote = (orderId, noteText, callback) => {
        api.addNoteToWorkOrder(db, userId, orderId, noteText).then(callback).catch(console.error);
    };

    const handleAddNewOrder = (newOrderData) => {
        api.addWorkOrder(db, userId, newOrderData).then(() => setIsAddingOrder(false)).catch(console.error);
    };

    const handleAddCustomer = (customerData) => api.addCustomer(db, userId, customerData).catch(console.error);
    const handleUpdateCustomer = (customer) => api.updateCustomer(db, userId, customer.id, customer).catch(console.error);
    
    // --- HANDLERS FOR TECHNICIANS (FIX) ---
    const handleAddTechnician = (techData) => api.addTechnician(db, userId, techData).catch(console.error);
    const handleUpdateTechnician = (tech) => api.updateTechnician(db, userId, tech.id, tech).catch(console.error);
    const handleDeleteTechnician = (techId) => {
        if (window.confirm("Are you sure you want to delete this technician?")) {
            api.deleteTechnician(db, userId, techId, workOrders).catch(console.error);
        }
    };

    // --- HANDLERS FOR BILLING ---
    const handleAddInvoice = (invoiceData) => api.addInvoice(db, userId, invoiceData).catch(console.error);
    const handleAddQuote = (quoteData) => api.addQuote(db, userId, quoteData).catch(console.error);
    const handleUpdateInvoice = (invoice) => api.updateInvoice(db, userId, invoice.id, invoice).catch(console.error);
    const handleUpdateQuote = (quote) => api.updateQuote(db, userId, quote.id, quote).catch(console.error);

    // --- RENDER LOGIC ---
    const renderContent = () => {
        const loading = loadingOrders || loadingCustomers || loadingTechs || loadingInvoices || loadingQuotes;
        if (loading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Loading Data...</span>
                </div>
            );
        }

        switch (currentView) {
            case 'customers':
                return <CustomerManagementView customers={customers} onAddCustomer={handleAddCustomer} onUpdateCustomer={handleUpdateCustomer} onAddLocation={handleUpdateCustomer} />;
            case 'dispatch':
                return <DispatchView workOrders={workOrders} technicians={technicians} onSelectOrder={setSelectedOrder} onUpdateOrder={handleUpdateOrder} />;
            case 'technicians':
                // Pass the actual handler functions instead of placeholders
                return <TechnicianManagementView technicians={technicians} onAddTechnician={handleAddTechnician} onUpdateTechnician={handleUpdateTechnician} onDeleteTechnician={handleDeleteTechnician} />;
            case 'route':
                return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'reporting':
                return <ReportingView workOrders={workOrders} technicians={technicians} />;
            case 'billing':
                return <BillingView invoices={invoices} quotes={quotes} workOrders={workOrders} customers={customers} onAddInvoice={handleAddInvoice} onAddQuote={handleAddQuote} onEditInvoice={handleUpdateInvoice} onEditQuote={handleUpdateQuote} />;
            case 'dashboard':
            default:
                return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    const navButtons = [ /* ... your nav buttons array ... */ ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* ... your main return JSX ... */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    {/* ... header and nav buttons ... */}
                </div>
                {renderContent()}
            </div>
            {/* --- GLOBAL MODALS --- */}
            {selectedOrder && (
                <WorkOrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdate={handleUpdateOrder}
                    onAddNote={handleAddNote}
                    technicians={technicians}
                />
            )}
            {isAddingOrder && (
                <AddWorkOrderModal
                    customers={customers}
                    onAddOrder={handleAddNewOrder}
                    onClose={() => setIsAddingOrder(false)}
                />
            )}
        </div>
    );
};

export default WorkOrderManagement;