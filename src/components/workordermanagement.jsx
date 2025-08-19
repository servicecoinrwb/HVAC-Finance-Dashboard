import React, { useState, useEffect, useMemo } from 'react';
import { collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDocs, writeBatch, query, serverTimestamp, getDoc } from 'firebase/firestore';
import { Wrench, Calendar, MapPin, Building, Search, Filter, X, ChevronDown, Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, XCircle, User, MessageSquare, PlusCircle, Briefcase, Users, ArrowLeft, Edit, Mail, Phone, Trash2, Map, Printer, BarChart2, Award, Download, FileText, RefreshCw, Upload } from 'lucide-react';

// Data Migration Functions
const migrateExistingData = async (userId, db, appId = 'workOrderManagement') => {
    if (!userId) return;
    
    try {
        // Migrate Clients to Customers
        const clientsSnapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, 'clients'));
        const existingClients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Migrate Jobs to Work Orders  
        const jobsSnapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, 'jobs'));
        const existingJobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Migrate Invoices to New Format
        const invoicesSnapshot = await getDocs(collection(db, 'artifacts', appId, 'users', userId, 'invoices'));
        const existingInvoices = invoicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const batch = writeBatch(db);
        let migratedCount = 0;
        
        // Migrate Clients -> Customers
        existingClients.forEach(client => {
            const customerData = {
                name: client.name || 'Unknown Customer',
                type: client.type || 'Commercial',
                contact: {
                    name: client.contactName || client.name || '',
                    email: client.email || '',
                    phone: client.phone || ''
                },
                billingAddress: {
                    street: client.address || '',
                    city: client.city || '',
                    state: client.state || 'MI',
                    zip: client.zip || ''
                },
                locations: [{
                    name: client.name || 'Main Location',
                    locNum: '001',
                    city: client.city || '',
                    state: client.state || 'MI'
                }],
                migratedFrom: 'legacy_clients',
                migratedAt: serverTimestamp()
            };
            
            const docRef = doc(collection(db, 'artifacts', 'workOrderManagement', 'users', userId, 'customers'));
            batch.set(docRef, customerData);
            migratedCount++;
        });
        
        // Migrate Jobs -> Work Orders
        existingJobs.forEach(job => {
            const customer = existingClients.find(c => c.id === job.clientId);
            const workOrderData = {
                'WO#': `WO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                id: `WO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                clientWO: job.jobNo || '',
                Client: customer?.name || job.customer || 'Unknown Client',
                Company: customer?.name || job.customer || 'Unknown Company',
                'Loc #': '001',
                Category: 'Heating & Cooling',
                Task: job.name || job.description || 'Migrated Job',
                'Created Date': job.date ? jsDateToExcel(new Date(job.date)) : jsDateToExcel(new Date()),
                'Schedule Date': job.date ? jsDateToExcel(new Date(job.date)) : null,
                'Completed Date': job.completedOn ? jsDateToExcel(new Date(job.completedOn)) : null,
                startTime: '09:00',
                endTime: '17:00',
                City: customer?.city || '',
                State: customer?.state || 'MI',
                NTE: job.revenue || 0,
                technician: [],
                notes: job.notes ? [{ 
                    text: job.notes, 
                    timestamp: new Date().toISOString() 
                }] : [],
                Priority: 'Regular',
                'Order Status': job.completedOn ? 'Completed' : 'Open',
                migratedFrom: 'legacy_jobs',
                migratedAt: serverTimestamp()
            };
            
            const docRef = doc(collection(db, 'artifacts', 'workOrderManagement', 'users', userId, 'workOrders'));
            batch.set(docRef, workOrderData);
            migratedCount++;
        });
        
        // Migrate Invoices -> Line Item Invoices
        existingInvoices.forEach(invoice => {
            const relatedJob = existingJobs.find(j => j.id === invoice.jobId);
            const invoiceData = {
                id: invoice.id || `INV-${Date.now()}`,
                workOrderId: relatedJob ? `WO-${relatedJob.id}` : null,
                customerName: invoice.billTo || invoice.customer || 'Unknown Customer',
                date: invoice.date || new Date().toISOString(),
                status: invoice.status || 'Pending',
                lineItems: [{
                    description: relatedJob?.name || invoice.description || 'Service Rendered',
                    quantity: 1,
                    rate: invoice.grandTotal || invoice.net || invoice.amount || 0,
                    amount: invoice.grandTotal || invoice.net || invoice.amount || 0
                }],
                subtotal: invoice.net || invoice.amount || 0,
                tax: (invoice.grandTotal || 0) - (invoice.net || invoice.amount || 0),
                total: invoice.grandTotal || invoice.net || invoice.amount || 0,
                migratedFrom: 'legacy_invoices',
                migratedAt: serverTimestamp()
            };
            
            const docRef = doc(collection(db, 'artifacts', 'workOrderManagement', 'users', userId, 'invoices'));
            batch.set(docRef, invoiceData);
            migratedCount++;
        });
        
        await batch.commit();
        
        alert(`Successfully migrated ${migratedCount} records to WorkOrder Management!\n\nMigrated:\n• ${existingClients.length} Clients → Customers\n• ${existingJobs.length} Jobs → Work Orders\n• ${existingInvoices.length} Invoices → Line Item Invoices`);
        
    } catch (error) {
        console.error('Migration error:', error);
        alert('Migration failed: ' + error.message);
    }
};

// --- Data ---
const initialCustomers = [
    { id: 1, name: "Synergy Management", type: "National Account", contact: { name: "Sarah Connor", email: "s.connor@synergy.com", phone: "555-0101" }, billingAddress: { street: "100 Main St", city: "Southfield", state: "MI", zip: "48075" }, locations: [{name: "Lane Bryant", locNum: "4826", city: "LIVONIA", state: "MI"}, {name: "Lane Bryant", locNum: "6065", city: "LATHRUP VLG", state: "MI"}] },
    { id: 2, name: "Retail Maintenance Inc.", type: "National Account", contact: { name: "Bob Belcher", email: "bob@rmi.com", phone: "555-0102" }, billingAddress: { street: "200 Corporate Dr", city: "Troy", state: "MI", zip: "48084" }, locations: [{name: "Value City Furniture", locNum: "175", city: "NOVI", state: "MI"}, {name: "Value City Furniture", locNum: "188", city: "CANTON TWP", state: "MI"}] },
    { id: 3, name: "Mr. Henderson", type: "Residential", contact: { name: "James Henderson", email: "j.henderson@email.com", phone: "555-0103" }, billingAddress: { street: "123 Oak Ave", city: "Southfield", state: "MI", zip: "48076" }, locations: [{name: "Primary Residence", locNum: "N/A", city: "SOUTHFIELD", state: "MI"}] },
];

const initialSampleData = [
    { "WO#": "6748425-01", "clientWO": "SYN-10234", "Client": "Synergy Management", "Company": "Lane Bryant", "Loc #": "4826", "Category": "Heating & Cooling", "Task": "HVAC Fall Startup", "Created Date": 45852.5421875, "Schedule Date": 45900, "startTime": "09:00", "endTime": "11:00", "City": "LIVONIA", "State": "MI", "NTE": 150.5, "technician": ["John Smith", "Jane Doe"], "notes": [], "Priority": "Low", "Order Status": "Scheduled" },
    { "WO#": "6694098-01", "clientWO": "RMI-55912", "Client": "Retail Maintenance Inc.", "Company": "Value City Furniture", "Loc #": "175", "Category": "Heating & Cooling", "Task": "AC Leak", "Created Date": 45792.889, "Schedule Date": 45900, "startTime": "14:00", "endTime": "16:30", "Completed Date": 45812.498, "City": "NOVI", "State": "MI", "NTE": 750, "technician": ["John Smith"], "notes": [{ "text": "Customer reported leak from ceiling unit.", "timestamp": "2025-06-20T14:00:00Z" }], "Priority": "Urgent", "Order Status": "Completed" },
    { "WO#": "6693039-01", "clientWO": "NSG-345-A", "Client": "National Service Group", "Company": "Floor & Decor", "Loc #": "230", "Category": "Heating & Cooling", "Task": "Too Hot", "Created Date": 45791.847, "Schedule Date": null, "startTime": null, "endTime": null, "City": "MADISON HTS", "State": "MI", "NTE": 2500, "technician": [], "notes": [{ "text": "Manager called, says store is unbearable.", "timestamp": "2025-06-20T09:30:00Z" }], "Priority": "Emergency", "Order Status": "Open" },
].map(d => ({...d, id: d['WO#']}));

