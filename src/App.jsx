import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query } from 'firebase/firestore';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, CheckCircle, Circle, DollarSign, Edit, PlusCircle, Save, Trash2, X } from 'lucide-react';

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

// --- Initial Data (Seed for first-time use) ---
const INITIAL_BILLS = [ { name: "Adobe", amount: 21.19, dueDay: 1, isAutoPay: true, category: "Software" }, { name: "Rent", amount: 1600, dueDay: 1, isAutoPay: false, category: "Overhead" }, { name: "Blue Cross Blue Shield", amount: 397.73, dueDay: 1, isAutoPay: true, category: "Insurance" }, { name: "CEO Warrior", amount: 1125, dueDay: 1, isAutoPay: false, category: "Training" }, { name: "Google Drive", amount: 99.99, dueDay: 2, isAutoPay: true, category: "Software" }, { name: "GM Financial Black Truck", amount: 1307.20, dueDay: 6, isAutoPay: false, category: "Vehicle" }, { name: "Chase CC Payment", amount: 500.00, dueDay: 7, isAutoPay: true, category: "Debt" }, { name: "Consumers Energy", amount: 386.51, dueDay: 10, isAutoPay: true, category: "Utilities" }, { name: "Corporate Fleet Service", amount: 1407.00, dueDay: 11, isAutoPay: true, category: "Vehicle" }, { name: "Comcast Internet", amount: 249.92, dueDay: 20, isAutoPay: true, category: "Utilities" }, { name: "Website", amount: 65.00, dueDay: 20, isAutoPay: false, category: "Marketing" }, { name: "Flat Rate", amount: 158, dueDay: 21, isAutoPay: false, category: "Software" }, { name: "Frankenmuth Insurance", amount: 2799.36, dueDay: 21, isAutoPay: true, category: "Insurance" }, { name: "Junk-B-Gone", amount: 250, dueDay: 25, isAutoPay: true, category: "Services" }, { name: "GM Financial Red Van", amount: 853.73, dueDay: 25, isAutoPay: false, category: "Vehicle" }, { name: "DTE", amount: 163, dueDay: 27, isAutoPay: false, category: "Utilities" }, { name: "ADT", amount: 60.22, dueDay: 29, isAutoPay: false, category: "Security" }, { name: "Verizon", amount: 302.07, dueDay: 29, isAutoPay: true, category: "Utilities" }, { name: "EcoTrak", amount: 1.00, dueDay: 1, isAutoPay: false, category: "Software" }, { name: "Southfield Tax", amount: 175.64, dueDay: 31, isAutoPay: false, category: "Taxes" }, { name: "Podium", amount: 499.00, dueDay: 2, isAutoPay: false, category: "Marketing" }, ];
const INITIAL_DEBTS = [ { name: "Ondeck Credit", totalAmount: 7500, paidAmount: 0, interestRate: 12.5 }, { name: "Chase Card", totalAmount: 33795.27, paidAmount: 2200, interestRate: 21.99 }, { name: "Great Lakes", totalAmount: 1200, paidAmount: 0, interestRate: 6.8 },];
const INITIAL_INCOME = [ { name: "NEST Early Pay", amount: 15000, type: "monthly" }, { name: "Job Revenue", amount: 5000, type: "monthly" },];
const INITIAL_WEEKLY_COSTS = [ { name: "Projected Payroll", amount: 1800 }, { name: "Fuel & Maintenance", amount: 450 },];

