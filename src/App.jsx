import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, CheckCircle, Circle, DollarSign, Edit, FileText, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Trash2, X, XCircle } from 'lucide-react';

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
const INITIAL_BILLS = [ { name: "Adobe", amount: 21.19, dueDay: 1, isAutoPay: true, category: "Software", notes: "", attachmentURL: null, isRecurring: true }, { name: "Rent", amount: 1600, dueDay: 1, isAutoPay: false, category: "Overhead", notes: "Landlord: John Smith", attachmentURL: null, isRecurring: true }, ];
const INITIAL_DEBTS = [ { name: "Ondeck Credit", totalAmount: 7500, paidAmount: 0, interestRate: 12.5, notes: "" }, { name: "Chase Card", totalAmount: 33795.27, paidAmount: 2200, interestRate: 21.99, notes: "" },];
const INITIAL_INCOME = [ { name: "NEST Early Pay", amount: 15000, type: "monthly", notes: "", isRecurring: true }, { name: "Job Revenue", amount: 5000, type: "monthly", notes: "", isRecurring: false },];
const INITIAL_WEEKLY_COSTS = [ { name: "Projected Payroll", amount: 1800, notes: "" }, { name: "Fuel & Maintenance", amount: 450, notes: "" },];
const INITIAL_JOBS = [ { name: "Johnson Residence A/C Install", revenue: 8500, materialCost: 3200, laborCost: 1500, notes: "Trane XV20i unit.", date: new Date().toISOString() }, { name: "Downtown Restaurant PM", revenue: 1200, materialCost: 150, laborCost: 400, notes: "Quarterly maintenance contract.", date: new Date().toISOString() }];

// --- Helper Components ---
const Modal = ({ children, onClose }) => ( <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"> <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md m-4 relative border border-slate-700"> <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"> <X size={24} /> </button> <div className="p-6">{children}</div> </div> </div>);
const StatCard = ({ title, value, icon, color, subtext }) => ( <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-between"> <div className="flex items-center justify-between"> <h3 className="text-sm font-medium text-slate-400">{title}</h3> <div className={`text-${color}-400`}>{icon}</div> </div> <div> <p className="text-3xl font-bold text-white mt-2">{typeof value === 'number' ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}</p> {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>} </div> </div>);
const ActivePieChart = ({ data, onSliceClick }) => { const [activeIndex, setActiveIndex] = useState(0); const onPieEnter = useCallback((_, index) => { setActiveIndex(index); }, [setActiveIndex]); const renderActiveShape = (props) => { const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props; return ( <g className="cursor-pointer" onClick={() => onSliceClick(payload.name)}> <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg"> {payload.name} </text> <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} /> </g> ); }; return ( <ResponsiveContainer width="100%" height={300}> <PieChart> <Tooltip contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem' }} labelStyle={{ color: '#cbd5e1' }} itemStyle={{ color: '#f1f5f9' }} formatter={(value) => `$${value.toFixed(2)}`} /> <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" dataKey="value" onMouseEnter={onPieEnter} onClick={(data) => onSliceClick(data.name)} > {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.color} /> ))} </Pie> </PieChart> </ResponsiveContainer> );};

