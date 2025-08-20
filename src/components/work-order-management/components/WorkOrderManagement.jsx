import React, { useState, useMemo } from 'react';
import { collection, doc, getDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
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
// Note: We don't import modals for editing/creating invoices/quotes here
// because they are now managed within the BillingView itself.

const WorkOrderManagement = ({ userId, db }) => {
    // --- DATA FETCHING ---
    // Use our custom hook to get real-time data and loading states for each collection.
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
    // This logic stays here as it depends on the main state (searchTerm, statusFilter).
    const filteredOrders = useMemo(() =>
        workOrders.filter(order =>
            (statusFilter === 'All' || order['Order Status'] === statusFilter) &&
            Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [workOrders, searchTerm, statusFilter]
    );

    // --- DATA SYNCING LOGIC ---
    // High-level functions that orchestrate data between different modules remain here.
    const syncToMainDashboard = async (workOrder, invoice = null) => {
        // ... (Your existing syncToMainDashboard function)
    };

    const bulkSyncExistingData = async () => {
        // ... (Your existing bulkSyncExistingData function)
    };

    // --- HANDLER FUNCTIONS ---
    // These now call the abstracted functions from our firestore service file.
    const handleUpdateOrder = (orderId, payload) => {
        api.updateWorkOrder(db, userId, orderId, payload)
           .then(() => {
                if (payload['Order Status'] === 'Completed') {
                    // Re-fetch the full order to ensure all data is present for sync
                    const workOrderRef = doc(db, 'artifacts', 'workOrderManagement', 'users', userId, 'workOrders', orderId);
                    getDoc(workOrderRef).then(snap => {
                        if (snap.exists()) syncToMainDashboard({ id: orderId, ...snap.data() });
                    });
                }
           })
           .catch(console.error);
    };
    
    const handleAddNote = (orderId, noteText, callback) => {
        api.addNoteToWorkOrder(db, userId, orderId, noteText)
            .then(callback)
            .catch(console.error);
    };

    const handleAddNewOrder = (newOrderData) => {
        // ... (Your existing handleAddNewOrder logic calling the api)
        api.addWorkOrder(db, userId, newOrderData).then(() => setIsAddingOrder(false)).catch(console.error);
    };

    const handleAddCustomer = (customerData) => api.addCustomer(db, userId, customerData).catch(console.error);
    const handleUpdateCustomer = (customer) => api.updateCustomer(db, userId, customer.id, customer).catch(console.error);
    
    // Repeat this pattern for all other handlers...
    const handleAddInvoice = (invoiceData) => api.addInvoice(db, userId, invoiceData).catch(console.error);
    // ...etc for quotes, technicians...

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
                return <TechnicianManagementView technicians={technicians} onAddTechnician={/*...*/} onUpdateTechnician={/*...*/} onDeleteTechnician={/*...*/} />;
            case 'route':
                return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'reporting':
                return <ReportingView workOrders={workOrders} technicians={technicians} />;
            case 'billing':
                return <BillingView invoices={invoices} quotes={quotes} workOrders={workOrders} customers={customers} onAddInvoice={handleAddInvoice} onAddQuote={/*...*/} onEditInvoice={/*...*/} onEditQuote={/*...*/} />;
            case 'dashboard':
            default:
                return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    const navButtons = [
        { view: 'dashboard', label: 'Dashboard' },
        { view: 'dispatch', label: 'Dispatch' },
        { view: 'route', label: 'Route' },
        { view: 'customers', label: 'Customers' },
        { view: 'technicians', label: 'Technicians' },
        { view: 'billing', label: 'Billing' },
        { view: 'reporting', label: 'Reports' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Work Order Management</h2>
                        <div className="flex items-center gap-4 mt-2">
                             <p className="text-sm text-gray-600 dark:text-gray-400">
                                 Auto-syncs with financial dashboard
                             </p>
                             <button onClick={bulkSyncExistingData} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                 🔄 Bulk Sync All Data
                             </button>
                         </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {navButtons.map(btn => (
                             <button key={btn.view} onClick={() => setCurrentView(btn.view)} className={`px-3 py-1 rounded text-sm font-medium ${currentView === btn.view ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300'}`}>
                                 {btn.label}
                             </button>
                        ))}
                        <button onClick={() => setIsAddingOrder(true)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusCircle size={20} /> Add Work Order
                        </button>
                    </div>
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