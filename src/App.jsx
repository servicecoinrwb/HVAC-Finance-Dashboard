import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Bell, CheckCircle, ChevronDown, ChevronUp, Circle, DollarSign, Edit, FileText, Home, Inbox, LogOut, MessageSquare, Paperclip, PlusCircle, RefreshCw, Save, Target, Trash2, TrendingUp, Upload, User, Users, X, Car, Building, BarChart2, Sun, Moon, Percent, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react';

// Import Components
import Auth from './components/Auth';
import TaxManagement from './components/TaxManagement';
import CalendarSection from './components/CalendarSection';
import { StatCard } from './components/StatCard';
import { ItemFormModal } from './components/ItemFormModal';
import { InvoiceManagement } from './components/InvoiceManagement';
import { ClientManagement } from './components/ClientManagement';
import VehicleManagement from './components/VehicleManagement';
import { InventoryManagement } from './components/InventoryManagement';
import { ReportsSection } from './components/ReportsSection';
import { AlertsPanel } from './components/AlertsPanel';
import { ActivePieChart } from './components/ActivePieChart';
import { Modal } from './components/Modal';
import { ForecastSection } from './components/Forecast';
import { JobsSection } from './components/Jobs';
import { PnLStatement } from './components/PnLStatement';
import { DebtManagement } from './components/DebtManagement';
import { IncomeSourcesSection } from './components/IncomeSources';
import { GoalsSection } from './components/GoalsSection';
import { WeeklyCostsSection } from './components/WeeklyCostsSection';
import IncentiveCalculator from './components/IncentiveCalculator';

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

// --- Initial Data ---
const INITIAL_BILLS = [ { name: "Adobe", amount: 21.19, dueDay: 1, isAutoPay: true, category: "Software", notes: "", attachmentURL: null, isRecurring: true }, { name: "Rent", amount: 1600, dueDay: 1, isAutoPay: false, category: "Overhead", notes: "Landlord: John Smith", attachmentURL: null, isRecurring: true }, { name: "GM Financial Black Truck", amount: 1307.20, dueDay: 6, isAutoPay: false, category: "Vehicle", notes: "", vehicleId: "1" }];
const INITIAL_DEBTS = [ { name: "Ondeck Credit", totalAmount: 7500, paidAmount: 0, interestRate: 12.5, notes: "" }, { name: "Chase Card", totalAmount: 33795.27, paidAmount: 2200, interestRate: 21.99, notes: "" }];
const INITIAL_INCOME = [ { name: "NEST Early Pay", amount: 15000, type: "monthly", notes: "", isRecurring: true }, { name: "Job Revenue", amount: 5000, type: "monthly", notes: "", isRecurring: false }];
const INITIAL_WEEKLY_COSTS = [ { name: "Projected Payroll", amount: 1800, notes: "" }, { name: "Fuel & Maintenance", amount: 450, notes: "" }];
const INITIAL_JOBS = [ { name: "Johnson Residence A/C Install", revenue: 8500, materialCost: 3200, laborCost: 1500, notes: "Trane XV20i unit.", date: new Date().toISOString(), clientId: "1" }, { name: "Downtown Restaurant PM", revenue: 1200, materialCost: 150, laborCost: 400, notes: "Quarterly maintenance contract.", date: new Date().toISOString(), clientId: "2" }];
const INITIAL_TASKS = [ { title: "Follow up with Johnson about quote", date: new Date().toISOString().split('T')[0], notes: "Sent quote last week", isComplete: false }, { title: "Order filters for Downtown Restaurant", date: new Date().toISOString().split('T')[0], notes: "Need 10x 20x25x1 filters", isComplete: true }];
const INITIAL_INVOICES = [ { billTo: "Badawi", customer: "Southern Algeria #00547", jobNo: "1548875887", completedOn: "6/14/2024", invNum: "", terms: "Net 45", net: 1291.00, dueDate: "6/14/2024", status: "Unpaid", grandTotal: 1291.00 }];
const INITIAL_TAX_PAYMENTS = [{ date: new Date().toISOString().split('T')[0], amount: 500, notes: "Q2 Estimated Payment" }];
const INITIAL_GOALS = [ { name: "Pay off Chase Card", type: "debt", targetId: "Chase Card", targetValue: 0, deadline: "2025-12-31" }, { name: "Achieve $50k Job Revenue", type: "revenue", targetValue: 50000, deadline: "2025-12-31" }];
const INITIAL_CLIENTS = [ {id: "1", name: "John Johnson", address: "123 Main St, Anytown, USA", phone: "555-1234", email: "john@example.com"}, {id: "3", name: "Restaurant Group Inc.", address: "789 Corp Blvd, Big City, USA", phone: "555-9999", email: "accounts@restaurantgroup.com"}, {id: "2", name: "Downtown Restaurant", address: "456 Oak Ave, Anytown, USA", phone: "555-5678", email: "contact@downtownrestaurant.com", parentId: "3"}];
const INITIAL_INVENTORY = [ {name: "Standard 1-inch Filter", quantity: 50, cost: 5.50}, {name: "Capacitor 45/5 MFD", quantity: 15, cost: 25.00} ];
const INITIAL_VEHICLES = [ 
    {id: "7", name: "Jason's Truck", make: "FORD", model: "TRANSIT T250", year: "2020", vin: "1FTBR1C84LKA59065", licensePlate: "DD16326", currentMileage: 104071, status: "active"}, 
    {id: "8", name: "Red Van", make: "FORD", model: "TRANSIT T250", year: "2020", vin: "1FTBR1C85LKA70866", licensePlate: "DD16337", currentMileage: 107046, status: "active"}, 
    {id: "11", name: "GMC Sierra", make: "GMC", model: "SIERRA", year: "2022", vin: "3GTPUJEK7NG635190", licensePlate: "DF94421", currentMileage: 18811, status: "active"} 
];
// Remove maintenance logs for now
const INITIAL_MAINTENANCE_LOGS = [];

