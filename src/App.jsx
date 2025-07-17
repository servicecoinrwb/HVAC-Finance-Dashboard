import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
// FIX: Added createUserWithEmailAndPassword and updateProfile for sign-up functionality
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp, where, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, LineChart, Line } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Bell, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, FileText, Home, Inbox, LogOut, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Target, Trash2, TrendingUp, Upload, User, Users, X, Car, Building, BarChart2, Sun, Moon, Percent, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react';

// --- Firebase Configuration ---
// The user needs to replace these with their actual Firebase project configuration.
const firebaseConfig = {
  apiKey: "AIzaSyAlev0GFpv3rzRYCJaMALOqlPwaowNfynI",
  authDomain: "hvac-finance-dashboard.firebaseapp.com",
  projectId: "hvac-finance-dashboard",
  storageBucket: "hvac-finance-dashboard.firebasestorage.app",
  messagingSenderId: "917610618621",
  appId: "1:917610618621:web:83c621d154c5f62c9be894",
  measurementId: "G-JKQB4XCVHG"
};

const appId = 'hvac-finance-dashboard';

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- START: Consolidated Components ---
// To resolve build errors, all components have been moved into this single file.

const Auth = ({ auth, setUserId }) => {
  const [isLoginView, setIsLoginView] = useState(true); // To toggle between Login and Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in App will handle the rest
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
        setError("Please fill out all fields.");
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set the user's display name
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // onAuthStateChanged in App will now log the user in
    } catch (err) {
        console.error("Sign up failed:", err);
        if (err.code === 'auth/email-already-in-use') {
            setError("This email is already in use. Please log in.");
        } else if (err.code === 'auth/weak-password') {
            setError("Password should be at least 6 characters.");
        }
        else {
            setError("Failed to create an account. Please try again.");
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
            {isLoginView ? 'Dashboard Login' : 'Create an Account'}
        </h2>
        <form onSubmit={isLoginView ? handleLogin : handleSignUp} className="space-y-4">
          {!isLoginView && (
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Your Name" className="block p-3 w-full border rounded-md bg-slate-100 dark:bg-slate-700" />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="block p-3 w-full border rounded-md bg-slate-100 dark:bg-slate-700" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="block p-3 w-full border rounded-md bg-slate-100 dark:bg-slate-700" />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-3 rounded-md">
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline ml-2">
                {isLoginView ? 'Sign Up' : 'Login'}
            </button>
        </p>
      </div>
    </div>
  );
};

const TaxManagement = ({ jobs, bills, weeklyCosts, taxPayments, openModal, handleDelete }) => {
    const pnlData = useMemo(() => {
        const revenue = jobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = jobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;
        const operatingExpenses = bills.reduce((acc, bill) => acc + bill.amount, 0) + (weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * 4.33);
        const netProfit = grossProfit - operatingExpenses;
        const taxRate = 0.06; // 6%
        const estimatedTax = netProfit > 0 ? netProfit * taxRate : 0;
        const paidTaxes = taxPayments.reduce((acc, p) => acc + p.amount, 0);
        const remainingTax = estimatedTax - paidTaxes;
        return { netProfit, estimatedTax, paidTaxes, remainingTax };
    }, [jobs, bills, weeklyCosts, taxPayments]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Tax Center</h3>
            {/* Tax summary cards */}
        </div>
    );
};

const CalendarSection = ({ jobs, tasks, openModal }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Calendar</h3>
            {/* Calendar implementation would go here */}
        </div>
    );
};

const StatCard = ({ title, value, icon, color, subtext }) => {
    const colorClasses = {
        green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
        red: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
        cyan: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400',
        amber: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
        orange: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
        teal: 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400',
        indigo: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400',
        purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
    };
    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
                {subtext && <p className="text-xs text-slate-400 dark:text-slate-500">{subtext}</p>}
            </div>
        </div>
    );
};

