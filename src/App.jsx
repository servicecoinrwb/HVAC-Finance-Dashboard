import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Wrench, Calendar as CalendarIcon, MapPin, Building, Search, Filter, X, ChevronDown, Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, XCircle, User, MessageSquare, PlusCircle, Briefcase, Users, ArrowLeft, Edit, Mail, Phone, Trash2, Map, Printer, BarChart2, Award, Download, FileText, RefreshCw, DollarSign, Home } from 'lucide-react';


// ========= IMPORT ALL COMPONENTS FROM BOTH APPS =========
import Auth from './components/Auth';

// --- Financial Components ---
import TaxManagement from './components/TaxManagement';
import { StatCard } from './components/StatCard';
import { ItemFormModal } from './components/ItemFormModal';
import { InvoiceManagement } from './components/InvoiceManagement';
import VehicleManagement from './components/VehicleManagement';
import ValuationCalculator from './components/ValuationCalculator';
import { InventoryManagement } from './components/InventoryManagement';
import { ReportsSection } from './components/ReportsSection';
import { AlertsPanel } from './components/AlertsPanel';
import { ActivePieChart } from './components/ActivePieChart';
import { ForecastSection } from './components/Forecast';
import { JobsSection } from './components/Jobs';
import { PnLStatement } from './components/PnLStatement';
import DebtManagement from './components/DebtManagement';
import { IncomeSourcesSection } from './components/IncomeSources';
import { GoalsSection } from './components/GoalsSection';
import { WeeklyCostsSection } from './components/WeeklyCostsSection';
import IncentiveCalculator from './components/IncentiveCalculator';
import EnhancedBillsSection from './components/EnhancedBillsSection';
import { RecurringWorkSection } from './components/RecurringWorkSection';
import { CSVImportButton } from './components/CSVImportButton';

// --- Dispatch Components (You need to create these files) ---
import { DispatchHeader } from './components/DispatchHeader';
import { DashboardView } from './components/DashboardView';
import { DispatchView } from './components/DispatchView';
import { CustomerManagementView } from './components/CustomerManagementView';
import { TechnicianManagementView } from './components/TechnicianManagementView';
import { RoutePlanningView } from './components/RoutePlanningView';
import { BillingView } from './components/BillingView';
import { WorkOrderDetailModal } from './components/WorkOrderDetailModal';
import { AddWorkOrderModal } from './components/AddWorkOrderModal';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};
const appId = 'hvac-master-dashboard';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// --- Utility Functions (Combined) ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;
const excelDateToYYYYMMDD = (d) => { const date = excelToJSDate(d); return date ? date.toISOString().split('T')[0] : ''; };

