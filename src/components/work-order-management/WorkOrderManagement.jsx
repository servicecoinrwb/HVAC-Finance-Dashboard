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
import ServiceReportsView from './views/ServiceReportsView.jsx'; // ✅ Added ServiceReportsView
// ✅ Corrected the modal imports to be default
import AddWorkOrderModal from './modals/AddWorkOrderModal.jsx';
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
    const { data: serviceReports, loading: loadingReports } = useFirestoreCollection(db, userId, 'serviceReports'); // ✅ Added service reports

    // --- STATE MANAGEMENT ---
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [editingQuote, setEditingQuote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // --- ENHANCED FILTERING LOGIC ---
    const filteredOrders = useMemo(() => {
        let filtered = workOrders || [];
        
        // Status filter
        if (statusFilter && statusFilter !== 'All') {
            filtered = filtered.filter(order => order['Order Status'] === statusFilter);
        }
        
        // Search filter - now specifically searches key fields
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(order => {
                // Search in work order numbers
                const woNumber = String(order['Work Order #'] || '').toLowerCase();
                const clientWoNumber = String(order['Client WO#'] || '').toLowerCase();
                
                // Search in core fields
                const client = String(order.Client || '').toLowerCase();
                const company = String(order.Company || '').toLowerCase();
                const task = String(order.Task || '').toLowerCase();
                const locNumber = String(order['Loc #'] || '').toLowerCase();
                const priority = String(order.Priority || '').toLowerCase();
                const status = String(order['Order Status'] || '').toLowerCase();
                const notes = String(order.Notes || '').toLowerCase();
                
                // Search in technician array
                const technicianMatch = Array.isArray(order.technician) 
                    ? order.technician.some(tech => String(tech || '').toLowerCase().includes(term))
                    : String(order.technician || '').toLowerCase().includes(term);
                
                // Search in line items
                const lineItemMatch = Array.isArray(order.lineItems)
                    ? order.lineItems.some(item => 
                        String(item.description || '').toLowerCase().includes(term) ||
                        String(item.asset || '').toLowerCase().includes(term)
                    )
                    : false;
                
                // Search in serviced assets
                const assetMatch = Array.isArray(order.servicedAssets)
                    ? order.servicedAssets.some(asset => String(asset || '').toLowerCase().includes(term))
                    : false;
                
                return woNumber.includes(term) ||
                       clientWoNumber.includes(term) ||
                       client.includes(term) ||
                       company.includes(term) ||
                       task.includes(term) ||
                       locNumber.includes(term) ||
                       priority.includes(term) ||
                       status.includes(term) ||
                       notes.includes(term) ||
                       technicianMatch ||
                       lineItemMatch ||
                       assetMatch;
            });
        }
        
        return filtered;
    }, [workOrders, searchTerm, statusFilter]);
    
    // 2. Enhanced handlers with mobile access fixes and detailed error handling
    const handlers = useMemo(() => ({
        // Work Order handlers
        updateOrder: useCallback((id, payload) => {
            return api.updateWorkOrder(db, userId, id, payload);
        }, [db, userId]),
        
        addNote: useCallback((id, text, cb) => {
            return api.addNoteToWorkOrder(db, userId, id, text).then(cb);
        }, [db, userId]),
        
        addNewOrder: useCallback((data) => {
            return api.addWorkOrder(db, userId, data).then(() => setIsAddingOrder(false));
        }, [db, userId]),
        
        // Customer handlers
        addCustomer: useCallback((data) => {
            return api.addCustomer(db, userId, data);
        }, [db, userId]),
        
        updateCustomer: useCallback((customer) => {
            return api.updateCustomer(db, userId, customer.id, customer);
        }, [db, userId]),
        
        deleteCustomer: useCallback((id) => {
            return api.deleteCustomer(db, userId, id);
        }, [db, userId]),
        
        // ENHANCED: Technician handlers with mobile access support and validation
        addTechnician: useCallback(async (data) => {
            try {
                console.log('Adding technician with data:', data);
                
                // Validate mobile access requirements
                if (data.mobileAccess) {
                    if (!data.id) {
                        throw new Error('Mobile access technicians must have a Firebase UID as ID');
                    }
                    if (!data.firebaseUid) {
                        throw new Error('Mobile access technicians must have firebaseUid field');
                    }
                    if (!data.email) {
                        throw new Error('Mobile access technicians must have an email');
                    }
                    if (!data.mobileCredentials) {
                        throw new Error('Mobile access technicians must have mobileCredentials');
                    }
                    
                    console.log('Mobile access validation passed for technician:', data.name);
                    console.log('Firebase UID:', data.id);
                    console.log('Email:', data.email);
                }
                
                // Ensure non-mobile technicians have an ID
                if (!data.mobileAccess && !data.id) {
                    data.id = crypto.randomUUID();
                    console.log('Generated ID for non-mobile technician:', data.id);
                }
                
                // Add additional fields for consistency
                const technicianData = {
                    ...data,
                    createdAt: data.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    status: data.status || 'Available'
                };
                
                console.log('Saving technician to Firestore with ID:', technicianData.id);
                console.log('Full technician data:', technicianData);
                
                // Call the API to save the technician
                const result = await api.addTechnician(db, userId, technicianData);
                
                // For mobile access technicians, verify the save worked and log the expected path
                if (data.mobileAccess) {
                    console.log('✅ Mobile technician saved successfully');
                    console.log('Firebase UID used as document ID:', data.id);
                    console.log('Expected Firestore path:', 
                        `artifacts/workOrderManagement/users/${userId}/technicians/${data.id}`);
                    console.log('Mobile app should be able to find this technician at the above path');
                }
                
                return result;
                
            } catch (error) {
                console.error('❌ Error in addTechnician handler:', error);
                console.error('Error details:', {
                    message: error.message,
                    code: error.code,
                    technician: data.name,
                    mobileAccess: data.mobileAccess,
                    hasId: !!data.id
                });
                throw error;
            }
        }, [db, userId]),
        
        updateTechnician: useCallback(async (tech) => {
            try {
                const updatedTech = {
                    ...tech,
                    updatedAt: new Date().toISOString()
                };
                
                console.log('Updating technician:', updatedTech.id, updatedTech.name);
                
                if (tech.mobileAccess) {
                    console.log('Updating mobile access technician at path:', 
                        `artifacts/workOrderManagement/users/${userId}/technicians/${tech.id}`);
                }
                
                return await api.updateTechnician(db, userId, tech.id, updatedTech);
            } catch (error) {
                console.error('❌ Error updating technician:', error);
                throw error;
            }
        }, [db, userId]),
        
        deleteTechnician: useCallback((id) => {
            if (window.confirm("Are you sure? This will permanently delete the technician and may affect assigned work orders.")) {
                try {
                    console.log('Deleting technician with ID:', id);
                    return api.deleteTechnician(db, userId, id, workOrders);
                } catch (error) {
                    console.error('❌ Error deleting technician:', error);
                    throw error;
                }
            }
        }, [db, userId, workOrders]),
        
        // Billing handlers
        addInvoice: useCallback((data) => {
            return api.addInvoice(db, userId, data);
        }, [db, userId]),
        
        addQuote: useCallback((data) => {
            return api.addQuote(db, userId, data);
        }, [db, userId]),
        
        updateInvoice: useCallback((invoice) => {
            return api.updateInvoice(db, userId, invoice.id, invoice);
        }, [db, userId]),
        
        updateQuote: useCallback((quote) => {
            return api.updateQuote(db, userId, quote.id, quote);
        }, [db, userId]),
        
        markInvoicePaid: useCallback((id, isPaid) => {
            return api.updateInvoice(db, userId, id, { 
                status: isPaid ? 'Paid' : 'Pending', 
                paidDate: isPaid ? new Date().toISOString() : null 
            });
        }, [db, userId]),
        
        // Enhanced quote workflow handlers
        approveQuote: useCallback((quote) => {
            return api.updateQuote(db, userId, quote.id, { 
                ...quote, 
                status: 'Approved', 
                approvedAt: new Date().toISOString() 
            });
        }, [db, userId]),
        
        rejectQuote: useCallback((quote) => {
            return api.updateQuote(db, userId, quote.id, { 
                ...quote, 
                status: 'Rejected', 
                rejectedAt: new Date().toISOString() 
            });
        }, [db, userId]),
        
        convertQuoteToWorkOrder: useCallback(async (quote) => {
            try {
                const workOrderData = {
                    'WO#': `WO-${Date.now()}`,
                    'Client WO#': `FROM-QUOTE-${quote.id}`,
                    Client: quote.customerName,
                    Company: quote.customerName,
                    Task: `Work from Quote #${quote.id}`,
                    Category: 'General Service',
                    NTE: quote.total,
                    'Order Status': 'Open',
                    'Schedule Date': '',
                    'Created Date': new Date().toISOString(),
                    Priority: 'Regular',
                    technician: [],
                    quoteId: quote.id,
                    lineItems: quote.lineItems || [],
                    notes: [`Created from approved quote #${quote.id} on ${new Date().toLocaleDateString()}`],
                    City: quote.city || '',
                    State: quote.state || '',
                    'Loc #': quote.locationNumber || ''
                };
                
                console.log('Converting quote to work order:', quote.id);
                
                // Add the work order
                await api.addWorkOrder(db, userId, workOrderData);
                
                // Update quote status
                const updatedQuote = await api.updateQuote(db, userId, quote.id, { 
                    ...quote, 
                    status: 'Converted to Work Order',
                    convertedAt: new Date().toISOString(),
                    workOrderNumber: workOrderData['WO#']
                });
                
                console.log('✅ Quote successfully converted to work order');
                return updatedQuote;
                
            } catch (error) {
                console.error('❌ Error converting quote to work order:', error);
                throw error;
            }
        }, [db, userId])
    }), [db, userId, workOrders]);
    
    // 3. Bundle everything into a single context value object with all required data and functions
    const contextValue = useMemo(() => ({
        // Data collections
        workOrders, 
        customers, 
        technicians, 
        invoices, 
        quotes, 
        serviceReports, // ✅ Added serviceReports to context
        inventory,
        
        // Filtered and processed data
        filteredOrders,
        
        // Loading states
        loading: loadingOrders || loadingCustomers || loadingTechs || loadingInvoices || loadingQuotes || loadingReports, // ✅ Added loadingReports
        
        // UI state management
        currentView, 
        setCurrentView,
        selectedOrder, 
        setSelectedOrder,
        isAddingOrder, 
        setIsAddingOrder,
        editingInvoice, 
        setEditingInvoice,
        editingQuote, 
        setEditingQuote,
        
        // Filtering and search
        searchTerm, 
        setSearchTerm,
        statusFilter, 
        setStatusFilter,
        
        // All API handlers and business logic
        handlers,
        
        // Additional utility data
        db,
        userId
    }), [
        workOrders, customers, technicians, invoices, quotes, serviceReports, inventory,
        filteredOrders,
        loadingOrders, loadingCustomers, loadingTechs, loadingInvoices, loadingQuotes, loadingReports,
        currentView, selectedOrder, isAddingOrder, editingInvoice, editingQuote,
        searchTerm, statusFilter,
        handlers,
        db, userId
    ]);

    // Debug logging for mobile access technicians
    React.useEffect(() => {
        if (technicians && technicians.length > 0) {
            const mobileAccessTechs = technicians.filter(t => t.mobileAccess);
            if (mobileAccessTechs.length > 0) {
                console.log('📱 Technicians with mobile access:', mobileAccessTechs.length);
                mobileAccessTechs.forEach(tech => {
                    console.log(`  - ${tech.name} (ID: ${tech.id}, Email: ${tech.email})`);
                    console.log(`    Expected path: artifacts/workOrderManagement/users/${userId}/technicians/${tech.id}`);
                });
            }
        }
    }, [technicians, userId]);

    return (
        <WorkOrderContext.Provider value={contextValue}>
            <WorkOrderUI />
        </WorkOrderContext.Provider>
    );
};