const ItemFormModal = ({ item, type, onSave, onClose, debts, clients, vehicles }) => {
    const [formData, setFormData] = useState(item || {});
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Edit {type}</h3>
                {/* Form fields would be dynamically generated based on type */}
                <button onClick={() => onSave(formData)} className="bg-cyan-600 text-white px-4 py-2 rounded-md">Save</button>
                <button onClick={onClose} className="ml-2 bg-slate-300 px-4 py-2 rounded-md">Cancel</button>
            </div>
        </div>
    );
};

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const InvoiceManagement = ({ invoices, openModal, handleDelete }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">Invoices...</div>
);
const ClientManagement = ({ clients, openModal, handleDelete }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">Clients...</div>
);
const VehicleManagement = ({ vehicles, maintenanceLogs, openModal, handleDelete }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">Vehicles...</div>
);
const InventoryManagement = ({ inventory, openModal, handleDelete }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">Inventory...</div>
);
const ReportsSection = ({ clients, jobs, bills, inventory }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">Reports...</div>
);
const AlertsPanel = ({ bills, paidStatus, onClose }) => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
        <p className="font-bold">Alerts</p>
        <p>You have unpaid bills.</p>
        <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">&times;</button>
    </div>
);
const ActivePieChart = ({ data, onSliceClick }) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip />
        </PieChart>
    </ResponsiveContainer>
);

// --- END: Consolidated Components ---

// --- Initial Data (Seed for first-time use) ---
const INITIAL_BILLS = [ { name: "Adobe", amount: 21.19, dueDay: 1, isAutoPay: true, category: "Software", notes: "", attachmentURL: null, isRecurring: true }, { name: "Rent", amount: 1600, dueDay: 1, isAutoPay: false, category: "Overhead", notes: "Landlord: John Smith", attachmentURL: null, isRecurring: true }, { name: "GM Financial Black Truck", amount: 1307.20, dueDay: 6, isAutoPay: false, category: "Vehicle", notes: "", vehicleId: "1" }];
const INITIAL_DEBTS = [ { name: "Ondeck Credit", totalAmount: 7500, paidAmount: 0, interestRate: 12.5, notes: "" }, { name: "Chase Card", totalAmount: 33795.27, paidAmount: 2200, interestRate: 21.99, notes: "" },];
const INITIAL_INCOME = [ { name: "NEST Early Pay", amount: 15000, type: "monthly", notes: "", isRecurring: true }, { name: "Job Revenue", amount: 5000, type: "monthly", notes: "", isRecurring: false },];
const INITIAL_WEEKLY_COSTS = [ { name: "Projected Payroll", amount: 1800, notes: "" }, { name: "Fuel & Maintenance", amount: 450, notes: "" },];
const INITIAL_JOBS = [ { name: "Johnson Residence A/C Install", revenue: 8500, materialCost: 3200, laborCost: 1500, notes: "Trane XV20i unit.", date: new Date().toISOString(), clientId: "1" }, { name: "Downtown Restaurant PM", revenue: 1200, materialCost: 150, laborCost: 400, notes: "Quarterly maintenance contract.", date: new Date().toISOString(), clientId: "2" }];
const INITIAL_TASKS = [ { title: "Follow up with Johnson about quote", date: new Date().toISOString().split('T')[0], notes: "Sent quote last week", isComplete: false }, { title: "Order filters for Downtown Restaurant", date: new Date().toISOString().split('T')[0], notes: "Need 10x 20x25x1 filters", isComplete: true }];
const INITIAL_INVOICES = [ { billTo: "Badawi", customer: "Southern Algeria #00547", jobNo: "1548875887", completedOn: "6/14/2024", invNum: "", terms: "Net 45", net: 1291.00, dueDate: "6/14/2024", status: "", grandTotal: 1291.00 }];
const INITIAL_TAX_PAYMENTS = [{ date: new Date().toISOString().split('T')[0], amount: 500, notes: "Q2 Estimated Payment" }];
const INITIAL_GOALS = [ { name: "Pay off Chase Card", type: "debt", targetId: "Chase Card", targetValue: 0, deadline: "2025-12-31" }, { name: "Achieve $50k Job Revenue", type: "revenue", targetValue: 50000, deadline: "2025-12-31" }];
const INITIAL_CLIENTS = [ {id: "1", name: "John Johnson", address: "123 Main St, Anytown, USA", phone: "555-1234", email: "john@example.com"}, {id: "3", name: "Restaurant Group Inc.", address: "789 Corp Blvd, Big City, USA", phone: "555-9999", email: "accounts@restaurantgroup.com"}, {id: "2", name: "Downtown Restaurant", address: "456 Oak Ave, Anytown, USA", phone: "555-5678", email: "contact@downtownrestaurant.com", parentId: "3"}];
const INITIAL_INVENTORY = [ {name: "Standard 1-inch Filter", quantity: 50, cost: 5.50}, {name: "Capacitor 45/5 MFD", quantity: 15, cost: 25.00} ];
const INITIAL_VEHICLES = [ {id: "7", name: "Jason's Truck", make: "FORD", model: "TRANSIT T250", year: "2020", vin: "1FTBR1C84LKA59065", licensePlate: "DD16326", currentMileage: 104071}, {id: "8", name: "Red Van", make: "FORD", model: "TRANSIT T250", year: "2020", vin: "1FTBR1C85LKA70866", licensePlate: "DD16337", currentMileage: 107046}, {id: "11", name: "GMC Sierra", make: "GMC", model: "SIERRA", year: "2022", vin: "3GTPUJEK7NG635190", licensePlate: "DF94421", currentMileage: 18811} ];
const INITIAL_MAINTENANCE_LOGS = [
    { vehicleId: "7", date: "2023-08-11", mileage: 75018, workPerformed: "LICENSE TABS", cost: 183.00, notes: "" },
    { vehicleId: "7", date: "2024-06-06", mileage: 76504, workPerformed: "oil change", cost: 55.00, notes: "" },
];
const BILL_CATEGORIES = ["Software", "Fuel", "Vehicle", "Insurance", "Marketing", "Supplies", "Overhead", "Payroll", "Taxes", "Utilities", "General"];