const App = () => {
    // ========= UNIFIED STATE MANAGEMENT =========
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // --- Primary View Switcher ---
    const [mainView, setMainView] = useState('finance'); // 'finance' or 'dispatch'
    const [dispatchSubView, setDispatchSubView] = useState('dashboard'); // for dispatch navigation

    // --- Financial State ---
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [financialJobs, setFinancialJobs] = useState([]); // Renamed from 'jobs'
    const [tasks, setTasks] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [taxPayments, setTaxPayments] = useState([]);
    const [goals, setGoals] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [recurringWork, setRecurringWork] = useState([]);
    const [financialClients, setFinancialClients] = useState([]); // Renamed from 'clients'
    
    // --- Dispatch State ---
    const [workOrders, setWorkOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [dispatchSearchTerm, setDispatchSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);

    // --- Shared State ---
    const [activeSection, setActiveSection] = useState('dashboard'); // For financial dashboard sub-nav
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [theme, setTheme] = useState('dark');

    // ... (All your other state variables like sortConfig, csvPreview, etc.)

    // ========= DATA FETCHING (MERGED) =========
    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = {
            // Financial
            bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, jobs: setFinancialJobs, tasks: setTasks, invoices: setInvoices, taxPayments: setTaxPayments, goals: setGoals, clients: setFinancialClients, inventory: setInventory, vehicles: setVehicles, maintenanceLogs: setMaintenanceLogs, recurringWork: setRecurringWork,
            // Dispatch
            workOrders: setWorkOrders, customers: setCustomers, technicians: setTechnicians,
        };

        const unsubscribers = Object.entries(collectionsToWatch).map(([colName, setter]) => 
            onSnapshot(query(collection(db, 'artifacts', appId, 'users', userId, colName)), (snapshot) => {
                setter(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }, err => console.error(`Error fetching ${colName}:`, err))
        );
        
        return () => { unsubscribers.forEach(unsub => unsub()); };
    }, [userId]);
    
    
    // ========= EVENT HANDLERS (COMBINED) =========

    // --- Dispatch Handlers ---
    const handleUpdateOrder = (orderId, payload) => {
        const orderRef = doc(db, 'artifacts', appId, 'users', userId, 'workOrders', orderId);
        updateDoc(orderRef, payload);
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(prev => ({ ...prev, ...payload }));
        }
    };
    
    const handleAddNote = (orderId, noteText, callback) => {
        if (!noteText.trim()) return;
        const newNote = { text: noteText.trim(), timestamp: new Date().toISOString() };
        const orderRef = doc(db, 'artifacts', appId, 'users', userId, 'workOrders', orderId);
        const currentOrder = workOrders.find(o => o.id === orderId);
        const updatedNotes = [...(currentOrder.notes || []), newNote];
        updateDoc(orderRef, { notes: updatedNotes });
        callback();
    };

    const handleAddNewOrder = (newOrderData) => {
        const newId = `WO-${Date.now()}`;
        const newOrder = {
            ...newOrderData,
            "WO#": newId,
            id: newId,
            "Created Date": jsDateToExcel(new Date()),
            "Order Status": newOrderData['Schedule Date'] ? 'Scheduled' : 'Open',
            notes: [],
            technician: []
        };
        addDoc(collection(db, 'artifacts', appId, 'users', userId, 'workOrders'), newOrder);
        setIsAddingOrder(false);
    };

    // ... (Add handlers for customers, technicians, etc. that write to Firestore)


    // --- Financial Handlers ---
    // ... (Your existing handleSave, handleDelete, handleBulkDelete, etc. should work as is)
    // ... (Make sure their collectionNameMap is complete for all types)


    // ========= RENDER LOGIC =========
    const renderFinancialDashboard = () => (
        // All of your existing financial dashboard JSX goes here
        // Replace references to `jobs` with `financialJobs` and `clients` with `financialClients`
        // Example:
        <main>
             {activeSection === 'jobs' && <JobsSection jobs={financialJobs} clients={financialClients} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleEnhancedExportCSV={handleEnhancedExportCSV} />}
             {/* ... and so on for all other financial sections ... */}
        </main>
    );

    const filteredDispatchOrders = useMemo(() => workOrders.filter(order => (statusFilter === 'All' || order['Order Status'] === statusFilter) && Object.values(order).some(val => String(val).toLowerCase().includes(dispatchSearchTerm.toLowerCase()))), [workOrders, dispatchSearchTerm, statusFilter]);

    const renderDispatchDashboard = () => {
        switch(dispatchSubView) {
            case 'customers':
                return <CustomerManagementView customers={customers} />; // Add handlers
            case 'dispatch':
                return <DispatchView workOrders={workOrders} technicians={technicians} onSelectOrder={setSelectedOrder} onUpdateOrder={handleUpdateOrder} />;
            case 'technicians':
                return <TechnicianManagementView technicians={technicians} />; // Add handlers
            case 'route':
                return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'billing':
                return <BillingView invoices={invoices} quotes={[]} />; // Integrate quotes
            case 'reporting':
                return <div>Reporting View Placeholder</div>; // Add reporting component
            case 'dashboard':
            default:
                return <DashboardView orders={filteredDispatchOrders} onSelectOrder={setSelectedOrder} searchTerm={dispatchSearchTerm} setSearchTerm={setDispatchSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!userId) return <Auth />;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Main App Navigation */}
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Wrench className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-800">HVAC Business Suite</h1>
                        </div>
                        <div className="flex items-center gap-2">
                             <button onClick={() => setMainView('finance')} className={`font-semibold py-2 px-4 rounded-lg flex items-center gap-2 ${mainView === 'finance' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                                <DollarSign size={20} /> Finance
                            </button>
                            <button onClick={() => setMainView('dispatch')} className={`font-semibold py-2 px-4 rounded-lg flex items-center gap-2 ${mainView === 'dispatch' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                                <CalendarIcon size={20} /> Dispatch
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conditional Rendering of Dashboards */}
            {mainView === 'dispatch' && (
                <>
                    <DispatchHeader currentView={dispatchSubView} setCurrentView={setDispatchSubView} onAddOrderClick={() => setIsAddingOrder(true)} />
                    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {renderDispatchDashboard()}
                    </main>
                    {selectedOrder && <WorkOrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={handleUpdateOrder} onAddNote={handleAddNote} technicians={technicians} />}
                    {isAddingOrder && <AddWorkOrderModal customers={customers} onAddOrder={handleAddNewOrder} onClose={() => setIsAddingOrder(false)} />}
                </>
            )}

            {mainView === 'finance' && (
                 <div className={`${theme} bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white`}>
                    {/* Reuse your existing financial app's layout and navigation here */}
                    {/* For simplicity, I'm pasting a simplified version. Adapt as needed. */}
                     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        <nav className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
                            {/* Your financial nav buttons: Dashboard, Reports, Invoices, Jobs, etc. */}
                             <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm ...`}>Dashboard</button>
                             <button onClick={() => setActiveSection('reports')} className={`px-4 py-3 text-sm ...`}>Reports</button>
                             {/* ... all other financial nav buttons */}
                        </nav>
                        {renderFinancialDashboard()}
                     </div>
                 </div>
            )}
        </div>
    );
};

export default App;