// --- Column Configurations ---
const jobColumns = [
    { key: 'name', label: 'Job Name', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true, type: 'currency' },
    { key: 'materialCost', label: 'Material Cost', sortable: true, type: 'currency' },
    { key: 'laborCost', label: 'Labor Cost', sortable: true, type: 'currency' },
    { key: 'date', label: 'Date', sortable: true, type: 'date' },
    { key: 'notes', label: 'Notes', sortable: false }
];

const debtColumns = [
    { key: 'name', label: 'Debt Name', sortable: true },
    { key: 'totalAmount', label: 'Total Amount', sortable: true, type: 'currency' },
    { key: 'paidAmount', label: 'Paid Amount', sortable: true, type: 'currency' },
    { key: 'interestRate', label: 'Interest Rate', sortable: true, type: 'percentage' },
    { key: 'notes', label: 'Notes', sortable: false }
];

const incomeColumns = [
    { key: 'name', label: 'Income Source', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, type: 'currency' },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'isRecurring', label: 'Recurring', sortable: true, type: 'boolean' },
    { key: 'notes', label: 'Notes', sortable: false }
];

const weeklyCostColumns = [
    { key: 'name', label: 'Cost Name', sortable: true },
    { key: 'amount', label: 'Weekly Amount', sortable: true, type: 'currency' },
    { key: 'notes', label: 'Notes', sortable: false }
];

