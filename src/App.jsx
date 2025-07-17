import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, LineChart, Line } from 'recharts';
import { usePlaidLink } from 'react-plaid-link';
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Bell, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, FileText, Home, Inbox, LogOut, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Target, Trash2, TrendingUp, Upload, User, Users, X, Car, Building, BarChart2, Sun, Moon, Percent, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Link as LinkIcon, Info } from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
const INITIAL_TASKS = [ { title: "Follow up with Johnson about quote", date: new Date().toISOString().split('T')[0], notes: "Sent quote last week", isComplete: false }, { title: "Order filters for Downtown Restaurant", date: new Date().toISOString().split('T')[0], notes: "Need 10x 20x25x1 filters", isComplete: true }];
const INITIAL_INVOICES = [ { billTo: "Badawi", customer: "Southern Algeria #00547", jobNo: "1548875887", completedOn: "6/14/2024", invNum: "", terms: "Net 45", net: 1291.00, dueDate: "6/14/2024", status: "Unpaid", grandTotal: 1291.00 }];
const INITIAL_TAX_PAYMENTS = [{ date: new Date().toISOString().split('T')[0], amount: 500, notes: "Q2 Estimated Payment" }];
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
const BILL_CATEGORIES = ["Software", "Fuel", "Vehicle", "Insurance", "Marketing", "Supplies", "Overhead", "Payroll", "Taxes", "Utilities", "General"];