const initialTechnicians = [
    { id: 1, name: 'John Smith', email: 'john.s@example.com', phone: '555-1111', status: 'Available' },
    { id: 2, name: 'Jane Doe', email: 'jane.d@example.com', phone: '555-2222', status: 'On Site' },
    { id: 3, name: 'Mike Rowe', email: 'mike.r@example.com', phone: '555-3333', status: 'On Call' },
    { id: 4, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '555-4444', status: 'Day Off' },
];

const initialInvoices = [
    { 
        id: 'INV-001', 
        workOrderId: '6694098-01', 
        customerName: 'Retail Maintenance Inc.', 
        date: new Date().toISOString(), 
        status: 'Paid',
        lineItems: [
            { description: 'AC Repair Service', quantity: 1, rate: 650, amount: 650 },
            { description: 'Refrigerant Refill', quantity: 2, rate: 50, amount: 100 }
        ],
        subtotal: 750,
        tax: 0,
        total: 750
    },
    { 
        id: 'INV-002', 
        workOrderId: '6748425-01', 
        customerName: 'Synergy Management', 
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Pending',
        lineItems: [
            { description: 'HVAC Fall Startup', quantity: 1, rate: 150.5, amount: 150.5 }
        ],
        subtotal: 150.5,
        tax: 0,
        total: 150.5
    },
    { 
        id: 'INV-003', 
        workOrderId: '6693039-01', 
        customerName: 'National Service Group', 
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Paid',
        lineItems: [
            { description: 'Emergency AC Repair', quantity: 1, rate: 2000, amount: 2000 },
            { description: 'After Hours Fee', quantity: 1, rate: 500, amount: 500 }
        ],
        subtotal: 2500,
        tax: 0,
        total: 2500
    },
    { 
        id: 'INV-004', 
        workOrderId: null, 
        customerName: 'Mr. Henderson', 
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Overdue',
        lineItems: [
            { description: 'Residential HVAC Service', quantity: 1, rate: 425, amount: 425 }
        ],
        subtotal: 425,
        tax: 0,
        total: 425
    }
];

const initialQuotes = [
    { 
        id: 'QT-001', 
        customerName: 'Mr. Henderson', 
        date: new Date().toISOString(), 
        status: 'Sent',
        lineItems: [
            { description: 'New AC Unit (3-Ton)', quantity: 1, rate: 800, amount: 800 },
            { description: 'Installation Labor', quantity: 1, rate: 400, amount: 400 }
        ],
        subtotal: 1200,
        tax: 0,
        total: 1200
    },
    { 
        id: 'QT-002', 
        customerName: 'Synergy Management', 
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Pending',
        lineItems: [
            { description: 'HVAC System Upgrade - Lane Bryant #4826', quantity: 1, rate: 1750, amount: 1750 },
            { description: 'HVAC System Upgrade - Lane Bryant #6065', quantity: 1, rate: 1750, amount: 1750 }
        ],
        subtotal: 3500,
        tax: 0,
        total: 3500
    },
    { 
        id: 'QT-003', 
        customerName: 'Retail Maintenance Inc.', 
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Accepted',
        lineItems: [
            { description: 'Annual Preventive Maintenance Contract', quantity: 1, rate: 850, amount: 850 }
        ],
        subtotal: 850,
        tax: 0,
        total: 850
    },
    { 
        id: 'QT-004', 
        customerName: 'Downtown Office Complex', 
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Draft',
        lineItems: [
            { description: 'Rooftop Unit Replacement', quantity: 1, rate: 1800, amount: 1800 },
            { description: 'Crane Rental', quantity: 1, rate: 400, amount: 400 }
        ],
        subtotal: 2200,
        tax: 0,
        total: 2200
    }
];

const initialItems = [
    { id: 1, name: 'HVAC Maintenance Service', description: 'Routine maintenance and inspection', category: 'HVAC', cost: 75, markup: 100, sellPrice: 150 },
    { id: 2, name: 'AC Filter Replacement', description: 'Replace standard air filter', category: 'HVAC', cost: 15, markup: 200, sellPrice: 45 },
    { id: 3, name: 'Refrigerant Refill', description: 'R-410A refrigerant refill', category: 'HVAC', cost: 45, markup: 100, sellPrice: 90 },
    { id: 4, name: 'Emergency Service Call', description: 'After hours emergency service', category: 'HVAC', cost: 100, markup: 150, sellPrice: 250 },
    { id: 5, name: 'Thermostat Installation', description: 'Install programmable thermostat', category: 'HVAC', cost: 50, markup: 200, sellPrice: 150 },
    { id: 6, name: 'Ductwork Cleaning', description: 'Complete duct system cleaning', category: 'HVAC', cost: 125, markup: 120, sellPrice: 275 }
];

// --- Utility Functions ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;
const excelDateToYYYYMMDD = (d) => { const date = excelToJSDate(d); return date ? date.toISOString().split('T')[0] : ''; };
const yyyymmddToExcel = (s) => s ? jsDateToExcel(new Date(s + 'T00:00:00')) : null;
const formatTime = (timeStr) => { if (!timeStr) return ''; const [h, m] = timeStr.split(':'); const hours = parseInt(h, 10); const suffix = hours >= 12 ? 'PM' : 'AM'; const hh = ((hours + 11) % 12 + 1); return `${hh}:${m} ${suffix}`; };

