import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Calendar, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, PlusCircle, Save, Trash2, X, XCircle } from 'lucide-react';

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
const INITIAL_BILLS = [
    { name: "Adobe", amount: 21.19, dueDay: 1, isAutoPay: true, category: "Software" },
    { name: "Rent", amount: 1600, dueDay: 1, isAutoPay: false, category: "Overhead" },
    { name: "Blue Cross Blue Shield", amount: 397.73, dueDay: 1, isAutoPay: true, category: "Insurance" },
    { name: "CEO Warrior", amount: 1125, dueDay: 1, isAutoPay: false, category: "Training" },
    { name: "Google Drive", amount: 99.99, dueDay: 2, isAutoPay: true, category: "Software" },
    { name: "GM Financial Black Truck", amount: 1307.20, dueDay: 6, isAutoPay: false, category: "Vehicle" },
    { name: "Chase CC Payment", amount: 500.00, dueDay: 7, isAutoPay: true, category: "Debt" },
    { name: "Consumers Energy", amount: 386.51, dueDay: 10, isAutoPay: true, category: "Utilities" },
    { name: "Corporate Fleet Service", amount: 1407.00, dueDay: 11, isAutoPay: true, category: "Vehicle" },
    { name: "Comcast Internet", amount: 249.92, dueDay: 20, isAutoPay: true, category: "Utilities" },
    { name: "Website", amount: 65.00, dueDay: 20, isAutoPay: false, category: "Marketing" },
    { name: "Flat Rate", amount: 158, dueDay: 21, isAutoPay: false, category: "Software" },
    { name: "Frankenmuth Insurance", amount: 2799.36, dueDay: 21, isAutoPay: true, category: "Insurance" },
    { name: "Junk-B-Gone", amount: 250, dueDay: 25, isAutoPay: true, category: "Services" },
    { name: "GM Financial Red Van", amount: 853.73, dueDay: 25, isAutoPay: false, category: "Vehicle" },
    { name: "DTE", amount: 163, dueDay: 27, isAutoPay: false, category: "Utilities" },
    { name: "ADT", amount: 60.22, dueDay: 29, isAutoPay: false, category: "Security" },
    { name: "Verizon", amount: 302.07, dueDay: 29, isAutoPay: true, category: "Utilities" },
    { name: "EcoTrak", amount: 1.00, dueDay: 1, isAutoPay: false, category: "Software" },
    { name: "Southfield Tax", amount: 175.64, dueDay: 31, isAutoPay: false, category: "Taxes" },
    { name: "Podium", amount: 499.00, dueDay: 2, isAutoPay: false, category: "Marketing" },
];

const INITIAL_DEBTS = [
    { name: "Ondeck Credit", totalAmount: 7500, paidAmount: 0, interestRate: 12.5 },
    { name: "Chase Card", totalAmount: 33795.27, paidAmount: 2200, interestRate: 21.99 },
    { name: "Great Lakes", totalAmount: 1200, paidAmount: 0, interestRate: 6.8 },
];

const INITIAL_INCOME = [
    { name: "NEST Early Pay", amount: 15000, type: "monthly" },
    { name: "Job Revenue", amount: 5000, type: "monthly" },
];

const INITIAL_WEEKLY_COSTS = [
    { name: "Projected Payroll", amount: 1800 },
    { name: "Fuel & Maintenance", amount: 450 },
];

// --- Helper Components ---

const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in">
        <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md m-4 relative border border-slate-700">
            <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const StatCard = ({ title, value, icon, color, subtext }) => (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-400">{title}</h3>
            <div className={`text-${color}-400`}>{icon}</div>
        </div>
        <div>
            <p className="text-3xl font-bold text-white mt-2">{typeof value === 'number' ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}</p>
            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
        </div>
    </div>
);

