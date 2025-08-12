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
  appId: import.meta.env.VITE_APP_ID // Keep your VITE App ID here
};

const appId = 'hvac-master-dashboard'; // This is a custom identifier for your Firestore path

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Correct initialization
const db = getFirestore(app); // Correct initialization
const storage = getStorage(app); // Correct initialization

// --- Utility Functions ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;
const excelDateToYYYYMMDD = (d) => { const date = excelToJSDate(d); return date ? date.toISOString().split('T')[0] : ''; };

const App = () => {
    console.log("1. App component is rendering...");

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
    const [selectedIds, setSelectedIds] = useState([]);
    const [csvPreview, setCsvPreview] = useState({ show: false, data: [], headers: [], type: '', fileName: '' });
    const [csvMapping, setCsvMapping] = useState({});

    // In App.jsx, replace the existing data-fetching useEffect

    useEffect(() => {
        if (!userId) return;

        const collectionsToWatch = {
            bills: setBills, 
            debts: setDebts, 
            incomes: setIncomes, 
            weeklyCosts: setWeeklyCosts, 
            jobs: setFinancialJobs, 
            tasks: setTasks, 
            invoices: setInvoices, 
            taxPayments: setTaxPayments, 
            goals: setGoals, 
            clients: setFinancialClients, 
            inventory: setInventory, 
            vehicles: setVehicles, 
            maintenanceLogs: setMaintenanceLogs, 
            recurringWork: setRecurringWork,
            workOrders: setWorkOrders, 
            customers: setCustomers, 
            technicians: setTechnicians,
        };

        const unsubscribers = Object.entries(collectionsToWatch).map(([colName, setter]) => 
            onSnapshot(query(collection(db, 'artifacts', appId, 'users', userId, colName)), (snapshot) => {
                setter(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }, err => console.error(`Error fetching ${colName}:`, err))
        );

        const unsubPaidStatus = onSnapshot(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', selectedMonthYear), (doc) => {
            setPaidStatus(doc.exists() ? doc.data().status : {});
        }, err => console.error("Error fetching paid status:", err));

        return () => { 
            unsubscribers.forEach(unsub => unsub());
            unsubPaidStatus();
        };
    }, [userId, selectedMonthYear]); // The ONLY dependencies should be userId and selectedMonthYear

    // ... All other functions and hooks would go here ...
    // (This is just an example for debugging, not the full working component)

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    if (!userId) return <Auth setUserId={setUserId} />;

    return (
        <div>Your App Content</div> // Placeholder for the actual app render
    );
};
export default App;