const ItemFormModal = ({ item, type, onSave, onClose }) => {
    const [formData, setFormData] = useState({});
    const [fileToUpload, setFileToUpload] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const defaults = { bill: { name: '', amount: 0, dueDay: 1, isAutoPay: false, category: 'General', notes: '', attachmentURL: null, isRecurring: false }, debt: { name: '', totalAmount: 0, paidAmount: 0, interestRate: 0, notes: '' }, income: { name: '', amount: 0, type: 'monthly', notes: '', isRecurring: false }, weekly: { name: '', amount: 0, notes: '' }, job: { name: '', revenue: 0, materialCost: 0, laborCost: 0, notes: '', date: new Date().toISOString().split('T')[0] }, };
        setFormData(item || defaults[type]);
    }, [item, type]);

    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value) })); };
    const handleFileChange = (e) => { if (e.target.files[0]) { setFileToUpload(e.target.files[0]); } };
    
    const handleSubmit = async (e) => { e.preventDefault(); setIsSaving(true); await onSave(formData, fileToUpload); setIsSaving(false); };

    const renderFields = () => {
        switch (type) {
            case 'bill': return <> <div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Bill Name</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div> <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-medium text-slate-300 mb-1">Amount</label><input type="number" name="amount" value={formData.amount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div><div><label className="block text-sm font-medium text-slate-300 mb-1">Due Day</label><input type="number" name="dueDay" min="1" max="31" value={formData.dueDay || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div></div> <div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Category</label><input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" /></div><div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Notes</label><textarea name="notes" value={formData.notes || ''} onChange={handleChange} rows="2" className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"></textarea></div><div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Attach Receipt (Optional)</label><input type="file" onChange={handleFileChange} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/></div> <div className="flex justify-between items-center"><div className="flex items-center"><input type="checkbox" id="isAutoPay" name="isAutoPay" checked={formData.isAutoPay || false} onChange={handleChange} className="h-4 w-4 rounded" /><label htmlFor="isAutoPay" className="ml-2 text-sm text-slate-300">Enabled for Autopay</label></div><div className="flex items-center"><input type="checkbox" id="isRecurring" name="isRecurring" checked={formData.isRecurring || false} onChange={handleChange} className="h-4 w-4 rounded" /><label htmlFor="isRecurring" className="ml-2 text-sm text-slate-300">Is Recurring?</label></div></div> </>;
            case 'job': return <> <div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Job Name/Client</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div> <div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Job Date</label><input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" /></div> <div className="grid grid-cols-3 gap-4 mb-4"><div><label className="block text-sm font-medium text-slate-300 mb-1">Revenue</label><input type="number" name="revenue" value={formData.revenue || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" /></div><div><label className="block text-sm font-medium text-slate-300 mb-1">Material Cost</label><input type="number" name="materialCost" value={formData.materialCost || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" /></div><div><label className="block text-sm font-medium text-slate-300 mb-1">Labor Cost</label><input type="number" name="laborCost" value={formData.laborCost || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" /></div></div><div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Notes</label><textarea name="notes" value={formData.notes || ''} onChange={handleChange} rows="3" className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"></textarea></div></>;
            default: return <p>Editing for this item type is not yet implemented.</p>;
        }
    };
    return ( <Modal onClose={onClose}><form onSubmit={handleSubmit}><h2 className="text-xl font-bold text-white mb-4">{item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>{renderFields()}<div className="flex justify-end gap-3 mt-6"><button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-600">Cancel</button><button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md bg-cyan-600 flex items-center gap-2 disabled:bg-slate-500">{isSaving ? 'Saving...' : <><Save size={16} /> Save</>}</button></div></form></Modal> );
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
    const [paidStatus, setPaidStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [sortConfig, setSortConfig] = useState({ key: 'dueDay', direction: 'ascending' });
    const [activeSection, setActiveSection] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const selectedMonthYear = useMemo(() => selectedDate.getFullYear() + '-' + String(selectedDate.getMonth() + 1).padStart(2, '0'), [selectedDate]);

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
        const collectionsToWatch = { bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, jobs: setJobs };
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

    const filteredJobs = useMemo(() => jobs.filter(job => job.date && job.date.startsWith(selectedMonthYear)), [jobs, selectedMonthYear]);
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
        const revenue = filteredJobs.reduce((acc, job) => acc + job.revenue, 0);
        const cogs = filteredJobs.reduce((acc, job) => acc + job.materialCost + job.laborCost, 0);
        const grossProfit = revenue - cogs;
        const operatingExpenses = bills.reduce((acc, bill) => acc + bill.amount, 0) + (weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * 4.33);
        const netProfit = grossProfit - operatingExpenses;
        return { revenue, cogs, grossProfit, operatingExpenses, netProfit };
    }, [filteredJobs, bills, weeklyCosts]);

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
        const dataMap = { bills: filteredBills, debts, incomes, weeklyCosts, jobs };
        const activeData = dataMap[activeSection === 'dashboard' ? 'bills' : activeSection] || [];
        return [...activeData].sort((a, b) => {
            if (!sortConfig.key) return 0;
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [filteredBills, debts, incomes, weeklyCosts, jobs, sortConfig, activeSection]);

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
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs' };
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
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs' };
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

    if (isLoading || isSeeding) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;

    const renderDashboard = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                <StatCard title="Total Monthly Income" value={totals.totalIncome} icon={<Banknote size={24} />} color="green" />
                <StatCard title="Total Monthly Outflow" value={totals.totalOutflow} icon={<ArrowDown size={24} />} color="red" />
                <StatCard title="Projected Net" value={totals.netCashFlow} icon={<DollarSign size={24} />} color={totals.netCashFlow >= 0 ? 'cyan' : 'amber'} />
                <StatCard title="Paid This Month" value={totals.paidThisMonth} icon={<CheckCircle size={24} />} color="blue" subtext={`For ${selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`} />
                <StatCard title="Outstanding Debt" value={totals.totalDebt} icon={<AlertTriangle size={24} />} color="orange" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Monthly Bills</h3>
                        {selectedCategory && <button onClick={() => setSelectedCategory(null)} className="text-sm text-cyan-400 hover:underline">Clear Filter: {selectedCategory}</button>}
                        <button onClick={() => handleExportCSV(sortedData, 'bills')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
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
                                    <tr key={bill.id} className={`border-b border-slate-700/50 ${paidStatus[bill.id] ? 'text-slate-500' : 'text-slate-200'}`}>
                                        <td className="p-3"><button onClick={() => handleTogglePaid(bill.id)}>{paidStatus[bill.id] ? <CheckCircle className="text-green-500" /> : <Circle className="text-slate-600" />}</button></td>
                                        <td className={`p-3 font-medium ${paidStatus[bill.id] ? 'line-through' : ''}`}>{bill.name}</td>
                                        <td className="p-3 text-center"> {bill.notes && <div className="group relative flex justify-center"><MessageSquare size={16} className="text-slate-500" /><span className="absolute top-[-30px] w-max scale-0 transition-all rounded bg-slate-700 p-2 text-xs text-white group-hover:scale-100">{bill.notes}</span></div>} </td>
                                        <td className="p-3 text-center"> {bill.attachmentURL ? <a href={bill.attachmentURL} target="_blank" rel="noopener noreferrer"><Paperclip size={16} className="text-cyan-400"/></a> : <Paperclip size={16} className="text-slate-600"/>} </td>
                                        <td className="p-3 text-right font-mono">${(bill.amount || 0).toFixed(2)}</td>
                                        <td className="p-3 text-center">{bill.dueDay}</td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => openModal('bill', bill)} className="text-slate-400 hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete('bill', bill.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={() => openModal('bill')} className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"><PlusCircle size={18} /> Add New Bill</button>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700"><h3 className="text-xl font-bold text-white mb-4">Expense Breakdown</h3><ActivePieChart data={expenseByCategory} onSliceClick={setSelectedCategory} /></div>
                </div>
            </div>
        </>
    );

    const renderManagementSection = (title, data, columns, type) => (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button onClick={() => handleExportCSV(data, type)} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
            </div>
            {type === 'debt' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div>
                        <h4 className="font-bold text-lg text-cyan-400 mb-2">Avalanche Method</h4>
                        <p className="text-xs text-slate-400 mb-3">Pay off debts with the highest interest rate first to save the most money over time.</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            {debtPayoffStrategies.avalanche.map(d => <li key={d.id}>{d.name} <span className="text-slate-400">({d.interestRate}%)</span></li>)}
                        </ol>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-green-400 mb-2">Snowball Method</h4>
                        <p className="text-xs text-slate-400 mb-3">Pay off debts with the smallest balance first for quick wins and motivation.</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            {debtPayoffStrategies.snowball.map(d => <li key={d.id}>{d.name} <span className="text-slate-400">(${d.remaining.toFixed(2)})</span></li>)}
                        </ol>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
                        <tr>
                            {columns.map(col => <th key={col.key} className={`p-3 ${col.className || ''}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map(item => (
                            <tr key={item.id} className="border-b border-slate-700/50 text-slate-200">
                                {columns.map(col => <td key={col.key} className={`p-3 ${col.className || ''}`}>{col.render(item)}</td>)}
                                <td className="p-3 text-center">
                                    <button onClick={() => openModal(type, item)} className="text-slate-400 hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(type, item.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => openModal(type)} className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold">
                <PlusCircle size={18} /> Add New {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        </div>
    );

    const renderPnLStatement = () => (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">Profit & Loss Statement</h3>
            <p className="text-slate-400 mb-6">For {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <span className="font-semibold">Total Revenue</span>
                    <span className="font-mono font-bold text-green-400">${pnlData.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-400">Cost of Goods Sold (COGS)</span>
                    <span className="font-mono text-orange-400">(${pnlData.cogs.toFixed(2)})</span>
                </div>
                <hr className="border-slate-700"/>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <span className="font-bold text-lg">Gross Profit</span>
                    <span className="font-mono font-bold text-lg">${pnlData.grossProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-400">Operating Expenses</span>
                    <span className="font-mono text-orange-400">(${pnlData.operatingExpenses.toFixed(2)})</span>
                </div>
                <hr className="border-slate-600 border-2"/>
                <div className="flex justify-between items-center p-4 bg-slate-900 rounded-lg">
                    <span className="font-bold text-xl text-cyan-400">Net Profit / (Loss)</span>
                    <span className={`font-mono font-bold text-xl ${pnlData.netProfit >= 0 ? 'text-cyan-400' : 'text-red-500'}`}>
                        {pnlData.netProfit < 0 && '('}${Math.abs(pnlData.netProfit).toFixed(2)}{pnlData.netProfit < 0 && ')'}
                    </span>
                </div>
            </div>
        </div>
    );

    const debtColumns = [ { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'interestRate', header: 'Interest Rate', className: 'text-center', render: item => <span className="font-mono">{item.interestRate || 0}%</span> }, { key: 'total', header: 'Total Amount', className: 'text-right', render: item => <span className="font-mono">${(item.totalAmount || 0).toFixed(2)}</span> }, { key: 'paid', header: 'Paid Amount', className: 'text-right', render: item => <span className="font-mono">${(item.paidAmount || 0).toFixed(2)}</span> }, { key: 'remaining', header: 'Remaining', className: 'text-right font-bold', render: item => <span className="font-mono text-orange-400">${((item.totalAmount || 0) - (item.paidAmount || 0)).toFixed(2)}</span> }, { key: 'progress', header: 'Progress', render: item => { const progress = item.totalAmount > 0 ? ((item.paidAmount / item.totalAmount) * 100) : 0; return <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>; }}, ];
    const incomeColumns = [ { key: 'name', header: 'Source', render: item => <span className="font-medium">{item.name}</span> }, { key: 'amount', header: 'Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-green-400">${(item.amount || 0).toFixed(2)}</span> }, { key: 'type', header: 'Type', render: item => <span className="capitalize bg-slate-700 text-slate-300 text-xs font-medium px-2 py-1 rounded-full">{item.type}</span> }, ];
    const weeklyCostColumns = [ { key: 'name', header: 'Item', render: item => <span className="font-medium">{item.name}</span> }, { key: 'amount', header: 'Weekly Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-red-400">${(item.amount || 0).toFixed(2)}</span> }, ];
    const jobColumns = [ { key: 'name', header: 'Job/Client', render: item => <span className="font-medium">{item.name}</span> }, { key: 'revenue', header: 'Revenue', className: 'text-right', render: item => <span className="font-mono text-green-400">${(item.revenue || 0).toFixed(2)}</span> }, { key: 'materialCost', header: 'Material Cost', className: 'text-right', render: item => <span className="font-mono text-orange-400">${(item.materialCost || 0).toFixed(2)}</span> }, { key: 'laborCost', header: 'Labor Cost', className: 'text-right', render: item => <span className="font-mono text-orange-400">${(item.laborCost || 0).toFixed(2)}</span> }, { key: 'netProfit', header: 'Net Profit', className: 'text-right font-bold', render: item => <span className="font-mono text-cyan-400">${((item.revenue || 0) - (item.materialCost || 0) - (item.laborCost || 0)).toFixed(2)}</span> }, ];

    return (
        <div className="bg-slate-900 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">HVAC Financial Dashboard</h1>
                        <p className="text-slate-400 mt-1">Monthly Money Management</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 border border-slate-700 p-2 rounded-lg">
                       <span className="text-sm font-semibold text-slate-300">Selected Month:</span>
                       <input 
                            type="month" 
                            value={selectedMonthYear}
                            onChange={(e) => setSelectedDate(new Date(e.target.value + '-02'))}
                            className="bg-slate-700 text-white rounded-md p-2 border-none focus:ring-2 focus:ring-cyan-500"
                       />
                    </div>
                </header>
                <nav className="flex items-center border-b border-slate-700 mb-6">
                    <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'dashboard' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Dashboard</button>
                    <button onClick={() => setActiveSection('pnl')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'pnl' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>P&L Statement</button>
                    <button onClick={() => setActiveSection('jobs')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'jobs' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Jobs</button>
                    <button onClick={() => setActiveSection('debts')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'debts' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Debt Management</button>
                    <button onClick={() => setActiveSection('incomes')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'incomes' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Income Sources</button>
                    <button onClick={() => setActiveSection('weeklyCosts')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'weeklyCosts' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Weekly Costs</button>
                </nav>
                <main>
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'pnl' && renderPnLStatement()}
                    {activeSection === 'jobs' && renderManagementSection('Job Profitability', sortedData, jobColumns, 'job')}
                    {activeSection === 'debts' && renderManagementSection('Debt Management', sortedData, debtColumns, 'debt')}
                    {activeSection === 'incomes' && renderManagementSection('Income Sources', sortedData, incomeColumns, 'income')}
                    {activeSection === 'weeklyCosts' && renderManagementSection('Recurring Weekly Costs', sortedData, weeklyCostColumns, 'weekly')}
                </main>
            </div>
            {isModalOpen && <ItemFormModal item={editingItem} type={modalType} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default App;
