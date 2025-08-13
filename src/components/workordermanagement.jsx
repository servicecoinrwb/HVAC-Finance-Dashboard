import React, { useState, useEffect, useMemo } from 'react';
import { Wrench, Calendar as CalendarIcon, MapPin, Building, Search, Filter, X, ChevronDown, Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, XCircle, User, MessageSquare, PlusCircle, Briefcase, Users, ArrowLeft, Edit, Mail, Phone, Trash2, Map, Printer, BarChart2, Award, Download, FileText, RefreshCw, Upload } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Firebase Mock Implementation (Replace with actual Firebase imports)
const auth = {
  currentUser: null,
  signInWithEmailAndPassword: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        auth.currentUser = { uid: 'user123', email };
        resolve({ user: auth.currentUser });
      }, 1000);
    });
  },
  createUserWithEmailAndPassword: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        auth.currentUser = { uid: 'user123', email };
        resolve({ user: auth.currentUser });
      }, 1000);
    });
  },
  signOut: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        auth.currentUser = null;
        resolve();
      }, 500);
    });
  },
  onAuthStateChanged: (callback) => {
    callback(auth.currentUser);
    return () => {};
  }
};

const db = {
  collection: (path) => ({
    add: async (data) => {
      const id = Date.now().toString();
      const docData = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      const existingData = JSON.parse(localStorage.getItem(path) || '[]');
      existingData.push(docData);
      localStorage.setItem(path, JSON.stringify(existingData));
      return { id };
    },
    doc: (id) => ({
      update: async (data) => {
        const existingData = JSON.parse(localStorage.getItem(path) || '[]');
        const index = existingData.findIndex(item => item.id === id);
        if (index !== -1) {
          existingData[index] = { ...existingData[index], ...data, updatedAt: new Date() };
          localStorage.setItem(path, JSON.stringify(existingData));
        }
      },
      delete: async () => {
        const existingData = JSON.parse(localStorage.getItem(path) || '[]');
        const filtered = existingData.filter(item => item.id !== id);
        localStorage.setItem(path, JSON.stringify(filtered));
      }
    }),
    onSnapshot: (callback) => {
      const data = JSON.parse(localStorage.getItem(path) || '[]');
      callback({ docs: data.map(item => ({ id: item.id, data: () => item })) });
      return () => {};
    }
  })
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
    { id: 'INV-001', workOrderId: '6694098-01', customerName: 'Retail Maintenance Inc.', date: new Date().toISOString(), amount: 750, status: 'Paid' },
    { id: 'INV-002', workOrderId: '6748425-01', customerName: 'Synergy Management', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), amount: 150.5, status: 'Pending' },
    { id: 'INV-003', workOrderId: '6693039-01', customerName: 'National Service Group', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), amount: 2500, status: 'Paid' },
    { id: 'INV-004', workOrderId: null, customerName: 'Mr. Henderson', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), amount: 425, status: 'Overdue' }
];

const initialQuotes = [
    { id: 'QT-001', customerName: 'Mr. Henderson', date: new Date().toISOString(), amount: 1200, description: 'New AC unit installation', status: 'Sent' },
    { id: 'QT-002', customerName: 'Synergy Management', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), amount: 3500, description: 'Complete HVAC system upgrade for Lane Bryant locations', status: 'Pending' },
    { id: 'QT-003', customerName: 'Retail Maintenance Inc.', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), amount: 850, description: 'Preventive maintenance contract', status: 'Accepted' },
    { id: 'QT-004', customerName: 'Downtown Office Complex', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), amount: 2200, description: 'Rooftop unit replacement', status: 'Draft' }
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
// Add this AuthModal component before your existing CreateInvoiceModal
const AuthModal = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
      onAuthSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>
          )}
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-medium text-gray-700">Demo Credentials:</p>
            <p>Email: demo@hvacservice.com</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
