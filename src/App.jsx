import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Wrench, Calendar as CalendarIcon, MapPin, Building, Search, Filter, X, ChevronDown, Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, XCircle, User, MessageSquare, PlusCircle, Briefcase, Users, ArrowLeft, Edit, Mail, Phone, Trash2, Map, Printer, BarChart2, Award, Download, FileText, RefreshCw, DollarSign, Home } from 'lucide-react';

// Import Components
import Auth from './components/Auth';
import TaxManagement from './components/TaxManagement';
import { StatCard } from './components/StatCard';
import { ItemFormModal } from './components/ItemFormModal';
import { InvoiceManagement } from './components/InvoiceManagement';
import { ClientManagement } from './components/ClientManagement';
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

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- Utility Functions ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;

const App = () => {
    // --- Unified State ---
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mainView, setMainView] = useState('finance');
    const [dispatchSubView, setDispatchSubView] = useState('dashboard');
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [financialJobs, setFinancialJobs] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [taxPayments, setTaxPayments] = useState([]);
    const [goals, setGoals] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [recurringWork, setRecurringWork] = useState([]);
    const [financialClients, setFinancialClients] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [dispatchSearchTerm, setDispatchSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [theme, setTheme] = useState('dark');
    const [sortConfig, setSortConfig] = useState({ key: 'dueDay', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentBankBalance, setCurrentBankBalance] = useState(0);
    const [dateRange, setDateRange] = useState({start: new Date(), end: new Date()});
    const [reportingPeriod, setReportingPeriod] = useState('monthly');
    const [showAlerts, setShowAlerts] = useState(true);
    const [paidStatus, setPaidStatus] = useState({});

    // --- Hooks (Correct Order) ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    const selectedMonthYear = useMemo(() => dateRange.start.getFullYear() + '-' + String(dateRange.start.getMonth() + 1).padStart(2, '0'), [dateRange]);

    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = {
            bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, jobs: setFinancialJobs, tasks: setTasks, invoices: setInvoices, taxPayments: setTaxPayments, goals: setGoals, clients: setFinancialClients, inventory: setInventory, vehicles: setVehicles, maintenanceLogs: setMaintenanceLogs, recurringWork: setRecurringWork,
            workOrders: setWorkOrders, customers: setCustomers, technicians: setTechnicians,
        };
        const unsubscribers = Object.entries(collectionsToWatch).map(([colName, setter]) => 
            onSnapshot(query(collection(db, 'artifacts', appId, 'users', userId, colName)), (snapshot) => {
                setter(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }, err => console.error(`Error fetching ${colName}:`, err))
        );
        const unsubPaidStatus = onSnapshot(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', selectedMonthYear), (doc) => {
            setPaidStatus(doc.exists() ? doc.data().status : {});
        }, err => console.error("Error fetching paid status:", err));
        return () => { unsubscribers.forEach(unsub => unsub()); unsubPaidStatus(); };
    }, [userId, selectedMonthYear]);

    // --- Event Handlers ---
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
    
    const handleSave = async (itemData, file) => {
        if (!userId) return;
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs', recurring: 'recurringWork' };
        const collectionName = collectionNameMap[modalType];
        if (!collectionName) return alert("Invalid modal type for saving.");
        
        const basePath = ['artifacts', appId, 'users', userId, collectionName];
        const dataToSave = {...itemData, modifiedAt: serverTimestamp()};
        
        if (file) {
            const storageRef = ref(storage, `receipts/${userId}/${Date.now()}-${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                dataToSave.attachmentURL = await getDownloadURL(storageRef);
            } catch (error) { return alert("File upload failed."); }
        }

        try {
            if (editingItem?.id) {
                await updateDoc(doc(db, ...basePath, editingItem.id), dataToSave);
            } else {
                await addDoc(collection(db, ...basePath), {...dataToSave, createdAt: serverTimestamp()});
            }
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (error) { alert("Failed to save item."); }
    };

    const handleDelete = async (type, id) => {
        if (!userId || !window.confirm("Delete this item?")) return;
        
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs', recurring: 'recurringWork' };
        const collectionName = collectionNameMap[type];
        if (!collectionName) return alert("Invalid item type for deletion.");

        try {
            await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
        } catch (error) { alert(`Failed to delete ${type}.`); }
    };
    
    // ... other handlers like handleBulkDelete, handleSort, etc. ...

    // --- Render Logic ---
    const filteredDispatchOrders = useMemo(() => workOrders.filter(order => (statusFilter === 'All' || order['Order Status'] === statusFilter) && Object.values(order).some(val => String(val).toLowerCase().includes(dispatchSearchTerm.toLowerCase()))), [workOrders, dispatchSearchTerm, statusFilter]);
    
    const renderFinancialDashboard = () => (
        <main>
            {/* Your complete financial dashboard JSX */}
        </main>
    );

    const renderDispatchDashboard = () => {
        switch(dispatchSubView) {
            case 'customers': return <CustomerManagementView customers={customers} />;
            case 'dispatch': return <DispatchView workOrders={workOrders} technicians={technicians} onSelectOrder={setSelectedOrder} onUpdateOrder={handleUpdateOrder} />;
            case 'technicians': return <TechnicianManagementView technicians={technicians} />;
            case 'route': return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'billing': return <BillingView invoices={invoices} quotes={[]} />;
            default: return <DashboardView orders={filteredDispatchOrders} onSelectOrder={setSelectedOrder} searchTerm={dispatchSearchTerm} setSearchTerm={setDispatchSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    if (!userId) return <Auth />;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
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
                     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        {/* You would place your original financial header/nav here */}
                        {renderFinancialDashboard()}
                     </div>
                 </div>
            )}
        </div>
    );
};

export default App;