import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp, where, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, LineChart, Line } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Bell, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, FileText, Home, Inbox, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Target, Trash2, TrendingUp, Upload, User, Users, X, Car, Building, BarChart2, Sun, Moon } from 'lucide-react';

// --- Firebase Configuration ---
// Make sure your .env.local file is created with these keys
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

// --- Initial Data (Seed for first-time use) ---
const INITIAL_BILLS = [ { name: "Adobe", amount: 21.19, dueDay: 1, isAutoPay: true, category: "Software", notes: "", attachmentURL: null, isRecurring: true }, { name: "Rent", amount: 1600, dueDay: 1, isAutoPay: false, category: "Overhead", notes: "Landlord: John Smith", attachmentURL: null, isRecurring: true }, { name: "GM Financial Black Truck", amount: 1307.20, dueDay: 6, isAutoPay: false, category: "Vehicle", notes: "", vehicleId: "1" }];
const INITIAL_DEBTS = [ { name: "Ondeck Credit", totalAmount: 7500, paidAmount: 0, interestRate: 12.5, notes: "" }, { name: "Chase Card", totalAmount: 33795.27, paidAmount: 2200, interestRate: 21.99, notes: "" },];
const INITIAL_INCOME = [ { name: "NEST Early Pay", amount: 15000, type: "monthly", notes: "", isRecurring: true }, { name: "Job Revenue", amount: 5000, type: "monthly", notes: "", isRecurring: false },];
const INITIAL_WEEKLY_COSTS = [ { name: "Projected Payroll", amount: 1800, notes: "" }, { name: "Fuel & Maintenance", amount: 450, notes: "" },];
const INITIAL_JOBS = [ { name: "Johnson Residence A/C Install", revenue: 8500, materialCost: 3200, laborCost: 1500, notes: "Trane XV20i unit.", date: new Date().toISOString(), clientId: "1" }, { name: "Downtown Restaurant PM", revenue: 1200, materialCost: 150, laborCost: 400, notes: "Quarterly maintenance contract.", date: new Date().toISOString(), clientId: "2" }];
const INITIAL_GOALS = [ { name: "Pay off Chase Card", type: "debt", targetId: "Chase Card", targetValue: 0, deadline: "2025-12-31" }, { name: "Achieve $50k Job Revenue", type: "revenue", targetValue: 50000, deadline: "2025-12-31" }];
const INITIAL_CLIENTS = [ {id: "1", name: "John Johnson", address: "123 Main St, Anytown, USA", phone: "555-1234", email: "john@example.com"}, {id: "3", name: "Restaurant Group Inc.", address: "789 Corp Blvd, Big City, USA", phone: "555-9999", email: "accounts@restaurantgroup.com"}, {id: "2", name: "Downtown Restaurant", address: "456 Oak Ave, Anytown, USA", phone: "555-5678", email: "contact@downtownrestaurant.com", parentId: "3"}];
const INITIAL_INVENTORY = [ {name: "Standard 1-inch Filter", quantity: 50, cost: 5.50}, {name: "Capacitor 45/5 MFD", quantity: 15, cost: 25.00} ];
const INITIAL_VEHICLES = [ {id: "7", name: "Jason's Truck", make: "FORD", model: "TRANSIT T250", year: "2020", vin: "1FTBR1C84LKA59065", licensePlate: "DD16326", currentMileage: 104071}, {id: "8", name: "Red Van", make: "FORD", model: "TRANSIT T250", year: "2020", vin: "1FTBR1C85LKA70866", licensePlate: "DD16337", currentMileage: 107046}, {id: "11", name: "GMC Sierra", make: "GMC", model: "SIERRA", year: "2022", vin: "3GTPUJEK7NG635190", licensePlate: "DF94421", currentMileage: 18811} ];
const INITIAL_MAINTENANCE_LOGS = [
    { vehicleId: "7", date: "2023-08-11", mileage: 75018, workPerformed: "LICENSE TABS", cost: 183.00, notes: "" },
    { vehicleId: "7", date: "2024-06-06", mileage: 76504, workPerformed: "oil change", cost: 55.00, notes: "" },
    { vehicleId: "7", date: "2024-09-24", mileage: 89627, workPerformed: "oil change, air filter oil cleaner", cost: 146.09, notes: "" },
    { vehicleId: "7", date: "2024-11-08", mileage: null, workPerformed: "Replaced front and rear rotors and pads", cost: 500.00, notes: "" },
    { vehicleId: "7", date: "2024-12-12", mileage: 99399, workPerformed: "Replaced tires and oil change", cost: 958.00, notes: "" },
    { vehicleId: "8", date: "2023-08-11", mileage: 84948, workPerformed: "LICENSE TABS", cost: 183.00, notes: "" },
    { vehicleId: "8", date: "2023-09-25", mileage: 87270, workPerformed: "oil change", cost: 40.00, notes: "oil filter pf63 6 quarts 5w20" },
    { vehicleId: "8", date: "2024-06-06", mileage: 98000, workPerformed: "oil change", cost: 55.00, notes: "" },
    { vehicleId: "8", date: "2024-11-01", mileage: null, workPerformed: "Replace Rear rotor and pads", cost: 241.00, notes: "" },
    { vehicleId: "11", date: "2023-08-11", mileage: 9435, workPerformed: "LICENSE TABS", cost: 302.00, notes: "" },
    { vehicleId: "11", date: "2023-09-20", mileage: 10008, workPerformed: "Oil Change", cost: 50.00, notes: "PF66 oil filter 6 quarts 5w30 full synthetic" },
    { vehicleId: "11", date: "2025-02-11", mileage: 19024, workPerformed: "Oil Change / air filter", cost: 143.17, notes: "valvoline oil shop" }
];