const ActivePieChart = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = useCallback((_, index) => {
        setActiveIndex(index);
    }, [setActiveIndex]);

    const renderActiveShape = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`$${value.toFixed(2)}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};


// --- Main Application Component ---
const App = () => {
    // --- State Management ---
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);

    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [weeklyCosts, setWeeklyCosts] = useState([]);
    const [paidStatus, setPaidStatus] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill'); // 'bill', 'debt', 'income', 'weekly'

    const [sortConfig, setSortConfig] = useState({ key: 'dueDay', direction: 'ascending' });
    const [activeSection, setActiveSection] = useState('dashboard');

    const currentMonthYear = useMemo(() => {
        const now = new Date();
        return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
    }, []);

    // --- Firebase Authentication & Data Seeding ---
    useEffect(() => {
        const authCheck = async () => {
            try {
                const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                if (token) {
                    await signInWithCustomToken(auth, token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Authentication Error:", error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);

                // Check if data exists using the correct private user path. If not, seed it.
                const billsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'bills');
                const billsSnapshot = await getDocs(billsRef);
                if (billsSnapshot.empty) {
                    setIsSeeding(true);
                    console.log("No data found. Seeding initial data...");
                    const batch = writeBatch(db);
                    const basePath = ['artifacts', appId, 'users', user.uid];

                    INITIAL_BILLS.forEach(bill => {
                        const newBillRef = doc(collection(db, ...basePath, 'bills'));
                        batch.set(newBillRef, bill);
                    });
                    INITIAL_DEBTS.forEach(debt => {
                        const newDebtRef = doc(collection(db, ...basePath, 'debts'));
                        batch.set(newDebtRef, debt);
                    });
                    INITIAL_INCOME.forEach(income => {
                        const newIncomeRef = doc(collection(db, ...basePath, 'incomes'));
                        batch.set(newIncomeRef, income);
                    });
                    INITIAL_WEEKLY_COSTS.forEach(cost => {
                        const newCostRef = doc(collection(db, ...basePath, 'weeklyCosts'));
                        batch.set(newCostRef, cost);
                    });

                    const paidStatusRef = doc(db, ...basePath, 'paidStatus', currentMonthYear);
                    batch.set(paidStatusRef, { status: {} });

                    await batch.commit();
                    console.log("Seeding complete.");
                    setIsSeeding(false);
                }
            } else {
                setUserId(null);
            }
            setIsLoading(false);
        });

        authCheck();
        return () => unsubscribe();
    }, [currentMonthYear]);

    // --- Firebase Data Listeners ---
    useEffect(() => {
        if (!userId) return;

        const collectionsToWatch = ['bills', 'debts', 'incomes', 'weeklyCosts'];
        const unsubscribers = collectionsToWatch.map(colName => {
            // Use the correct private user path for listening to data
            const q = query(collection(db, 'artifacts', appId, 'users', userId, colName));
            return onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                switch (colName) {
                    case 'bills': setBills(data); break;
                    case 'debts': setDebts(data); break;
                    case 'incomes': setIncomes(data); break;
                    case 'weeklyCosts': setWeeklyCosts(data); break;
                }
            }, err => console.error(`Error fetching ${colName}:`, err));
        });

        const paidStatusRef = doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', currentMonthYear);
        const unsubPaidStatus = onSnapshot(paidStatusRef, (doc) => {
            setPaidStatus(doc.exists() ? doc.data().status : {});
        }, err => console.error("Error fetching paid status:", err));

        return () => {
            unsubscribers.forEach(unsub => unsub());
            unsubPaidStatus();
        };
    }, [userId, currentMonthYear]);

    // --- Calculations ---
    const totals = useMemo(() => {
        const totalIncome = incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
        const totalMonthlyBills = bills.reduce((acc, bill) => acc + (bill.amount || 0), 0);
        const totalWeekly = weeklyCosts.reduce((acc, cost) => acc + (cost.amount || 0), 0);
        const projectedMonthlyWeekly = totalWeekly * 4.33;
        const totalOutflow = totalMonthlyBills + projectedMonthlyWeekly;
        const netCashFlow = totalIncome - totalOutflow;
        const totalDebt = debts.reduce((acc, debt) => acc + ((debt.totalAmount || 0) - (debt.paidAmount || 0)), 0);
        const paidThisMonth = bills.filter(b => paidStatus[b.id]).reduce((acc, b) => acc + b.amount, 0);

        return { totalIncome, totalMonthlyBills, projectedMonthlyWeekly, totalOutflow, netCashFlow, totalDebt, paidThisMonth };
    }, [bills, debts, incomes, weeklyCosts, paidStatus]);

    const expenseByCategory = useMemo(() => {
        const categories = {};
        bills.forEach(bill => {
            const category = bill.category || 'Uncategorized';
            if (!categories[category]) {
                categories[category] = 0;
            }
            categories[category] += bill.amount;
        });
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];
        return Object.entries(categories).map(([name, value], index) => ({
            name,
            value,
            color: COLORS[index % COLORS.length]
        })).sort((a, b) => b.value - a.value);
    }, [bills]);

    const sortedBills = useMemo(() => {
        return [...bills].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [bills, sortConfig]);

    // --- Handlers ---
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleTogglePaid = async (billId) => {
        if (!userId) return;
        const newPaidStatus = { ...paidStatus, [billId]: !paidStatus[billId] };
        const paidStatusRef = doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', currentMonthYear);
        try {
            await setDoc(paidStatusRef, { status: newPaidStatus }, { merge: true });
        } catch (error) {
            console.error("Error updating paid status: ", error);
        }
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = async (itemData) => {
        if (!userId) return;
        const collectionNameMap = {
            bill: 'bills',
            debt: 'debts',
            income: 'incomes',
            weekly: 'weeklyCosts'
        };
        const collectionName = collectionNameMap[modalType];
        const basePath = ['artifacts', appId, 'users', userId, collectionName];

        try {
            if (editingItem && editingItem.id) {
                const docRef = doc(db, ...basePath, editingItem.id);
                await updateDoc(docRef, itemData);
            } else {
                const colRef = collection(db, ...basePath);
                await addDoc(colRef, itemData);
            }
        } catch (error) {
            console.error("Error saving item:", error);
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (type, id) => {
        if (!userId) return;
        if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
        const collectionNameMap = {
            bill: 'bills',
            debt: 'debts',
            income: 'incomes',
            weekly: 'weeklyCosts'
        };
        const collectionName = collectionNameMap[type];
        try {
            const docRef = doc(db, 'artifacts', appId, 'users', userId, collectionName, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // --- Render Logic ---
    if (isLoading || isSeeding) {
        return (
            <div className="bg-slate-900 text-white min-h-screen flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
                <p className="mt-4 text-lg">{isSeeding ? "Setting up your dashboard for the first time..." : "Loading your financial data..."}</p>
            </div>
        );
    }

    const renderSortArrow = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />;
    };

    const renderDashboard = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                <StatCard title="Total Monthly Income" value={totals.totalIncome} icon={<Banknote size={24} />} color="green" subtext="All sources combined" />
                <StatCard title="Total Monthly Outflow" value={totals.totalOutflow} icon={<ArrowDown size={24} />} color="red" subtext="Fixed bills + projected variable" />
                <StatCard title="Projected Net" value={totals.netCashFlow} icon={<DollarSign size={24} />} color={totals.netCashFlow >= 0 ? 'cyan' : 'amber'} subtext="Income - Outflow" />
                <StatCard title="Paid This Month" value={totals.paidThisMonth} icon={<CheckCircle size={24} />} color="blue" subtext={`For ${new Date().toLocaleString('default', { month: 'long' })}`} />
                <StatCard title="Total Outstanding Debt" value={totals.totalDebt} icon={<AlertTriangle size={24} />} color="orange" subtext="Remaining balance on all loans" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">Monthly Bills</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
                                <tr>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>Name {renderSortArrow('name')}</th>
                                    <th className="p-3 cursor-pointer text-right" onClick={() => handleSort('amount')}>Amount {renderSortArrow('amount')}</th>
                                    <th className="p-3 cursor-pointer text-center" onClick={() => handleSort('dueDay')}>Due Day {renderSortArrow('dueDay')}</th>
                                    <th className="p-3 text-center">Autopay</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {sortedBills.map(bill => (
                                    <tr key={bill.id} className={`border-b border-slate-700/50 ${paidStatus[bill.id] ? 'text-slate-500 bg-slate-800/50' : 'text-slate-200'}`}>
                                        <td className="p-3">
                                            <button onClick={() => handleTogglePaid(bill.id)} className="flex items-center gap-2">
                                                {paidStatus[bill.id] ? <CheckCircle size={18} className="text-green-500" /> : <Circle size={18} className="text-slate-600" />}
                                            </button>
                                        </td>
                                        <td className={`p-3 font-medium ${paidStatus[bill.id] ? 'line-through' : ''}`}>{bill.name}</td>
                                        <td className="p-3 text-right font-mono">${(bill.amount || 0).toFixed(2)}</td>
                                        <td className="p-3 text-center">{bill.dueDay}</td>
                                        <td className="p-3 text-center">{bill.isAutoPay ? <CheckCircle size={16} className="text-cyan-400 mx-auto" /> : <XCircle size={16} className="text-slate-600 mx-auto" />}</td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => openModal('bill', bill)} className="text-slate-400 hover:text-cyan-400 mr-2"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete('bill', bill.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={() => openModal('bill')} className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold">
                        <PlusCircle size={18} /> Add New Bill
                    </button>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4">Expense Breakdown</h3>
                        <ActivePieChart data={expenseByCategory} />
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4">Projections</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Total Fixed Bills:</span>
                                <span className="font-bold text-white font-mono">${totals.totalMonthlyBills.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Projected Weekly Costs:</span>
                                <span className="font-bold text-white font-mono">${totals.projectedMonthlyWeekly.toFixed(2)}</span>
                            </div>
                            <hr className="border-slate-700 my-2" />
                            <div className="flex justify-between items-center text-base">
                                <span className="text-slate-300 font-bold">Total Projected Outflow:</span>
                                <span className="font-bold text-red-400 font-mono">${totals.totalOutflow.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderManagementSection = (title, data, columns, type) => (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
                        <tr>
                            {columns.map(col => <th key={col.key} className={`p-3 ${col.className}`}>{col.header}</th>)}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map(item => (
                            <tr key={item.id} className="border-b border-slate-700/50 text-slate-200">
                                {columns.map(col => <td key={col.key} className={`p-3 ${col.className}`}>{col.render(item)}</td>)}
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

    const debtColumns = [
        { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'total', header: 'Total Amount', className: 'text-right', render: item => <span className="font-mono">${(item.totalAmount || 0).toFixed(2)}</span> },
        { key: 'paid', header: 'Paid Amount', className: 'text-right', render: item => <span className="font-mono">${(item.paidAmount || 0).toFixed(2)}</span> },
        { key: 'remaining', header: 'Remaining', className: 'text-right font-bold', render: item => <span className="font-mono text-orange-400">${((item.totalAmount || 0) - (item.paidAmount || 0)).toFixed(2)}</span> },
        { key: 'progress', header: 'Progress', render: item => {
            const progress = item.totalAmount > 0 ? ((item.paidAmount / item.totalAmount) * 100) : 0;
            return <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>;
        }},
    ];

    const incomeColumns = [
        { key: 'name', header: 'Source', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'amount', header: 'Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-green-400">${(item.amount || 0).toFixed(2)}</span> },
        { key: 'type', header: 'Type', render: item => <span className="capitalize bg-slate-700 text-slate-300 text-xs font-medium px-2 py-1 rounded-full">{item.type}</span> },
    ];

    const weeklyCostColumns = [
        { key: 'name', header: 'Item', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'amount', header: 'Weekly Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-red-400">${(item.amount || 0).toFixed(2)}</span> },
    ];

    return (
        <div className="bg-slate-900 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">HVAC Financial Dashboard</h1>
                        <p className="text-slate-400 mt-1">Monthly Money Management for {currentMonthYear}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 text-sm bg-slate-800 border border-slate-700 rounded-full px-4 py-2">
                        <span className="text-slate-400">User ID:</span>
                        <span className="text-cyan-400 font-mono text-xs">{userId}</span>
                    </div>
                </header>

                <nav className="flex items-center border-b border-slate-700 mb-6">
                    <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'dashboard' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Dashboard</button>
                    <button onClick={() => setActiveSection('debts')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'debts' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Debt Management</button>
                    <button onClick={() => setActiveSection('income')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'income' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Income Sources</button>
                    <button onClick={() => setActiveSection('weekly')} className={`px-4 py-3 text-sm font-medium transition-colors ${activeSection === 'weekly' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>Weekly Costs</button>
                </nav>

                <main>
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'debts' && renderManagementSection('Debt Management', debts, debtColumns, 'debt')}
                    {activeSection === 'income' && renderManagementSection('Income Sources', incomes, incomeColumns, 'income')}
                    {activeSection === 'weekly' && renderManagementSection('Recurring Weekly Costs', weeklyCosts, weeklyCostColumns, 'weekly')}
                </main>
            </div>
            {isModalOpen && <ItemFormModal item={editingItem} type={modalType} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

// --- Form Modal Component ---
const ItemFormModal = ({ item, type, onSave, onClose }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            // Set default structure based on type
            const defaults = {
                bill: { name: '', amount: 0, dueDay: 1, isAutoPay: false, category: 'General' },
                debt: { name: '', totalAmount: 0, paidAmount: 0, interestRate: 0 },
                income: { name: '', amount: 0, type: 'monthly' },
                weekly: { name: '', amount: 0 },
            };
            setFormData(defaults[type]);
        }
    }, [item, type]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const renderBillFields = () => (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Bill Name</label>
                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Amount</label>
                    <input type="number" name="amount" value={formData.amount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Due Day (1-31)</label>
                    <input type="number" name="dueDay" min="1" max="31" value={formData.dueDay || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div className="flex items-center mb-6">
                <input type="checkbox" id="isAutoPay" name="isAutoPay" checked={formData.isAutoPay || false} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-600 focus:ring-cyan-500" />
                <label htmlFor="isAutoPay" className="ml-2 block text-sm text-slate-300">Enabled for Autopay</label>
            </div>
        </>
    );

    const renderDebtFields = () => (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Debt/Loan Name</label>
                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Total Amount</label>
                    <input type="number" name="totalAmount" value={formData.totalAmount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Amount Paid</label>
                    <input type="number" name="paidAmount" value={formData.paidAmount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
                </div>
            </div>
        </>
    );

    const renderIncomeFields = () => (
         <>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Income Source</label>
                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Amount</label>
                <input type="number" name="amount" value={formData.amount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
            </div>
             <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                <select name="type" value={formData.type || 'monthly'} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                    <option value="monthly">Monthly</option>
                    <option value="one-time">One-Time</option>
                    <option value="job">Per Job</option>
                </select>
            </div>
        </>
    );

    const renderWeeklyCostFields = () => (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Cost Name</label>
                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Weekly Amount</label>
                <input type="number" name="amount" value={formData.amount || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
            </div>
        </>
    );

    const renderFields = () => {
        switch(type) {
            case 'bill': return renderBillFields();
            case 'debt': return renderDebtFields();
            case 'income': return renderIncomeFields();
            case 'weekly': return renderWeeklyCostFields();
            default: return null;
        }
    };

    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold text-white mb-4">{item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                {renderFields()}
                <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-semibold bg-slate-600 hover:bg-slate-500 text-white transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-2">
                        <Save size={16} /> Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default App;