// --- Modal Components (Defined First) ---
const CreateInvoiceModal = ({ workOrders, customers, onClose, onAddInvoice }) => {
    const [selectedWorkOrder, setSelectedWorkOrder] = useState('');
    const [customCustomer, setCustomCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [useCustomCustomer, setUseCustomCustomer] = useState(false);

    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    const selectedOrder = completedOrders.find(wo => wo.id === selectedWorkOrder);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || (!selectedWorkOrder && !customCustomer)) return;

        const invoiceData = {
            id: `INV-${Date.now()}`,
            workOrderId: selectedWorkOrder || null,
            customerName: useCustomCustomer ? customCustomer : selectedOrder?.Client || '',
            date: new Date().toISOString(),
            amount: parseFloat(amount),
            status: 'Draft',
            description: description || selectedOrder?.Task || '',
            dueDate: dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        onAddInvoice(invoiceData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Create Invoice</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                checked={!useCustomCustomer} 
                                onChange={() => setUseCustomCustomer(false)}
                                className="mr-2" 
                            />
                            From Work Order
                        </label>
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                checked={useCustomCustomer} 
                                onChange={() => setUseCustomCustomer(true)}
                                className="mr-2" 
                            />
                            Custom Invoice
                        </label>
                    </div>

                    {!useCustomCustomer ? (
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Select Completed Work Order</label>
                            <select 
                                value={selectedWorkOrder} 
                                onChange={(e) => {
                                    setSelectedWorkOrder(e.target.value);
                                    const order = completedOrders.find(wo => wo.id === e.target.value);
                                    if (order) {
                                        setAmount(order.NTE || '');
                                        setDescription(order.Task || '');
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            >
                                <option value="">Select a work order...</option>
                                {completedOrders.map(wo => (
                                    <option key={wo.id} value={wo.id}>
                                        {wo['WO#']} - {wo.Client} - {wo.Company} - {formatCurrency(wo.NTE)}
                                    </option>
                                ))}
                            </select>
                            {selectedOrder && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                                    <p><strong>Customer:</strong> {selectedOrder.Client}</p>
                                    <p><strong>Location:</strong> {selectedOrder.Company}</p>
                                    <p><strong>Task:</strong> {selectedOrder.Task}</p>
                                    <p><strong>Amount:</strong> {formatCurrency(selectedOrder.NTE)}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label>
                            <input 
                                type="text" 
                                value={customCustomer} 
                                onChange={(e) => setCustomCustomer(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter customer name"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Invoice Amount</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Description</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Invoice description..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Due Date</label>
                        <input 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">
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

const CreateQuoteModal = ({ customers, onClose, onAddQuote }) => {
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customerName || !amount || !description) return;

        const quoteData = {
            id: `QT-${Date.now()}`,
            customerName,
            date: new Date().toISOString(),
            amount: parseFloat(amount),
            description,
            status: 'Draft',
            validUntil: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            notes
        };

        onAddQuote(quoteData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Create Quote</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Customer</label>
                        <select 
                            value={customerName} 
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select a customer...</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.name}>
                                    {customer.name}
                                </option>
                            ))}
                            <option value="custom">Other (Enter below)</option>
                        </select>
                        {customerName === 'custom' && (
                            <input 
                                type="text" 
                                placeholder="Enter customer name"
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                required
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Quote Amount</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Description of Work</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Describe the work to be performed..."
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Valid Until</label>
                        <input 
                            type="date" 
                            value={validUntil} 
                            onChange={(e) => setValidUntil(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Additional Notes</label>
                        <textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)}
                            rows="3"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Any additional notes or terms..."
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">
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

const AddCustomerModal = ({ onClose, onAddCustomer }) => {
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
        if (!name.trim()) { alert("Customer name cannot be empty."); return; }
        onAddCustomer({ name, type, contact: { name: contactName, email: contactEmail, phone: contactPhone }, billingAddress: { street, city, state, zip }, locations: [] });
        onClose();
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2></div><div className="p-6 overflow-y-auto space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Primary Contact</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">Name</label><input value={contactName} onChange={e=>setContactName(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Email</label><input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} type="email" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Phone</label><input value={contactPhone} onChange={e=>setContactPhone(e.target.value)} type="tel" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Billing Address</h3><div className="mt-2"><label className="text-xs">Street</label><input value={street} onChange={e=>setStreet(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">City</label><input value={city} onChange={e=>setCity(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">State</label><input value={state} onChange={e=>setState(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Zip</label><input value={zip} onChange={e=>setZip(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Customer</button></div></form></div>);
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
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Edit Customer</h2></div><div className="p-6 overflow-y-auto space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Primary Contact</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">Name</label><input name="name" value={formData.contact.name} onChange={e => handleChange(e, 'contact')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Email</label><input name="email" value={formData.contact.email} onChange={e => handleChange(e, 'contact')} type="email" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Phone</label><input name="phone" value={formData.contact.phone} onChange={e => handleChange(e, 'contact')} type="tel" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Billing Address</h3><div className="mt-2"><label className="text-xs">Street</label><input name="street" value={formData.billingAddress.street} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">City</label><input name="city" value={formData.billingAddress.city} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">State</label><input name="state" value={formData.billingAddress.state} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Zip</label><input name="zip" value={formData.billingAddress.zip} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button></div></form></div>);
};

const AddLocationModal = ({ customer, onClose, onAddLocation }) => {
    const [name, setName] = useState('');
    const [locNum, setLocNum] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) { alert("Location name cannot be empty."); return; } onAddLocation(customer.id, { name, locNum, city, state }); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add Location to {customer.name}</h2></div><div className="p-6 space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Location Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Location #</label><input type="text" value={locNum} onChange={e => setLocNum(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">City</label><input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">State</label><input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Location</button></div></form></div>);
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

    const selectedClient = useMemo(() => customers.find(c => c.id === clientId), [clientId, customers]);
    
    useEffect(() => {
        if (selectedClient?.locations?.[0]) {
            const loc = selectedClient.locations[0];
            setLocationIdentifier(`${loc.name}-${loc.locNum}-0`);
        } else {
            setLocationIdentifier('');
        }
    }, [selectedClient]);

    const handleLocationChange = (identifier) => {
        setLocationIdentifier(identifier);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [company, locNum] = locationIdentifier.split('-').slice(0, 2);
        const location = selectedClient.locations.find(l => l.name === company && l.locNum === locNum);
        if (!clientId || !location || !task) { alert('Please fill out all required fields.'); return; }
        onAddOrder({ Client: selectedClient.name, Company: location.name, 'Loc #': location.locNum, Task: task, Priority: priority, Category: category, City: location.city, State: location.state, NTE: parseFloat(nte) || 0, 'Schedule Date': yyyymmddToExcel(scheduleDate), startTime, endTime, clientWO });
    };

    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800">Add New Work Order</h2><button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={28} /></button></div><div className="p-6 overflow-y-auto space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Client</label><select value={clientId} onChange={(e) => setClientId(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg">{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>{selectedClient && <div><label className="text-sm font-medium text-gray-600 block mb-1">Location</label><select value={locationIdentifier} onChange={e => handleLocationChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">{selectedClient.locations.map((l, index) => <option key={`${l.name}-${l.locNum}-${index}`} value={`${l.name}-${l.locNum}-${index}`}>{l.name} (#{l.locNum})</option>)}</select></div>}<div><label className="text-sm font-medium text-gray-600 block mb-1">Client WO#</label><input type="text" value={clientWO} onChange={e=>setClientWO(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Task / Issue</label><textarea value={task} onChange={e => setTask(e.target.value)} rows="3" className="w-full p-2 border border-gray-300 rounded-lg" required></textarea></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Priority</label><select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Regular</option><option>Low</option><option>Urgent</option><option>Emergency</option></select></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Heating & Cooling</option><option>Refrigeration</option><option>Maintenance</option><option>Plumbing</option><option>Other</option></select></div><div><label className="text-sm font-medium text-gray-600 block mb-1">NTE Amount ($)</label><input type="number" value={nte} onChange={e => setNte(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 500" /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Schedule Date</label><input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Start Time</label><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">End Time</label><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="p-6 bg-gray-50 border-t mt-auto"><button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Create Work Order</button></div></form></div>);
};

const AddTechnicianModal = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) return; onAdd({ name, email, phone, status: 'Available' }); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add New Technician</h2></div><div className="p-6 space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Phone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Technician</button></div></form></div>);
};

const EditTechnicianModal = ({ technician, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(technician);
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); onUpdate(formData); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Edit Technician</h2></div><div className="p-6 space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Status</label><select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"><option>Available</option><option>En Route</option><option>On Site</option><option>On Break</option><option>On Call</option><option>Day Off</option></select></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button></div></form></div>);
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

        // Simple CSV parser fallback if PapaParse is not available
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

        // Try to use PapaParse if available, otherwise use simple parser
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

        // Validate required fields based on type
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
                    dueDate: row['Due Date'] ? new Date(row['Due Date']).toISOString() : null
                };
            } else if (type === 'quotes') {
                return {
                    id: row['Quote #'],
                    customerName: row['Customer'],
                    description: row['Description'],
                    date: row['Date'] ? new Date(row['Date']).toISOString() : new Date().toISOString(),
                    amount: parseFloat(row['Amount']),
                    status: row['Status'] || 'Draft',
                    validUntil: row['Valid Until'] ? new Date(row['Valid Until']).toISOString() : null,
                    notes: row['Notes'] || ''
                };
            } else if (type === 'customers') {
                return {
                    id: Date.now() + Math.random(),
                    name: row['Name'],
                    type: row['Type'],
                    contact: {
                        name: row['Contact Name'] || '',
                        email: row['Contact Email'] || '',
                        phone: row['Contact Phone'] || ''
                    },
                    billingAddress: {
                        street: row['Street'] || '',
                        city: row['City'] || '',
                        state: row['State'] || '',
                        zip: row['Zip'] || ''
                    },
                    locations: []
                };
            }
        });

        onImport(processedData);
        
        // Show success message
        alert(`Successfully imported ${processedData.length} ${type}!`);
        
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Import {type.charAt(0).toUpperCase() + type.slice(1)} from CSV</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">Upload CSV File</label>
                            <input 
                                type="file" 
                                accept=".csv" 
                                onChange={handleFileUpload}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="text-center text-gray-500">OR</div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">Paste CSV Data</label>
                            <textarea
                                value={csvData}
                                onChange={(e) => setCsvData(e.target.value)}
                                placeholder={`Paste your CSV data here...\n\nExpected format:\n${sampleData[type]}`}
                                rows="8"
                                className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
                            />
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Required CSV Format for {type.charAt(0).toUpperCase() + type.slice(1)}:</h4>
                            <pre className="text-sm text-blue-700 bg-blue-100 p-2 rounded overflow-x-auto">
                                {sampleData[type]}
                            </pre>
                        </div>

                        {errors.length > 0 && (
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-medium text-red-800 mb-2">Validation Errors:</h4>
                                <ul className="text-sm text-red-700 space-y-1">
                                    {errors.map((error, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            {error}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {showPreview && parsedData.length > 0 && (
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium text-green-800 mb-2">Preview ({parsedData.length} records ready to import):</h4>
                                <div className="max-h-40 overflow-y-auto">
                                    <table className="w-full text-sm border border-green-200 rounded">
                                        <thead className="bg-green-100">
                                            <tr>
                                                {Object.keys(parsedData[0] || {}).map(key => (
                                                    <th key={key} className="p-2 text-left font-medium text-green-800">
                                                        {key}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parsedData.slice(0, 3).map((row, index) => (
                                                <tr key={index} className="border-t border-green-200">
                                                    {Object.values(row).map((value, colIndex) => (
                                                        <td key={colIndex} className="p-2 text-green-700">
                                                            {String(value)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {parsedData.length > 3 && (
                                        <p className="text-green-600 text-center mt-2">
                                            ... and {parsedData.length - 3} more records
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t flex justify-between gap-4">
                    <button 
                        onClick={parseCSV}
                        disabled={!csvData.trim()}
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        Parse & Validate
                    </button>
                    <div className="flex gap-4">
                        <button 
                            onClick={onClose} 
                            className="text-gray-700 font-bold py-2 px-4"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleImport}
                            disabled={parsedData.length === 0}
                            className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                        >
                            Import {parsedData.length} Records
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Child Components ---
const Header = ({ currentView, setCurrentView, onAddOrderClick, user, onSignOut }) => (
    <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {currentView !== 'dashboard' ? 
                        <button onClick={() => setCurrentView('dashboard')} className="p-2 rounded-full hover:bg-gray-100">
                            <ArrowLeft size={24} />
                        </button> : 
                        <Wrench className="h-8 w-8 text-blue-600" />
                    }
                    <h1 className="text-2xl font-bold text-gray-800">HVAC Schedule Dashboard</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentView('billing')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <FileText size={20} /> Billing
                    </button>
                    <button onClick={() => setCurrentView('reporting')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <BarChart2 size={20} /> Reporting
                    </button>
                    <button onClick={() => setCurrentView('route')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <Map size={20} /> Route
                    </button>
                    <button onClick={() => setCurrentView('dispatch')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <Calendar size={20} /> Dispatch
                    </button>
                    <button onClick={() => setCurrentView('customers')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <Users size={20} /> Customers
                    </button>
                    <button onClick={() => setCurrentView('technicians')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <User size={20} /> Technicians
                    </button>
                    <button onClick={onAddOrderClick} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        <PlusCircle size={20} /> Add Work Order
                    </button>
                    
                    {/* NEW: User Menu Section */}
                    <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                        <span className="text-sm text-gray-600">
                            {user?.email || 'demo@hvacservice.com'}
                        </span>
                        <button 
                            onClick={onSignOut}
                            className="flex items-center gap-2 text-red-600 font-semibold py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

const OrderCard = ({ order, onSelectOrder }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4" style={{borderColor: getPriorityStyles(order.Priority).borderColor}}><div className="p-5"><div className="flex justify-between items-start"><span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getPriorityStyles(order.Priority)}`}>{order.Priority}</span><span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyles(order['Order Status'])}`}>{order['Order Status']}</span></div><p className="text-xs text-gray-500 font-semibold mt-3 flex items-center"><Briefcase size={12} className="mr-1.5"/> {order.Client}</p><h3 className="text-lg font-bold text-gray-800">{order.Company} - #{order['Loc #']}</h3><p className="text-sm text-gray-500 font-medium">{order.Task}</p><div className="mt-4 space-y-2 text-sm text-gray-600"><div className="flex items-center"><User className="w-4 h-4 mr-2 text-gray-400" /><span>{order.technician?.join(', ') || 'Unassigned'}</span></div><div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-400" /><span>Scheduled: {excelDateToJSDateString(order['Schedule Date']) || 'Not Set'} {order.startTime && `(${formatTime(order.startTime)})`}</span></div>{order.clientWO && <div className="flex items-center"><span className="font-bold mr-2">Client WO:</span><span>{order.clientWO}</span></div>}</div></div><div className="bg-gray-50 px-5 py-3"><button onClick={() => onSelectOrder(order)} className="w-full text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">View Details</button></div></div>
);

const DashboardView = ({ orders, onSelectOrder, searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => (
    <><div className="bg-white p-4 rounded-lg shadow-sm mb-8"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="relative md:col-span-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search by WO#, Client, Location, Tech..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div><div className="relative"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"><option>All</option><option>Open</option><option>Scheduled</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Cancelled</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /></div></div></div>{orders.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{orders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={onSelectOrder} />)}</div> : <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm"><h3 className="text-xl font-semibold text-gray-700">No Work Orders Found</h3><p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p></div>}</>
);

const DispatchView = ({ workOrders, technicians, onSelectOrder, onUpdateOrder }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const hours = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM
    const activeTechnicians = technicians.filter(t => t.name !== 'Unassigned');

    const getTechnicianColumn = (techName) => {
        const index = activeTechnicians.findIndex(t => t.name === techName);
        return index === -1 ? -1 : index + 2;
    };

    const timeToRow = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) return 0;
        return ((h - 7) * 4) + (m / 15) + 2;
    };

    const scheduledOrders = workOrders.filter(wo => excelDateToYYYYMMDD(wo['Schedule Date']) === selectedDate && wo.startTime && wo.endTime && wo.technician?.length > 0);
    const unscheduledOrders = workOrders.filter(wo => wo['Order Status'] === 'Open' || !wo.technician || wo.technician.length === 0).sort((a, b) => {
        const priorityOrder = { 'Emergency': 1, 'Urgent': 2, 'Regular': 3, 'Low': 4 };
        return (priorityOrder[a.Priority] || 5) - (priorityOrder[b.Priority] || 5);
    });

    const handleDragStart = (e, order) => {
        e.dataTransfer.setData("workOrder", JSON.stringify(order));
    };

    const handleDrop = (e, techName, time) => {
        e.preventDefault();
        const order = JSON.parse(e.dataTransfer.getData("workOrder"));
        const newStartTime = time;
        const newEndTime = `${String(parseInt(time.split(':')[0]) + 2).padStart(2, '0')}:${time.split(':')[1]}`;

        onUpdateOrder(order.id, {
            ...order,
            technician: [techName],
            'Schedule Date': yyyymmddToExcel(selectedDate),
            startTime: newStartTime,
            endTime: newEndTime,
            'Order Status': 'Scheduled',
        });
    };

    const handleUnassignDrop = (e) => {
        e.preventDefault();
        const order = JSON.parse(e.dataTransfer.getData("workOrder"));
        onUpdateOrder(order.id, {
            ...order,
            technician: [],
            'Schedule Date': null,
            startTime: null,
            endTime: null,
            'Order Status': 'Open',
        });
    };
    
    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Dispatch Board</h2>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex gap-4">
                <div className="w-1/4 bg-white p-4 rounded-lg shadow-sm" onDrop={handleUnassignDrop} onDragOver={handleDragOver}>
                    <h3 className="text-lg font-bold mb-4">Unassigned Jobs</h3>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                        {unscheduledOrders.map(order => (
                            <div key={order.id} draggable onDragStart={(e) => handleDragStart(e, order)} className={`p-2 border-l-4 rounded cursor-grab ${getPriorityStyles(order.Priority)}`}>
                                <p className="font-bold text-sm">{order.Company}</p>
                                <p className="text-xs text-gray-600">{order.Task}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
                    <div className="grid gap-px bg-gray-200 min-w-max" style={{gridTemplateColumns: `60px repeat(${activeTechnicians.length}, minmax(200px, 1fr))`, gridTemplateRows: `auto repeat(${hours.length * 4}, 20px)`}}>
                        <div className="bg-gray-100 sticky top-0 z-10"></div>
                        {activeTechnicians.map(tech => (<div key={tech.id} className="bg-gray-100 text-center font-bold p-2 sticky top-0 z-10 flex flex-col"><span>{tech.name}</span><span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${getTechStatusStyles(tech.status)}`}>{tech.status}</span></div>))}
                        {hours.map(hour => (<React.Fragment key={hour}><div className="row-start-auto bg-gray-50 text-right pr-2 text-xs text-gray-500 -translate-y-2 sticky left-0 z-10" style={{ gridRow: (hour - 7) * 4 + 2 }}>{hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}</div>
                            {activeTechnicians.map((tech, techIndex) => (
                                <React.Fragment key={tech.id}>
                                    {Array.from({length: 4}).map((_, i) => (
                                        <div 
                                            key={`${tech.id}-${hour}-${i}`}
                                            onDrop={(e) => handleDrop(e, tech.name, `${String(hour).padStart(2, '0')}:${String(i*15).padStart(2,'0')}`)} 
                                            onDragOver={handleDragOver} 
                                            className="border-t border-gray-200" 
                                            style={{ gridRow: (hour - 7) * 4 + i + 2, gridColumn: techIndex + 2 }}>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>))}
                        {scheduledOrders.flatMap(order => 
                            order.technician.map(techName => {
                                const gridColumn = getTechnicianColumn(techName);
                                const rowStart = timeToRow(order.startTime);
                                const rowEnd = timeToRow(order.endTime);
                                if (gridColumn < 0 || !rowStart || !rowEnd || rowEnd <= rowStart) return null;
                                return (<div key={`${order.id}-${techName}`} draggable onDragStart={(e) => handleDragStart(e, order)} className={`p-2 m-px rounded-lg text-xs cursor-grab overflow-hidden ${getPriorityStyles(order.Priority)}`} style={{gridColumn, gridRow: `${rowStart} / ${rowEnd}`}} onClick={() => onSelectOrder(order)}><p className="font-bold truncate">{order.Company}</p><p className="truncate">{order.Task}</p></div>);
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RoutePlanningView = ({ workOrders, technicians }) => {
    const [selectedTechId, setSelectedTechId] = useState('ALL');
    const [viewType, setViewType] = useState('today'); // 'today', '3-day', 'week', 'custom'
    const [customStartDate, setCustomStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [customEndDate, setCustomEndDate] = useState(new Date().toISOString().split('T')[0]);
    
    // Google Maps API Key
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const jobsForRange = useMemo(() => {
        let startDate = new Date();
        let endDate = new Date();
        
        switch(viewType) {
            case 'today':
                startDate = new Date();
                endDate = new Date();
                break;
            case '3-day':
                startDate = new Date();
                endDate = new Date();
                endDate.setDate(startDate.getDate() + 2);
                break;
            case 'week':
                startDate = new Date();
                const dayOfWeek = startDate.getDay();
                startDate.setDate(startDate.getDate() - dayOfWeek);
                endDate.setDate(startDate.getDate() + 6);
                break;
            case 'custom':
                startDate = new Date(customStartDate + 'T00:00:00');
                endDate = new Date(customEndDate + 'T00:00:00');
                break;
            default:
                break;
        }

        const filtered = workOrders.filter(wo => {
            const jobDate = excelToJSDate(wo['Schedule Date']);
            return jobDate >= startDate && jobDate <= endDate;
        });
        
        const techName = technicians.find(t => t.id === selectedTechId)?.name;
        if (selectedTechId !== 'ALL') {
            return filtered.filter(wo => wo.technician.includes(techName)).sort((a,b) => (a.startTime || '').localeCompare(b.startTime || ''));
        }

        return filtered.sort((a,b) => (a.startTime || '').localeCompare(b.startTime || ''));
        
    }, [selectedTechId, workOrders, technicians, viewType, customStartDate, customEndDate]);
    
    const groupedJobs = useMemo(() => {
        return jobsForRange.reduce((acc, job) => {
            const dateStr = excelDateToYYYYMMDD(job['Schedule Date']);
            if (!acc[dateStr]) acc[dateStr] = {};

            job.technician.forEach(techName => {
                if (!acc[dateStr][techName]) acc[dateStr][techName] = [];
                acc[dateStr][techName].push(job);
            });
            return acc;
        }, {});
    }, [jobsForRange]);

    const handlePrint = () => window.print();

    // Initialize Google Map
    useEffect(() => {
        if (window.google && window.google.maps && googleMapsApiKey) {
            const mapElement = document.getElementById('route-map');
            if (mapElement) {
                const map = new window.google.maps.Map(mapElement, {
                    zoom: 10,
                    center: { lat: 42.4668, lng: -83.1632 }, // Southfield, MI area
                    mapTypeId: 'roadmap'
                });

                // Add markers for scheduled jobs
                Object.entries(groupedJobs).forEach(([date, techJobs]) => {
                    Object.entries(techJobs).forEach(([techName, jobs]) => {
                        jobs.forEach((job, index) => {
                            // For now using approximate coordinates - you'd want to geocode actual addresses
                            const lat = 42.4668 + (Math.random() - 0.5) * 0.2; // Random positions around Southfield
                            const lng = -83.1632 + (Math.random() - 0.5) * 0.2;
                            
                            new window.google.maps.Marker({
                                position: { lat, lng },
                                map: map,
                                title: `${job.Company} - ${job.Task}`,
                                label: String(index + 1)
                            });
                        });
                    });
                });
            }
        }
    }, [groupedJobs, googleMapsApiKey]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6 print:hidden">
                <h2 className="text-2xl font-bold text-gray-800">Route Planning</h2>
                <div className="flex items-center gap-4">
                    <select value={viewType} onChange={e => setViewType(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
                        <option value="today">Today</option>
                        <option value="3-day">Next 3 Days</option>
                        <option value="week">This Week</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    {viewType === 'custom' && (
                        <>
                            <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
                            <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
                        </>
                    )}
                    <select value={selectedTechId} onChange={e => setSelectedTechId(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))} className="p-2 border border-gray-300 rounded-lg">
                        <option value="ALL">All Technicians</option>
                        {technicians.filter(t=>t.name !== 'Unassigned').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"><Printer size={20} /> Print Route</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 print:col-span-3">
                    <h3 className="font-bold text-lg mb-2">Job Order</h3>
                    {Object.keys(groupedJobs).length > 0 ? (
                        Object.entries(groupedJobs).map(([date, techJobs]) => (
                            <div key={date} className="mb-4">
                                <h4 className="font-bold text-xl mb-2 p-2 bg-gray-200 rounded-md sticky top-20">{new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                                {Object.entries(techJobs).map(([techName, jobs]) => (
                                    <div key={techName} className="mb-4">
                                        {selectedTechId === 'ALL' && <h5 className="font-bold text-md mb-2 p-2 bg-gray-100 rounded-md">{techName}</h5>}
                                        <div className="space-y-2">
                                            {jobs.map((job, index) => (
                                                <div key={job.id} className="p-3 border rounded-lg flex items-center gap-4">
                                                    <span className="text-xl font-bold text-gray-400">{index + 1}</span>
                                                    <div><p className="font-bold">{formatTime(job.startTime)} - {formatTime(job.endTime)}</p><p>{job.Company} - {job.City}</p><p className="text-sm text-gray-600">{job.Task}</p></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : <p>No jobs scheduled for this selection.</p>}
                </div>
                <div className="md:col-span-2 bg-gray-200 rounded-lg flex items-center justify-center h-96 print:hidden">
                    <div id="route-map" className="w-full h-full rounded-lg">
                        <p className="text-gray-500 flex items-center justify-center h-full">
                            Map will load here once Google Maps API key is configured
                        </p>
                    </div>
                </div>
            </div>
            <style>{`@media print { body * { visibility: hidden; } .print-container, .print-container * { visibility: visible; } .print-container { position: absolute; left: 0; top: 0; width: 100%; } }`}</style>
            <div className="print-container hidden print:block">
                 <h2 className="text-2xl font-bold mb-4">Route for {selectedTechId === 'ALL' ? 'All Technicians' : technicians.find(t=>t.id === selectedTechId)?.name} on {new Date(customStartDate + 'T00:00:00').toLocaleDateString()}</h2>
                 {Object.entries(groupedJobs).map(([date, techJobs]) => (<div key={date} className="mb-4"><h3 className="font-bold text-lg mt-4 border-t pt-2">{new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3>{Object.entries(techJobs).map(([techName, jobs]) => (<div key={techName} className="mb-2"><h4 className="font-semibold text-md mt-2">{techName}</h4>{jobs.map((job, index) => (<div key={job.id} className="p-2 border-b"><p><strong>{index + 1}. {formatTime(job.startTime)} - {formatTime(job.endTime)}: {job.Company}</strong></p><p>{job.Task} at {job.City}, {job.State}</p></div>))}</div>))}</div>))}
            </div>
        </div>
    );
};

const CustomerManagementView = ({ customers, onAddCustomer, onUpdateCustomer, onAddLocation }) => {
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [addingLocationTo, setAddingLocationTo] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);

    const exportCustomersToCSV = () => {
        const csvContent = [
            ['Name', 'Type', 'Contact Name', 'Contact Email', 'Contact Phone', 'Street', 'City', 'State', 'Zip', 'Locations Count'],
            ...customers.map(customer => [
                customer.name,
                customer.type,
                customer.contact.name,
                customer.contact.email,
                customer.contact.phone,
                customer.billingAddress.street,
                customer.billingAddress.city,
                customer.billingAddress.state,
                customer.billingAddress.zip,
                customer.locations.length
            ])
        ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowImportModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        <Upload size={20} /> Import CSV
                    </button>
                    <button 
                        onClick={exportCustomersToCSV}
                        className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                        <Download size={20} /> Export CSV
                    </button>
                    <button 
                        onClick={() => setIsAddingCustomer(true)} 
                        className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                        <PlusCircle size={20} /> Add New Customer
                    </button>
                </div>
            </div>
            <div className="space-y-4">{customers.map(customer => (<div key={customer.id} className="border border-gray-200 rounded-lg p-4"><div className="flex justify-between items-center"><div className="flex items-center gap-4"><h3 className="text-lg font-bold text-gray-900">{customer.name}</h3><span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCustomerTypeStyles(customer.type)}`}>{customer.type}</span></div><div className="flex items-center gap-2"><button onClick={() => setEditingCustomer(customer)} className="text-sm text-blue-600 hover:underline">Edit Details</button><button onClick={() => setAddingLocationTo(customer)} className="text-sm text-green-600 hover:underline">Add Location</button></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div className="text-sm"><p className="font-semibold text-gray-600">Primary Contact</p><p className="flex items-center gap-2"><User size={14}/> {customer.contact.name}</p><p className="flex items-center gap-2"><Mail size={14}/> {customer.contact.email}</p><p className="flex items-center gap-2"><Phone size={14}/> {customer.contact.phone}</p></div><div className="text-sm"><p className="font-semibold text-gray-600">Billing Address</p><p>{customer.billingAddress.street}</p><p>{customer.billingAddress.city}, {customer.billingAddress.state} {customer.billingAddress.zip}</p></div></div><div className="mt-3 pt-3 border-t"><h4 className="text-sm font-semibold text-gray-600 mb-1">Service Locations ({customer.locations.length})</h4><div className="pl-4 border-l-2 space-y-1">{customer.locations.map((loc, index) => (<div key={`${loc.name}-${loc.locNum}-${index}`} className="text-sm text-gray-700"><span className="font-semibold">{loc.name}</span> (#{loc.locNum}) - {loc.city}, {loc.state}</div>))}</div></div></div>))}</div>
        {isAddingCustomer && <AddCustomerModal onAddCustomer={onAddCustomer} onClose={() => setIsAddingCustomer(false)} />}
        {editingCustomer && <EditCustomerModal customer={editingCustomer} onUpdateCustomer={onUpdateCustomer} onClose={() => setEditingCustomer(null)} />}
        {addingLocationTo && <AddLocationModal customer={addingLocationTo} onAddLocation={onAddLocation} onClose={() => setAddingLocationTo(null)} />}
        {showImportModal && (
            <CSVImportModal 
                type="customers"
                onClose={() => setShowImportModal(false)}
                onImport={(data) => {
                    data.forEach(customer => onAddCustomer(customer));
                }}
            />
        )}
        </div>
    );
};

const TechnicianManagementView = ({ technicians, onAddTechnician, onUpdateTechnician, onDeleteTechnician }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editing, setEditing] = useState(null);
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Technician Management</h2><button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Add New Technician</button></div>
            <div className="space-y-4">
                {technicians.map(tech => (
                    <div key={tech.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                            <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1.5"><Mail size={14}/> {tech.email}</span>
                                <span className="flex items-center gap-1.5"><Phone size={14}/> {tech.phone}</span>
                            </div>
                        </div>
                        {tech.name !== 'Unassigned' && (
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditing(tech)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={16}/></button>
                                <button onClick={() => onDeleteTechnician(tech.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={16}/></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isAdding && <AddTechnicianModal onAdd={onAddTechnician} onClose={() => setIsAdding(false)} />}
            {editing && <EditTechnicianModal technician={editing} onUpdate={onUpdateTechnician} onClose={() => setEditing(null)} />}
        </div>
    );
};

const WorkOrderDetailModal = ({ order, onClose, onUpdate, onAddNote, technicians }) => {
    if (!order) return null;
    const [newStatus, setNewStatus] = useState(order['Order Status']);
    const [assignedTechnicians, setAssignedTechnicians] = useState(order.technician || []);
    const [scheduleDate, setScheduleDate] = useState(excelDateToYYYYMMDD(order['Schedule Date']));
    const [startTime, setStartTime] = useState(order.startTime || '');
    const [endTime, setEndTime] = useState(order.endTime || '');
    const [newNote, setNewNote] = useState('');
    const [clientWO, setClientWO] = useState(order.clientWO || '');
    
    const handleTechChange = (techName) => {
        const newTechs = assignedTechnicians.includes(techName)
            ? assignedTechnicians.filter(t => t !== techName)
            : [...assignedTechnicians, techName];
        setAssignedTechnicians(newTechs);
    };

    const handleSaveChanges = () => {
        const payload = {};
        if (newStatus !== order['Order Status']) { payload['Order Status'] = newStatus; if (newStatus === 'Completed' && !order['Completed Date']) payload['Completed Date'] = jsDateToExcel(new Date()); }
        if (JSON.stringify(assignedTechnicians) !== JSON.stringify(order.technician)) payload['technician'] = assignedTechnicians;
        const newScheduleDateExcel = yyyymmddToExcel(scheduleDate);
        if (newScheduleDateExcel !== order['Schedule Date'] || startTime !== order.startTime || endTime !== order.endTime) {
            payload['Schedule Date'] = newScheduleDateExcel;
            payload.startTime = startTime;
            payload.endTime = endTime;
            if (newStatus === 'Open' && scheduleDate) payload['Order Status'] = 'Scheduled';
        }
        if (clientWO !== order.clientWO) payload.clientWO = clientWO;
        if (Object.keys(payload).length > 0) onUpdate(order.id, payload);
    };

    const details = [ { label: "Work Order #", value: order['WO#'], icon: <Wrench/> }, { label: "Client WO#", value: order.clientWO, icon: <Briefcase />}, { label: "Location", value: `${order.Company} (#${order['Loc #']})`, icon: <Building/> }, { label: "Address", value: `${order.City}, ${order.State}`, icon: <MapPin/> }, { label: "Priority", value: order.Priority, icon: <AlertTriangle/>, style: getPriorityStyles(order.Priority) + ' px-2 py-0.5 rounded-full text-xs font-semibold' }, { label: "Task", value: order.Task }, { label: "NTE Amount", value: formatCurrency(order.NTE) }, { label: "Created Date", value: excelDateToJSDateString(order['Created Date']) }, ];
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"><div className="p-6 border-b flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800">Work Order Details</h2><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={28} /></button></div><div className="p-6 overflow-y-auto"><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">{details.map(d => (<div key={d.label} className="flex flex-col"><span className="text-xs text-gray-500 font-medium">{d.label}</span><span className={`text-base text-gray-900 font-semibold flex items-center gap-2 mt-1 ${d.style || ''}`}>{d.icon && <span className="text-gray-400">{React.cloneElement(d.icon, { size: 16 })}</span>}<span className={d.style || ''}>{d.value}</span></span></div>))}</div><div className="mt-6 pt-6 border-t"><h3 className="text-lg font-semibold text-gray-700 mb-3">Job Management</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className="text-sm font-medium text-gray-600 block mb-1">Status</label><select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Open</option><option>Scheduled</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Cancelled</option></select></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Assigned Technicians</label><div className="border p-2 rounded-lg max-h-24 overflow-y-auto">{technicians.filter(t=>t.name !== 'Unassigned').map(t => (<div key={t.id} className="flex items-center"><input type="checkbox" id={`tech-${t.id}`} checked={assignedTechnicians.includes(t.name)} onChange={() => handleTechChange(t.name)} className="mr-2" /><label htmlFor={`tech-${t.id}`}>{t.name}</label></div>))}</div></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Schedule Date</label><input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Start Time</label><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">End Time</label><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div></div><div className="mt-4"><label className="text-sm font-medium text-gray-600 block mb-1">Client WO#</label><input type="text" value={clientWO} onChange={e => setClientWO(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="mt-4 flex justify-end"><button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button></div></div><div className="mt-6 pt-6 border-t"><h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><MessageSquare size={20} className="mr-2"/>Work Notes</h3><div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg">{order.notes && order.notes.length > 0 ? order.notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((note, index) => (<div key={index} className="text-sm bg-white p-2 rounded shadow-sm"><p className="text-gray-800">{note.text}</p><p className="text-xs text-gray-500 mt-1 text-right">{formatTimestamp(note.timestamp)}</p></div>)) : <p className="text-sm text-gray-500 text-center py-4">No notes for this job yet.</p>}</div><div className="mt-4"><textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a new note..." rows="3" className="w-full p-2 border border-gray-300 rounded-lg"></textarea><div className="flex justify-end mt-2"><button onClick={() => onAddNote(order.id, newNote, () => setNewNote(''))} disabled={!newNote.trim()} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400">Add Note</button></div></div></div></div></div></div>);
};

const ReportingView = ({ workOrders, technicians }) => {
    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    const openOrders = workOrders.filter(wo => ['Open', 'Scheduled', 'In Progress'].includes(wo['Order Status']));
    
    const totalRevenue = completedOrders.reduce((sum, wo) => sum + (wo.NTE || 0), 0);
    
    const jobsByTech = useMemo(() => {
        const techCounts = technicians
            .filter(t => t.name !== 'Unassigned')
            .map(tech => {
                const count = workOrders.filter(wo => wo.technician.includes(tech.name) && wo['Order Status'] === 'Completed').length;
                return { name: tech.name, count };
            });
        return techCounts.sort((a, b) => b.count - a.count);
    }, [workOrders, technicians]);

    const maxJobs = Math.max(...jobsByTech.map(t => t.count), 0);

    const medalColor = (index) => {
        if (index === 0) return 'text-yellow-500';
        if (index === 1) return 'text-gray-400';
        if (index === 2) return 'text-yellow-600';
        return 'text-gray-400';
    };

    const handleDownloadPdf = () => {
        const input = document.getElementById('reporting-view');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("hvac-report.pdf");
        });
    };

    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
            <div id="reporting-view" className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Reporting Dashboard</h2>
                    <button onClick={handleDownloadPdf} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"><Download size={20} /> Download PDF</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 border rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Open/Active Jobs</h3><p className="text-5xl font-bold text-yellow-600">{openOrders.length}</p></div>
                    <div className="p-4 border rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Completed Jobs</h3><p className="text-5xl font-bold text-green-600">{completedOrders.length}</p></div>
                    <div className="p-4 border rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Potential Revenue</h3><p className="text-5xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p></div>
                </div>
                
                <div className="p-4 border rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Technician Leaderboard</h3>
                    <div className="space-y-4">
                        {jobsByTech.map((tech, index) => (
                            <div key={tech.name} className="flex items-center gap-4">
                                <div className="w-10 text-center">
                                    {index < 3 ? <Award size={24} className={medalColor(index)} /> : <span className="text-lg font-bold text-gray-400">{index + 1}</span>}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">{tech.name}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${maxJobs > 0 ? (tech.count / maxJobs) * 100 : 0}%` }}></div>
                                    </div>
                                </div>
                                <div className="w-12 text-right font-bold text-lg">{tech.count}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const BillingView = ({ invoices, quotes, workOrders, customers, onAddInvoice, onAddQuote }) => {
    const [activeTab, setActiveTab] = useState('invoices');
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showCreateQuote, setShowCreateQuote] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importType, setImportType] = useState('invoices');
    
    // Calculate summary statistics
    const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const unpaidInvoices = invoices.filter(inv => inv.status !== 'Paid');
    const totalQuoteAmount = quotes.reduce((sum, q) => sum + q.amount, 0);
    const pendingQuotes = quotes.filter(q => q.status === 'Sent' || q.status === 'Pending');

    const getInvoiceStatusStyles = (status) => {
        const styles = {
            'paid': 'bg-green-100 text-green-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'overdue': 'bg-red-100 text-red-800',
            'draft': 'bg-gray-100 text-gray-800'
        };
        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const getQuoteStatusStyles = (status) => {
        const styles = {
            'sent': 'bg-blue-100 text-blue-800',
            'accepted': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'draft': 'bg-gray-100 text-gray-800'
        };
        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const exportInvoicesToCSV = () => {
        const csvContent = [
            ['Invoice #', 'Work Order', 'Customer', 'Date', 'Amount', 'Status', 'Description', 'Due Date'],
            ...invoices.map(inv => [
                inv.id,
                inv.workOrderId || '',
                inv.customerName,
                new Date(inv.date).toLocaleDateString(),
                inv.amount,
                inv.status,
                inv.description || '',
                inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : ''
            ])
        ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const exportQuotesToCSV = () => {
        const csvContent = [
            ['Quote #', 'Customer', 'Description', 'Date', 'Amount', 'Status', 'Valid Until', 'Notes'],
            ...quotes.map(quote => [
                quote.id,
                quote.customerName,
                quote.description,
                new Date(quote.date).toLocaleDateString(),
                quote.amount,
                quote.status,
                quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : '',
                quote.notes || ''
            ])
        ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quotes-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Header with Summary Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Billing & Invoicing</h2>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowCreateInvoice(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            <FileText size={20} /> Create Invoice
                        </button>
                        <button 
                            onClick={() => setShowCreateQuote(true)}
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                        >
                            <PlusCircle size={20} /> Create Quote
                        </button>
                    </div>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 border rounded-lg text-center">
                        <h3 className="text-sm font-medium text-gray-600">Total Invoices</h3>
                        <p className="text-2xl font-bold text-blue-600">{invoices.length}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(totalInvoiceAmount)}</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                        <h3 className="text-sm font-medium text-gray-600">Paid Invoices</h3>
                        <p className="text-2xl font-bold text-green-600">{paidInvoices.length}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(paidInvoices.reduce((sum, inv) => sum + inv.amount, 0))}</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                        <h3 className="text-sm font-medium text-gray-600">Outstanding</h3>
                        <p className="text-2xl font-bold text-red-600">{unpaidInvoices.length}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0))}</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                        <h3 className="text-sm font-medium text-gray-600">Pending Quotes</h3>
                        <p className="text-2xl font-bold text-yellow-600">{pendingQuotes.length}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(pendingQuotes.reduce((sum, q) => sum + q.amount, 0))}</p>
                    </div>
                </div>
            </div>

            {/* Tabs and Content */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex gap-6 px-6">
                        <button 
                            onClick={() => setActiveTab('invoices')} 
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'invoices' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Invoices ({invoices.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('quotes')} 
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'quotes' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Quotes ({quotes.length})
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'invoices' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Invoice Management</h3>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setImportType('invoices');
                                            setShowImportModal(true);
                                        }}
                                        className="flex items-center gap-2 text-gray-600 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200"
                                    >
                                        <Upload size={16} /> Import
                                    </button>
                                    <button 
                                        onClick={exportInvoicesToCSV}
                                        className="flex items-center gap-2 text-gray-600 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200"
                                    >
                                        <Download size={16} /> Export
                                    </button>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="flex items-center gap-2 text-gray-600 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200"
                                    >
                                        <RefreshCw size={16} /> Refresh
                                    </button>
                                </div>
                            </div>
                            
                            {invoices.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Invoice #</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Work Order</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {invoices.map(invoice => (
                                                <tr key={invoice.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{invoice.id}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{invoice.workOrderId || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{invoice.customerName}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {new Date(invoice.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                                        {formatCurrency(invoice.amount)}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInvoiceStatusStyles(invoice.status)}`}>
                                                            {invoice.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => alert(`Viewing invoice ${invoice.id}\nCustomer: ${invoice.customerName}\nAmount: ${formatCurrency(invoice.amount)}\nStatus: ${invoice.status}`)}
                                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                                            >
                                                                View
                                                            </button>
                                                            <button 
                                                                onClick={() => alert(`Sending invoice ${invoice.id} to ${invoice.customerName}`)}
                                                                className="text-green-600 hover:text-green-800 font-medium"
                                                            >
                                                                Send
                                                            </button>
                                                            <button 
                                                                onClick={() => alert(`Edit functionality for invoice ${invoice.id} would open in a modal`)}
                                                                className="text-gray-600 hover:text-gray-800 font-medium"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Invoices Yet</h3>
                                    <p className="text-gray-500 mb-4">Create your first invoice from a completed work order.</p>
                                    <button 
                                        onClick={() => setShowCreateInvoice(true)}
                                        className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
                                    >
                                        Create Invoice
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'quotes' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Quote Management</h3>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setImportType('quotes');
                                            setShowImportModal(true);
                                        }}
                                        className="flex items-center gap-2 text-gray-600 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200"
                                    >
                                        <Upload size={16} /> Import
                                    </button>
                                    <button 
                                        onClick={exportQuotesToCSV}
                                        className="flex items-center gap-2 text-gray-600 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200"
                                    >
                                        <Download size={16} /> Export
                                    </button>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="flex items-center gap-2 text-gray-600 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200"
                                    >
                                        <RefreshCw size={16} /> Refresh
                                    </button>
                                </div>
                            </div>
                            
                            {quotes.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Quote #</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {quotes.map(quote => (
                                                <tr key={quote.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{quote.id}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{quote.customerName}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{quote.description}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {new Date(quote.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                                        {formatCurrency(quote.amount)}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuoteStatusStyles(quote.status)}`}>
                                                            {quote.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => alert(`Viewing quote ${quote.id}\nCustomer: ${quote.customerName}\nAmount: ${formatCurrency(quote.amount)}\nDescription: ${quote.description}\nStatus: ${quote.status}`)}
                                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                                            >
                                                                View
                                                            </button>
                                                            <button 
                                                                onClick={() => alert(`Sending quote ${quote.id} to ${quote.customerName}`)}
                                                                className="text-green-600 hover:text-green-800 font-medium"
                                                            >
                                                                Send
                                                            </button>
                                                            <button 
                                                                onClick={() => alert(`Edit functionality for quote ${quote.id} would open in a modal`)}
                                                                className="text-gray-600 hover:text-gray-800 font-medium"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => alert(`Converting quote ${quote.id} to invoice for ${quote.customerName}`)}
                                                                className="text-purple-600 hover:text-purple-800 font-medium"
                                                            >
                                                                Convert
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Quotes Yet</h3>
                                    <p className="text-gray-500 mb-4">Create your first quote for potential customers.</p>
                                    <button 
                                        onClick={() => setShowCreateQuote(true)}
                                        className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700"
                                    >
                                        Create Quote
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Modals */}
            {showCreateInvoice && (
                <CreateInvoiceModal 
                    workOrders={workOrders}
                    customers={customers}
                    onClose={() => setShowCreateInvoice(false)}
                    onAddInvoice={onAddInvoice}
                />
            )}
            
            {showCreateQuote && (
                <CreateQuoteModal 
                    customers={customers}
                    onClose={() => setShowCreateQuote(false)}
                    onAddQuote={onAddQuote}
                />
            )}

            {showImportModal && (
                <CSVImportModal 
                    type={importType}
                    onClose={() => setShowImportModal(false)}
                    onImport={(data) => {
                        if (importType === 'invoices') {
                            data.forEach(invoice => onAddInvoice(invoice));
                        } else if (importType === 'quotes') {
                            data.forEach(quote => onAddQuote(quote));
                        }
                    }}
                />
            )}
        </div>
    );
};

// --- Main WorkOrderManagement Component ---
const WorkOrderManagement = () => {
    const [workOrders, setWorkOrders] = useState(initialSampleData);
    const [customers, setCustomers] = useState(initialCustomers);
    const [technicians, setTechnicians] = useState(initialTechnicians);
    const [invoices, setInvoices] = useState(initialInvoices);
    const [quotes, setQuotes] = useState(initialQuotes);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    
    // Load PapaParse library for CSV functionality
    useEffect(() => {
        if (!window.Papa) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js';
            script.async = true;
            document.head.appendChild(script);
            return () => {
                document.head.removeChild(script);
            };
        }
    }, []);
    
    const filteredOrders = useMemo(() => workOrders.filter(order => (statusFilter === 'All' || order['Order Status'] === statusFilter) && Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [workOrders, searchTerm, statusFilter]);
    
    const handleUpdateOrder = (orderId, payload) => { setWorkOrders(workOrders.map(o => o.id === orderId ? { ...o, ...payload } : o)); setSelectedOrder(p => ({ ...p, ...payload })); };
    const handleAddNote = (orderId, noteText, callback) => { if (!noteText.trim()) return; const newNote = { text: noteText.trim(), timestamp: new Date().toISOString() }; const updatedOrders = workOrders.map(o => o.id === orderId ? { ...o, notes: [...(o.notes || []), newNote] } : o); setWorkOrders(updatedOrders); setSelectedOrder(p => ({ ...p, notes: [...(p.notes || []), newNote] })); callback(); };
    const handleAddNewOrder = (newOrderData) => { const newId = `WO-${Date.now()}`; const newOrder = { ...newOrderData, "WO#": newId, id: newId, "Created Date": jsDateToExcel(new Date()), "Order Status": newOrderData['Schedule Date'] ? 'Scheduled' : 'Open', notes: [], technician: [] }; setWorkOrders(p => [newOrder, ...p]); setIsAddingOrder(false); };
    
    const handleAddCustomer = (customerData) => {
        if (Array.isArray(customerData)) {
            setCustomers(prev => [...prev, ...customerData]);
        } else {
            const newCustomer = { ...customerData, id: Date.now() + Math.random() };
            setCustomers(prev => [...prev, newCustomer]);
        }
    };

    const handleUpdateCustomer = (updatedCustomer) => { setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)); };
    const handleAddLocationToCustomer = (customerId, newLocation) => { setCustomers(customers.map(c => c.id === customerId ? { ...c, locations: [...c.locations, newLocation] } : c)); };
    const handleAddTechnician = (newTechData) => { const newTech = { ...newTechData, id: Date.now() }; setTechnicians(p => [...p, newTech]); };
    const handleUpdateTechnician = (updatedTech) => { setTechnicians(technicians.map(t => t.id === updatedTech.id ? updatedTech : t)); };
    const handleDeleteTechnician = (techId) => {
        const techToDelete = technicians.find(t => t.id === techId);
        if (techToDelete) {
            setWorkOrders(workOrders.map(wo => ({...wo, technician: wo.technician.filter(t => t !== techToDelete.name)})));
            setTechnicians(technicians.filter(t => t.id !== techId));
        }
    };

    const handleAddInvoice = (invoiceData) => {
        if (Array.isArray(invoiceData)) {
            setInvoices(prev => [...invoiceData, ...prev]);
        } else {
            setInvoices(prev => [invoiceData, ...prev]);
        }
    };

    const handleAddQuote = (quoteData) => {
        if (Array.isArray(quoteData)) {
            setQuotes(prev => [...quoteData, ...prev]);
        } else {
            setQuotes(prev => [quoteData, ...prev]);
        }
    };

    const renderContent = () => {
        switch(currentView) {
            case 'customers':
                return <CustomerManagementView customers={customers} onAddCustomer={handleAddCustomer} onUpdateCustomer={handleUpdateCustomer} onAddLocation={handleAddLocationToCustomer} />;
            case 'dispatch':
                return <DispatchView workOrders={workOrders} technicians={technicians} onSelectOrder={setSelectedOrder} onUpdateOrder={handleUpdateOrder} />;
            case 'technicians':
                return <TechnicianManagementView technicians={technicians} onAddTechnician={handleAddTechnician} onUpdateTechnician={handleUpdateTechnician} onDeleteTechnician={handleDeleteTechnician} />;
             case 'route':
                return <RoutePlanningView workOrders={workOrders} technicians={technicians} />;
            case 'reporting':
                return <ReportingView workOrders={workOrders} technicians={technicians} />;
            case 'billing':
                return <BillingView invoices={invoices} quotes={quotes} workOrders={workOrders} customers={customers} onAddInvoice={handleAddInvoice} onAddQuote={handleAddQuote} />;
            case 'dashboard':
            default:
                return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    return (
    <div className="bg-gray-50 min-h-screen font-sans">
        {showAuthModal && (
            <AuthModal onAuthSuccess={() => setShowAuthModal(false)} />
        )}
        
        {user && (
            <>
                <Header 
                    currentView={currentView} 
                    setCurrentView={setCurrentView} 
                    onAddOrderClick={() => setIsAddingOrder(true)}
                    user={user}                    // NEW
                    onSignOut={handleSignOut}      // NEW
                />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {renderContent()}
                </main>
                {selectedOrder && <WorkOrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={handleUpdateOrder} onAddNote={handleAddNote} technicians={technicians} />}
                {isAddingOrder && <AddWorkOrderModal customers={customers} onAddOrder={handleAddNewOrder} onClose={() => setIsAddingOrder(false)} />}
            </>
        )}
    </div>
    );
};

export default WorkOrderManagement;