// --- Helper Components ---
const Modal = ({ children, onClose }) => ( <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"> <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md m-4 relative border border-slate-700"> <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"> <X size={24} /> </button> <div className="p-6">{children}</div> </div> </div>);
const StatCard = ({ title, value, icon, color, subtext }) => ( <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-between"> <div className="flex items-center justify-between"> <h3 className="text-sm font-medium text-slate-400">{title}</h3> <div className={`text-${color}-400`}>{icon}</div> </div> <div> <p className="text-3xl font-bold text-white mt-2">{typeof value === 'number' ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}</p> {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>} </div> </div>);
const ActivePieChart = ({ data }) => { const [activeIndex, setActiveIndex] = useState(0); const onPieEnter = useCallback((_, index) => { setActiveIndex(index); }, [setActiveIndex]); const renderActiveShape = (props) => { const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props; return ( <g> <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg"> {payload.name} </text> <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} /> <text x={cx} y={cy - 110} textAnchor="middle" fill="#fff" className="text-2xl font-bold">{`$${value.toFixed(2)}`}</text> <text x={cx} y={cy - 85} textAnchor="middle" fill="#999">{`(Rate ${(percent * 100).toFixed(2)}%)`}</text> </g> ); }; return ( <ResponsiveContainer width="100%" height={300}> <PieChart> <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" dataKey="value" onMouseEnter={onPieEnter} > {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.color} /> ))} </Pie> </PieChart> </ResponsiveContainer> );};

// --- Main Application Component ---
const App = () => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [paidStatus, setPaidStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [sortConfig, setSortConfig] = useState({ key: 'dueDay', direction: 'ascending' });
    const currentMonthYear = useMemo(() => new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'), []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const billsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'bills');
                const billsSnapshot = await getDocs(billsRef);
                if (billsSnapshot.empty) {
                    console.log("Seeding initial data...");
                    const batch = writeBatch(db);
                    const basePath = ['artifacts', appId, 'users', user.uid];
                    INITIAL_BILLS.forEach(bill => batch.set(doc(collection(db, ...basePath, 'bills')), bill));
                    INITIAL_DEBTS.forEach(debt => batch.set(doc(collection(db, ...basePath, 'debts')), debt));
                    INITIAL_INCOME.forEach(income => batch.set(doc(collection(db, ...basePath, 'incomes')), income));
                    INITIAL_WEEKLY_COSTS.forEach(cost => batch.set(doc(collection(db, ...basePath, 'weeklyCosts')), cost));
                    batch.set(doc(db, ...basePath, 'paidStatus', currentMonthYear), { status: {} });
                    await batch.commit();
                }
            } else {
                signInAnonymously(auth).catch(err => console.error("Anonymous sign-in failed:", err));
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [currentMonthYear]);

    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = { bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts };
        const unsubscribers = Object.entries(collectionsToWatch).map(([colName, setter]) => 
            onSnapshot(query(collection(db, 'artifacts', appId, 'users', userId, colName)), (snapshot) => {
                setter(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }, err => console.error(`Error fetching ${colName}:`, err))
        );
        const unsubPaidStatus = onSnapshot(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', currentMonthYear), (doc) => {
            setPaidStatus(doc.exists() ? doc.data().status : {});
        }, err => console.error("Error fetching paid status:", err));
        return () => { unsubscribers.forEach(unsub => unsub()); unsubPaidStatus(); };
    }, [userId, currentMonthYear]);

    const totals = useMemo(() => {
        const totalIncome = incomes.reduce((acc, i) => acc + (i.amount || 0), 0);
        const totalMonthlyBills = bills.reduce((acc, b) => acc + (b.amount || 0), 0);
        const projectedMonthlyWeekly = weeklyCosts.reduce((acc, c) => acc + (c.amount || 0), 0) * 4.33;
        const totalOutflow = totalMonthlyBills + projectedMonthlyWeekly;
        const netCashFlow = totalIncome - totalOutflow;
        const totalDebt = debts.reduce((acc, d) => acc + ((d.totalAmount || 0) - (d.paidAmount || 0)), 0);
        const paidThisMonth = bills.filter(b => paidStatus[b.id]).reduce((acc, b) => acc + b.amount, 0);
        return { totalIncome, totalOutflow, netCashFlow, paidThisMonth, totalDebt };
    }, [bills, debts, incomes, weeklyCosts, paidStatus]);

    const expenseByCategory = useMemo(() => {
        const categories = bills.reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];
        return Object.entries(categories).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] })).sort((a, b) => b.value - a.value);
    }, [bills]);

    const sortedBills = useMemo(() => [...bills].sort((a, b) => {
        const valA = a[sortConfig.key]; const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    }), [bills, sortConfig]);

    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending' }));
    const handleTogglePaid = async (billId) => { if (!userId) return; await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', currentMonthYear), { status: { ...paidStatus, [billId]: !paidStatus[billId] } }, { merge: true }); };
    const openModal = (type, item = null) => { setModalType(type); setEditingItem(item); setIsModalOpen(true); };
    const handleSave = async (itemData) => { if (!userId) return; const collectionName = `${modalType}s`; const basePath = ['artifacts', appId, 'users', userId, collectionName]; if (editingItem?.id) { await updateDoc(doc(db, ...basePath, editingItem.id), itemData); } else { await addDoc(collection(db, ...basePath), itemData); } setIsModalOpen(false); setEditingItem(null); };
    const handleDelete = async (type, id) => { if (!userId || !window.confirm("Delete this item?")) return; await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, `${type}s`, id)); };

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;

    const renderDashboard = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                <StatCard title="Total Monthly Income" value={totals.totalIncome} icon={<Banknote size={24} />} color="green" />
                <StatCard title="Total Monthly Outflow" value={totals.totalOutflow} icon={<ArrowDown size={24} />} color="red" />
                <StatCard title="Projected Net" value={totals.netCashFlow} icon={<DollarSign size={24} />} color={totals.netCashFlow >= 0 ? 'cyan' : 'amber'} />
                <StatCard title="Paid This Month" value={totals.paidThisMonth} icon={<CheckCircle size={24} />} color="blue" />
                <StatCard title="Outstanding Debt" value={totals.totalDebt} icon={<AlertTriangle size={24} />} color="orange" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">Monthly Bills</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
                                <tr>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                                    <th className="p-3 cursor-pointer text-right" onClick={() => handleSort('amount')}>Amount</th>
                                    <th className="p-3 cursor-pointer text-center" onClick={() => handleSort('dueDay')}>Due Day</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedBills.map(bill => (
                                    <tr key={bill.id} className={`border-b border-slate-700/50 ${paidStatus[bill.id] ? 'text-slate-500' : 'text-slate-200'}`}>
                                        <td className="p-3"><button onClick={() => handleTogglePaid(bill.id)}>{paidStatus[bill.id] ? <CheckCircle className="text-green-500" /> : <Circle className="text-slate-600" />}</button></td>
                                        <td className={`p-3 font-medium ${paidStatus[bill.id] ? 'line-through' : ''}`}>{bill.name}</td>
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
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700"><h3 className="text-xl font-bold text-white mb-4">Expense Breakdown</h3><ActivePieChart data={expenseByCategory} /></div>
                </div>
            </div>
        </>
    );
    return (
        <div className="bg-slate-900 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6"><h1 className="text-3xl font-bold text-white">HVAC Financial Dashboard</h1></header>
                {renderDashboard()}
            </div>
            {isModalOpen && <ItemFormModal item={editingItem} type={modalType} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};
const ItemFormModal = ({ item, type, onSave, onClose }) => {
    const [formData, setFormData] = useState({});
    useEffect(() => {
        const defaults = { bill: { name: '', amount: 0, dueDay: 1, isAutoPay: false, category: 'General' }, debt: { name: '', totalAmount: 0, paidAmount: 0 }, income: { name: '', amount: 0, type: 'monthly' }, weeklyCost: { name: '', amount: 0 }, };
        setFormData(item || defaults[type]);
    }, [item, type]);
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value) })); };
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    const renderFields = () => {
        switch (type) {
            case 'bill': return <> <div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Bill Name</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div> <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-medium text-slate-300 mb-1">Amount</label><input type="number" name="amount" value={formData.amount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div><div><label className="block text-sm font-medium text-slate-300 mb-1">Due Day</label><input type="number" name="dueDay" min="1" max="31" value={formData.dueDay || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required /></div></div> <div className="mb-4"><label className="block text-sm font-medium text-slate-300 mb-1">Category</label><input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" /></div> <div className="flex items-center"><input type="checkbox" id="isAutoPay" name="isAutoPay" checked={formData.isAutoPay || false} onChange={handleChange} className="h-4 w-4 rounded" /><label htmlFor="isAutoPay" className="ml-2 text-sm text-slate-300">Enabled for Autopay</label></div> </>;
            default: return null;
        }
    };
    return ( <Modal onClose={onClose}><form onSubmit={handleSubmit}><h2 className="text-xl font-bold text-white mb-4">{item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>{renderFields()}<div className="flex justify-end gap-3 mt-6"><button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-600">Cancel</button><button type="submit" className="px-4 py-2 rounded-md bg-cyan-600 flex items-center gap-2"><Save size={16} /> Save</button></div></form></Modal> );
};
export default App;