const excelDateToJSDateString = (d) => { const date = excelToJSDate(d); return date ? date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : null; };
const formatTimestamp = (iso) => iso ? new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : '';
const formatCurrency = (a) => a === null || a === undefined ? "N/A" : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a);
const getPriorityStyles = (p) => ({'emergency':'bg-red-100 text-red-800 border-red-500','urgent':'bg-orange-100 text-orange-800 border-orange-500','regular':'bg-blue-100 text-blue-800 border-blue-500','low':'bg-gray-100 text-gray-800 border-gray-500',}[p?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-500');
const getStatusStyles = (s) => ({'completed':'bg-green-100 text-green-800','scheduled':'bg-blue-100 text-blue-800','open':'bg-yellow-100 text-yellow-800','in progress':'bg-purple-100 text-purple-800','on hold':'bg-pink-100 text-pink-800','cancelled':'bg-red-100 text-red-800',}[s?.toLowerCase()] || 'bg-gray-100 text-gray-800');
const getCustomerTypeStyles = (t) => ({'national account':'bg-blue-100 text-blue-800','commercial':'bg-purple-100 text-purple-800','residential':'bg-green-100 text-green-800','maintenance':'bg-yellow-100 text-yellow-800',}[t?.toLowerCase()] || 'bg-gray-100 text-gray-800');
const getTechStatusStyles = (s) => ({'available': 'bg-green-100 text-green-800', 'on site': 'bg-blue-100 text-blue-800', 'en route': 'bg-yellow-100 text-yellow-800', 'on break': 'bg-gray-100 text-gray-800', 'on call': 'bg-teal-100 text-teal-800', 'day off': 'bg-slate-200 text-slate-800'}[s?.toLowerCase()] || 'bg-gray-100 text-gray-800');

// --- PDF Generation Functions ---
const generateInvoicePDF = (invoice, workOrder = null) => {
    if (!window.jspdf) {
        alert('PDF library is still loading. Please try again in a moment.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Company Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('MECHANICAL TEMP', 20, 30);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('23093 Telegraph Rd', 20, 40);
    doc.text('Southfield, MI 48033', 20, 47);
    doc.text('Phone: (313) 282-4758', 20, 54);
    doc.text('Email: office@mechanicaltemp.com', 20, 61);
    doc.text('Web: www.mechanicaltemp.com', 20, 68);

    // Invoice Title and Info
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 200, 30, { align: 'right' });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice #: ${invoice.id}`, 200, 45, { align: 'right' });
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 200, 52, { align: 'right' });
    if (invoice.dueDate) {
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 200, 59, { align: 'right' });
    }

    // Customer Information
    let y = 90;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    y += 10;
    doc.text(invoice.customerName, 20, y);

    // Work Order Information
    if (workOrder) {
        y += 15;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Service Details:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(12);
        y += 10;
        doc.text(`Work Order: ${workOrder['WO#']}`, 20, y);
        y += 7;
        doc.text(`Location: ${workOrder.Company} - ${workOrder.City}, ${workOrder.State}`, 20, y);
        y += 7;
        doc.text(`Service: ${workOrder.Task}`, 20, y);
    }

    y += 20;

    // Line Items Table
    if (invoice.lineItems && invoice.lineItems.length > 0) {
        if (doc.autoTable) {
            const tableData = invoice.lineItems.map(item => [
                item.description,
                item.quantity,
                `${item.rate.toFixed(2)}`,
                `${item.amount.toFixed(2)}`
            ]);

            doc.autoTable({
                startY: y,
                head: [['Description', 'Qty', 'Rate', 'Amount']],
                body: tableData,
                theme: 'striped',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [41, 128, 185] },
                margin: { left: 20, right: 20 }
            });

            y = doc.lastAutoTable.finalY + 10;
        }
    }

    // Totals
    const rightAlign = 200;
    if (invoice.subtotal) {
        doc.text(`Subtotal: ${invoice.subtotal.toFixed(2)}`, rightAlign, y, { align: 'right' });
        y += 7;
    }
    if (invoice.tax) {
        doc.text(`Tax: ${invoice.tax.toFixed(2)}`, rightAlign, y, { align: 'right' });
        y += 7;
    }
    
    doc.setFont(undefined, 'bold');
    doc.text(`Total: ${(invoice.total || invoice.amount || 0).toFixed(2)}`, rightAlign, y, { align: 'right' });

    // Footer
    y += 30;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Thank you for choosing Mechanical Temp for your HVAC needs!', 105, y, { align: 'center' });
    doc.text('Payment is due within 30 days of invoice date.', 105, y + 7, { align: 'center' });

    doc.save(`Invoice-${invoice.id}.pdf`);
};

