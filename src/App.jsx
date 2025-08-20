import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Bell, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, FileText, Home, Inbox, LogOut, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Target, Trash2, TrendingUp, Upload, User, Users, X, Car, Building, BarChart2, Sun, Moon, Percent, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Link as LinkIcon, Wrench } from 'lucide-react';

// Import Components
import Auth from './components/Auth';
import TaxManagement from './components/TaxManagement';
import CalendarSection from './components/CalendarSection';
import { StatCard } from './components/StatCard';
import { ItemFormModal } from './components/ItemFormModal';
import { InvoiceManagement } from './components/InvoiceManagement';
import WorkOrderManagement from './components/work-order-management/WorkOrderManagement';
import { ClientManagement } from './components/ClientManagement';
import VehicleManagement from './components/VehicleManagement';
import ValuationCalculator from './components/ValuationCalculator';
import { InventoryManagement } from './components/InventoryManagement';
import { ReportsSection } from './components/ReportsSection';
import { AlertsPanel } from './components/AlertsPanel';
import { ActivePieChart } from './components/ActivePieChart';
import { Modal } from './components/Modal';
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
import { CSVImportButton } from './components/CSVImportButton'; // Import the new component

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
    const [jobs, setJobs] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [taxPayments, setTaxPayments] = useState([]);
    const [goals, setGoals] = useState([]);
    const [clients, setClients] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [recurringWork, setRecurringWork] = useState([]);
    const [paidStatus, setPaidStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState('bill');
    const [sortConfig, setSortConfig] = useState({ key: 'dueDay', direction: 'ascending' });
    const [activeSection, setActiveSection] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentBankBalance, setCurrentBankBalance] = useState(0);
    const [dateRange, setDateRange] = useState({start: new Date(), end: new Date()});
    const [reportingPeriod, setReportingPeriod] = useState('monthly');
    const [showAlerts, setShowAlerts] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [csvPreview, setCsvPreview] = useState({ show: false, data: [], headers: [], type: '', fileName: '' });
    const [csvMapping, setCsvMapping] = useState({});

    const handleEnhancedCSVImport = (file, type) => {
        if (!file || !userId) return alert("Please select a file and ensure you're logged in.");
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').filter(line => line.trim());
                if (lines.length < 2) return alert("CSV file must have at least a header row and one data row.");

                const parseCSVLine = (line) => {
                    const result = [];
                    let current = '';
                    let inQuotes = false;
                    for (let i = 0; i < line.length; i++) {
                        const char = line[i];
                        if (char === '"') inQuotes = !inQuotes;
                        else if (char === ',' && !inQuotes) {
                            result.push(current.trim());
                            current = '';
                        } else current += char;
                    }
                    result.push(current.trim());
                    return result;
                };

                const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
                const previewData = lines.slice(1, 6).map(line => {
                    const values = parseCSVLine(line);
                    return headers.reduce((obj, header, index) => {
                        let value = values[index] || '';
                        value = value.replace(/"/g, '').trim();
                        obj[header] = (value && !isNaN(value) && value !== '') ? parseFloat(value) : value;
                        return obj;
                    }, {});
                });
                
                const fullData = lines.slice(1).map(line => {
                    const values = parseCSVLine(line);
                     return headers.reduce((obj, header, index) => {
                        let value = values[index] || '';
                        value = value.replace(/"/g, '').trim();
                        obj[header] = (value && !isNaN(value) && value !== '') ? parseFloat(value) : value;
                        return obj;
                    }, {});
                });

                setCsvPreview({ show: true, data: previewData, headers, type, fileName: file.name, fullData });
                setDefaultMapping(type, headers);
            } catch (error) {
                console.error("Error parsing CSV:", error);
                alert("Error parsing CSV file.");
            }
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        window.handleEnhancedCSVImport = handleEnhancedCSVImport;
        return () => { delete window.handleEnhancedCSVImport; };
    }, [userId]);

    const findBestMatch = (headers, searchTerms) => {
        for (const term of searchTerms) {
            const match = headers.find(h => h.toLowerCase().includes(term.toLowerCase()));
            if (match) return match;
        }
        return headers[0] || '';
    };

    const setDefaultMapping = (type, headers) => {
        const mappings = {
            job: {
                name: findBestMatch(headers, ['name', 'job name', 'title', 'description']),
                revenue: findBestMatch(headers, ['revenue', 'amount', 'total', 'price']),
                materialCost: findBestMatch(headers, ['material cost', 'materials']),
                laborCost: findBestMatch(headers, ['labor cost', 'labor']),
                date: findBestMatch(headers, ['date', 'completed']),
                notes: findBestMatch(headers, ['notes', 'comments']),
                clientId: findBestMatch(headers, ['client', 'customer id'])
            },
            client: {
                name: findBestMatch(headers, ['name', 'customer name', 'company']),
                address: findBestMatch(headers, ['address', 'location']),
                phone: findBestMatch(headers, ['phone', 'contact']),
                email: findBestMatch(headers, ['email'])
            },
            invoice: {
                billTo: findBestMatch(headers, ['bill to', 'customer', 'client']),
                customer: findBestMatch(headers, ['customer', 'company']),
                jobNo: findBestMatch(headers, ['job no', 'job id']),
                completedOn: findBestMatch(headers, ['completed', 'date']),
                net: findBestMatch(headers, ['net', 'amount', 'subtotal']),
                grandTotal: findBestMatch(headers, ['grand total', 'total']),
                status: findBestMatch(headers, ['status', 'paid'])
            },
            recurring: {
                name: findBestMatch(headers, ['name', 'work name', 'title']),
                clientId: findBestMatch(headers, ['client id', 'customer id']),
                revenue: findBestMatch(headers, ['revenue', 'amount', 'price']),
                frequency: findBestMatch(headers, ['frequency', 'schedule']),
                nextDueDate: findBestMatch(headers, ['next due', 'due date']),
                notes: findBestMatch(headers, ['notes', 'details'])
            }
        };
        setCsvMapping(mappings[type] || {});
    };

    const confirmCSVImport = async () => {
        if (!csvPreview.fullData.length) return alert("No data to import.");
        const { type, fullData, fileName } = csvPreview;

        try {
            const collectionNameMap = {
                job: 'jobs', client: 'clients', invoice: 'invoices', inventory: 'inventory', recurring: 'recurringWork'
            };
            const collectionName = collectionNameMap[type];
            if (!collectionName) return alert("Invalid import type.");

            const batch = writeBatch(db);
            const collectionRef = collection(db, 'artifacts', appId, 'users', userId, collectionName);
            let importedCount = 0;

            fullData.forEach(row => {
                const mappedItem = {};
                Object.entries(csvMapping).forEach(([appField, csvField]) => {
                    if (csvField && row[csvField] !== undefined && row[csvField] !== '') {
                        mappedItem[appField] = row[csvField];
                    }
                });

                if (type === 'job') {
                    mappedItem.date = mappedItem.date || new Date().toISOString();
                    mappedItem.revenue = mappedItem.revenue || 0;
                    mappedItem.materialCost = mappedItem.materialCost || 0;
                    mappedItem.laborCost = mappedItem.laborCost || 0;
                } else if (type === 'invoice') {
                    mappedItem.status = mappedItem.status || 'Unpaid';
                    mappedItem.net = mappedItem.net || 0;
                    mappedItem.grandTotal = mappedItem.grandTotal || mappedItem.net || 0;
                } else if (type === 'recurring') {
                    mappedItem.revenue = mappedItem.revenue || 0;
                    mappedItem.frequency = mappedItem.frequency || 'Monthly';
                    mappedItem.nextDueDate = mappedItem.nextDueDate || new Date().toISOString().split('T')[0];
                }

                const hasEssentialData = (type === 'job' && mappedItem.name) ||
                                         (type === 'client' && mappedItem.name) ||
                                         (type === 'invoice' && (mappedItem.billTo || mappedItem.customer)) ||
                                         (type === 'inventory' && mappedItem.name) ||
                                         (type === 'recurring' && mappedItem.name);

                if (hasEssentialData) {
                    const docRef = doc(collectionRef);
                    batch.set(docRef, { ...mappedItem, importedFrom: fileName, importedAt: serverTimestamp(), createdAt: serverTimestamp() });
                    importedCount++;
                }
            });

            if (importedCount === 0) return alert("No valid records found to import.");

            await batch.commit();
            alert(`Successfully imported ${importedCount} ${collectionName} from ${fileName}!`);
            setCsvPreview({ show: false, data: [], headers: [], type: '', fileName: '' });
            setCsvMapping({});
        } catch (error) {
            console.error("Error importing CSV:", error);
            alert(`Failed to import CSV: ${error.message}`);
        }
    };

    const CSVPreviewModal = () => {
        if (!csvPreview.show) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Import Preview: {csvPreview.fileName}</h2>
                            <button onClick={() => setCsvPreview({ show: false, data: [], headers: [], type: '', fileName: '' })} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Found {csvPreview.fullData?.length || 0} records. Showing first 5 for preview.</p>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Map CSV Fields</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(csvMapping).map(appField => (
                                    <div key={appField} className="flex items-center gap-3">
                                        <label className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">{appField}:</label>
                                        <select value={csvMapping[appField] || ''} onChange={(e) => setCsvMapping(prev => ({ ...prev, [appField]: e.target.value }))} className="flex-1 px-3 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm">
                                            <option value="">-- Skip Field --</option>
                                            {csvPreview.headers.map(header => (<option key={header} value={header}>{header}</option>))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Data Preview</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border border-slate-200 dark:border-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>{csvPreview.headers.map(header => (<th key={header} className="p-2 text-left border-r border-slate-200 dark:border-slate-600">{header}</th>))}</tr>
                                    </thead>
                                    <tbody>
                                        {csvPreview.data.map((row, index) => (<tr key={index} className="border-t border-slate-200 dark:border-slate-700">{csvPreview.headers.map(header => (<td key={header} className="p-2 border-r border-slate-200 dark:border-slate-600">{String(row[header] || '')}</td>))}</tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 mt-auto">
                        <button onClick={() => setCsvPreview({ show: false, data: [], headers: [], type: '', fileName: '' })} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">Cancel</button>
                        <button onClick={confirmCSVImport} className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors">Import {csvPreview.fullData?.length || 0} Records</button>
                    </div>
                </div>
            </div>
        );
    };
    
    const handleEnhancedExportCSV = (data, sectionName, customFields = null) => {
        if (!data || data.length === 0) {
            return alert("No data to export.");
        }
        try {
            const headers = customFields || Object.keys(data[0]).filter(key => key !== 'id' && !key.includes('At'));
            const escapeCsvValue = (value) => {
                if (value === null || value === undefined) return '';
                const stringValue = String(value);
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            };
            const csvRows = [
                headers.join(','),
                ...data.map(item => headers.map(header => escapeCsvValue(item[header])).join(','))
            ];
            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${appId}_${sectionName}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting CSV:", error);
            alert("Failed to export CSV: " + error.message);
        }
    };

    const exportAppSheetTemplate = () => {
        const templateData = [
            {
                'Job Name': 'Sample HVAC Install', 'Revenue': 5000, 'Material Cost': 2000, 'Labor Cost': 1500, 'Date': '2025-01-15', 'Customer': 'Sample Customer', 'Notes': 'Sample job for import'
            }
        ];
        handleEnhancedExportCSV(templateData, 'appsheet_template', ['Job Name', 'Revenue', 'Material Cost', 'Labor Cost', 'Date', 'Customer', 'Notes']);
    };

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
        setDateRange({start, end});
    }, [reportingPeriod]);

    const selectedMonthYear = useMemo(() => dateRange.start.getFullYear() + '-' + String(dateRange.start.getMonth() + 1).padStart(2, '0'), [dateRange]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const collectionsToWatch = {
            bills: setBills, debts: setDebts, incomes: setIncomes, weeklyCosts: setWeeklyCosts, jobs: setJobs, tasks: setTasks, invoices: setInvoices, taxPayments: setTaxPayments, goals: setGoals, clients: setClients, inventory: setInventory, vehicles: setVehicles, maintenanceLogs: setMaintenanceLogs, recurringWork: setRecurringWork
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

    const sortedData = useMemo(() => {
        const dataMap = {
            bills: filteredBills, debts, incomes, weeklyCosts, jobs, goals, clients, inventory, vehicles, invoices, recurring: recurringWork
        };
        let activeData = dataMap[activeSection] || [];
        if (searchTerm) {
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
    }, [filteredBills, debts, incomes, weeklyCosts, jobs, goals, clients, inventory, vehicles, invoices, recurringWork, sortConfig, activeSection, searchTerm]);

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
                if (debt) progress = (debt.paidAmount / debt.totalAmount) * 100;
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

    const handleUpdateCurrentBalance = async (newBalance) => {
        if (!userId) return alert("Please log in to update the balance.");
        try {
            await setDoc(doc(db, 'artifacts', appId, 'users', userId, 'settings', 'currentBalance'), { amount: newBalance, updatedAt: serverTimestamp() }, { merge: true });
        } catch (error) {
            console.error("Failed to update current balance:", error);
            alert("Failed to update balance: " + error.message);
        }
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
            } catch (error) {
                console.error("File upload failed:", error);
                return alert("File upload failed. Please try again.");
            }
        }

        try {
            if (editingItem?.id) {
                await updateDoc(doc(db, ...basePath, editingItem.id), dataToSave);
            } else {
                await addDoc(collection(db, ...basePath), {...dataToSave, createdAt: serverTimestamp()});
            }
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (error) {
            console.error("Error saving item:", error);
            alert("Failed to save item.");
        }
    };

    const handleDelete = async (type, id) => {
        if (!userId || !window.confirm("Delete this item?")) return;
        
        const collectionNameMap = { bill: 'bills', debt: 'debts', income: 'incomes', weekly: 'weeklyCosts', job: 'jobs', task: 'tasks', invoice: 'invoices', taxPayment: 'taxPayments', goal: 'goals', client: 'clients', inventory: 'inventory', vehicle: 'vehicles', maintenanceLog: 'maintenanceLogs', recurring: 'recurringWork' };
        const collectionName = collectionNameMap[type];
        if (!collectionName) return alert("Invalid item type for deletion.");

        try {
            await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            alert(`Failed to delete ${type}. Error: ${error.message}`);
        }
    };

    const handleBulkDelete = async (type, ids) => {
        if (!userId || !ids.length || !window.confirm(`Delete ${ids.length} selected items?`)) return;
        
        const collectionNameMap = { inventory: 'inventory', invoice: 'invoices', client: 'clients', vehicle: 'vehicles' };
        const collectionName = collectionNameMap[type];
        if (!collectionName) return alert("Invalid bulk delete type.");

        try {
            const batch = writeBatch(db);
            ids.forEach(id => {
                batch.delete(doc(db, 'artifacts', appId, 'users', userId, collectionName, id));
                if (type === 'vehicle') {
                    const vehicleLogs = maintenanceLogs.filter(log => log.vehicleId === id);
                    vehicleLogs.forEach(log => batch.delete(doc(db, 'artifacts', appId, 'users', userId, 'maintenanceLogs', log.id)));
                }
            });
            await batch.commit();
            setSelectedIds([]);
        } catch (error) {
            console.error(`Error bulk deleting ${type}s:`, error);
            alert(`Failed to delete ${type}s. Please try again.`);
        }
    };

    const deleteAllData = async () => {
        if (!userId || !window.confirm("Clear all your business data? This is irreversible.")) return;
        
        try {
            const collectionsToDelete = ['bills', 'debts', 'incomes', 'weeklyCosts', 'jobs', 'tasks', 'invoices', 'taxPayments', 'goals', 'clients', 'inventory', 'vehicles', 'maintenanceLogs', 'recurringWork', 'paidStatus', 'system', 'settings'];
            for (const collectionName of collectionsToDelete) {
                const snapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, collectionName));
                if (!snapshot.empty) {
                    const batch = writeBatch(db);
                    snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
                    await batch.commit();
                }
            }
            alert("All business data has been cleared.");
        } catch (error) {
            console.error("Failed to clear data:", error);
            alert("Failed to clear data: " + error.message);
        }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="Gross Profit Margin" value={`${pnlData.revenue > 0 ? ((pnlData.grossProfit / pnlData.revenue) * 100).toFixed(1) : '0.0'}%`} icon={<Percent size={24} />} color="teal" subtext="For selected period"/>
            <StatCard title="Avg. Job Revenue" value={`$${(pnlData.revenue / (filteredJobs.length || 1)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<TrendingUp size={24} />} color="indigo" subtext={`${filteredJobs.length} jobs`}/>
            <StatCard title="Avg. Job Profit" value={`$${(pnlData.grossProfit / (filteredJobs.length || 1)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<Target size={24} />} color="purple" subtext="Gross profit per job" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <EnhancedBillsSection 
                bills={bills} 
                paidStatus={paidStatus} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                handleTogglePaid={handleTogglePaid} 
                handleSort={handleSort} 
                openModal={openModal} 
                handleDelete={handleDelete} 
                handleEnhancedExportCSV={handleEnhancedExportCSV} 
            />
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Expense Breakdown</h3>
                    <ActivePieChart data={expenseByCategory} onSliceClick={setSelectedCategory} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Work Order Management</h3>
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Professional HVAC business management with advanced invoicing, customer management, and dispatch.
                        </p>
                        <button 
                            onClick={() => setActiveSection('workorder')}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <Wrench size={16} /> Open Work Orders
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Getting Started</h3>
                    <div className="space-y-4">
                        <div className="text-sm text-slate-600 dark:text-slate-400 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Welcome!</h4>
                            <div className="space-y-1">
                                <p>• Use the Work Orders tab for complete HVAC business management.</p>
                                <p>• Track your finances and business performance from the dashboard.</p>
                                <p>• Manage vehicles, inventory, and reports using the other tabs.</p>
                            </div>
                        </div>
                        <button 
                            onClick={deleteAllData} 
                            className="w-full flex items-center justify-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                        >
                            <Trash2 size={16} /> Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
); // 

// Now your main component return should start here
return (
    <div className={`${theme} bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white min-h-screen font-sans`}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">TESTING 123</h1>
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
                       <div className="flex items-center gap-2 ml-2">
                           <button onClick={() => {
                               const newStart = new Date(dateRange.start);
                               if (reportingPeriod === 'monthly') newStart.setMonth(newStart.getMonth() - 1);
                               else if (reportingPeriod === 'quarterly') newStart.setMonth(newStart.getMonth() - 3);
                               else newStart.setFullYear(newStart.getFullYear() - 1);
                               let end;
                               if (reportingPeriod === 'monthly') end = new Date(newStart.getFullYear(), newStart.getMonth() + 1, 0);
                               else if (reportingPeriod === 'quarterly') end = new Date(newStart.getFullYear(), newStart.getMonth() + 3, 0);
                               else end = new Date(newStart.getFullYear(), 11, 31);
                               setDateRange({ start: newStart, end });
                           }} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Previous period">
                               <ChevronLeft size={16} />
                           </button>
                           <span className="text-sm font-medium min-w-[120px] text-center">
                               {reportingPeriod === 'monthly' && dateRange.start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                               {reportingPeriod === 'quarterly' && `Q${Math.ceil((dateRange.start.getMonth() + 1) / 3)} ${dateRange.start.getFullYear()}`}
                               {reportingPeriod === 'yearly' && dateRange.start.getFullYear().toString()}
                           </span>
                           <button onClick={() => {
                               const newStart = new Date(dateRange.start);
                               if (reportingPeriod === 'monthly') newStart.setMonth(newStart.getMonth() + 1);
                               else if (reportingPeriod === 'quarterly') newStart.setMonth(newStart.getMonth() + 3);
                               else newStart.setFullYear(newStart.getFullYear() + 1);
                               let end;
                               if (reportingPeriod === 'monthly') end = new Date(newStart.getFullYear(), newStart.getMonth() + 1, 0);
                               else if (reportingPeriod === 'quarterly') end = new Date(newStart.getFullYear(), newStart.getMonth() + 3, 0);
                               else end = new Date(newStart.getFullYear(), 11, 31);
                               setDateRange({ start: newStart, end });
                           }} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Next period">
                               <ChevronRight size={16} />
                           </button>
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
                {activeSection === 'reports' && <ReportsSection clients={clients} jobs={jobs} bills={bills} inventory={inventory} />}
                {activeSection === 'valuation' && <ValuationCalculator />}
                {activeSection === 'calendar' && <CalendarSection jobs={jobs} tasks={tasks} openModal={openModal} />}
                {activeSection === 'tax' && <TaxManagement jobs={jobs} bills={bills} weeklyCosts={weeklyCosts} taxPayments={taxPayments} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'pnl' && <PnLStatement jobs={jobs} bills={bills} weeklyCosts={weeklyCosts} reportingPeriod={reportingPeriod} dateRange={dateRange} />}
                {activeSection === 'forecast' && <ForecastSection invoices={invoices} bills={bills} weeklyCosts={weeklyCosts} currentBankBalance={currentBankBalance} setCurrentBankBalance={handleUpdateCurrentBalance} />}
                {activeSection === 'goals' && <GoalsSection goalsWithProgress={goalsWithProgress} openModal={openModal} onDeleteGoal={(goalId) => handleDelete('goal', goalId)} onEditGoal={(goal) => openModal('goal', goal)} />}
                {activeSection === 'incentives' && <IncentiveCalculator userId={userId} db={db} appId={appId} />}
                {activeSection === 'workorder' && <WorkOrderManagement userId={userId} db={db} inventory={inventory} />}
                {activeSection === 'vehicles' && <VehicleManagement vehicles={vehicles} maintenanceLogs={maintenanceLogs} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                {activeSection === 'inventory' && <InventoryManagement inventory={inventory} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleEnhancedExportCSV={handleEnhancedExportCSV} />}
                {activeSection === 'debts' && <DebtManagement debts={debts} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} debtPayoffStrategies={debtPayoffStrategies} handleEnhancedExportCSV={handleEnhancedExportCSV} />}
                {activeSection === 'incomes' && <IncomeSourcesSection incomes={incomes} openModal={openModal} handleDelete={handleDelete} />}
                {activeSection === 'weeklyCosts' && <WeeklyCostsSection weeklyCosts={weeklyCosts} openModal={openModal} handleDelete={handleDelete} />}
             </main>
            <footer className="text-center mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Powered by <a href="https://service.money/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Service Coin</a>
                </p>
            </footer>
        </div>
        <CSVPreviewModal />
        {isModalOpen && (
            <ItemFormModal 
                item={editingItem} 
                type={modalType} 
                onSave={handleSave} 
                onClose={() => setIsModalOpen(false)} 
                debts={debts} 
                clients={clients} 
                vehicles={vehicles} 
            />
        )}
    </div>
);
}; // ← This closes the App component

export default App;