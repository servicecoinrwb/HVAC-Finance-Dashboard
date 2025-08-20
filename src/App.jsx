import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Bell, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, FileText, Home, Inbox, LogOut, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Target, Trash2, TrendingUp, Upload, User, Users, X, Car, Building, BarChart2, Sun, Moon, Percent, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Link as LinkIcon, Wrench } from 'lucide-react';

// Import Components
import Auth from './components/Auth.jsx';
import TaxManagement from './components/TaxManagement.jsx';
import CalendarSection from './components/CalendarSection.jsx';
import { StatCard } from './components/StatCard.jsx';
import { ItemFormModal } from './components/ItemFormModal.jsx';
import WorkOrderManagement from './components/work-order-management/WorkOrderManagement.jsx';
import VehicleManagement from './components/VehicleManagement.jsx';
import ValuationCalculator from './components/ValuationCalculator.jsx';
import { InventoryManagement } from './components/InventoryManagement.jsx';
import { ReportsSection } from './components/ReportsSection.jsx';
import { AlertsPanel } from './components/AlertsPanel.jsx';
import { ActivePieChart } from './components/ActivePieChart.jsx';
import { ForecastSection } from './components/Forecast.jsx';
import { PnLStatement } from './components/PnLStatement.jsx';
import DebtManagement from './components/DebtManagement.jsx';
import { IncomeSourcesSection } from './components/IncomeSources.jsx';
import { GoalsSection } from './components/GoalsSection.jsx';
import { WeeklyCostsSection } from './components/WeeklyCostsSection.jsx';
import IncentiveCalculator from './components/IncentiveCalculator.jsx';
import EnhancedBillsSection from './components/EnhancedBillsSection.jsx';

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const appId = 'hvac-finance-dashboard';

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taxPayments, setTaxPayments] = useState([]);
    const [goals, setGoals] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [paidStatus, setPaidStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [activeSection, setActiveSection] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentBankBalance, setCurrentBankBalance] = useState(0);
    const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
    const [reportingPeriod, setReportingPeriod] = useState('monthly');
    const [showAlerts, setShowAlerts] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    useEffect(() => {
        const now = new Date();
        let start, end;
        if (reportingPeriod === 'monthly') {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else if (reportingPeriod === 'quarterly') {
            const quarter = Math.floor(now.getMonth() / 3);
            start = new Date(now.getFullYear(), quarter * 3, 1);
            end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        } else { // yearly
            start = new Date(now.getFullYear(), 0, 1);
            end = new Date(now.getFullYear(), 11, 31);
        }
        setDateRange({ start, end });
    }, [reportingPeriod]);

    const selectedMonthYear = useMemo(() => dateRange.start.getFullYear() + '-' + String(dateRange.start.getMonth() + 1).padStart(2, '0'), [dateRange]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Simplified data fetching useEffect
    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = {
            bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, tasks: setTasks,
            taxPayments: setTaxPayments, goals: setGoals, inventory: setInventory, vehicles: setVehicles, maintenanceLogs: setMaintenanceLogs,
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

    useEffect(() => {
        if (!userId) return;
        const unsubscribeBalance = onSnapshot(doc(db, 'artifacts', appId, 'users', userId, 'settings', 'currentBalance'), (doc) => {
            setCurrentBankBalance(doc.exists() ? doc.data().amount || 0 : 0);
        }, err => console.error("Error fetching current balance:", err));
        return () => unsubscribeBalance();
    }, [userId]);

    const totals = useMemo(() => {
        const totalIncome = incomes.reduce((acc, i) => acc + (i.amount || 0), 0);
        const totalMonthlyBills = bills.reduce((acc, b) => acc + (b.amount || 0), 0);
        const projectedMonthlyWeekly = weeklyCosts.reduce((acc, c) => acc + (c.amount || 0), 0) * 4.33;
        const totalOutflow = totalMonthlyBills + projectedMonthlyWeekly;
        const netCashFlow = totalIncome - totalOutflow;
        const totalDebt = debts.reduce((acc, d) => acc + ((d.totalAmount || 0) - (d.paidAmount || 0)), 0);
        return { totalIncome, totalOutflow, netCashFlow, totalDebt };
    }, [bills, debts, incomes, weeklyCosts]);

    const expenseByCategory = useMemo(() => {
        const categories = bills.reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];
        return Object.entries(categories).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] })).sort((a, b) => b.value - a.value);
    }, [bills]);

    const goalsWithProgress = useMemo(() => {
        return goals.map(goal => {
            let progress = 0;
            if (goal.type === 'debt') {
                const debt = debts.find(d => d.id === goal.targetId);
                if (debt) progress = (debt.paidAmount / debt.totalAmount) * 100;
            }
            // Add other goal types if needed
            return { ...goal, progress: Math.min(progress, 100) };
        });
    }, [goals, debts]);

    const handleTogglePaid = async (billId) => { if (!userId) return; await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', selectedMonthYear), { status: { ...paidStatus, [billId]: !paidStatus[billId] } }, { merge: true }); };
    const openModal = (type, item = null) => { setModalType(type); setEditingItem(item); setIsModalOpen(true); };

    const handleUpdateCurrentBalance = async (newBalance) => {
        if (!userId) return alert("Please log in to update the balance.");
        await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'settings', 'currentBalance'), { amount: newBalance, updatedAt: serverTimestamp() }, { merge: true });
    };

    const handleSave = async (itemData, file) => {
        if (!userId) return;
        const collectionNameMap = {
            bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', task: 'tasks',
            taxPayment: 'taxPayments', goal: 'goals', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs'
        };
        const collectionName = collectionNameMap[modalType];
        if (!collectionName) return alert("Invalid modal type for saving.");

        const basePath = ['artifacts', appId, 'users', userId, collectionName];
        const dataToSave = { ...itemData, modifiedAt: serverTimestamp() };

        if (file) {
            const storageRef = ref(storage, `receipts/${userId}/${Date.now()}-${file.name}`);
            dataToSave.attachmentURL = await uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef));
        }

        if (editingItem?.id) {
            await updateDoc(doc(db, ...basePath, editingItem.id), dataToSave);
        } else {
            await addDoc(collection(db, ...basePath), { ...dataToSave, createdAt: serverTimestamp() });
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (type, id) => {
        if (!userId || !window.confirm("Delete this item?")) return;
        const collectionNameMap = {
            bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', task: 'tasks',
            taxPayment: 'taxPayments', goal: 'goals', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs'
        };
        const collectionName = collectionNameMap[type];
        if (!collectionName) return alert("Invalid item type for deletion.");
        await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
    };

    const handleBulkDelete = async (type, ids) => {
        if (!userId || !ids.length || !window.confirm(`Delete ${ids.length} selected items?`)) return;
        const collectionNameMap = { inventory: 'inventory', vehicle: 'vehicles' };
        const collectionName = collectionNameMap[type];
        if (!collectionName) return alert("Invalid bulk delete type.");
        const batch = writeBatch(db);
        ids.forEach(id => {
            batch.delete(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
            if (type === 'vehicle') {
                maintenanceLogs.filter(log => log.vehicleId === id).forEach(log =>
                    batch.delete(doc(db, 'artifacts', appId, 'users', userId, 'maintenanceLogs', log.id))
                );
            }
        });
        await batch.commit();
        setSelectedIds([]);
    };

    const deleteAllData = async () => {
        if (!userId || !window.confirm("Clear all your business data? This is irreversible.")) return;
        const collectionsToDelete = ['bills', 'debts', 'incomes', 'weeklyCosts', 'tasks', 'taxPayments', 'goals', 'inventory', 'vehicles', 'maintenanceLogs', 'paidStatus', 'system', 'settings'];
        for (const collectionName of collectionsToDelete) {
            const snapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, collectionName));
            if (!snapshot.empty) {
                const batch = writeBatch(db);
                snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
                await batch.commit();
            }
        }
        alert("All business data has been cleared.");
    };

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    if (!userId) return <Auth setUserId={setUserId} />;

    const renderDashboard = () => (
        <>
            {showAlerts && <AlertsPanel bills={bills} paidStatus={paidStatus} onClose={() => setShowAlerts(false)} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Monthly Income" value={`$${totals.totalIncome.toLocaleString()}`} icon={<Banknote size={24} />} color="green" />
                <StatCard title="Total Monthly Outflow" value={`$${totals.totalOutflow.toLocaleString()}`} icon={<ArrowDown size={24} />} color="red" />
                <StatCard title="Projected Net" value={`$${totals.netCashFlow.toLocaleString()}`} icon={<DollarSign size={24} />} color={totals.netCashFlow >= 0 ? 'cyan' : 'amber'} />
                <StatCard title="Outstanding Debt" value={`$${totals.totalDebt.toLocaleString()}`} icon={<AlertTriangle size={24} />} color="orange" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <EnhancedBillsSection
                    bills={bills}
                    paidStatus={paidStatus}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    handleTogglePaid={handleTogglePaid}
                    openModal={openModal}
                    handleDelete={handleDelete}
                />
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Expense Breakdown</h3>
                        <ActivePieChart data={expenseByCategory} onSliceClick={setSelectedCategory} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Work Order Management</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Access advanced invoicing, customer management, and dispatch.
                        </p>
                        <button
                            onClick={() => setActiveSection('workorder')}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <Wrench size={16} /> Open Work Orders
                        </button>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Getting Started</h3>
                        <button
                            onClick={deleteAllData}
                            className="w-full flex items-center justify-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <Trash2 size={16} /> Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className={`${theme} bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white min-h-screen font-sans`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Business Financial Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Complete Business Management Solution</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg">
                            <span className="text-sm font-semibold">Period:</span>
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                                <button onClick={() => setReportingPeriod('monthly')} className={`px-3 py-1 text-sm rounded transition-colors ${reportingPeriod === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Monthly</button>
                                <button onClick={() => setReportingPeriod('quarterly')} className={`px-3 py-1 text-sm rounded transition-colors ${reportingPeriod === 'quarterly' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Quarterly</button>
                                <button onClick={() => setReportingPeriod('yearly')} className={`px-3 py-1 text-sm rounded transition-colors ${reportingPeriod === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Yearly</button>
                            </div>
                        </div>
                        <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-sm bg-slate-600 hover:bg-slate-500 text-white font-semibold px-3 py-2 rounded-md transition-colors">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </header>
                <nav className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
                    <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'dashboard' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Dashboard</button>
                    <button onClick={() => setActiveSection('reports')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'reports' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Reports</button>
                    <button onClick={() => setActiveSection('calendar')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'calendar' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Calendar</button>
                    <button onClick={() => setActiveSection('workorder')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'workorder' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Work Orders</button>
                    <button onClick={() => setActiveSection('vehicles')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'vehicles' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Vehicles</button>
                    <button onClick={() => setActiveSection('inventory')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'inventory' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Inventory</button>
                    <button onClick={() => setActiveSection('debts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'debts' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Debt</button>
                    <button onClick={() => setActiveSection('incomes')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incomes' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Income</button>
                    <button onClick={() => setActiveSection('weeklyCosts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'weeklyCosts' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Weekly Costs</button>
                    <button onClick={() => setActiveSection('goals')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'goals' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Goals</button>
                    <button onClick={() => setActiveSection('pnl')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'pnl' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>P&L</button>
                    <button onClick={() => setActiveSection('forecast')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'forecast' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Forecast</button>
                    <button onClick={() => setActiveSection('valuation')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'valuation' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Valuation</button>
                    <button onClick={() => setActiveSection('tax')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'tax' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Tax</button>
                    <button onClick={() => setActiveSection('incentives')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incentives' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Incentives</button>
                </nav>
                <main>
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'reports' && <ReportsSection inventory={inventory} />}
                    {activeSection === 'valuation' && <ValuationCalculator />}
                    {activeSection === 'calendar' && <CalendarSection tasks={tasks} openModal={openModal} />}
                    {activeSection === 'tax' && <TaxManagement taxPayments={taxPayments} openModal={openModal} handleDelete={handleDelete} />}
                    {/* The P&L statement should be part of the WorkOrderManagement reports, but can be kept here for now if desired */}
                    {activeSection === 'pnl' && <PnLStatement bills={bills} weeklyCosts={weeklyCosts} reportingPeriod={reportingPeriod} dateRange={dateRange} />}
                    {activeSection === 'forecast' && <ForecastSection bills={bills} weeklyCosts={weeklyCosts} currentBankBalance={currentBankBalance} setCurrentBankBalance={handleUpdateCurrentBalance} />}
                    {activeSection === 'goals' && <GoalsSection goalsWithProgress={goalsWithProgress} openModal={openModal} onDeleteGoal={(goalId) => handleDelete('goal', goalId)} onEditGoal={(goal) => openModal('goal', goal)} />}
                    {activeSection === 'incentives' && <IncentiveCalculator userId={userId} db={db} appId={appId} />}
                    {activeSection === 'workorder' && <WorkOrderManagement userId={userId} db={db} inventory={inventory} />}
                    {activeSection === 'vehicles' && <VehicleManagement vehicles={vehicles} maintenanceLogs={maintenanceLogs} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />}
                    {activeSection === 'inventory' && <InventoryManagement inventory={inventory} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                    {activeSection === 'debts' && <DebtManagement debts={debts} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                    {activeSection === 'incomes' && <IncomeSourcesSection incomes={incomes} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'weeklyCosts' && <WeeklyCostsSection weeklyCosts={weeklyCosts} openModal={openModal} handleDelete={handleDelete} />}
                </main>
                <footer className="text-center mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Powered by <a href="https://service.money/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Service Coin</a>
                    </p>
                </footer>
            </div>
            {isModalOpen && (
                <ItemFormModal
                    item={editingItem}
                    type={modalType}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    debts={debts}
                    vehicles={vehicles}
                />
            )}
        </div>
    );
};

export default App;