// --- Helper Components ---
const Modal = ({ children, onClose }) => ( <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"> <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg m-4 relative border dark:border-slate-700"> <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"> <X size={24} /> </button> <div className="p-6">{children}</div> </div> </div>);
const StatCard = ({ title, value, icon, color, subtext }) => ( <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg flex flex-col justify-between"> <div className="flex items-center justify-between"> <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3> <div className={`text-${color}-500 dark:text-${color}-400`}>{icon}</div> </div> <div> <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">{typeof value === 'number' ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}</p> {subtext && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{subtext}</p>} </div> </div>);
const ActivePieChart = ({ data, onSliceClick }) => { const [activeIndex, setActiveIndex] = useState(0); const onPieEnter = useCallback((_, index) => { setActiveIndex(index); }, [setActiveIndex]); const renderActiveShape = (props) => { const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props; return ( <g className="cursor-pointer" onClick={() => onSliceClick(payload.name)}> <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg"> {payload.name} </text> <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} /> </g> ); }; return ( <ResponsiveContainer width="100%" height={300}> <PieChart> <Tooltip contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem' }} labelStyle={{ color: '#cbd5e1' }} itemStyle={{ color: '#f1f5f9' }} formatter={(value) => `$${value.toFixed(2)}`} /> <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" dataKey="value" onMouseEnter={onPieEnter} onClick={(data) => onSliceClick(data.name)} > {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.color} /> ))} </Pie> </PieChart> </ResponsiveContainer> );};