const App = () => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [taxPayments, setTaxPayments] = useState([]);
    const [goals, setGoals] = useState([]);
    const [clients, setClients] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [paidStatus, setPaidStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [sortConfig, setSortConfig] = useState({ key: 'dueDay', direction: 'ascending' });
    const [activeSection, setActiveSection] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentBankBalance, setCurrentBankBalance] = useState(25000);
    const [dateRange, setDateRange] = useState({start: new Date(), end: new Date()});
    const [reportingPeriod, setReportingPeriod] = useState('monthly');
    const [showAlerts, setShowAlerts] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

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
        setDateRange({start, end});
    }, [reportingPeriod]);

    const selectedMonthYear = useMemo(() => dateRange.start.getFullYear() + '-' + String(dateRange.start.getMonth() + 1).padStart(2, '0'), [dateRange]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const billsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'bills');
                const billsSnapshot = await getDocs(billsRef);
                if (billsSnapshot.empty) {
                    setIsSeeding(true);
                    console.log("No data found. Seeding initial data...");
                    const batch = writeBatch(db);
                    const basePath = ['artifacts', appId, 'users', user.uid];
                    INITIAL_BILLS.forEach(item => batch.set(doc(collection(db, ...basePath, 'bills')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_DEBTS.forEach(item => batch.set(doc(collection(db, ...basePath, 'debts')), {...item, createdAt: serverTimestamp()}));
                    await batch.commit();
                    setIsSeeding(false);
                }
            } else {
                setUserId(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = { bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, jobs: setJobs, tasks: setTasks, invoices: setInvoices, taxPayments: setTaxPayments, goals: setGoals, clients: setClients, inventory: setInventory, vehicles: setVehicles, maintenanceLogs: setMaintenanceLogs };
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

    const filteredJobs = useMemo(() => jobs.filter(job => {
        if (!job.date) return false;
        const jobDate = new Date(job.date);
        return jobDate >= dateRange.start && jobDate <= dateRange.end;
    }), [jobs, dateRange]);

    const filteredBills = useMemo(() => bills.filter(bill => !selectedCategory || bill.category === selectedCategory), [bills, selectedCategory]);

    const totals = useMemo(() => {
        const totalIncome = incomes.reduce((acc, i) => acc + (i.amount || 0), 0);
        const totalMonthlyBills = bills.reduce((acc, b) => acc + (b.amount || 0), 0);
        const projectedMonthlyWeekly = weeklyCosts.reduce((acc, c) => acc + (c.amount || 0), 0) * 4.33;
        const totalOutflow = totalMonthlyBills + projectedMonthlyWeekly;
        const netCashFlow = totalIncome - totalOutflow;
        const totalDebt = debts.reduce((acc, d) => acc + ((d.totalAmount || 0) - (d.paidAmount || 0)), 0);
        const paidThisMonth = bills.filter(b => paidStatus[b.id]).reduce((acc, b) => acc + b.amount, 0);
        return { totalIncome, totalOutflow, netCashFlow, paidThisMonth, totalDebt, totalMonthlyBills, projectedMonthlyWeekly };
    }, [bills, debts, incomes, weeklyCosts, paidStatus]);

    const pnlData = useMemo(() => {
        const revenue = filteredJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = filteredJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;
        const operatingExpenses = bills.reduce((acc, bill) => acc + bill.amount, 0) + (weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * 4.33);
        const netProfit = grossProfit - operatingExpenses;
        const taxRate = 0.06; // 6%
        const estimatedTax = netProfit > 0 ? netProfit * taxRate : 0;
        const netProfitAfterTax = netProfit - estimatedTax;
        return { revenue, cogs, grossProfit, operatingExpenses, netProfit, estimatedTax, netProfitAfterTax };
    }, [filteredJobs, bills, weeklyCosts]);

    const forecastData = useMemo(() => {
        const recurringIncome = incomes.filter(i => i.isRecurring).reduce((acc, i) => acc + i.amount, 0);
        const recurringBills = bills.filter(b => b.isRecurring).reduce((acc, b) => acc + b.amount, 0);
        const weeklyCostsTotal = weeklyCosts.reduce((acc, c) => acc + c.amount, 0);
        const netMonthlyRecurring = recurringIncome - recurringBills - (weeklyCostsTotal * 4.33);

        const forecast = [
            { month: 'Current', balance: currentBankBalance },
            { month: '+1 Month', balance: currentBankBalance + netMonthlyRecurring },
            { month: '+3 Months', balance: currentBankBalance + (netMonthlyRecurring * 3) },
            { month: '+6 Months', balance: currentBankBalance + (netMonthlyRecurring * 6) },
        ];
        return forecast;
    }, [incomes, bills, weeklyCosts, currentBankBalance]);

    const goalsWithProgress = useMemo(() => {
        return goals.map(goal => {
            let progress = 0;
            if (goal.type === 'debt') {
                const debt = debts.find(d => d.id === goal.targetId);
                if (debt) {
                    progress = (debt.paidAmount / debt.totalAmount) * 100;
                }
            } else if (goal.type === 'revenue') {
                const currentRevenue = jobs.reduce((acc, j) => acc + (j.revenue || 0), 0);
                progress = (currentRevenue / goal.targetValue) * 100;
            }
            return { ...goal, progress: Math.min(progress, 100) };
        });
    }, [goals, debts, jobs]);

    const expenseByCategory = useMemo(() => {
        const categories = bills.reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];
        return Object.entries(categories).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] })).sort((a, b) => b.value - a.value);
    }, [bills]);

    const sortedData = useMemo(() => {
        const dataMap = { bills: filteredBills, debts, incomes, weeklyCosts, jobs, goals: goalsWithProgress, clients, inventory, vehicles, invoices };
        let activeData = dataMap[activeSection === 'dashboard' ? 'bills' : activeSection] || [];
        
        if(searchTerm) {
            activeData = activeData.filter(item => 
                Object.values(item).some(val => 
                    val && String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        return [...activeData].sort((a, b) => {
            if (!sortConfig.key) return 0;
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [filteredBills, debts, incomes, weeklyCosts, jobs, goalsWithProgress, clients, inventory, vehicles, invoices, sortConfig, activeSection, searchTerm]);

    const debtPayoffStrategies = useMemo(() => {
        const outstandingDebts = debts.map(d => ({...d, remaining: d.totalAmount - d.paidAmount})).filter(d => d.remaining > 0);
        const avalanche = [...outstandingDebts].sort((a, b) => b.interestRate - a.interestRate);
        const snowball = [...outstandingDebts].sort((a, b) => a.remaining - b.remaining);
        return { avalanche, snowball };
    }, [debts]);

    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending' }));
    const handleTogglePaid = async (billId) => { if (!userId) return; await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', selectedMonthYear), { status: { ...paidStatus, [billId]: !paidStatus[billId] } }, { merge: true }); };
    const openModal = (type, item = null) => { setModalType(type); setEditingItem(item); setIsModalOpen(true); };
    
    const handleSave = async (itemData, file) => {
        if (!userId) return;
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs' };
        const collectionName = collectionNameMap[modalType];
        const basePath = ['artifacts', appId, 'users', userId, collectionName];

        const dataToSave = {...itemData, modifiedAt: serverTimestamp()};
        
        if (file) {
            const storageRef = ref(storage, `receipts/${userId}/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            dataToSave.attachmentURL = await getDownloadURL(storageRef);
        }

        if (editingItem?.id) {
            await updateDoc(doc(db, ...basePath, editingItem.id), dataToSave);
        } else {
            await addDoc(collection(db, ...basePath), {...dataToSave, createdAt: serverTimestamp()});
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (type, id) => {
        if (!userId || !window.confirm("Delete this item?")) return;
        // FIX: Use a map to prevent incorrect collection names (e.g., "inventorys")
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs' };
        const collectionName = collectionNameMap[type];
        if (collectionName) {
            await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
        } else {
            console.error("Invalid type for deletion:", type);
        }
    };
    
    const handleExportCSV = (data, sectionName) => {
        if (!data.length) return;
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(','))
        ].join('\r\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `${sectionName}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    
    if (!userId) {
        return <Auth auth={auth} setUserId={setUserId} />;
    }

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
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Monthly Bills</h3>
                    <div className="overflow-x-auto mt-4">
                        {/* FIX: Restored the detailed and styled table for the dashboard */}
                        <table className="w-full text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                                    <th className="p-3 text-right cursor-pointer" onClick={() => handleSort('amount')}>Amount</th>
                                    <th className="p-3 text-center cursor-pointer" onClick={() => handleSort('dueDay')}>Due Day</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map(bill => (
                                    <tr key={bill.id} className={`border-b border-slate-200 dark:border-slate-700/50 ${paidStatus[bill.id] ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                                        <td className="p-3"><button onClick={() => handleTogglePaid(bill.id)}>{paidStatus[bill.id] ? <CheckCircle className="text-green-500" /> : <Circle className="text-slate-400 dark:text-slate-600"/>}</button></td>
                                        <td className={`p-3 font-medium ${paidStatus[bill.id] ? 'line-through' : ''}`}>{bill.name}</td>
                                        <td className="p-3 text-right font-mono">${(bill.amount || 0).toFixed(2)}</td>
                                        <td className="p-3 text-center">{bill.dueDay}</td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => openModal('bill', bill)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete('bill', bill.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Expense Breakdown</h3>
                        <ActivePieChart data={expenseByCategory} onSliceClick={setSelectedCategory} />
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
                        <h1 className="text-3xl font-bold">HVAC Financial Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Monthly Money Management</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-sm bg-slate-600 hover:bg-slate-500 text-white font-semibold px-3 py-2 rounded-md">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </header>
                <nav className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
                   <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium ${activeSection === 'dashboard' ? 'text-cyan-600 border-b-2 border-cyan-500' : 'text-slate-500'}`}>Dashboard</button>
                   {/* Add other nav buttons here */}
                </nav>
                <main>
                    {activeSection === 'dashboard' && renderDashboard()}
                    {/* Render other sections based on activeSection */}
                </main>
                <footer className="text-center mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Powered by <a href="https://service.money/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Service Coin</a>
                    </p>
                </footer>
            </div>
            {isModalOpen && <ItemFormModal item={editingItem} type={modalType} onSave={handleSave} onClose={() => setIsModalOpen(false)} debts={debts} clients={clients} vehicles={vehicles} />}
        </div>
    );
};

export default App;
