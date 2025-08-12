import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Wrench, Calendar as CalendarIcon, MapPin, Building, Search, Filter, X, ChevronDown, Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, XCircle, User, MessageSquare, PlusCircle, Briefcase, Users, ArrowLeft, Edit, Mail, Phone, Trash2, Map, Printer, BarChart2, Award, Download, FileText, RefreshCw, DollarSign, Home, Sun, Moon, ArrowDown, Banknote, Percent, Target, TrendingUp } from 'lucide-react';

// Import All Components
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
import RecurringWorkSection from './components/RecurringWorkSection';
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

    // --- Hooks ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);
    
    const selectedMonthYear = useMemo(() => {
        if (!dateRange || !dateRange.start) return '';
        return dateRange.start.getFullYear() + '-' + String(dateRange.start.getMonth() + 1).padStart(2, '0');
    }, [dateRange]);

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

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    // --- Memoized Calculations ---
    const filteredJobs = useMemo(() => {
        if (!dateRange || !dateRange.start || !dateRange.end) return [];
        return financialJobs.filter(job => {
            if (!job.date) return false;
            const jobDate = new Date(job.date);
            return jobDate >= dateRange.start && jobDate <= dateRange.end;
        });
    }, [financialJobs, dateRange]);

    const totals = useMemo(() => {
        const totalIncome = incomes.reduce((acc, i) => acc + (i.amount || 0), 0);
        const totalMonthlyBills = bills.reduce((acc, b) => acc + (b.amount || 0), 0);
        const projectedMonthlyWeekly = weeklyCosts.reduce((acc, c) => acc + (c.amount || 0), 0) * 4.33;
        const totalOutflow = totalMonthlyBills + projectedMonthlyWeekly;
        const netCashFlow = totalIncome - totalOutflow;
        const totalDebt = debts.reduce((acc, d) => acc + ((d.totalAmount || 0) - (d.paidAmount || 0)), 0);
        return { totalIncome, totalOutflow, netCashFlow, totalDebt };
    }, [bills, debts, incomes, weeklyCosts]);

    const pnlData = useMemo(() => {
        const revenue = filteredJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = filteredJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;
        return { revenue, cogs, grossProfit };
    }, [filteredJobs]);

    const expenseByCategory = useMemo(() => {
        const categories = bills.reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];
        return Object.entries(categories).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] })).sort((a, b) => b.value - a.value);
    }, [bills]);

    // --- Event Handlers ---
    const handleUpdateOrder = (orderId, payload) => { /* ... */ };
    const handleAddNote = (orderId, noteText, callback) => { /* ... */ };
    const handleAddNewOrder = (newOrderData) => { /* ... */ };
    const handleAddCustomer = (newCustomerData) => { /* ... */ };
    const handleUpdateCustomer = (updatedCustomer) => { /* ... */ };
    const handleAddLocationToCustomer = (customerId, newLocation) => { /* ... */ };
    const handleAddTechnician = (newTechData) => { /* ... */ };
    const handleUpdateTechnician = (updatedTech) => { /* ... */ };
    const handleDeleteTechnician = (techId) => { /* ... */ };
    const handleSave = async (itemData, file) => { /* ... */ };
    const handleDelete = async (type, id) => { /* ... */ };
    const handleTogglePaid = async (billId) => { /* ... */ };
    const openModal = (type, item = null) => { setModalType(type); setEditingItem(item); setIsModalOpen(true); };

    // --- Render Logic ---
    const filteredDispatchOrders = useMemo(() => workOrders.filter(order => (statusFilter === 'All' || order['Order Status'] === statusFilter) && Object.values(order).some(val => String(val).toLowerCase().includes(dispatchSearchTerm.toLowerCase()))), [workOrders, dispatchSearchTerm, statusFilter]);
    
    const renderFinancialDashboard = () => (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Business Financial Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your company's finances.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </header>
            <nav className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
                <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'dashboard' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Dashboard</button>
                <button onClick={() => setActiveSection('reports')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'reports' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Reports</button>
                <button onClick={() => setActiveSection('invoices')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'invoices' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Invoices</button>
                <button onClick={() => setActiveSection('jobs')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'jobs' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Jobs</button>
                <button onClick={() => setActiveSection('recurring')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'recurring' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Recurring</button>
                <button onClick={() => setActiveSection('clients')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'clients' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Clients</button>
                <button onClick={() => setActiveSection('vehicles')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'vehicles' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Vehicles</button>
                <button onClick={() => setActiveSection('inventory')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'inventory' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Inventory</button>
                <button onClick={() => setActiveSection('debts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'debts' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Debt</button>
                <button onClick={() => setActiveSection('incomes')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incomes' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Income</button>
                <button onClick={() => setActiveSection('weeklyCosts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'weeklyCosts' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Weekly Costs</button>
                <button onClick={() => setActiveSection('goals')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'goals' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Goals</button>
                <button onClick={() => setActiveSection('pnl')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'pnl' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>P&L</button>
                <button onClick={() => setActiveSection('forecast')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'forecast' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Forecast</button>
                <button onClick={() => setActiveSection('tax')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'tax' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Tax</button>
            </nav>
            <main>
                {activeSection === 'dashboard' && ( /* Your dashboard content JSX */ )}
                {activeSection === 'reports' && <ReportsSection clients={financialClients} jobs={financialJobs} bills={bills} inventory={inventory} />}
                {activeSection === 'invoices' && <InvoiceManagement invoices={invoices} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'jobs' && <JobsSection jobs={financialJobs} clients={financialClients} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                {activeSection === 'recurring' && <RecurringWorkSection recurringWork={recurringWork} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                {activeSection === 'clients' && <ClientManagement clients={financialClients} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'vehicles' && <VehicleManagement vehicles={vehicles} maintenanceLogs={maintenanceLogs} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'inventory' && <InventoryManagement inventory={inventory} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'debts' && <DebtManagement debts={debts} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'incomes' && <IncomeSourcesSection incomes={incomes} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'weeklyCosts' && <WeeklyCostsSection weeklyCosts={weeklyCosts} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'goals' && <GoalsSection goalsWithProgress={[]} openModal={openModal} />}
                {activeSection === 'pnl' && <PnLStatement jobs={financialJobs} bills={bills} weeklyCosts={weeklyCosts} />}
                {activeSection === 'forecast' && <ForecastSection invoices={invoices} bills={bills} weeklyCosts={weeklyCosts} />}
                {activeSection === 'tax' && <TaxManagement jobs={financialJobs} bills={bills} weeklyCosts={weeklyCosts} taxPayments={taxPayments} openModal={openModal} handleDelete={handleDelete} />}
            </main>
        </div>
    );

    const renderDispatchDashboard = () => { /* ... */ };

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    if (!userId) return <Auth />;

    return (
        <div className={theme}>
            <div className="bg-gray-50 dark:bg-slate-900 min-h-screen font-sans">
                <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-20">
                     {/* ... main header ... */}
                 </header>

                {mainView === 'dispatch' && ( /* ... dispatch view ... */ )}

                {mainView === 'finance' && renderFinancialDashboard()}
            </div>
        </div>
    );
};

export default App;