const ItemFormModal = ({ item, type, onSave, onClose, debts, clients, vehicles }) => {
    const [formData, setFormData] = useState({});
    const [fileToUpload, setFileToUpload] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const defaults = { bill: { name: '', amount: 0, dueDay: 1, isAutoPay: false, category: 'General', notes: '', attachmentURL: null, isRecurring: false, vehicleId: '' }, debt: { name: '', totalAmount: 0, paidAmount: 0, interestRate: 0, notes: '' }, income: { name: '', amount: 0, type: 'monthly', notes: '', isRecurring: false }, weekly: { name: '', amount: 0, notes: '' }, job: { name: '', revenue: 0, materialCost: 0, laborCost: 0, notes: '', date: new Date().toISOString().split('T')[0], clientId: '' }, goal: { name: '', type: 'revenue', targetValue: 50000, deadline: '', targetId: '' }, client: { name: '', address: '', phone: '', email: '', parentId: ''}, inventory: { name: '', quantity: 0, cost: 0 }, vehicle: { name: '', make: '', model: '', year: '', vin: '', licensePlate: '', currentMileage: 0 }, maintenanceLog: { date: new Date().toISOString().split('T')[0], mileage: '', workPerformed: '', cost: 0, notes: '', vehicleId: item?.vehicleId || '' } };
        setFormData(item || defaults[type]);
    }, [item, type]);

    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value) })); };
    const handleFileChange = (e) => { if (e.target.files[0]) { setFileToUpload(e.target.files[0]); } };
    
    const handleSubmit = async (e) => { e.preventDefault(); setIsSaving(true); await onSave(formData, fileToUpload); setIsSaving(false); };

    const renderFields = () => {
        const parentAccounts = clients.filter(c => !c.parentId);
        switch (type) {
            case 'bill': return <> <div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Bill Name</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" required /></div> <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Amount</label><input type="number" name="amount" value={formData.amount || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" required /></div><div><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Due Day</label><input type="number" name="dueDay" min="1" max="31" value={formData.dueDay || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" required /></div></div> <div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Category</label><input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" /></div> {formData.category === 'Vehicle' && <div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Assign to Vehicle</label><select name="vehicleId" value={formData.vehicleId || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"><option value="">-- Select Vehicle --</option>{vehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select></div>} <div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Notes</label><textarea name="notes" value={formData.notes || ''} onChange={handleChange} rows="2" className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"></textarea></div><div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Attach Receipt (Optional)</label><input type="file" onChange={handleFileChange} className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/></div> <div className="flex justify-between items-center"><div className="flex items-center"><input type="checkbox" id="isAutoPay" name="isAutoPay" checked={formData.isAutoPay || false} onChange={handleChange} className="h-4 w-4 rounded" /><label htmlFor="isAutoPay" className="ml-2 text-sm text-slate-600 dark:text-slate-300">Enabled for Autopay</label></div><div className="flex items-center"><input type="checkbox" id="isRecurring" name="isRecurring" checked={formData.isRecurring || false} onChange={handleChange} className="h-4 w-4 rounded" /><label htmlFor="isRecurring" className="ml-2 text-sm text-slate-600 dark:text-slate-300">Is Recurring?</label></div></div> </>;
            case 'client': return <> <div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Client/Location Name</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" required /></div><div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Parent Account (Optional)</label><select name="parentId" value={formData.parentId || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"><option value="">-- None (Is a Parent Account) --</option>{parentAccounts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div><div className="mb-4"><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Address</label><input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" /></div><div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Phone Number</label><input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" /></div><div><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white" /></div></div> </>;
            default: return <p>This form is not yet implemented.</p>;
        }
    };
    return ( <Modal onClose={onClose}><form onSubmit={handleSubmit}><h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>{renderFields()}<div className="flex justify-end gap-3 mt-6"><button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white">Cancel</button><button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md bg-cyan-600 flex items-center gap-2 disabled:bg-slate-500 text-white">{isSaving ? 'Saving...' : <><Save size={16} /> Save</>}</button></div></form></Modal> );
};

const AlertsPanel = ({ bills, paidStatus, onClose }) => {
    const upcomingBills = useMemo(() => {
        const today = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 3);

        return bills.filter(bill => {
            if (paidStatus[bill.id]) return false;
            const dueDate = new Date(today.getFullYear(), today.getMonth(), bill.dueDay);
            return dueDate >= today && dueDate <= threeDaysFromNow;
        });
    }, [bills, paidStatus]);

    if (upcomingBills.length === 0) return null;

    return (
        <div className="bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <div className="flex items-center">
                <Bell size={20} className="mr-3" />
                <div>
                    <strong className="font-bold">Upcoming Bills!</strong>
                    <ul className="list-disc list-inside mt-1">
                        {upcomingBills.map(bill => (
                            <li key={bill.id}>{bill.name} is due on day {bill.dueDay}.</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <X size={18} />
            </button>
        </div>
    );
};


// --- Main Application Component ---
const App = () => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [jobs, setJobs] = useState([]);
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
    const [expandedVehicle, setExpandedVehicle] = useState(null);
    const [theme, setTheme] = useState('dark');
    const [searchTerm, setSearchTerm] = useState('');

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
                    INITIAL_INCOME.forEach(item => batch.set(doc(collection(db, ...basePath, 'incomes')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_WEEKLY_COSTS.forEach(item => batch.set(doc(collection(db, ...basePath, 'weeklyCosts')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_JOBS.forEach(item => batch.set(doc(collection(db, ...basePath, 'jobs')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_GOALS.forEach(item => batch.set(doc(collection(db, ...basePath, 'goals')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_CLIENTS.forEach(item => batch.set(doc(collection(db, ...basePath, 'clients')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_INVENTORY.forEach(item => batch.set(doc(collection(db, ...basePath, 'inventory')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_VEHICLES.forEach(item => batch.set(doc(collection(db, ...basePath, 'vehicles')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_MAINTENANCE_LOGS.forEach(item => batch.set(doc(collection(db, ...basePath, 'maintenanceLogs')), {...item, createdAt: serverTimestamp()}));
                    const initialMonthYear = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
                    batch.set(doc(db, ...basePath, 'paidStatus', initialMonthYear), { status: {} });
                    await batch.commit();
                    setIsSeeding(false);
                }
            } else {
                signInAnonymously(auth).catch(err => console.error("Anonymous sign-in failed:", err));
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = { bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, jobs: setJobs, goals: setGoals, clients: setClients, inventory: setInventory, vehicles: setVehicles, maintenanceLogs: setMaintenanceLogs };
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
        const dataMap = { bills: filteredBills, debts, incomes, weeklyCosts, jobs, goals: goalsWithProgress, clients, inventory, vehicles };
        let activeData = dataMap[activeSection === 'dashboard' ? 'bills' : activeSection] || [];
        
        if(searchTerm) {
            activeData = activeData.filter(item => 
                Object.values(item).some(val => 
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        return [...activeData].sort((a, b) => {
            if (!sortConfig.key) return 0;
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [filteredBills, debts, incomes, weeklyCosts, jobs, goalsWithProgress, clients, inventory, vehicles, sortConfig, activeSection, searchTerm]);

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
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs' };
        const collectionName = collectionNameMap[modalType];
        const basePath = ['artifacts', appId, 'users', userId, collectionName];

        const dataToSave = {...itemData, modifiedAt: serverTimestamp()};
        
        if (file) {
            console.log("Uploading file:", file.name);
            const storageRef = ref(storage, `receipts/${userId}/${Date.now()}-${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                dataToSave.attachmentURL = await getDownloadURL(storageRef);
            } catch (error) {
                console.error("File upload failed:", error);
                alert("File upload failed. Please try again.");
                return;
            }
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
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs' };
        const collectionName = collectionNameMap[type];
        await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
    };
    
    const handleExportCSV = (data, sectionName) => {
        if (!data.length) return;
        const headers = Object.keys(data[0]);
        const rows = data.map(item => headers.map(header => {
            const value = item[header];
            if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
            return value;
        }).join(','));
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `hvac_${sectionName}_${selectedMonthYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImportCSV = (file, type) => {
        if (!file || !userId) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target.result;
            const lines = text.split('\n').filter(line => line);
            const headers = lines[0].split(',').map(h => h.trim());
            const data = lines.slice(1).map(line => {
                const values = line.split(',').map(v => v.trim());
                return headers.reduce((obj, header, index) => {
                    const value = values[index];
                    obj[header] = isNaN(value) || value === '' ? value : parseFloat(value);
                    return obj;
                }, {});
            });

            const collectionNameMap = { client: 'clients', job: 'jobs', inventory: 'inventory' };
            const collectionName = collectionNameMap[type];
            if (!collectionName) {
                alert("Invalid import type.");
                return;
            }

            const batch = writeBatch(db);
            const collectionRef = collection(db, 'artifacts', appId, 'users', userId, collectionName);
            data.forEach(item => {
                const docRef = doc(collectionRef);
                batch.set(docRef, {...item, createdAt: serverTimestamp()});
            });

            try {
                await batch.commit();
                alert(`Successfully imported ${data.length} ${collectionName}!`);
            } catch (error) {
                console.error("Error importing CSV:", error);
                alert("Failed to import CSV. Please check the console for errors.");
            }
        };
        reader.readAsText(file);
    };

    const handleGenerateRecurring = async () => {
        if (!userId || !window.confirm("This will generate recurring transactions for next month. Continue?")) return;

        const nextMonthDate = new Date(dateRange.start);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        const nextMonthYear = nextMonthDate.getFullYear() + '-' + String(nextMonthDate.getMonth() + 1).padStart(2, '0');

        const recurringBills = bills.filter(b => b.isRecurring);
        const recurringIncomes = incomes.filter(i => i.isRecurring);
        
        const batch = writeBatch(db);

        recurringBills.forEach(bill => {
            const newBill = { ...bill, createdAt: serverTimestamp(), notes: `Generated for ${nextMonthYear}` };
            delete newBill.id; // Remove old ID
            const docRef = doc(collection(db, 'artifacts', appId, 'users', userId, 'bills'));
            batch.set(docRef, newBill);
        });

        recurringIncomes.forEach(income => {
            const newIncome = { ...income, createdAt: serverTimestamp(), notes: `Generated for ${nextMonthYear}` };
            delete newIncome.id;
            const docRef = doc(collection(db, 'artifacts', appId, 'users', userId, 'incomes'));
            batch.set(docRef, newIncome);
        });

        try {
            await batch.commit();
            alert(`Generated ${recurringBills.length} bills and ${recurringIncomes.length} incomes for next month.`);
        } catch (error) {
            console.error("Error generating recurring transactions:", error);
            alert("Failed to generate recurring transactions.");
        }
    };


    if (isLoading || isSeeding) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;

    const renderDashboard = () => (
        <>
            {showAlerts && <AlertsPanel bills={bills} paidStatus={paidStatus} onClose={() => setShowAlerts(false)} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                <StatCard title="Total Monthly Income" value={totals.totalIncome} icon={<Banknote size={24} />} color="green" />
                <StatCard title="Total Monthly Outflow" value={totals.totalOutflow} icon={<ArrowDown size={24} />} color="red" />
                <StatCard title="Projected Net" value={totals.netCashFlow} icon={<DollarSign size={24} />} color={totals.netCashFlow >= 0 ? 'cyan' : 'amber'} />
                <StatCard title="Paid This Month" value={totals.paidThisMonth} icon={<CheckCircle size={24} />} color="blue" subtext={`For ${dateRange.start.toLocaleString('default', { month: 'long', year: 'numeric' })}`} />
                <StatCard title="Outstanding Debt" value={totals.totalDebt} icon={<AlertTriangle size={24} />} color="orange" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Monthly Bills</h3>
                        {selectedCategory && <button onClick={() => setSelectedCategory(null)} className="text-sm text-cyan-500 dark:text-cyan-400 hover:underline">Clear Filter: {selectedCategory}</button>}
                        <button onClick={() => handleExportCSV(sortedData, 'bills')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                                    <th className="p-3">Notes</th>
                                    <th className="p-3">Receipt</th>
                                    <th className="p-3 cursor-pointer text-right" onClick={() => handleSort('amount')}>Amount</th>
                                    <th className="p-3 cursor-pointer text-center" onClick={() => handleSort('dueDay')}>Due Day</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map(bill => (
                                    <tr key={bill.id} className={`border-b border-slate-200 dark:border-slate-700/50 ${paidStatus[bill.id] ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                                        <td className="p-3"><button onClick={() => handleTogglePaid(bill.id)}>{paidStatus[bill.id] ? <CheckCircle className="text-green-500" /> : <Circle className="text-slate-400 dark:text-slate-600" />}</button></td>
                                        <td className={`p-3 font-medium ${paidStatus[bill.id] ? 'line-through' : ''}`}>{bill.name}</td>
                                        <td className="p-3 text-center"> {bill.notes && <div className="group relative flex justify-center"><MessageSquare size={16} className="text-slate-500" /><span className="absolute top-[-30px] w-max scale-0 transition-all rounded bg-slate-700 p-2 text-xs text-white group-hover:scale-100">{bill.notes}</span></div>} </td>
                                        <td className="p-3 text-center"> {bill.attachmentURL ? <a href={bill.attachmentURL} target="_blank" rel="noopener noreferrer"><Paperclip size={16} className="text-cyan-500 dark:text-cyan-400"/></a> : <Paperclip size={16} className="text-slate-400 dark:text-slate-600"/>} </td>
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
                    <button onClick={() => openModal('bill')} className="mt-4 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-semibold"><PlusCircle size={18} /> Add New Bill</button>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"><h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Expense Breakdown</h3><ActivePieChart data={expenseByCategory} onSliceClick={setSelectedCategory} /></div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Automations</h3>
                        <button onClick={handleGenerateRecurring} className="w-full flex items-center justify-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><RefreshCw size={16} /> Generate Next Month's Bills</button>
                    </div>
                </div>
            </div>
        </>
    );

    const renderManagementSection = (title, data, columns, type) => (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white" />
                    {(type === 'client' || type === 'job' || type === 'inventory') && <>
                        <input type="file" id="csv-importer" className="hidden" accept=".csv" onChange={e => handleImportCSV(e.target.files[0], type)} />
                        <label htmlFor="csv-importer" className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"><Upload size={16} /> Import CSV</label>
                    </>}
                    <button onClick={() => handleExportCSV(data, type)} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export CSV</button>
                </div>
            </div>
            {type === 'debt' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                        <h4 className="font-bold text-lg text-cyan-600 dark:text-cyan-400 mb-2">Avalanche Method</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Pay off debts with the highest interest rate first to save the most money over time.</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            {debtPayoffStrategies.avalanche.map(d => <li key={d.id}>{d.name} <span className="text-slate-500 dark:text-slate-400">({d.interestRate}%)</span></li>)}
                        </ol>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-green-600 dark:text-green-400 mb-2">Snowball Method</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Pay off debts with the smallest balance first for quick wins and motivation.</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            {debtPayoffStrategies.snowball.map(d => <li key={d.id}>{d.name} <span className="text-slate-500 dark:text-slate-400">(${d.remaining.toFixed(2)})</span></li>)}
                        </ol>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            {columns.map(col => <th key={col.key} className={`p-3 ${col.className || ''}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map(item => (
                            <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200">
                                {columns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal(type, item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(type, item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => openModal(type)} className="mt-4 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-semibold">
                <PlusCircle size={18} /> Add New {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        </div>
    );

    const renderPnLStatement = () => (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Profit & Loss Statement</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">For {reportingPeriod === 'monthly' ? dateRange.start.toLocaleString('default', { month: 'long', year: 'numeric' }) : `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`}</p>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <span className="font-semibold">Total Revenue (from Jobs)</span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">${pnlData.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-600 dark:text-slate-400">Cost of Goods Sold (COGS)</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400">(${pnlData.cogs.toFixed(2)})</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700"/>
                <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <span className="font-bold text-lg">Gross Profit</span>
                    <span className="font-mono font-bold text-lg">${pnlData.grossProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-600 dark:text-slate-400">Operating Expenses (Bills & Weekly)</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400">(${pnlData.operatingExpenses.toFixed(2)})</span>
                </div>
                <hr className="border-slate-300 dark:border-slate-600 border-2"/>
                <div className="flex justify-between items-center p-3 bg-slate-200 dark:bg-slate-900/50 rounded-lg">
                    <span className="font-bold text-xl">Net Profit / (Loss) Before Tax</span>
                    <span className={`font-mono font-bold text-xl ${pnlData.netProfit >= 0 ? 'text-slate-800 dark:text-white' : 'text-red-500'}`}>
                        {pnlData.netProfit < 0 && '('}${Math.abs(pnlData.netProfit).toFixed(2)}{pnlData.netProfit < 0 && ')'}
                    </span>
                </div>
                 <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-600 dark:text-slate-400">Estimated Tax Liability (6%)</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400">(${pnlData.estimatedTax.toFixed(2)})</span>
                </div>
                 <hr className="border-slate-300 dark:border-slate-600 border-2"/>
                 <div className="flex justify-between items-center p-4 bg-slate-200 dark:bg-slate-900 rounded-lg">
                    <span className="font-bold text-xl text-cyan-600 dark:text-cyan-400">Net Profit / (Loss) After Tax</span>
                    <span className={`font-mono font-bold text-xl ${pnlData.netProfitAfterTax >= 0 ? 'text-cyan-600 dark:text-cyan-400' : 'text-red-500'}`}>
                        {pnlData.netProfitAfterTax < 0 && '('}${Math.abs(pnlData.netProfitAfterTax).toFixed(2)}{pnlData.netProfitAfterTax < 0 && ')'}
                    </span>
                </div>
            </div>
        </div>
    );

    const renderGoalsSection = () => (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Financial Goals</h3>
                <button onClick={() => openModal('goal')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New Goal</button>
            </div>
            <div className="space-y-6">
                {goalsWithProgress.map(goal => (
                    <div key={goal.id}>
                        <div className="flex justify-between items-end mb-1">
                            <span className="font-semibold">{goal.name}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{goal.progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-end mt-1 text-xs text-slate-500 dark:text-slate-500">
                            <span>Target: {goal.type === 'debt' ? 'Pay Off' : `$${goal.targetValue.toLocaleString()}`}</span>
                            <span>Deadline: {goal.deadline}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderForecastSection = () => (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Cash Flow Forecast</h3>
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Enter Current Bank Balance ($)</label>
                <input 
                    type="number"
                    value={currentBankBalance}
                    onChange={(e) => setCurrentBankBalance(parseFloat(e.target.value) || 0)}
                    className="w-full max-w-xs bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"
                />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">This forecast projects your balance based on recurring income and expenses.</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `$${(value/1000)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#0891b2" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
    
    const renderReportsSection = () => (
        <ReportsSection clients={clients} jobs={jobs} bills={bills} inventory={inventory} />
    );

    const debtColumns = [ { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'interestRate', header: 'Interest Rate', className: 'text-center', render: item => <span className="font-mono">{item.interestRate || 0}%</span> }, { key: 'total', header: 'Total Amount', className: 'text-right', render: item => <span className="font-mono">${(item.totalAmount || 0).toFixed(2)}</span> }, { key: 'paid', header: 'Paid Amount', className: 'text-right', render: item => <span className="font-mono">${(item.paidAmount || 0).toFixed(2)}</span> }, { key: 'remaining', header: 'Remaining', className: 'text-right font-bold', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${((item.totalAmount || 0) - (item.paidAmount || 0)).toFixed(2)}</span> }, { key: 'progress', header: 'Progress', render: item => { const progress = item.totalAmount > 0 ? ((item.paidAmount / item.totalAmount) * 100) : 0; return <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>; }}, ];
    const incomeColumns = [ { key: 'name', header: 'Source', render: item => <span className="font-medium">{item.name}</span> }, { key: 'amount', header: 'Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-green-600 dark:text-green-400">${(item.amount || 0).toFixed(2)}</span> }, { key: 'type', header: 'Type', render: item => <span className="capitalize bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2 py-1 rounded-full">{item.type}</span> }, ];
    const weeklyCostColumns = [ { key: 'name', header: 'Item', render: item => <span className="font-medium">{item.name}</span> }, { key: 'amount', header: 'Weekly Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-red-600 dark:text-red-400">${(item.amount || 0).toFixed(2)}</span> }, ];
    const jobColumns = [ { key: 'name', header: 'Job/Client', render: item => <span className="font-medium">{item.name}</span> }, { key: 'client', header: 'Client', render: item => <span>{clients.find(c => c.id === item.clientId)?.name || 'N/A'}</span> }, { key: 'revenue', header: 'Revenue', className: 'text-right', render: item => <span className="font-mono text-green-600 dark:text-green-400">${(item.revenue || 0).toFixed(2)}</span> }, { key: 'materialCost', header: 'Material Cost', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(item.materialCost || 0).toFixed(2)}</span> }, { key: 'laborCost', header: 'Labor Cost', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(item.laborCost || 0).toFixed(2)}</span> }, { key: 'netProfit', header: 'Net Profit', className: 'text-right font-bold', render: item => <span className="font-mono text-cyan-600 dark:text-cyan-400">${((item.revenue || 0) - (item.materialCost || 0) - (item.laborCost || 0)).toFixed(2)}</span> }, ];
    const clientColumns = [ { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'address', header: 'Address', render: item => <span>{item.address}</span> }, { key: 'phone', header: 'Phone', render: item => <span>{item.phone}</span> }, { key: 'email', header: 'Email', render: item => <span>{item.email}</span> }, ];
    const inventoryColumns = [ { key: 'name', header: 'Item Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'quantity', header: 'Quantity on Hand', className: 'text-center', render: item => <span>{item.quantity}</span> }, { key: 'cost', header: 'Cost per Item', className: 'text-right', render: item => <span className="font-mono">${(item.cost || 0).toFixed(2)}</span> }, ];
    const vehicleColumns = [ { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'model', header: 'Model', render: item => <span>{item.model}</span> }, { key: 'year', header: 'Year', render: item => <span>{item.year}</span> }, { key: 'totalExpenses', header: 'Total Expenses', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(maintenanceLogs.filter(l => l.vehicleId === item.id).reduce((acc, l) => acc + l.cost, 0)).toFixed(2)}</span> }, ];

    return (
        <div className={`${theme} bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white min-h-screen font-sans`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">HVAC Financial Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Monthly Money Management</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg">
                           <span className="text-sm font-semibold">Reporting Period:</span>
                           <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                               <button onClick={() => setReportingPeriod('monthly')} className={`px-2 py-1 text-xs rounded ${reportingPeriod === 'monthly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Monthly</button>
                               <button onClick={() => setReportingPeriod('quarterly')} className={`px-2 py-1 text-xs rounded ${reportingPeriod === 'quarterly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Quarterly</button>
                               <button onClick={() => setReportingPeriod('yearly')} className={`px-2 py-1 text-xs rounded ${reportingPeriod === 'yearly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Yearly</button>
                           </div>
                        </div>
                    </div>
                </header>
                <nav className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
                    <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'dashboard' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Dashboard</button>
                    <button onClick={() => setActiveSection('reports')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'reports' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Reports</button>
                    <button onClick={() => setActiveSection('pnl')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'pnl' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>P&L Statement</button>
                    <button onClick={() => setActiveSection('forecast')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'forecast' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Forecast</button>
                    <button onClick={() => setActiveSection('goals')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'goals' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Goals</button>
                    <button onClick={() => setActiveSection('clients')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'clients' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Clients</button>
                    <button onClick={() => setActiveSection('jobs')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'jobs' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Jobs</button>
                    <button onClick={() => setActiveSection('vehicles')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'vehicles' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Vehicles</button>
                    <button onClick={() => setActiveSection('inventory')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'inventory' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Inventory</button>
                    <button onClick={() => setActiveSection('debts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'debts' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Debt Management</button>
                    <button onClick={() => setActiveSection('incomes')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incomes' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Income Sources</button>
                    <button onClick={() => setActiveSection('weeklyCosts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'weeklyCosts' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Weekly Costs</button>
                </nav>
                <main>
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'reports' && <ReportsSection clients={clients} jobs={jobs} bills={bills} inventory={inventory} />}
                    {activeSection === 'pnl' && renderPnLStatement()}
                    {activeSection === 'forecast' && renderForecastSection()}
                    {activeSection === 'goals' && renderGoalsSection()}
                    {activeSection === 'clients' && <ClientManagement clients={clients} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'jobs' && renderManagementSection('Job Profitability', sortedData, jobColumns, 'job')}
                    {activeSection === 'vehicles' && <VehicleManagement vehicles={vehicles} maintenanceLogs={maintenanceLogs} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'inventory' && renderManagementSection('Inventory', sortedData, inventoryColumns, 'inventory')}
                    {activeSection === 'debts' && renderManagementSection('Debt Management', sortedData, debtColumns, 'debt')}
                    {activeSection === 'incomes' && renderManagementSection('Income Sources', sortedData, incomeColumns, 'income')}
                    {activeSection === 'weeklyCosts' && renderManagementSection('Recurring Weekly Costs', sortedData, weeklyCostColumns, 'weekly')}
                </main>
            </div>
            {isModalOpen && <ItemFormModal item={editingItem} type={modalType} onSave={handleSave} onClose={() => setIsModalOpen(false)} debts={debts} clients={clients} vehicles={vehicles} />}
        </div>
    );
};

const VehicleManagement = ({ vehicles, maintenanceLogs, openModal, handleDelete }) => {
    const [expandedVehicleId, setExpandedVehicleId] = useState(null);

    const toggleVehicle = (id) => {
        setExpandedVehicleId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Vehicle Management</h3>
                <button onClick={() => openModal('vehicle')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New Vehicle</button>
            </div>
            <div className="space-y-2">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id}>
                        <div onClick={() => toggleVehicle(vehicle.id)} className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
                            <div className="flex items-center gap-4">
                                <Car size={24} className="text-cyan-500" />
                                <div>
                                    <p className="font-bold">{vehicle.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-mono text-orange-600 dark:text-orange-400">${(maintenanceLogs.filter(l => l.vehicleId === vehicle.id).reduce((acc, l) => acc + l.cost, 0)).toFixed(2)}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Expenses</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={(e) => { e.stopPropagation(); openModal('vehicle', vehicle); }} className="p-1 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400"><Edit size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete('vehicle', vehicle.id); }} className="p-1 text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                                {expandedVehicleId === vehicle.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>
                        {expandedVehicleId === vehicle.id && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-lg border-t-2 border-slate-200 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold">Maintenance Log</h4>
                                    <button onClick={() => openModal('maintenanceLog', { vehicleId: vehicle.id })} className="flex items-center gap-2 text-xs bg-green-600 hover:bg-green-500 text-white font-semibold px-2 py-1 rounded-md"><PlusCircle size={14} /> Add Log Entry</button>
                                </div>
                                <table className="w-full text-left text-sm">
                                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                        <tr>
                                            <th className="p-2">Date</th>
                                            <th className="p-2">Mileage</th>
                                            <th className="p-2">Work Performed</th>
                                            <th className="p-2 text-right">Cost</th>
                                            <th className="p-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {maintenanceLogs.filter(log => log.vehicleId === vehicle.id).sort((a,b) => new Date(b.date) - new Date(a.date)).map(log => (
                                            <tr key={log.id} className="border-b border-slate-200 dark:border-slate-700/50">
                                                <td className="p-2">{log.date}</td>
                                                <td className="p-2">{log.mileage?.toLocaleString() || 'N/A'}</td>
                                                <td className="p-2">{log.workPerformed}</td>
                                                <td className="p-2 text-right font-mono">${log.cost.toFixed(2)}</td>
                                                <td className="p-2 text-center">
                                                    <button onClick={() => openModal('maintenanceLog', log)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={14} /></button>
                                                    <button onClick={() => handleDelete('maintenanceLog', log.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ClientManagement = ({ clients, openModal, handleDelete }) => {
    const [expandedClientId, setExpandedClientId] = useState(null);
    const parentAccounts = clients.filter(c => !c.parentId);

    const toggleClient = (id) => {
        setExpandedClientId(prevId => (prevId === id ? null : id));
    };

    return (
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Client Management</h3>
                <button onClick={() => openModal('client')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New Client</button>
            </div>
            <div className="space-y-2">
                {parentAccounts.map(parent => (
                    <div key={parent.id} className="bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <div onClick={() => toggleClient(parent.id)} className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-t-lg">
                            <div className="flex items-center gap-4">
                                <Building size={24} className="text-cyan-500" />
                                <div>
                                    <p className="font-bold">{parent.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{parent.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                 <div className="flex gap-2">
                                    <button onClick={(e) => { e.stopPropagation(); openModal('client', parent); }} className="p-1 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400"><Edit size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete('client', parent.id); }} className="p-1 text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                                {expandedClientId === parent.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>
                        {expandedClientId === parent.id && (
                            <div className="p-4 border-t-2 border-slate-200 dark:border-slate-600">
                                <h4 className="font-bold mb-2">Service Locations:</h4>
                                {clients.filter(c => c.parentId === parent.id).map(child => (
                                    <div key={child.id} className="flex justify-between items-center p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800/50">
                                        <p>{child.name} - <span className="text-slate-500 dark:text-slate-400">{child.address}</span></p>
                                        <div className="flex gap-2">
                                            <button onClick={() => openModal('client', child)} className="p-1 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400"><Edit size={14} /></button>
                                            <button onClick={() => handleDelete('client', child.id)} className="p-1 text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                                {clients.filter(c => c.parentId === parent.id).length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No service locations for this account.</p>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default App;