const generateQuotePDF = (quote) => {
    if (!window.jspdf) {
        alert('PDF library is still loading. Please try again in a moment.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Similar structure as invoice but for quotes
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('MECHANICAL TEMP', 20, 30);
    
    doc.setFontSize(20);
    doc.text('QUOTE', 200, 30, { align: 'right' });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Quote #: ${quote.id}`, 200, 45, { align: 'right' });
    doc.text(`Date: ${new Date(quote.date).toLocaleDateString()}`, 200, 52, { align: 'right' });

    // Quote content
    let y = 90;
    doc.text(`Quote For: ${quote.customerName}`, 20, y);
    y += 20;

    if (quote.lineItems && quote.lineItems.length > 0 && doc.autoTable) {
        const tableData = quote.lineItems.map(item => [
            item.description,
            item.quantity,
            `${item.rate.toFixed(2)}`,
            `${item.amount.toFixed(2)}`
        ]);

        doc.autoTable({
            startY: y,
            head: [['Description', 'Qty', 'Rate', 'Amount']],
            body: tableData,
            theme: 'striped',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [46, 125, 50] },
            margin: { left: 20, right: 20 }
        });

        y = doc.lastAutoTable.finalY + 20;
    }

    doc.setFont(undefined, 'bold');
    doc.text(`Total Quote: ${(quote.total || quote.amount || 0).toFixed(2)}`, 200, y, { align: 'right' });

    doc.save(`Quote-${quote.id}.pdf`);
};

// --- Items Management View Component ---
const ItemsManagementView = ({ items, onAddItem, onUpdateItem, onDeleteItem }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editing, setEditing] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        category: 'HVAC',
        cost: 0,
        markup: 100,
        sellPrice: 0
    });

    const calculateSellPrice = (cost, markup) => {
        return cost * (1 + markup / 100);
    };

    const calculateMargin = (markup) => {
        return (markup / (100 + markup)) * 100;
    };

    const handleCostChange = (cost) => {
        const sellPrice = calculateSellPrice(cost, newItem.markup);
        setNewItem(prev => ({ ...prev, cost, sellPrice }));
    };

    const handleMarkupChange = (markup) => {
        const sellPrice = calculateSellPrice(newItem.cost, markup);
        setNewItem(prev => ({ ...prev, markup, sellPrice }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem(newItem);
        setNewItem({ name: '', description: '', category: 'HVAC', cost: 0, markup: 100, sellPrice: 0 });
        setIsAdding(false);
    };

    return (
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Items & Services Management</h3>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                >
                    <PlusCircle size={20} /> Add New Item
                </button>
            </div>
            
            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Item name"
                            value={newItem.name}
                            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                            className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            required
                        />
                        <select
                            value={newItem.category}
                            onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                            className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="HVAC">HVAC</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Cost ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newItem.cost}
                                onChange={(e) => handleCostChange(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Markup (%)</label>
                            <input
                                type="number"
                                value={newItem.markup}
                                onChange={(e) => handleMarkupChange(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Sell Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newItem.sellPrice.toFixed(2)}
                                readOnly
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-500 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Margin: {calculateMargin(newItem.markup).toFixed(1)}% | 
                            Profit: ${(newItem.sellPrice - newItem.cost).toFixed(2)}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Add Item
                        </button>
                        <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">{item.description}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">${item.sellPrice}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Cost: ${item.cost}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Markup: {item.markup}%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Edit Modal Components ---
const EditInvoiceModal = ({ invoice, onClose, onUpdateInvoice }) => {
    const [formData, setFormData] = useState(invoice);
    const [lineItems, setLineItems] = useState(invoice.lineItems || []);

    const updateLineItem = (index, field, value) => {
        const updated = [...lineItems];
        updated[index][field] = value;
        
        if (field === 'quantity' || field === 'rate') {
            updated[index].amount = updated[index].quantity * updated[index].rate;
        }
        
        const subtotal = updated.reduce((sum, item) => sum + item.amount, 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        setLineItems(updated);
        setFormData(prev => ({ ...prev, lineItems: updated, subtotal, tax, total }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateInvoice({ ...formData, lineItems });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Invoice</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select 
                            value={formData.status} 
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>

                    {lineItems.map((item, index) => (
                        <div key={index} className="border border-gray-200 dark:border-slate-600 rounded-lg p-3">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    placeholder="Description"
                                />
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.rate}
                                    onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="text"
                                    value={`$${item.amount.toFixed(2)}`}
                                    readOnly
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded bg-gray-100 dark:bg-slate-500 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

const EditQuoteModal = ({ quote, onClose, onUpdateQuote }) => {
    const [formData, setFormData] = useState(quote);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateQuote(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Quote</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select 
                            value={formData.status} 
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Sent">Sent</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                        <input 
                            type="text" 
                            value={formData.customerName} 
                            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Modal Components ---
const AddCustomerModal = ({ onAddCustomer, onClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Commercial');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');
    const [zip, setZip] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Customer name cannot be empty.");
            return;
        }

        const newCustomer = {
            name,
            type,
            contact: {
                name: contactName,
                email: contactEmail,
                phone: contactPhone
            },
            billingAddress: {
                street,
                city,
                state,
                zip
            },
            locations: []
        };

        onAddCustomer(newCustomer);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Customer</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Type</label>
                            <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)} 
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                                <option>Commercial</option>
                                <option>Residential</option>
                                <option>National Account</option>
                                <option>Maintenance</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Primary Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Contact Name</label>
                                <input 
                                    type="text" 
                                    value={contactName} 
                                    onChange={(e) => setContactName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={contactEmail} 
                                    onChange={(e) => setContactEmail(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                                <input 
                                    type="tel" 
                                    value={contactPhone} 
                                    onChange={(e) => setContactPhone(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Billing Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Street Address</label>
                                <input 
                                    type="text" 
                                    value={street} 
                                    onChange={(e) => setStreet(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">City</label>
                                    <input 
                                        type="text" 
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)} 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">State</label>
                                    <input 
                                        type="text" 
                                        value={state} 
                                        onChange={(e) => setState(e.target.value)} 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Zip Code</label>
                                    <input 
                                        type="text" 
                                        value={zip} 
                                        onChange={(e) => setZip(e.target.value)} 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">
                        Add Customer
                    </button>
                </div>
            </form>
        </div>
    );
};

// Updated CreateInvoiceModal with Line Items Support
const CreateInvoiceModal = ({ workOrders, customers, items, onClose, onAddInvoice }) => {
    const [selectedWorkOrder, setSelectedWorkOrder] = useState('');
    const [customCustomer, setCustomCustomer] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [useCustomCustomer, setUseCustomCustomer] = useState(false);
    const [lineItems, setLineItems] = useState([
        { description: '', quantity: 1, rate: 0, amount: 0 }
    ]);
    const [taxRate, setTaxRate] = useState(0);

    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    const selectedOrder = completedOrders.find(wo => wo.id === selectedWorkOrder);

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeLineItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const updateLineItem = (index, field, value) => {
        const updated = [...lineItems];
        updated[index][field] = value;
        
        if (field === 'quantity' || field === 'rate') {
            updated[index].amount = updated[index].quantity * updated[index].rate;
        }
        
        setLineItems(updated);
    };

    const addFromItems = (item) => {
        const newLineItem = {
            description: item.name,
            quantity: 1,
            rate: item.sellPrice,
            amount: item.sellPrice
        };
        setLineItems([...lineItems, newLineItem]);
    };

    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const invoiceData = {
            id: `INV-${Date.now()}`,
            workOrderId: selectedWorkOrder || null,
            customerName: useCustomCustomer ? customCustomer : (selectedOrder ? selectedOrder.Client : ''),
            date: new Date().toISOString(),
            status: 'Draft',
            lineItems,
            subtotal,
            tax,
            total,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null
        };

        onAddInvoice(invoiceData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Invoice</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Customer Selection */}
                    <div>
                        <label className="flex items-center gap-2 mb-3">
                            <input 
                                type="checkbox" 
                                checked={useCustomCustomer} 
                                onChange={(e) => setUseCustomCustomer(e.target.checked)}
                            />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Create invoice for custom customer (not from work order)</span>
                        </label>
                    </div>

                    {!useCustomCustomer ? (
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Select Completed Work Order</label>
                            <select 
                                value={selectedWorkOrder} 
                                onChange={(e) => setSelectedWorkOrder(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                required={!useCustomCustomer}
                            >
                                <option value="">Select a completed work order...</option>
                                {completedOrders.map(wo => (
                                    <option key={wo.id} value={wo.id}>
                                        {wo['WO#']} - {wo.Client} - {wo.Company}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                            <input 
                                type="text" 
                                value={customCustomer} 
                                onChange={(e) => setCustomCustomer(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                required={useCustomCustomer}
                                placeholder="Enter customer name"
                            />
                        </div>
                    )}

                    {/* Line Items Section */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Line Items</h3>
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={addLineItem}
                                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                >
                                    <PlusCircle size={16} /> Add Custom
                                </button>
                                <div className="relative">
                                    <select 
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                const item = items.find(i => i.id === parseInt(e.target.value));
                                                if (item) addFromItems(item);
                                                e.target.value = "";
                                            }
                                        }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                                    >
                                        <option value="">📋 Add From Items</option>
                                        {items.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name} - ${item.sellPrice}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                    <div className="md:col-span-2">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Description</label>
                                        <input 
                                            type="text" 
                                            value={item.description}
                                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                            placeholder="Service description"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Quantity</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            step="1"
                                            value={item.quantity}
                                            onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Rate ($)</label>
                                        <input 
                                            type="number" 
                                            min="0"
                                            step="0.01"
                                            value={item.rate}
                                            onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Amount ($)</label>
                                        <input 
                                            type="text" 
                                            value={item.amount.toFixed(2)}
                                            readOnly
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-gray-100 dark:bg-slate-500 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button 
                                            type="button" 
                                            onClick={() => removeLineItem(index)}
                                            disabled={lineItems.length === 1}
                                            className="w-full p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tax and Totals */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Tax Rate (%)</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    step="0.01"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Due Date (Optional)</label>
                                <input 
                                    type="date" 
                                    value={dueDate} 
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                            <div className="flex justify-end space-y-2">
                                <div className="text-right">
                                    <div className="flex justify-between w-48">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between w-48">
                                        <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                                        <span className="font-semibold">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between w-48 text-lg font-bold border-t pt-2">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedOrder && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Work Order Details:</h4>
                            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                <p><span className="font-medium">WO#:</span> {selectedOrder['WO#']}</p>
                                <p><span className="font-medium">Customer:</span> {selectedOrder.Client}</p>
                                <p><span className="font-medium">Location:</span> {selectedOrder.Company}</p>
                                <p><span className="font-medium">Service:</span> {selectedOrder.Task}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">
                        Create Invoice
                    </button>
                </div>
            </form>
        </div>
    );
};

// Updated CreateQuoteModal with Line Items Support
const CreateQuoteModal = ({ customers, items, onClose, onAddQuote }) => {
    const [customerName, setCustomerName] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [notes, setNotes] = useState('');
    const [lineItems, setLineItems] = useState([
        { description: '', quantity: 1, rate: 0, amount: 0 }
    ]);
    const [taxRate, setTaxRate] = useState(0);

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeLineItem = (index) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter((_, i) => i !== index));
        }
    };

    const updateLineItem = (index, field, value) => {
        const updated = [...lineItems];
        updated[index][field] = value;
        
        if (field === 'quantity' || field === 'rate') {
            updated[index].amount = updated[index].quantity * updated[index].rate;
        }
        
        setLineItems(updated);
    };

    const addFromItems = (item) => {
        const newLineItem = {
            description: item.name,
            quantity: 1,
            rate: item.sellPrice,
            amount: item.sellPrice
        };
        setLineItems([...lineItems, newLineItem]);
    };

    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const quoteData = {
            id: `QT-${Date.now()}`,
            customerName,
            date: new Date().toISOString(),
            status: 'Draft',
            lineItems,
            subtotal,
            tax,
            total,
            validUntil: validUntil ? new Date(validUntil).toISOString() : null,
            notes
        };

        onAddQuote(quoteData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Quote</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                        <input 
                            type="text" 
                            value={customerName} 
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            required
                            placeholder="Enter customer name"
                        />
                    </div>

                    {/* Line Items Section */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Line Items</h3>
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={addLineItem}
                                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                >
                                    <PlusCircle size={16} /> Add Custom
                                </button>
                                <div className="relative">
                                    <select 
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                const item = items.find(i => i.id === parseInt(e.target.value));
                                                if (item) addFromItems(item);
                                                e.target.value = "";
                                            }
                                        }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                                    >
                                        <option value="">📋 Add From Items</option>
                                        {items.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name} - ${item.sellPrice}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                    <div className="md:col-span-2">
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Description</label>
                                        <input 
                                            type="text" 
                                            value={item.description}
                                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                            placeholder="Service description"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Quantity</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            step="1"
                                            value={item.quantity}
                                            onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Rate ($)</label>
                                        <input 
                                            type="number" 
                                            min="0"
                                            step="0.01"
                                            value={item.rate}
                                            onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 dark:text-gray-400">Amount ($)</label>
                                        <input 
                                            type="text" 
                                            value={item.amount.toFixed(2)}
                                            readOnly
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-gray-100 dark:bg-slate-500 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button 
                                            type="button" 
                                            onClick={() => removeLineItem(index)}
                                            disabled={lineItems.length === 1}
                                            className="w-full p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tax, Dates, and Totals */}
                    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Tax Rate (%)</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    step="0.01"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Valid Until (Optional)</label>
                                <input 
                                    type="date" 
                                    value={validUntil} 
                                    onChange={(e) => setValidUntil(e.target.value)}
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Additional Notes</label>
                            <textarea 
                                value={notes} 
                                onChange={(e) => setNotes(e.target.value)}
                                rows="3"
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder="Any additional notes or terms..."
                            />
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
                            <div className="flex justify-end space-y-2">
                                <div className="text-right">
                                    <div className="flex justify-between w-48">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between w-48">
                                        <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                                        <span className="font-semibold">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between w-48 text-lg font-bold border-t pt-2">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">
                        Create Quote
                    </button>
                </div>
            </form>
        </div>
    );
};

const EditCustomerModal = ({ customer, onClose, onUpdateCustomer }) => {
    const [formData, setFormData] = useState(customer);
    const handleChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleSubmit = (e) => { e.preventDefault(); onUpdateCustomer(formData); onClose(); };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Customer</h2>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                                <option>Commercial</option>
                                <option>Residential</option>
                                <option>National Account</option>
                                <option>Maintenance</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Primary Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">Name</label>
                                <input name="name" value={formData.contact.name} onChange={e => handleChange(e, 'contact')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">Email</label>
                                <input name="email" value={formData.contact.email} onChange={e => handleChange(e, 'contact')} type="email" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">Phone</label>
                                <input name="phone" value={formData.contact.phone} onChange={e => handleChange(e, 'contact')} type="tel" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Billing Address</h3>
                        <div className="mt-2">
                            <label className="text-xs text-gray-600 dark:text-gray-400">Street</label>
                            <input name="street" value={formData.billingAddress.street} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">City</label>
                                <input name="city" value={formData.billingAddress.city} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">State</label>
                                <input name="state" value={formData.billingAddress.state} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">Zip</label>
                                <input name="zip" value={formData.billingAddress.zip} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const AddLocationModal = ({ customer, onClose, onAddLocation }) => {
    const [name, setName] = useState('');
    const [locNum, setLocNum] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) { alert("Location name cannot be empty."); return; } onAddLocation(customer.id, { name, locNum, city, state }); onClose(); };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Location to {customer.name}</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location #</label>
                        <input type="text" value={locNum} onChange={e => setLocNum(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">City</label>
                            <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">State</label>
                            <input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Location</button>
                </div>
            </form>
        </div>
    );
};

const AddWorkOrderModal = ({ onClose, onAddOrder, customers }) => {
    const [clientId, setClientId] = useState(customers[0]?.id || '');
    const [locationIdentifier, setLocationIdentifier] = useState('');
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Regular');
    const [category, setCategory] = useState('Heating & Cooling');
    const [nte, setNte] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [clientWO, setClientWO] = useState('');
    
    const [needsLocation, setNeedsLocation] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationNum, setNewLocationNum] = useState('');
    const [newLocationCity, setNewLocationCity] = useState('');
    const [newLocationState, setNewLocationState] = useState('MI');
    
    const [refreshKey, setRefreshKey] = useState(0);

    const selectedClient = useMemo(() => {
        console.log('Looking for customer with ID:', clientId, typeof clientId);
        console.log('Available customers:', customers.map(c => ({ id: c.id, name: c.name, idType: typeof c.id })));
    
    const client = customers.find(c => {
        console.log('Comparing:', c.id, 'with', clientId, '===', c.id === clientId);
        return c.id === clientId;
        });
    
    console.log('Selected client result:', client);
        return client;
        }, [clientId, customers]);
    
    useEffect(() => {
        if (!clientId && customers.length > 0) {
            const mostRecentCustomer = customers[customers.length - 1];
            console.log('Auto-selecting most recent customer:', mostRecentCustomer);
            setClientId(mostRecentCustomer.id);
        }
    }, [customers, clientId]);
    
    useEffect(() => {
        if (selectedClient?.locations?.length > 0) {
            const loc = selectedClient.locations[0];
            setLocationIdentifier(`${loc.name}-${loc.locNum}-0`);
            setNeedsLocation(false);
        } else {
            setLocationIdentifier('');
            setNeedsLocation(true);
            setNewLocationName(selectedClient?.type === 'Residential' ? 'Primary Residence' : 'Main Location');
            setNewLocationNum(selectedClient?.type === 'Residential' ? 'N/A' : '001');
            setNewLocationCity('');
            setNewLocationState('MI');
        }
    }, [selectedClient]);

    const handleLocationChange = (identifier) => {
        setLocationIdentifier(identifier);
    };
    
    const handleRefreshCustomers = () => {
        console.log('Refreshing customer list...');
        setRefreshKey(prev => prev + 1);
        alert(`Refreshed customer list. Found ${customers.length} customers.`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submission:', {
            clientId,
            selectedClient,
            needsLocation,
            task,
            customers: customers.length
        });
        
        let location;
        
        if (needsLocation) {
            if (!newLocationName.trim() || !newLocationCity.trim()) {
                alert('Please fill out the location name and city.');
                return;
            }
            location = {
                name: newLocationName.trim(),
                locNum: newLocationNum.trim() || 'N/A',
                city: newLocationCity.trim(),
                state: newLocationState.trim()
            };
        } else {
            const [company, locNum] = locationIdentifier.split('-').slice(0, 2);
            location = selectedClient.locations.find(l => l.name === company && l.locNum === locNum);
        }
        
        if (!clientId || !selectedClient || !location || !task) { 
            console.error('Validation failed:', {
                clientId: !!clientId,
                selectedClient: !!selectedClient,
                location: !!location,
                task: !!task
            });
            alert('Please fill out all required fields. Make sure you have selected a customer.'); 
            return; 
        }
        
        const orderData = { 
            Client: selectedClient.name, 
            Company: location.name, 
            'Loc #': location.locNum, 
            Task: task, 
            Priority: priority, 
            Category: category, 
            City: location.city, 
            State: location.state, 
            NTE: parseFloat(nte) || 0, 
            'Schedule Date': yyyymmddToExcel(scheduleDate), 
            startTime, 
            endTime, 
            clientWO,
            _newLocation: needsLocation ? location : null
        };
        
        console.log('Submitting order data:', orderData);
        onAddOrder(orderData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Work Order</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <X size={28} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Client</label>
                            <button 
                                type="button" 
                                onClick={handleRefreshCustomers}
                                className="text-xs bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-slate-500"
                            >
                                🔄 Refresh ({customers.length} customers)
                            </button>
                        </div>
                        <select 
                            value={clientId} 
                            onChange={(e) => {
                                const newClientId = parseInt(e.target.value);
                                console.log('Client changed to:', newClientId);
                                setClientId(newClientId);
                            }} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="">Select a customer...</option>
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name} ({c.type}) - {c.locations?.length || 0} locations
                                </option>
                            ))}
                        </select>
                        {customers.length === 0 && (
                            <p className="text-red-500 text-sm mt-1">No customers found. Please add a customer first.</p>
                        )}
                    </div>
                    
                    {selectedClient && (
                        <div>
                            {needsLocation ? (
                                <div className="space-y-4 p-4 border border-yellow-300 dark:border-yellow-600 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                                    <h3 className="text-md font-semibold text-yellow-800 dark:text-yellow-200">
                                        Create Service Location for {selectedClient.name}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location Name</label>
                                            <input 
                                                type="text" 
                                                value={newLocationName} 
                                                onChange={e => setNewLocationName(e.target.value)} 
                                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                                placeholder="e.g., Main Office, Primary Residence"
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location #</label>
                                            <input 
                                                type="text" 
                                                value={newLocationNum} 
                                                onChange={e => setNewLocationNum(e.target.value)} 
                                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                                placeholder="e.g., 001, N/A"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">City</label>
                                            <input 
                                                type="text" 
                                                value={newLocationCity} 
                                                onChange={e => setNewLocationCity(e.target.value)} 
                                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                                placeholder="e.g., Southfield"
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">State</label>
                                            <input 
                                                type="text" 
                                                value={newLocationState} 
                                                onChange={e => setNewLocationState(e.target.value)} 
                                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                                placeholder="MI"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location</label>
                                    <select value={locationIdentifier} onChange={e => handleLocationChange(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                                        {selectedClient.locations.map((l, index) => <option key={`${l.name}-${l.locNum}-${index}`} value={`${l.name}-${l.locNum}-${index}`}>{l.name} (#{l.locNum})</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Client WO#</label>
                        <input type="text" value={clientWO} onChange={e=>setClientWO(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Task / Issue</label>
                        <textarea value={task} onChange={e => setTask(e.target.value)} rows="3" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                                <option>Regular</option>
                                <option>Low</option>
                                <option>Urgent</option>
                                <option>Emergency</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                                <option>Heating & Cooling</option>
                                <option>Refrigeration</option>
                                <option>Maintenance</option>
                                <option>Plumbing</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">NTE Amount ($)</label>
                            <input type="number" value={nte} onChange={e => setNte(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" placeholder="e.g., 500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Schedule Date</label>
                            <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Start Time</label>
                            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">End Time</label>
                            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 mt-auto">
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Create Work Order</button>
                </div>
            </form>
        </div>
    );
};

const AddTechnicianModal = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) return; onAdd({ name, email, phone, status: 'Available' }); onClose(); };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Technician</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Technician</button>
                </div>
            </form>
        </div>
    );
};

const EditTechnicianModal = ({ technician, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(technician);
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); onUpdate(formData); onClose(); };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Technician</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                            <option>Available</option>
                            <option>En Route</option>
                            <option>On Site</option>
                            <option>On Break</option>
                            <option>On Call</option>
                            <option>Day Off</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const CSVImportModal = ({ type, onClose, onImport }) => {
    const [csvData, setCsvData] = useState('');
    const [parsedData, setParsedData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [showPreview, setShowPreview] = useState(false);

    const sampleData = {
        invoices: 'Invoice #,Work Order,Customer,Date,Amount,Status,Description,Due Date\nINV-005,6748425-01,Synergy Management,1/15/2025,1500.00,Draft,HVAC Installation,2/15/2025',
        quotes: 'Quote #,Customer,Description,Date,Amount,Status,Valid Until,Notes\nQT-005,ABC Company,Air conditioning repair,1/15/2025,850.00,Draft,2/15/2025,Emergency repair needed',
        customers: 'Name,Type,Contact Name,Contact Email,Contact Phone,Street,City,State,Zip\nNew Company,Commercial,John Doe,john@company.com,555-1234,123 Main St,Southfield,MI,48075'
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCsvData(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = () => {
        if (!csvData.trim()) {
            setErrors(['Please upload a CSV file or paste CSV data']);
            return;
        }

        const simpleParse = (csvText) => {
            const lines = csvText.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
            const data = lines.slice(1).map(line => {
                const values = line.split(',').map(v => v.replace(/"/g, '').trim());
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index] || '';
                });
                return obj;
            });
            return { data, errors: [] };
        };

        let result;
        if (window.Papa) {
            result = window.Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: false
            });
        } else {
            result = simpleParse(csvData);
        }

        if (result.errors.length > 0) {
            setErrors(result.errors.map(e => typeof e === 'string' ? e : e.message));
            return;
        }

        const validationErrors = [];
        const validatedData = [];

        result.data.forEach((row, index) => {
            const rowErrors = [];
            
            if (type === 'invoices') {
                if (!row['Invoice #']) rowErrors.push(`Row ${index + 1}: Invoice # is required`);
                if (!row['Customer']) rowErrors.push(`Row ${index + 1}: Customer is required`);
                if (!row['Amount'] || isNaN(parseFloat(row['Amount']))) rowErrors.push(`Row ${index + 1}: Valid amount is required`);
                if (!row['Status']) rowErrors.push(`Row ${index + 1}: Status is required`);
            } else if (type === 'quotes') {
                if (!row['Quote #']) rowErrors.push(`Row ${index + 1}: Quote # is required`);
                if (!row['Customer']) rowErrors.push(`Row ${index + 1}: Customer is required`);
                if (!row['Description']) rowErrors.push(`Row ${index + 1}: Description is required`);
                if (!row['Amount'] || isNaN(parseFloat(row['Amount']))) rowErrors.push(`Row ${index + 1}: Valid amount is required`);
            } else if (type === 'customers') {
                if (!row['Name']) rowErrors.push(`Row ${index + 1}: Name is required`);
                if (!row['Type']) rowErrors.push(`Row ${index + 1}: Type is required`);
            }

            if (rowErrors.length === 0) {
                validatedData.push(row);
            } else {
                validationErrors.push(...rowErrors);
            }
        });

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setParsedData([]);
        } else {
            setErrors([]);
            setParsedData(validatedData);
            setShowPreview(true);
        }
    };

    const handleImport = () => {
    if (parsedData.length === 0) return;

    const processedData = parsedData.map(row => {
        if (type === 'invoices') {
            return {
                id: row['Invoice #'],
                workOrderId: row['Work Order'] || null,
                customerName: row['Customer'],
                date: row['Date'] ? new Date(row['Date']).toISOString() : new Date().toISOString(),
                amount: parseFloat(row['Amount']),
                status: row['Status'] || 'Draft',
                description: row['Description'] || '',
                dueDate: row['Due Date'] ? new Date(row['Due Date']).toISOString() : null,
                lineItems: [{
                    description: row['Description'] || 'Service',
                    quantity: 1, // Fixed: added the property name
                    rate: parseFloat(row['Amount']),
                    amount: parseFloat(row['Amount'])
                }],
                subtotal: parseFloat(row['Amount']),
                tax: 0,
                total: parseFloat(row['Amount'])
            };
        } else if (type === 'customers') {
            return {
                id: Date.now() + Math.random(),
                name: row['Name'],
                type: row['Type'] || 'Commercial',
                contact: {
                    name: row['Contact Name'] || '',
                    email: row['Contact Email'] || '',
                    phone: row['Contact Phone'] || ''
                },
                billingAddress: {
                    street: row['Street'] || '',
                    city: row['City'] || '',
                    state: row['State'] || 'MI',
                    zip: row['Zip'] || ''
                },
                locations: []
            };
        }
        return row;
    });

    onImport(processedData);
    onClose();
};
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Import {type} from CSV</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Sample CSV Format:</h3>
                        <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
                            <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                                {sampleData[type]}
                            </pre>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Upload CSV File or Paste Data:
                        </label>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="mb-3 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg"
                        />
                        <textarea
                            value={csvData}
                            onChange={(e) => setCsvData(e.target.value)}
                            rows="8"
                            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            placeholder="Paste your CSV data here..."
                        />
                    </div>

                    {errors.length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Validation Errors:</h4>
                            <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {showPreview && parsedData.length > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                                Preview: {parsedData.length} records ready to import
                            </h4>
                            <div className="max-h-32 overflow-y-auto">
                                <pre className="text-sm text-green-700 dark:text-green-300">
                                    {JSON.stringify(parsedData.slice(0, 3), null, 2)}
                                    {parsedData.length > 3 && '\n... and more'}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button 
                        onClick={parseCSV}
                        disabled={!csvData.trim()}
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        Parse CSV
                    </button>
                    {showPreview && (
                        <button 
                            onClick={handleImport}
                            className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700"
                        >
                            Import {parsedData.length} Records
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main Work Order Management Component
const WorkOrderManagement = () => {
    // State management
    const [activeView, setActiveView] = useState('dashboard');
    const [workOrders, setWorkOrders] = useState(initialSampleData);
    const [customers, setCustomers] = useState(initialCustomers);
    const [technicians, setTechnicians] = useState(initialTechnicians);
    const [invoices, setInvoices] = useState(initialInvoices);
    const [quotes, setQuotes] = useState(initialQuotes);
    const [items, setItems] = useState(initialItems);
    
    // Modal states
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showAddWorkOrder, setShowAddWorkOrder] = useState(false);
    const [showAddTechnician, setShowAddTechnician] = useState(false);
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showCreateQuote, setShowCreateQuote] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editingTechnician, setEditingTechnician] = useState(null);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [editingQuote, setEditingQuote] = useState(null);
    const [addingLocationTo, setAddingLocationTo] = useState(null);
    const [csvImportType, setCsvImportType] = useState(null);

    // Load PDF libraries on mount
    useEffect(() => {
        const loadLibraries = async () => {
            // Load jsPDF
            if (!window.jspdf) {
                const script1 = document.createElement('script');
                script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                document.head.appendChild(script1);
            }
            
            // Load jsPDF autoTable plugin
            if (!window.jspdf?.jsPDF?.API?.autoTable) {
                const script2 = document.createElement('script');
                script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
                document.head.appendChild(script2);
            }
        };
        loadLibraries();
    }, []);

    // Event handlers
    const handleAddCustomer = (customerData) => {
        const newCustomer = {
            ...customerData,
            id: Date.now(),
            locations: customerData.locations || []
        };
        setCustomers(prev => [...prev, newCustomer]);
    };

    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };

    const handleAddLocation = (customerId, locationData) => {
        setCustomers(prev => prev.map(customer => 
            customer.id === customerId 
                ? { ...customer, locations: [...(customer.locations || []), locationData] }
                : customer
        ));
    };

    const handleAddWorkOrder = (orderData) => {
        const newOrder = {
            ...orderData,
            'WO#': `WO-${Date.now()}`,
            id: `WO-${Date.now()}`,
            'Created Date': jsDateToExcel(new Date()),
            'Order Status': 'Open',
            technician: [],
            notes: []
        };

        // Add new location to customer if provided
        if (orderData._newLocation) {
            const customerId = customers.find(c => c.name === orderData.Client)?.id;
            if (customerId) {
                handleAddLocation(customerId, orderData._newLocation);
            }
        }

        setWorkOrders(prev => [...prev, newOrder]);
        setShowAddWorkOrder(false);
    };

    const handleAddTechnician = (techData) => {
        const newTech = {
            ...techData,
            id: Date.now()
        };
        setTechnicians(prev => [...prev, newTech]);
    };

    const handleUpdateTechnician = (updatedTech) => {
        setTechnicians(prev => prev.map(t => t.id === updatedTech.id ? updatedTech : t));
    };

    const handleAddInvoice = (invoiceData) => {
        setInvoices(prev => [...prev, invoiceData]);
    };

    const handleUpdateInvoice = (updatedInvoice) => {
        setInvoices(prev => prev.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
    };

    const handleAddQuote = (quoteData) => {
        setQuotes(prev => [...prev, quoteData]);
    };

    const handleUpdateQuote = (updatedQuote) => {
        setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    };

    const handleAddItem = (itemData) => {
        const newItem = {
            ...itemData,
            id: Date.now()
        };
        setItems(prev => [...prev, newItem]);
    };

    const handleCSVImport = (type, data) => {
        if (type === 'customers') {
            setCustomers(prev => [...prev, ...data]);
        } else if (type === 'invoices') {
            setInvoices(prev => [...prev, ...data]);
        } else if (type === 'quotes') {
            setQuotes(prev => [...prev, ...data]);
        }
        setCsvImportType(null);
    };

    // Navigation component
    const NavigationBar = () => (
        <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Wrench className="w-8 h-8 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WorkOrder Management</h1>
                </div>
                <div className="flex items-center space-x-4">
                    {['dashboard', 'work-orders', 'customers', 'technicians', 'billing', 'items'].map(view => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                activeView === view
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                            }`}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );

    // Dashboard View
    const DashboardView = () => {
        const stats = useMemo(() => {
            const totalRevenue = workOrders
                .filter(wo => wo['Order Status'] === 'Completed')
                .reduce((sum, wo) => sum + (wo.NTE || 0), 0);
            
            const pendingOrders = workOrders.filter(wo => wo['Order Status'] === 'Open').length;
            const scheduledOrders = workOrders.filter(wo => wo['Order Status'] === 'Scheduled').length;
            const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed').length;
            
            return {
                totalRevenue,
                pendingOrders,
                scheduledOrders,
                completedOrders,
                totalCustomers: customers.length,
                activeTechnicians: technicians.filter(t => t.status === 'Available').length
            };
        }, [workOrders, customers, technicians]);

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalRevenue)}</p>
                            </div>
                            <BarChart2 className="w-8 h-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Open Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingOrders}</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedOrders}</p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Active Technicians</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeTechnicians}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Work Orders</h3>
                        <div className="space-y-3">
                            {workOrders.slice(0, 5).map(order => (
                                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{order['WO#']}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.Client} - {order.Task}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(order['Order Status'])}`}>
                                        {order['Order Status']}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technician Status</h3>
                        <div className="space-y-3">
                            {technicians.map(tech => (
                                <div key={tech.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{tech.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{tech.email}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTechStatusStyles(tech.status)}`}>
                                        {tech.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Work Orders View
    const WorkOrdersView = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [statusFilter, setStatusFilter] = useState('');
        const [priorityFilter, setPriorityFilter] = useState('');

        const filteredOrders = useMemo(() => {
            return workOrders.filter(order => {
                const matchesSearch = searchTerm === '' || 
                    order['WO#'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.Client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.Task.toLowerCase().includes(searchTerm.toLowerCase());
                
                const matchesStatus = statusFilter === '' || order['Order Status'] === statusFilter;
                const matchesPriority = priorityFilter === '' || order.Priority === priorityFilter;
                
                return matchesSearch && matchesStatus && matchesPriority;
            });
        }, [workOrders, searchTerm, statusFilter, priorityFilter]);

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Orders</h2>
                    <button
                        onClick={() => setShowAddWorkOrder(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        <PlusCircle size={20} />
                        Add Work Order
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search work orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Regular">Regular</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Emergency">Emergency</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-700">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">WO#</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Client</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Location</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Task</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Priority</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">NTE</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Schedule</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order.id} className="border-b border-gray-100 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">{order['WO#']}</td>
                                        <td className="py-3 px-4 text-gray-900 dark:text-white">{order.Client}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.Company} - {order.City}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.Task}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityStyles(order.Priority)}`}>
                                                {order.Priority}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(order['Order Status'])}`}>
                                                {order['Order Status']}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-900 dark:text-white">{formatCurrency(order.NTE)}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {order['Schedule Date'] ? excelDateToJSDateString(order['Schedule Date']) : 'Not scheduled'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // Customers View
    const CustomersView = () => {
        const [searchTerm, setSearchTerm] = useState('');

        const filteredCustomers = useMemo(() => {
            return customers.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [customers, searchTerm]);

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCsvImportType('customers')}
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                        >
                            <Upload size={20} />
                            Import CSV
                        </button>
                        <button
                            onClick={() => setShowAddCustomer(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            <PlusCircle size={20} />
                            Add Customer
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCustomers.map(customer => (
                            <div key={customer.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCustomerTypeStyles(customer.type)}`}>
                                            {customer.type}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingCustomer(customer)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => setAddingLocationTo(customer)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <MapPin size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <User size={14} />
                                        <span>{customer.contact.name || 'No contact name'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} />
                                        <span>{customer.contact.email || 'No email'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} />
                                        <span>{customer.contact.phone || 'No phone'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building size={14} />
                                        <span>{customer.locations?.length || 0} locations</span>
                                    </div>
                                </div>

                                {customer.locations && customer.locations.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Locations:</p>
                                        <div className="space-y-1">
                                            {customer.locations.slice(0, 2).map((location, index) => (
                                                <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                                                    {location.name} (#{location.locNum}) - {location.city}, {location.state}
                                                </div>
                                            ))}
                                            {customer.locations.length > 2 && (
                                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                                    +{customer.locations.length - 2} more locations
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Technicians View
    const TechniciansView = () => {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technicians</h2>
                    <button
                        onClick={() => setShowAddTechnician(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        <PlusCircle size={20} />
                        Add Technician
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technicians.map(tech => (
                            <div key={tech.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTechStatusStyles(tech.status)}`}>
                                            {tech.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setEditingTechnician(tech)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Edit size={16} />
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} />
                                        <span>{tech.email || 'No email'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} />
                                        <span>{tech.phone || 'No phone'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Billing View
    const BillingView = () => {
        const [activeTab, setActiveTab] = useState('invoices');

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Quotes</h2>
                    <div className="flex gap-3">
                        {activeTab === 'invoices' && (
                            <>
                                <button
                                    onClick={() => setCsvImportType('invoices')}
                                    className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                                >
                                    <Upload size={20} />
                                    Import CSV
                                </button>
                                <button
                                    onClick={() => setShowCreateInvoice(true)}
                                    className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    <PlusCircle size={20} />
                                    Create Invoice
                                </button>
                            </>
                        )}
                        {activeTab === 'quotes' && (
                            <>
                                <button
                                    onClick={() => setCsvImportType('quotes')}
                                    className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                                >
                                    <Upload size={20} />
                                    Import CSV
                                </button>
                                <button
                                    onClick={() => setShowCreateQuote(true)}
                                    className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                                >
                                    <PlusCircle size={20} />
                                    Create Quote
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                    <div className="border-b border-gray-200 dark:border-slate-700">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('invoices')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'invoices'
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                Invoices ({invoices.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('quotes')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'quotes'
                                        ? 'border-green-500 text-green-600 dark:text-green-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                Quotes ({quotes.length})
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'invoices' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-slate-700">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Invoice #</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Customer</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map(invoice => (
                                            <tr key={invoice.id} className="border-b border-gray-100 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                                                <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">{invoice.id}</td>
                                                <td className="py-3 px-4 text-gray-900 dark:text-white">{invoice.customerName}</td>
                                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                                    {new Date(invoice.date).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                                                    {formatCurrency(invoice.total || invoice.amount)}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingInvoice(invoice)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const workOrder = workOrders.find(wo => wo.id === invoice.workOrderId);
                                                                generateInvoicePDF(invoice, workOrder);
                                                            }}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'quotes' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-slate-700">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Quote #</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Customer</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotes.map(quote => (
                                            <tr key={quote.id} className="border-b border-gray-100 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                                                <td className="py-3 px-4 font-medium text-green-600 dark:text-green-400">{quote.id}</td>
                                                <td className="py-3 px-4 text-gray-900 dark:text-white">{quote.customerName}</td>
                                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                                    {new Date(quote.date).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                                                    {formatCurrency(quote.total || quote.amount)}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        quote.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                                        quote.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                                                        quote.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        quote.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {quote.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingQuote(quote)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => generateQuotePDF(quote)}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Main render
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
            <NavigationBar />
            
            <main className="p-6">
                {activeView === 'dashboard' && <DashboardView />}
                {activeView === 'work-orders' && <WorkOrdersView />}
                {activeView === 'customers' && <CustomersView />}
                {activeView === 'technicians' && <TechniciansView />}
                {activeView === 'billing' && <BillingView />}
                {activeView === 'items' && <ItemsManagementView 
                    items={items} 
                    onAddItem={handleAddItem}
                    onUpdateItem={() => {}}
                    onDeleteItem={() => {}}
                />}
            </main>

            {/* Modals */}
            {showAddCustomer && (
                <AddCustomerModal
                    onAddCustomer={handleAddCustomer}
                    onClose={() => setShowAddCustomer(false)}
                />
            )}

            {showAddWorkOrder && (
                <AddWorkOrderModal
                    onClose={() => setShowAddWorkOrder(false)}
                    onAddOrder={handleAddWorkOrder}
                    customers={customers}
                />
            )}

            {showAddTechnician && (
                <AddTechnicianModal
                    onClose={() => setShowAddTechnician(false)}
                    onAdd={handleAddTechnician}
                />
            )}

            {showCreateInvoice && (
                <CreateInvoiceModal
                    workOrders={workOrders}
                    customers={customers}
                    items={items}
                    onClose={() => setShowCreateInvoice(false)}
                    onAddInvoice={handleAddInvoice}
                />
            )}

            {showCreateQuote && (
                <CreateQuoteModal
                    customers={customers}
                    items={items}
                    onClose={() => setShowCreateQuote(false)}
                    onAddQuote={handleAddQuote}
                />
            )}

            {editingCustomer && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onClose={() => setEditingCustomer(null)}
                    onUpdateCustomer={handleUpdateCustomer}
                />
            )}

            {editingTechnician && (
                <EditTechnicianModal
                    technician={editingTechnician}
                    onClose={() => setEditingTechnician(null)}
                    onUpdate={handleUpdateTechnician}
                />
            )}

            {editingInvoice && (
                <EditInvoiceModal
                    invoice={editingInvoice}
                    onClose={() => setEditingInvoice(null)}
                    onUpdateInvoice={handleUpdateInvoice}
                />
            )}

            {editingQuote && (
                <EditQuoteModal
                    quote={editingQuote}
                    onClose={() => setEditingQuote(null)}
                    onUpdateQuote={handleUpdateQuote}
                />
            )}

            {addingLocationTo && (
                <AddLocationModal
                    customer={addingLocationTo}
                    onClose={() => setAddingLocationTo(null)}
                    onAddLocation={handleAddLocation}
                />
            )}

            {csvImportType && (
                <CSVImportModal
                    type={csvImportType}
                    onClose={() => setCsvImportType(null)}
                    onImport={(data) => handleCSVImport(csvImportType, data)}
                />
            )}
        </div>
    );
};

export default WorkOrderManagement;
                     