// This component handles just the UI, getting all its data from the context.
const WorkOrderUI = () => {
    const {
        loading, 
        currentView, 
        setCurrentView,
        selectedOrder, 
        isAddingOrder, 
        editingInvoice, 
        editingQuote, 
        setIsAddingOrder
    } = useWorkOrderContext();

    // ✅ Updated navigation buttons to include Service Reports
    const navButtons = useMemo(() => [
        { key: 'dashboard', label: 'Dashboard' }, 
        { key: 'dispatch', label: 'Dispatch Board' },
        { key: 'route', label: 'Route Planning' }, 
        { key: 'customers', label: 'Customers' },
        { key: 'technicians', label: 'Technicians' }, 
        { key: 'billing', label: 'Billing' },
        { key: 'service-reports', label: 'Service Reports' }, // ✅ Added Service Reports tab
        { key: 'reporting', label: 'Reporting' }, 
        { key: 'margin-calculator', label: 'Margin Calculator' },
    ], []);

    const renderContent = useCallback(() => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">Loading work order data...</span>
                </div>
            );
        }

        switch (currentView) {
            case 'dashboard': 
                return <DashboardView />;
            case 'dispatch': 
                return <DispatchView />;
            case 'route': 
                return <RoutePlanningView />;
            case 'customers': 
                return <CustomerManagementView />;
            case 'technicians': 
                return <TechnicianManagementView />;
            case 'billing': 
                return <BillingView />;
            case 'service-reports': 
                return <ServiceReportsView />; // ✅ Added ServiceReportsView route
            case 'reporting': 
                return <ReportingView />;
            case 'margin-calculator': 
                return <MarginCalculatorView />;
            default: 
                return <DashboardView />;
        }
    }, [loading, currentView]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Order Management</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Operational tasks module with mobile technician support.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                            {navButtons.map(btn => (
                                <button 
                                    key={btn.key} 
                                    onClick={() => setCurrentView(btn.key)} 
                                    className={`px-3 py-1 text-xs rounded transition-colors ${
                                        currentView === btn.key 
                                            ? 'bg-cyan-600 text-white' 
                                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setIsAddingOrder(true)} 
                            className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PlusCircle size={20} /> Add Work Order
                        </button>
                    </div>
                </div>
                
                {/* Main content area */}
                <div className="min-h-[600px]">
                    {renderContent()}
                </div>
            </div>
            
            {/* Modal components */}
            {selectedOrder && <WorkOrderDetailModal />}
            {isAddingOrder && <AddWorkOrderModal />}
            {editingInvoice && <EditInvoiceModal />}
            {editingQuote && <EditQuoteModal />}
        </div>
    );
};

export default WorkOrderManagement;