// CSV Import Button Component
const CSVImportButton = ({ type, label, acceptTypes = ".csv" }) => {
    const fileInputRef = React.useRef(null);

    return (
        <div className="inline-block">
            <input
                ref={fileInputRef}
                type="file"
                accept={acceptTypes}
                onChange={(e) => {
                    if (e.target.files[0]) {
                        window.handleEnhancedCSVImport?.(e.target.files[0], type);
                        e.target.value = '';
                    }
                }}
                style={{ display: 'none' }}
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
            >
                <Upload size={16} />
                {label}
            </button>
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

    // Enhanced CSV Integration State
    const [csvImportData, setCsvImportData] = useState([]);
    const [csvPreview, setCsvPreview] = useState({ show: false, data: [], headers: [], type: '', fileName: '' });
    const [csvMapping, setCsvMapping] = useState({});

    // Enhanced CSV Import with Preview and Mapping
    const handleEnhancedCSVImport = (file, type) => {
        if (!file || !userId) {
            alert("Please select a file and ensure you're logged in.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').filter(line => line.trim());
                
                if (lines.length < 2) {
                    alert("CSV file must have at least a header row and one data row.");
                    return;
                }

                // Parse CSV with better handling for quotes and commas
                const parseCSVLine = (line) => {
                    const result = [];
                    let current = '';
                    let inQuotes = false;
                    
                    for (let i = 0; i < line.length; i++) {
                        const char = line[i];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            result.push(current.trim());
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    result.push(current.trim());
                    return result;
                };

                const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
                const data = lines.slice(1, 6).map(line => {
                    const values = parseCSVLine(line);
                    return headers.reduce((obj, header, index) => {
                        let value = values[index] || '';
                        value = value.replace(/"/g, '').trim();
                        
                        // Try to convert numbers
                        if (value && !isNaN(value) && value !== '') {
                            obj[header] = parseFloat(value);
                        } else {
                            obj[header] = value;
                        }
                        return obj;
                    }, {});
                });

                console.log("CSV Headers:", headers);
                console.log("CSV Data Preview:", data);

                // Show preview with mapping options
                setCsvPreview({
                    show: true,
                    data: data,
                    headers: headers,
                    type: type,
                    fileName: file.name,
                    fullData: lines.slice(1).map(line => {
                        const values = parseCSVLine(line);
                        return headers.reduce((obj, header, index) => {
                            let value = values[index] || '';
                            value = value.replace(/"/g, '').trim();
                            
                            if (value && !isNaN(value) && value !== '') {
                                obj[header] = parseFloat(value);
                            } else {
                                obj[header] = value;
                            }
                            return obj;
                        }, {});
                    })
                });

                // Set default mapping based on type
                setDefaultMapping(type, headers);

            } catch (error) {
                console.error("Error parsing CSV:", error);
                alert("Error parsing CSV file. Please check the file format.");
            }
        };
        reader.readAsText(file);
    };

    // Make function available globally for the CSVImportButton
    useEffect(() => {
        window.handleEnhancedCSVImport = handleEnhancedCSVImport;
        return () => {
            delete window.handleEnhancedCSVImport;
        };
    }, [userId]);

    // Set default field mapping based on import type
    const setDefaultMapping = (type, headers) => {
        const mappings = {
            job: {
                name: findBestMatch(headers, ['name', 'job name', 'jobname', 'title', 'job title', 'description']),
                revenue: findBestMatch(headers, ['revenue', 'amount', 'total', 'price', 'cost', 'value']),
                materialCost: findBestMatch(headers, ['material cost', 'materials', 'material', 'parts']),
                laborCost: findBestMatch(headers, ['labor cost', 'labor', 'labour', 'work']),
                date: findBestMatch(headers, ['date', 'created', 'completed', 'finish', 'done']),
                notes: findBestMatch(headers, ['notes', 'description', 'comments', 'details']),
                clientId: findBestMatch(headers, ['client', 'customer', 'customer id', 'client id'])
            },
            client: {
                name: findBestMatch(headers, ['name', 'customer name', 'client name', 'company']),
                address: findBestMatch(headers, ['address', 'location', 'street']),
                phone: findBestMatch(headers, ['phone', 'telephone', 'mobile', 'contact']),
                email: findBestMatch(headers, ['email', 'e-mail', 'mail'])
            },
            invoice: {
                billTo: findBestMatch(headers, ['bill to', 'customer', 'client', 'name']),
                customer: findBestMatch(headers, ['customer', 'client', 'company']),
                jobNo: findBestMatch(headers, ['job no', 'job number', 'job id', 'reference']),
                completedOn: findBestMatch(headers, ['completed', 'date', 'finish date']),
                net: findBestMatch(headers, ['net', 'amount', 'total', 'subtotal']),
                grandTotal: findBestMatch(headers, ['grand total', 'total', 'amount']),
                status: findBestMatch(headers, ['status', 'paid', 'payment status'])
            }
        };

        setCsvMapping(mappings[type] || {});
    };

    // Find best matching header for a field
    const findBestMatch = (headers, searchTerms) => {
        for (const term of searchTerms) {
            const match = headers.find(h => h.toLowerCase().includes(term.toLowerCase()));
            if (match) return match;
        }
        return headers[0] || ''; // Default to first header if no match
    };

    // Import CSV data after mapping confirmation
    const confirmCSVImport = async () => {
        if (!csvPreview.fullData.length) {
            alert("No data to import.");
            return;
        }

        const { type, fullData } = csvPreview;
        
        try {
            console.log("Starting CSV import...", { type, count: fullData.length, mapping: csvMapping });

            const collectionNameMap = { 
                job: 'jobs', 
                client: 'clients', 
                invoice: 'invoices',
                inventory: 'inventory'
            };
            
            const collectionName = collectionNameMap[type];
            if (!collectionName) {
                alert("Invalid import type.");
                return;
            }

            const batch = writeBatch(db);
            const collectionRef = collection(db, 'artifacts', appId, 'users', userId, collectionName);
            
            let importedCount = 0;

            fullData.forEach(row => {
                // Map CSV data to your app's structure
                const mappedItem = {};
                
                Object.entries(csvMapping).forEach(([appField, csvField]) => {
                    if (csvField && row[csvField] !== undefined && row[csvField] !== '') {
                        mappedItem[appField] = row[csvField];
                    }
                });

                // Add required fields based on type
                if (type === 'job') {
                    mappedItem.date = mappedItem.date || new Date().toISOString();
                    mappedItem.revenue = mappedItem.revenue || 0;
                    mappedItem.materialCost = mappedItem.materialCost || 0;
                    mappedItem.laborCost = mappedItem.laborCost || 0;
                } else if (type === 'invoice') {
                    mappedItem.status = mappedItem.status || 'Unpaid';
                    mappedItem.net = mappedItem.net || 0;
                    mappedItem.grandTotal = mappedItem.grandTotal || mappedItem.net || 0;
                }

                // Only import if we have essential data
                if ((type === 'job' && mappedItem.name) || 
                    (type === 'client' && mappedItem.name) || 
                    (type === 'invoice' && (mappedItem.billTo || mappedItem.customer)) ||
                    (type === 'inventory' && mappedItem.name)) {
                    
                    const docRef = doc(collectionRef);
                    batch.set(docRef, {
                        ...mappedItem,
                        importedFrom: csvPreview.fileName,
                        importedAt: serverTimestamp(),
                        createdAt: serverTimestamp()
                    });
                    importedCount++;
                }
            });

            if (importedCount === 0) {
                alert("No valid records found to import. Please check your field mapping.");
                return;
            }

            await batch.commit();
            
            console.log(`Successfully imported ${importedCount} records`);
            alert(`Successfully imported ${importedCount} ${collectionName} from ${csvPreview.fileName}!`);
            
            // Close preview
            setCsvPreview({ show: false, data: [], headers: [], type: '', fileName: '' });
            setCsvMapping({});

        } catch (error) {
            console.error("Error importing CSV:", error);
            alert(`Failed to import CSV: ${error.message}`);
        }
    };

    // Enhanced Export CSV with better formatting
    const handleEnhancedExportCSV = (data, sectionName, customFields = null) => {
        if (!data.length) {
            alert("No data to export.");
            return;
        }

        try {
            // Use custom fields if provided, otherwise use all fields
            const headers = customFields || Object.keys(data[0]).filter(key => 
                !key.includes('createdAt') && !key.includes('modifiedAt') && key !== 'id'
            );

            // Create CSV content with proper escaping
            const escapeCsvValue = (value) => {
                if (value === null || value === undefined) return '';
                const stringValue = String(value);
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            };

            const csvRows = [
                headers.join(','), // Header row
                ...data.map(item => 
                    headers.map(header => escapeCsvValue(item[header])).join(',')
                )
            ];

            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            
            // Create download link
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `hvac_${sectionName}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log(`Exported ${data.length} ${sectionName} records to CSV`);
            alert(`Successfully exported ${data.length} ${sectionName} records!`);

        } catch (error) {
            console.error("Error exporting CSV:", error);
            alert("Failed to export CSV: " + error.message);
        }
    };

    // Export AppSheet Jobs as CSV Template
    const exportAppSheetTemplate = () => {
        const templateData = [
            {
                'Job Name': 'Sample HVAC Install',
                'Revenue': 5000,
                'Material Cost': 2000,
                'Labor Cost': 1500,
                'Date': '2025-01-15',
                'Customer': 'Sample Customer',
                'Notes': 'Sample job for import'
            }
        ];
        
        handleEnhancedExportCSV(templateData, 'appsheet_template', ['Job Name', 'Revenue', 'Material Cost', 'Labor Cost', 'Date', 'Customer', 'Notes']);
    };

    // CSV Preview and Mapping Component
    const CSVPreviewModal = () => {
        if (!csvPreview.show) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                Import Preview: {csvPreview.fileName}
                            </h2>
                            <button
                                onClick={() => setCsvPreview({ show: false, data: [], headers: [], type: '', fileName: '' })}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Found {csvPreview.fullData?.length || 0} records. Showing first 5 for preview.
                        </p>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        {/* Field Mapping Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                                Map CSV Fields to Your App
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(csvMapping).map(appField => (
                                    <div key={appField} className="flex items-center gap-3">
                                        <label className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            {appField}:
                                        </label>
                                        <select
                                            value={csvMapping[appField] || ''}
                                            onChange={(e) => setCsvMapping(prev => ({ ...prev, [appField]: e.target.value }))}
                                            className="flex-1 px-3 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                        >
                                            <option value="">-- Skip Field --</option>
                                            {csvPreview.headers.map(header => (
                                                <option key={header} value={header}>{header}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Data Preview */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Data Preview</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border border-slate-200 dark:border-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            {csvPreview.headers.map(header => (
                                                <th key={header} className="p-2 text-left border-r border-slate-200 dark:border-slate-600">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {csvPreview.data.map((row, index) => (
                                            <tr key={index} className="border-t border-slate-200 dark:border-slate-700">
                                                {csvPreview.headers.map(header => (
                                                    <td key={header} className="p-2 border-r border-slate-200 dark:border-slate-600">
                                                        {String(row[header] || '')}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                        <button
                            onClick={() => setCsvPreview({ show: false, data: [], headers: [], type: '', fileName: '' })}
                            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmCSVImport}
                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
                        >
                            Import {csvPreview.fullData?.length || 0} Records
                        </button>
                    </div>
                </div>
            </div>
        );
    };

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
                console.log("User authenticated:", user.uid);
                setUserId(user.uid);
                
                // Check multiple collections to see if ANY data exists (not just bills)
                const billsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'bills');
                const vehiclesRef = collection(db, 'artifacts', appId, 'users', user.uid, 'vehicles');
                const clientsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'clients');
                
                const [billsSnapshot, vehiclesSnapshot, clientsSnapshot] = await Promise.all([
                    getDocs(billsRef),
                    getDocs(vehiclesRef), 
                    getDocs(clientsRef)
                ]);
                
                const hasAnyData = !billsSnapshot.empty || !vehiclesSnapshot.empty || !clientsSnapshot.empty;
                
                console.log("Data check:", {
                    bills: billsSnapshot.docs.length,
                    vehicles: vehiclesSnapshot.docs.length,
                    clients: clientsSnapshot.docs.length,
                    hasAnyData
                });
                
                if (!hasAnyData) {
                    setIsSeeding(true);
                    console.log("No data found anywhere. Starting initial data seeding...");
                    
                    try {
                        const batch = writeBatch(db);
                        const basePath = ['artifacts', appId, 'users', user.uid];
                        
                        // Add a flag to prevent re-seeding
                        const seedingFlagRef = doc(db, ...basePath, 'system', 'seeded');
                        batch.set(seedingFlagRef, { 
                            seededAt: serverTimestamp(),
                            version: '1.0'
                        });
                        
                        // Seed basic data (no maintenance logs for now)
                        INITIAL_BILLS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'bills'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding bill ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_DEBTS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'debts'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding debt ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_INCOME.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'incomes'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding income ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_WEEKLY_COSTS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'weeklyCosts'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding weekly cost ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_JOBS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'jobs'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding job ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_TASKS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'tasks'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding task ${index + 1}:`, item.title);
                        });
                        
                        INITIAL_INVOICES.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'invoices'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding invoice ${index + 1}:`, item.billTo);
                        });
                        
                        INITIAL_TAX_PAYMENTS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'taxPayments'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding tax payment ${index + 1}`);
                        });
                        
                        INITIAL_GOALS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'goals'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding goal ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_CLIENTS.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'clients'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding client ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_INVENTORY.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'inventory'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding inventory ${index + 1}:`, item.name);
                        });
                        
                        INITIAL_VEHICLES.forEach((item, index) => {
                            const docRef = doc(collection(db, ...basePath, 'vehicles'));
                            batch.set(docRef, {...item, createdAt: serverTimestamp()});
                            console.log(`Adding vehicle ${index + 1}:`, item.name);
                        });
                        
                        // Set initial paid status
                        const initialMonthYear = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
                        const paidStatusRef = doc(db, ...basePath, 'paidStatus', initialMonthYear);
                        batch.set(paidStatusRef, { status: {} });
                        console.log("Adding initial paid status for:", initialMonthYear);
                        
                        await batch.commit();
                        console.log("✅ Initial data seeded successfully");
                        setIsSeeding(false);
                    } catch (error) {
                        console.error("❌ Error seeding initial data:", error);
                        setIsSeeding(false);
                        alert("Failed to seed initial data: " + error.message);
                    }
                } else {
                    console.log("Data already exists, skipping seeding");
                }
            } else {
                console.log("User not authenticated");
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
    if (!userId) {
        console.log("No user ID, cannot delete");
        return;
    }
    
    if (!window.confirm("Delete this item?")) {
        console.log("User cancelled deletion");
        return;
    }
    
    console.log(`Attempting to delete ${type} with id: ${id}`);
    
    const collectionNameMap = { 
        bill: 'bills', 
        debt: 'debts', 
        income: 'incomes', 
        weekly: 'weeklyCosts', 
        job: 'jobs', 
        task: 'tasks', 
        invoice: 'invoices', 
        taxPayment: 'taxPayments', 
        goal: 'goals', 
        client: 'clients', 
        inventory: 'inventory', 
        vehicle: 'vehicles', 
        maintenanceLog: 'maintenanceLogs' 
    };
    
    const collectionName = collectionNameMap[type];
    
    if (!collectionName) {
        console.error("Invalid type:", type);
        alert("Invalid item type for deletion");
        return;
    }
    
    try {
        const docPath = `artifacts/${appId}/users/${userId}/${collectionName}/${id}`;
        console.log("Deleting document at path:", docPath);
        
        const docRef = doc(db, 'artifacts', appId, 'users', userId, collectionName, id);
        await deleteDoc(docRef);
        
        console.log(`✅ Successfully deleted ${type} with id: ${id}`);
        
        // Optional: Show success feedback
        // You can remove this alert in production
        setTimeout(() => {
            console.log(`Deletion of ${type} completed`);
        }, 100);
        
    } catch (error) {
        console.error(`❌ Error deleting ${type}:`, error);
        alert(`Failed to delete ${type}. Error: ${error.message}`);
    }
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
            delete newBill.id;
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
        
        const collectionNameMap = { inventory: 'inventory', invoice: 'invoices', client: 'clients', vehicle: 'vehicles' };
        const collectionName = collectionNameMap[type];
        
        if (!collectionName) {
            alert("Invalid bulk delete type.");
            return;
        }
        
        try {
            const batch = writeBatch(db);
            
            ids.forEach(id => {
                const docRef = doc(db, 'artifacts', appId, 'users', userId, collectionName, id);
                batch.delete(docRef);
                
                // If deleting vehicles, also delete their maintenance logs
                if (type === 'vehicle') {
                    const vehicleMaintenanceLogs = maintenanceLogs.filter(log => log.vehicleId === id);
                    vehicleMaintenanceLogs.forEach(log => {
                        const logRef = doc(db, 'artifacts', appId, 'users', userId, 'maintenanceLogs', log.id);
                        batch.delete(logRef);
                    });
                }
            });
            
            await batch.commit();
            setSelectedIds([]);
            console.log(`Successfully deleted ${ids.length} ${type}s`);
        } catch (error) {
            console.error(`Error bulk deleting ${type}s:`, error);
            alert(`Failed to delete ${type}s. Please try again.`);
        }
    };

    // Function to remove duplicate vehicles and clean up data
    const removeDuplicateVehicles = async () => {
        if (!userId || !window.confirm("Remove duplicate vehicles? This will keep only one of each unique vehicle.")) return;
        
        try {
            console.log("Starting duplicate removal...");
            
            // Get all vehicles
            const vehiclesSnapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, 'vehicles'));
            const allVehicles = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            console.log("Found vehicles:", allVehicles.length);
            
            // Group by VIN or name to find duplicates
            const uniqueVehicles = new Map();
            const duplicatesToDelete = [];
            
            allVehicles.forEach(vehicle => {
                const key = vehicle.vin || vehicle.name || 'unknown';
                
                if (uniqueVehicles.has(key)) {
                    // This is a duplicate - mark for deletion
                    duplicatesToDelete.push(vehicle.id);
                    console.log("Marking duplicate for deletion:", vehicle.name, vehicle.id);
                } else {
                    // This is the first occurrence - keep it
                    uniqueVehicles.set(key, vehicle);
                    console.log("Keeping unique vehicle:", vehicle.name, vehicle.id);
                }
            });
            
            if (duplicatesToDelete.length === 0) {
                alert("No duplicates found!");
                return;
            }
            
            console.log(`Deleting ${duplicatesToDelete.length} duplicate vehicles...`);
            
            // Delete duplicates in batches
            const batchSize = 10;
            for (let i = 0; i < duplicatesToDelete.length; i += batchSize) {
                const batch = writeBatch(db);
                const batchIds = duplicatesToDelete.slice(i, i + batchSize);
                
                batchIds.forEach(id => {
                    const docRef = doc(db, 'artifacts', appId, 'users', userId, 'vehicles', id);
                    batch.delete(docRef);
                });
                
                await batch.commit();
                console.log(`Deleted batch ${Math.floor(i/batchSize) + 1}`);
            }
            
            console.log("✅ Duplicate removal completed");
            alert(`Removed ${duplicatesToDelete.length} duplicate vehicles. You now have ${uniqueVehicles.size} unique vehicles.`);
            
        } catch (error) {
            console.error("❌ Error removing duplicates:", error);
            alert("Failed to remove duplicates: " + error.message);
        }
    };
    const clearAllData = async () => {
        if (!userId || !window.confirm("⚠️ WARNING: This will delete ALL your data! Are you absolutely sure?")) return;
        
        try {
            console.log("Starting to clear all data...");
            const collections = ['bills', 'debts', 'incomes', 'weeklyCosts', 'jobs', 'tasks', 'invoices', 'taxPayments', 'goals', 'clients', 'inventory', 'vehicles', 'maintenanceLogs', 'paidStatus'];
            
            for (const collectionName of collections) {
                console.log(`Clearing collection: ${collectionName}`);
                
                if (collectionName === 'paidStatus') {
                    // Handle paidStatus differently - it's a subcollection
                    const paidStatusRef = collection(db, 'artifacts', appId, 'users', userId, 'paidStatus');
                    const paidStatusSnapshot = await getDocs(paidStatusRef);
                    
                    const batch = writeBatch(db);
                    paidStatusSnapshot.docs.forEach(docSnap => {
                        batch.delete(docSnap.ref);
                    });
                    
                    if (paidStatusSnapshot.docs.length > 0) {
                        await batch.commit();
                        console.log(`Cleared ${paidStatusSnapshot.docs.length} documents from ${collectionName}`);
                    }
                } else {
                    const snapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, collectionName));
                    
                    if (snapshot.docs.length > 0) {
                        const batch = writeBatch(db);
                        snapshot.docs.forEach(docSnap => {
                            batch.delete(docSnap.ref);
                        });
                        
                        await batch.commit();
                        console.log(`Cleared ${snapshot.docs.length} documents from ${collectionName}`);
                    } else {
                        console.log(`Collection ${collectionName} is already empty`);
                    }
                }
            }
            
            console.log("All data cleared successfully");
            alert("All data has been cleared. The page will refresh to reseed with fresh data.");
            
            // Force refresh to trigger reseeding
            window.location.reload();
            
        } catch (error) {
            console.error("Error clearing data:", error);
            alert("Failed to clear data: " + error.message);
        }
    };

    if (isLoading) return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div></div>;
    
    if (!userId) {
        return <Auth setUserId={setUserId} />;
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
                        <div className="flex gap-2">
                            <CSVImportButton type="bill" label="Import" />
                            <button onClick={() => handleEnhancedExportCSV(filteredBills, 'bills')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><FileText size={16} /> Export</button>
                        </div>
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
                                {filteredBills.map(bill => (
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
                    
                    {/* AppSheet Integration Panel */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">AppSheet Integration</h3>
                        <div className="space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400">Import your AppSheet jobs and customer data easily with CSV files.</p>
                            
                            <div className="flex flex-wrap gap-2">
                                <CSVImportButton type="job" label="Import Jobs" />
                                <CSVImportButton type="client" label="Import Customers" />
                                <CSVImportButton type="invoice" label="Import Invoices" />
                            </div>
                            
                            <button
                                onClick={exportAppSheetTemplate}
                                className="w-full flex items-center justify-center gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <FileText size={16} />
                                Download CSV Template
                            </button>
                            
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                <p>• Export data from AppSheet as CSV</p>
                                <p>• Use Import buttons to map fields</p>
                                <p>• Download template for reference</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Data Management</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={handleGenerateRecurring} 
                                className="w-full flex items-center justify-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <RefreshCw size={16} /> 
                                Generate Next Month's Bills
                            </button>
                            
                            <button 
                                onClick={removeDuplicateVehicles} 
                                className="w-full flex items-center justify-center gap-2 text-sm bg-orange-600 hover:bg-orange-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <Car size={16} /> 
                                Remove Duplicate Vehicles
                            </button>
                            
                            {/* Debug button - remove in production */}
                            <button 
                                onClick={clearAllData} 
                                className="w-full flex items-center justify-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <Trash2 size={16} /> 
                                Clear All Data (Debug)
                            </button>
                        </div>
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
                    <button onClick={() => setActiveSection('reports')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'reports' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Reports</button>
                    <button onClick={() => setActiveSection('calendar')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'calendar' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Calendar</button>
                    <button onClick={() => setActiveSection('invoices')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'invoices' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Invoices</button>
                    <button onClick={() => setActiveSection('tax')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'tax' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Tax Management</button>
                    <button onClick={() => setActiveSection('pnl')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'pnl' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>P&L Statement</button>
                    <button onClick={() => setActiveSection('forecast')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'forecast' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Forecast</button>
                    <button onClick={() => setActiveSection('goals')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'goals' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Goals</button>
                    <button onClick={() => setActiveSection('incentives')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incentives' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Incentives</button>
                    <button onClick={() => setActiveSection('clients')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'clients' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Clients</button>
                    <button onClick={() => setActiveSection('jobs')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'jobs' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Jobs</button>
                    <button onClick={() => setActiveSection('vehicles')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'vehicles' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Vehicles</button>
                    <button onClick={() => setActiveSection('inventory')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'inventory' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Inventory</button>
                    <button onClick={() => setActiveSection('debts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'debts' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Debt Management</button>
                    <button onClick={() => setActiveSection('incomes')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'incomes' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Income Sources</button>
                    <button onClick={() => setActiveSection('weeklyCosts')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'weeklyCosts' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Weekly Costs</button>
                </nav>
                <main>
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'reports' && <ReportsSection clients={clients} jobs={jobs} bills={bills} inventory={inventory} />}
                    {activeSection === 'calendar' && <CalendarSection jobs={jobs} tasks={tasks} openModal={openModal} />}
                    {activeSection === 'invoices' && (
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Invoice Management</h2>
                                <div className="flex flex-wrap gap-2">
                                    <CSVImportButton type="invoice" label="Import Invoices" />
                                    <button
                                        onClick={() => handleEnhancedExportCSV(invoices, 'invoices', ['billTo', 'customer', 'jobNo', 'completedOn', 'net', 'grandTotal', 'status'])}
                                        className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                                    >
                                        <FileText size={16} />
                                        Export Invoices
                                    </button>
                                    <button onClick={() => openModal('invoice')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                                        <PlusCircle size={18} />
                                        Add Invoice
                                    </button>
                                </div>
                            </div>
                            <InvoiceManagement invoices={invoices} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} handleToggleInvoicePaid={handleToggleInvoicePaid} />
                        </div>
                    )}
                    {activeSection === 'tax' && <TaxManagement jobs={jobs} bills={bills} weeklyCosts={weeklyCosts} taxPayments={taxPayments} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'pnl' && <PnLStatement jobs={jobs} bills={bills} weeklyCosts={weeklyCosts} reportingPeriod={reportingPeriod} dateRange={dateRange} />}
                    {activeSection === 'forecast' && <ForecastSection invoices={invoices} bills={bills} weeklyCosts={weeklyCosts} currentBankBalance={currentBankBalance} setCurrentBankBalance={setCurrentBankBalance} />}
                    {activeSection === 'goals' && (
                        <GoalsSection 
                            goalsWithProgress={goalsWithProgress} 
                            openModal={openModal}
                            onDeleteGoal={(goalId) => handleDelete('goal', goalId)}
                            onEditGoal={(goal) => openModal('goal', goal)}
                        />
                    )}
                    {activeSection === 'incentives' && <IncentiveCalculator />}
                    {activeSection === 'clients' && (
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Client Management</h2>
                                <div className="flex flex-wrap gap-2">
                                    <CSVImportButton type="client" label="Import Clients" />
                                    <button
                                        onClick={() => handleEnhancedExportCSV(clients, 'clients', ['name', 'address', 'phone', 'email'])}
                                        className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                                    >
                                        <FileText size={16} />
                                        Export Clients
                                    </button>
                                    <button onClick={() => openModal('client')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                                        <PlusCircle size={18} />
                                        Add Client
                                    </button>
                                </div>
                            </div>
                            <ClientManagement clients={clients} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} />
                        </div>
                    )}
                    {activeSection === 'jobs' && (
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Jobs Management</h2>
                                <div className="flex flex-wrap gap-2">
                                    <CSVImportButton type="job" label="Import Jobs" />
                                    <button
                                        onClick={() => handleEnhancedExportCSV(jobs, 'jobs', ['name', 'revenue', 'materialCost', 'laborCost', 'date', 'notes', 'clientId'])}
                                        className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                                    >
                                        <FileText size={16} />
                                        Export Jobs
                                    </button>
                                    <button onClick={() => openModal('job')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                                        <PlusCircle size={18} />
                                        Add Job
                                    </button>
                                </div>
                            </div>
                            <JobsSection jobs={jobs} clients={clients} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} />
                        </div>
                    )}
                    {activeSection === 'vehicles' && <VehicleManagement vehicles={vehicles} maintenanceLogs={maintenanceLogs} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                    {activeSection === 'inventory' && <InventoryManagement inventory={inventory} openModal={openModal} handleDelete={handleDelete} handleBulkDelete={handleBulkDelete} selectedIds={selectedIds} setSelectedIds={setSelectedIds} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} />}
                    {activeSection === 'debts' && <DebtManagement debts={debts} openModal={openModal} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleImportCSV={handleImportCSV} handleExportCSV={handleExportCSV} debtPayoffStrategies={debtPayoffStrategies} />}
                    {activeSection === 'incomes' && <IncomeSourcesSection incomes={incomes} openModal={openModal} handleDelete={handleDelete} />}
                    {activeSection === 'weeklyCosts' && <WeeklyCostsSection weeklyCosts={weeklyCosts} openModal={openModal} handleDelete={handleDelete} />}
                </main>
                <footer className="text-center mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Powered by <a href="https://service.money/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Service Coin</a>
                    </p>
                </footer>
            </div>
            
            {/* CSV Preview Modal */}
            <CSVPreviewModal />
            
            {isModalOpen && <ItemFormModal item={editingItem} type={modalType} onSave={handleSave} onClose={() => setIsModalOpen(false)} debts={debts} clients={clients} vehicles={vehicles} />}
        </div>
    );
};

export default App;