// --- Helper Components ---
const Modal = ({ children, onClose }) => ( <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"> <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg m-4 relative border dark:border-slate-700"> <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"> <X size={24} /> </button> <div className="p-6">{children}</div> </div> </div>);
const StatCard = ({ title, value, icon, color, subtext }) => ( <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg flex flex-col justify-between"> <div className="flex items-center justify-between"> <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3> <div className={`text-${color}-500 dark:text-${color}-400`}>{icon}</div> </div> <div> <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">{value}</p> {subtext && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{subtext}</p>} </div> </div>);
const ActivePieChart = ({ data, onSliceClick }) => { const [activeIndex, setActiveIndex] = useState(0); const onPieEnter = useCallback((_, index) => { setActiveIndex(index); }, [setActiveIndex]); const renderActiveShape = (props) => { const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props; return ( <g className="cursor-pointer" onClick={() => onSliceClick(payload.name)}> <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg"> {payload.name} </text> <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} /> </g> ); }; return ( <ResponsiveContainer width="100%" height={300}> <PieChart> <Tooltip contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem' }} labelStyle={{ color: '#cbd5e1' }} itemStyle={{ color: '#f1f5f9' }} formatter={(value) => `$${value.toFixed(2)}`} /> <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" dataKey="value" onMouseEnter={onPieEnter} onClick={(data) => onSliceClick(data.name)} > {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.color} /> ))} </Pie> </PieChart> </ResponsiveContainer> );};
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
const ReportsSection = ({ clients, jobs, bills, inventory }) => {
    const clientProfitability = useMemo(() => {
        return clients.map(client => {
            const clientJobs = jobs.filter(job => job.clientId === client.id);
            const totalRevenue = clientJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
            const totalCost = clientJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
            return {
                name: client.name,
                netProfit: totalRevenue - totalCost,
            };
        }).sort((a,b) => b.netProfit - a.netProfit);
    }, [clients, jobs]);

    const trendData = useMemo(() => {
        const dataByMonth = {};
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        jobs.forEach(job => {
            if(job.date && new Date(job.date) > twelveMonthsAgo) {
                const month = new Date(job.date).toISOString().slice(0, 7);
                if(!dataByMonth[month]) dataByMonth[month] = { revenue: 0, expenses: 0 };
                dataByMonth[month].revenue += job.revenue || 0;
            }
        });

        bills.forEach(bill => {
             const createdAt = bill.createdAt?.toDate ? bill.createdAt.toDate() : new Date();
             if(createdAt > twelveMonthsAgo) {
                const month = createdAt.toISOString().slice(0,7);
                if(!dataByMonth[month]) dataByMonth[month] = { revenue: 0, expenses: 0 };
                dataByMonth[month].expenses += bill.amount || 0;
             }
        });

        return Object.keys(dataByMonth).map(month => ({
            month,
            Revenue: dataByMonth[month].revenue,
            Expenses: dataByMonth[month].expenses,
        })).sort((a,b) => a.month.localeCompare(b.month));
    }, [jobs, bills]);

    const inventoryValue = useMemo(() => {
        return inventory.map(item => ({
            name: item.name,
            totalValue: (item.quantity || 0) * (item.cost || 0)
        })).sort((a,b) => b.totalValue - a.totalValue);
    }, [inventory]);

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Revenue vs. Expenses Trend (Last 12 Months)</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" tickFormatter={(value) => `$${(value/1000)}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="Revenue" fill="#22c55e" />
                        <Bar dataKey="Expenses" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Client Profitability</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr><th className="p-3">Client</th><th className="p-3 text-right">Net Profit</th></tr>
                        </thead>
                        <tbody>
                            {clientProfitability.map(client => (
                                <tr key={client.name} className="border-b border-slate-200 dark:border-slate-700/50">
                                    <td className="p-3 font-medium">{client.name}</td>
                                    <td className={`p-3 text-right font-mono ${client.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>${client.netProfit.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Inventory Value</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr><th className="p-3">Item</th><th className="p-3 text-center">Quantity</th><th className="p-3 text-right">Total Value</th></tr>
                        </thead>
                        <tbody>
                            {inventoryValue.map(item => (
                                <tr key={item.name} className="border-b border-slate-200 dark:border-slate-700/50">
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3 text-center">{inventory.find(i => i.name === item.name)?.quantity}</td>
                                    <td className="p-3 text-right font-mono">${item.totalValue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
const ForecastSection = ({ invoices, bills, weeklyCosts, currentBankBalance, setCurrentBankBalance }) => {

    const forecastData = useMemo(() => {
        const forecast = [
            { name: 'Next 30 Days', Inflow: 0, Outflow: 0 },
            { name: 'Next 60 Days', Inflow: 0, Outflow: 0 },
            { name: 'Next 90 Days', Inflow: 0, Outflow: 0 },
        ];
        
        const now = new Date();
        
        const recurringOutflow = bills.filter(b => b.isRecurring).reduce((acc, b) => acc + b.amount, 0) + (weeklyCosts.reduce((acc, c) => acc + c.amount, 0) * 4.33);

        forecast[0].Outflow = recurringOutflow;
        forecast[1].Outflow = recurringOutflow * 2;
        forecast[2].Outflow = recurringOutflow * 3;

        invoices.forEach(invoice => {
            if (invoice.status !== 'Paid' && invoice.dueDate) {
                try {
                    const dueDate = new Date(invoice.dueDate);
                    if (isNaN(dueDate.getTime())) {
                        // Invalid date format in invoice, skip it
                        return;
                    }
                    const daysUntilDue = (dueDate - now) / (1000 * 60 * 60 * 24);

                    if (daysUntilDue <= 30) forecast[0].Inflow += invoice.grandTotal || 0;
                    if (daysUntilDue <= 60) forecast[1].Inflow += invoice.grandTotal || 0;
                    if (daysUntilDue <= 90) forecast[2].Inflow += invoice.grandTotal || 0;
                } catch (e) {
                    console.error("Error parsing due date for invoice:", invoice, e);
                }
            }
        });

        return forecast.map(f => ({...f, 'Net Change': f.Inflow - f.Outflow, 'Projected Balance': currentBankBalance + f.Inflow - f.Outflow }));

    }, [invoices, bills, weeklyCosts, currentBankBalance]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Smarter Cash Flow Forecast</h3>
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Enter Current Bank Balance ($)</label>
                <input 
                    type="number"
                    value={currentBankBalance}
                    onChange={(e) => setCurrentBankBalance(parseFloat(e.target.value) || 0)}
                    className="w-full max-w-xs bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-slate-800 dark:text-white"
                />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">This forecast projects your future bank balance based on unpaid invoices and recurring expenses.</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `$${(value/1000)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} />
                    <Legend />
                    <Line type="monotone" dataKey="Projected Balance" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Inflow" stroke="#22c55e" />
                    <Line type="monotone" dataKey="Outflow" stroke="#ef4444" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
const PnLStatement = ({ jobs, bills, weeklyCosts, reportingPeriod, dateRange }) => {

    const pnlData = useMemo(() => {
        const filteredJobs = jobs.filter(job => {
            if (!job.date) return false;
            const jobDate = new Date(job.date);
            return jobDate >= dateRange.start && jobDate <= dateRange.end;
        });

        const revenue = filteredJobs.reduce((acc, job) => acc + (job.revenue || 0), 0);
        const cogs = filteredJobs.reduce((acc, job) => acc + (job.materialCost || 0) + (job.laborCost || 0), 0);
        const grossProfit = revenue - cogs;

        const periodExpenseFactor = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24 * 30.44);
        
        const expensesByCategory = bills.reduce((acc, bill) => {
            const category = bill.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + bill.amount;
            return acc;
        }, {});

        const weeklyCostsTotal = weeklyCosts.reduce((acc, cost) => acc + cost.amount, 0) * periodExpenseFactor;
        if(weeklyCostsTotal > 0) {
            expensesByCategory['Weekly & Misc'] = (expensesByCategory['Weekly & Misc'] || 0) + weeklyCostsTotal;
        }

        const operatingExpenses = Object.values(expensesByCategory).reduce((acc, val) => acc + val, 0);
        
        const netProfit = grossProfit - operatingExpenses;
        
        const grossProfitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
        const netProfitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

        return { 
            revenue, 
            cogs, 
            grossProfit, 
            operatingExpenses, 
            expensesByCategory,
            netProfit, 
            grossProfitMargin,
            netProfitMargin
        };
    }, [jobs, bills, weeklyCosts, dateRange]);

    const formatPeriod = () => {
        const options = { month: 'long', year: 'numeric' };
        if (reportingPeriod === 'monthly') {
            return `For the Month of ${dateRange.start.toLocaleString('default', options)}`;
        }
        if (reportingPeriod === 'quarterly') {
            const endOptions = { month: 'long', day: 'numeric', year: 'numeric' };
            return `For the Quarter Ending ${dateRange.end.toLocaleDateString('default', endOptions)}`;
        }
        if (reportingPeriod === 'yearly') {
            return `For the Year ${dateRange.start.getFullYear()}`;
        }
        return '';
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Profit & Loss Statement</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{formatPeriod()}</p>
            
            <div className="space-y-2 text-sm">
                {/* Revenue Section */}
                <div className="flex justify-between items-center p-3 font-semibold">
                    <span>Total Revenue</span>
                    <span className="font-mono">${pnlData.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 pl-8">
                    <span className="text-slate-600 dark:text-slate-400">Cost of Goods Sold (COGS)</span>
                    <span className="font-mono">(${pnlData.cogs.toFixed(2)})</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700 my-2"/>

                {/* Gross Profit Section */}
                <div className="flex justify-between items-center p-3 font-bold text-lg">
                    <span>Gross Profit</span>
                    <span className="font-mono">${pnlData.grossProfit.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between items-center p-1 pl-8 text-xs text-slate-500">
                    <span>Gross Profit Margin</span>
                    <span className="font-mono">{pnlData.grossProfitMargin.toFixed(1)}%</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700 my-2"/>

                {/* Operating Expenses Section */}
                <div className="p-3 font-semibold">
                    <span>Operating Expenses</span>
                </div>
                {Object.entries(pnlData.expensesByCategory).map(([category, amount]) => (
                     <div key={category} className="flex justify-between items-center p-1 pl-8">
                        <span className="text-slate-600 dark:text-slate-400">{category}</span>
                        <span className="font-mono">(${amount.toFixed(2)})</span>
                    </div>
                ))}
                 <div className="flex justify-between items-center p-3 pl-8 font-semibold">
                    <span>Total Operating Expenses</span>
                    <span className="font-mono">(${pnlData.operatingExpenses.toFixed(2)})</span>
                </div>
                <hr className="border-slate-300 dark:border-slate-600 my-2 border-2"/>

                {/* Net Profit Section */}
                <div className="flex justify-between items-center p-3 font-bold text-xl" style={{ color: pnlData.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                    <span>Net Profit</span>
                    <span className="font-mono">
                        {pnlData.netProfit < 0 ? `-$${Math.abs(pnlData.netProfit).toFixed(2)}` : `$${pnlData.netProfit.toFixed(2)}`}
                    </span>
                </div>
                 <div className="flex justify-between items-center p-1 pl-8 text-xs text-slate-500">
                    <span>Net Profit Margin</span>
                    <span className="font-mono">{pnlData.netProfitMargin.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    );
};
const ManagementSection = ({ title, data, columns, type, searchTerm, setSearchTerm, handleImportCSV, handleExportCSV, openModal, handleDelete, debtPayoffStrategies }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white" />
                    {(type === 'client' || type === 'job' || type === 'inventory' || type === 'invoice') && <>
                        <input type="file" id={`csv-importer-${type}`} className="hidden" accept=".csv" onChange={e => handleImportCSV(e.target.files[0], type)} />
                        <label htmlFor={`csv-importer-${type}`} className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"><Upload size={16} /> Import CSV</label>
                    </>}
                    <button onClick={() => handleExportCSV(data, type)} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export to CSV</button>
                    <button onClick={() => openModal(type)} className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New</button>
                </div>
            </div>
            {type === 'debt' && debtPayoffStrategies && (
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
                            {debtPayoffStrategies.snowball.map(d => <li key={d.id}>{d.name} <span className="text-slate-500 dark:text-slate-400">(${(d.totalAmount - d.paidAmount).toFixed(2)})</span></li>)}
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
        </div>
    );
};
const GoalsSection = ({ goalsWithProgress, openModal }) => {
    return (
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
};
const IncentiveCalculator = () => {
    // State for Percent-based calculator
    const [percentBrackets, setPercentBrackets] = useState([
        { min: 10000, max: Infinity, rate: 10.0 },
        { min: 8000, max: 9999, rate: 8.0 },
        { min: 5000, max: 7999, rate: 5.0 },
        { min: 3500, max: 4999, rate: 3.0 },
        { min: 0, max: 3499, rate: 1.5 },
    ]);
    const [actualSalesPercent, setActualSalesPercent] = useState(0);

    // State for Hourly-based calculator
    const [hourlyBrackets, setHourlyBrackets] = useState([
        { min: 10000, max: Infinity, bonus: 10.0 },
        { min: 8000, max: 9999, bonus: 8.0 },
        { min: 5000, max: 7999, bonus: 5.0 },
        { min: 3500, max: 4999, bonus: 2.0 },
        { min: 0, max: 3499, bonus: 0 },
    ]);
    const [actualSalesHourly, setActualSalesHourly] = useState(0);
    const [hoursWorked, setHoursWorked] = useState(0);

    const handlePercentBracketChange = (index, field, value) => {
        const newBrackets = [...percentBrackets];
        newBrackets[index][field] = parseFloat(value) || 0;
        setPercentBrackets(newBrackets);
    };

    const handleHourlyBracketChange = (index, field, value) => {
        const newBrackets = [...hourlyBrackets];
        newBrackets[index][field] = parseFloat(value) || 0;
        setHourlyBrackets(newBrackets);
    };

    const calculatedPercentBonus = useMemo(() => {
        const bracket = percentBrackets.find(b => actualSalesPercent >= b.min && actualSalesPercent <= b.max);
        if (!bracket) return 0;
        return (actualSalesPercent * (bracket.rate / 100));
    }, [actualSalesPercent, percentBrackets]);

    const calculatedHourlyBonus = useMemo(() => {
        const bracket = hourlyBrackets.find(b => actualSalesHourly >= b.min && actualSalesHourly <= b.max);
        if (!bracket || !hoursWorked) return 0;
        return hoursWorked * bracket.bonus;
    }, [actualSalesHourly, hoursWorked, hourlyBrackets]);

    return (
        <div className="space-y-8">
            {/* Percent Incentive Calculator */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Percent Incentive Calculator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bonus Bracket Table */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Brackets</h4>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                <tr>
                                    <th className="p-2">Sales Bracket</th>
                                    <th className="p-2">% Scale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {percentBrackets.map((bracket, index) => (
                                    <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-2 font-mono bg-blue-100 dark:bg-blue-900/50">
                                            ${bracket.min.toLocaleString()}{bracket.max === Infinity ? '+' : ` - $${bracket.max.toLocaleString()}`}
                                        </td>
                                        <td className="p-2 bg-blue-100 dark:bg-blue-900/50">
                                            <input 
                                                type="number"
                                                value={bracket.rate}
                                                onChange={(e) => handlePercentBracketChange(index, 'rate', e.target.value)}
                                                className="w-20 bg-transparent text-right font-mono"
                                            /> %
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Calculation Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Calculation</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Actual Sales</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                        type="number"
                                        value={actualSalesPercent}
                                        onChange={(e) => setActualSalesPercent(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-yellow-100 dark:bg-yellow-800/50 pl-10 p-2 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Bonus</p>
                                <p className="text-3xl font-bold text-green-500">${calculatedPercentBonus.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hourly Incentive Calculator */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Hourly Incentive Calculator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bonus Bracket Table */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Brackets</h4>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                <tr>
                                    <th className="p-2">Sales Bracket</th>
                                    <th className="p-2">Bonus per Hour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hourlyBrackets.map((bracket, index) => (
                                    <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-2 font-mono bg-blue-100 dark:bg-blue-900/50">
                                            ${bracket.min.toLocaleString()}{bracket.max === Infinity ? '+' : ` - $${bracket.max.toLocaleString()}`}
                                        </td>
                                        <td className="p-2 bg-blue-100 dark:bg-blue-900/50">
                                            $ <input 
                                                type="number"
                                                value={bracket.bonus}
                                                onChange={(e) => handleHourlyBracketChange(index, 'bonus', e.target.value)}
                                                className="w-20 bg-transparent text-right font-mono"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Calculation Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Calculation</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Actual Sales</label>
                                 <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                        type="number"
                                        value={actualSalesHourly}
                                        onChange={(e) => setActualSalesHourly(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-yellow-100 dark:bg-yellow-800/50 pl-10 p-2 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hours Worked</label>
                                <input 
                                    type="number"
                                    value={hoursWorked}
                                    onChange={(e) => setHoursWorked(parseFloat(e.target.value) || 0)}
                                    className="w-full bg-yellow-100 dark:bg-yellow-800/50 p-2 rounded-md"
                                />
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Bonus</p>
                                <p className="text-3xl font-bold text-green-500">${calculatedHourlyBonus.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
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
    const [linkToken, setLinkToken] = useState(null);

    const generateLinkToken = useCallback(async () => {
        // IMPORTANT: In a real application, this URL should be your live server's address
        const response = await fetch('https://144.202.20.114:8000/api/create_link_token', {
            method: 'POST',
        });
        const data = await response.json();
        setLinkToken(data.link_token);
    }, []);

    useEffect(() => {
        if (userId) { // Only generate token if user is logged in
            // generateLinkToken(); // Temporarily disabled to prevent fetch errors on deploy
        }
    }, [userId, generateLinkToken]);
    
    const onSuccess = useCallback((public_token, metadata) => {
        // IMPORTANT: In a real application, this URL should be your live server's address
        fetch('https://144.202.20.114:8000/api/exchange_public_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token }),
        });
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess,
    });

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
                    INITIAL_TASKS.forEach(item => batch.set(doc(collection(db, ...basePath, 'tasks')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_INVOICES.forEach(item => batch.set(doc(collection(db, ...basePath, 'invoices')), {...item, createdAt: serverTimestamp()}));
                    INITIAL_TAX_PAYMENTS.forEach(item => batch.set(doc(collection(db, ...basePath, 'taxPayments')), {...item, createdAt: serverTimestamp()}));
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

    const sortedData = useMemo(() => {
        const dataMap = { bills: filteredBills, debts, incomes, weeklyCosts, jobs, goals, clients, inventory, vehicles, invoices };
        let activeData = dataMap[activeSection] || [];
        
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
    }, [filteredBills, debts, incomes, weeklyCosts, jobs, goals, clients, inventory, vehicles, invoices, sortConfig, activeSection, searchTerm]);

    const debtPayoffStrategies = useMemo(() => {
        const outstandingDebts = debts.map(d => ({...d, remaining: d.totalAmount - d.paidAmount})).filter(d => d.remaining > 0);
        const avalanche = [...outstandingDebts].sort((a, b) => b.interestRate - a.interestRate);
        const snowball = [...outstandingDebts].sort((a, b) => a.remaining - b.remaining);
        return { avalanche, snowball };
    }, [debts]);

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

    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending' }));
    const handleTogglePaid = async (billId) => { if (!userId) return; await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'paidStatus', selectedMonthYear), { status: { ...paidStatus, [billId]: !paidStatus[billId] } }, { merge: true }); };
    const handleToggleInvoicePaid = async (invoiceId, currentStatus) => {
        if (!userId) return;
        const newStatus = currentStatus === 'Paid' ? 'Unpaid' : 'Paid';
        await updateDoc(doc(db, 'artifacts', appId, 'users', userId, 'invoices', invoiceId), { status: newStatus });
    };
    const openModal = (type, item = null) => { setModalType(type); setEditingItem(item); setIsModalOpen(true); };
    
    const handleSave = async (itemData, file) => {
        if (!userId) return;
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs' };
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
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs' };
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

            const collectionNameMap = { client: 'clients', job: 'jobs', inventory: 'inventory', invoice: 'invoices' };
            const collectionName = collectionNameMap[type];
            if (!collectionName) {
                alert("Invalid import type.");
                return;
            }

            const batch = writeBatch(db);
            const collectionRef = collection(db, 'artifacts', appId, 'users', userId, collectionName);
            data.forEach(item => {
                const docRef = doc(collectionRef);
                const sanitizedItem = Object.entries(item).reduce((acc, [key, value]) => {
                    acc[key] = value === undefined ? null : value;
                    return acc;
                }, {});
                batch.set(docRef, {...sanitizedItem, createdAt: serverTimestamp()});
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
        const nextMonthYear = nextMonthDate.getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');

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

    const handleBulkDelete = async (type, ids) => {
        if (!userId || !ids.length || !window.confirm(`Delete ${ids.length} selected items?`)) return;
        const collectionNameMap = { inventory: 'inventory', invoice: 'invoices', client: 'clients' };
        const collectionName = collectionNameMap[type];
        if (!collectionName) {
            alert("Invalid bulk delete type.");
            return;
        }
        const batch = writeBatch(db);
        ids.forEach(id => {
            const docRef = doc(db, 'artifacts', appId, 'users', userId, collectionName, id);
            batch.delete(docRef);
        });
        await batch.commit();
        setSelectedIds([]);
    };


    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    
    if (!userId) {
        return <Auth />;
    }
    
    // Column definitions for ManagementSection
    const debtColumns = [ { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> }, { key: 'interestRate', header: 'Interest Rate', className: 'text-center', render: item => <span className="font-mono">{item.interestRate || 0}%</span> }, { key: 'total', header: 'Total Amount', className: 'text-right', render: item => <span className="font-mono">${(item.totalAmount || 0).toFixed(2)}</span> }, { key: 'paid', header: 'Paid Amount', className: 'text-right', render: item => <span className="font-mono">${(item.paidAmount || 0).toFixed(2)}</span> }, { key: 'remaining', header: 'Remaining', className: 'text-right font-bold', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${((item.totalAmount || 0) - (item.paidAmount || 0)).toFixed(2)}</span> }, { key: 'progress', header: 'Progress', render: item => { const progress = item.totalAmount > 0 ? ((item.paidAmount / item.totalAmount) * 100) : 0; return <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>; }}, ];
    const incomeColumns = [ { key: 'name', header: 'Source', render: item => <span className="font-medium">{item.name}</span> }, { key: 'amount', header: 'Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-green-600 dark:text-green-400">${(item.amount || 0).toFixed(2)}</span> }, { key: 'type', header: 'Type', render: item => <span className="capitalize bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2 py-1 rounded-full">{item.type}</span> }, ];
    const weeklyCostColumns = [ { key: 'name', header: 'Item', render: item => <span className="font-medium">{item.name}</span> }, { key: 'amount', header: 'Weekly Amount', className: 'text-right', render: item => <span className="font-mono font-bold text-red-600 dark:text-red-400">${(item.amount || 0).toFixed(2)}</span> }, ];
    const jobColumns = [ { key: 'name', header: 'Job/Client', render: item => <span className="font-medium">{item.name}</span> }, { key: 'client', header: 'Client', render: item => <span>{clients.find(c => c.id === item.clientId)?.name || 'N/A'}</span> }, { key: 'revenue', header: 'Revenue', className: 'text-right', render: item => <span className="font-mono text-green-600 dark:text-green-400">${(item.revenue || 0).toFixed(2)}</span> }, { key: 'materialCost', header: 'Material Cost', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(item.materialCost || 0).toFixed(2)}</span> }, { key: 'laborCost', header: 'Labor Cost', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(item.laborCost || 0).toFixed(2)}</span> }, { key: 'netProfit', header: 'Net Profit', className: 'text-right font-bold', render: item => <span className="font-mono text-cyan-600 dark:text-cyan-400">${((item.revenue || 0) - (item.materialCost || 0) - (item.laborCost || 0)).toFixed(2)}</span> }, ];

    const renderDashboard = () => (
        <>
            {showAlerts && <AlertsPanel bills={bills} paidStatus={paidStatus} onClose={() => setShowAlerts(false)} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Monthly Income" value={`$${totals.totalIncome.toLocaleString()}`} icon={<Banknote size={24} />} color="green" />
                <StatCard title="Total Monthly Outflow" value={`$${totals.totalOutflow.toLocaleString()}`} icon={<ArrowDown size={24} />} color="red" />
                <StatCard title="Projected Net" value={`$${totals.netCashFlow.toLocaleString()}`} icon={<DollarSign size={24} />} color={totals.netCashFlow >= 0 ? 'cyan' : 'amber'} />
                <StatCard title="Outstanding Debt" value={`$${totals.totalDebt.toLocaleString()}`} icon={<AlertTriangle size={24} />} color="orange" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Gross Profit Margin" value={`${pnlData.revenue > 0 ? ((pnlData.grossProfit / pnlData.revenue) * 100).toFixed(1) : '0.0'}%`} icon={<Percent size={24} />} color="teal" subtext="For selected period"/>
                <StatCard title="Avg. Job Revenue" value={`$${(pnlData.revenue / (filteredJobs.length || 1)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<TrendingUp size={24} />} color="indigo" subtext={`${filteredJobs.length} jobs`}/>
                <StatCard title="Avg. Job Profit" value={`$${(pnlData.grossProfit / (filteredJobs.length || 1)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<Target size={24} />} color="purple" subtext="Gross profit per job" />
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
                        <button onClick={() => open()} disabled={!ready} className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 py-2 rounded-md transition-colors disabled:opacity-50">
                            <LinkIcon size={16} /> Link Bank Account
                        </button>
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg">
                           <span className="text-sm font-semibold">Reporting Period:</span>
                           <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                               <button onClick={() => setReportingPeriod('monthly')} className={`px-2 py-1 text-xs rounded ${reportingPeriod === 'monthly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Monthly</button>
                               <button onClick={() => setReportingPeriod('quarterly')} className={`px-2 py-1 text-xs rounded ${reportingPeriod === 'quarterly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Quarterly</button>
                               <button onClick={() => setReportingPeriod('yearly')} className={`px-2 py-1 text-xs rounded ${reportingPeriod === 'yearly' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Yearly</button>
                           </div>
                        </div>
                        <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-sm bg-slate-600 hover:bg-slate-500 text-white font-semibold px-3 py-2 rounded-md transition-colors">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </header>
                <nav className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
                    <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'dashboard' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Dashboard</button>
                    <button onClick={() => setActiveSection('reports')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'reports' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Reports</button>
                    <button onClick={() => setActiveSection('calendar')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'calendar' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Calendar</button>
                    <button onClick={() => setActiveSection('invoices')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'invoices' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Invoices</button>
                    <button onClick={() => setActiveSection('tax')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'tax' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Tax Management</button>
                    <button onClick={() => setActiveSection('pnl')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'pnl' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>P&L Statement</button>
                    <button onClick={() => setActiveSection('forecast')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'forecast' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Forecast</button>
                    <button onClick={() => setActiveSection('goals')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'goals' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Goals</button>
                    <button onClick={() => setActiveSection('incentives')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incentives' ? 'text-white border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}>Incentives</button>
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
                    {activeSection === 'calendar' && <CalendarSection jobs={jobs} tasks={tasks} openModal={openModal} />}
                    {activeSection === 'invoices' && <InvoiceManagement invoices={invoices} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} handleToggleInvoicePaid={handleToggleInvoicePaid} />}
                    {activeSection === 'tax' && <TaxManagement jobs={jobs} bills={bills} weeklyCosts={weeklyCosts} taxPayments={taxPayments} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'pnl' && <PnLStatement jobs={jobs} bills={bills} weeklyCosts={weeklyCosts} reportingPeriod={reportingPeriod} dateRange={dateRange} />}
                    {activeSection === 'forecast' && <ForecastSection invoices={invoices} bills={bills} weeklyCosts={weeklyCosts} currentBankBalance={currentBankBalance} setCurrentBankBalance={setCurrentBankBalance} />}
                    {activeSection === 'goals' && <GoalsSection goalsWithProgress={goalsWithProgress} openModal={openModal} />}
                    {activeSection === 'incentives' && <IncentiveCalculator />}
                    {activeSection === 'clients' && <ClientManagement clients={clients} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} />}
                    {activeSection === 'jobs' && <ManagementSection title="Job Profitability" data={sortedData} columns={jobColumns} type="job" searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'vehicles' && <VehicleManagement vehicles={vehicles} maintenanceLogs={maintenanceLogs} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                    {activeSection === 'inventory' && <InventoryManagement inventory={inventory} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} />}
                    {activeSection === 'debts' && <ManagementSection title="Debt Management" data={sortedData} columns={debtColumns} type="debt" searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} openModal={openModal} handleDelete={handleDelete} debtPayoffStrategies={debtPayoffStrategies} />}
                    {activeSection === 'incomes' && <ManagementSection title="Income Sources" data={sortedData} columns={incomeColumns} type="income" searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'weeklyCosts' && <ManagementSection title="Recurring Weekly Costs" data={sortedData} columns={weeklyCostColumns} type="weekly" searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} openModal={openModal} handleDelete={handleDelete} />}
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