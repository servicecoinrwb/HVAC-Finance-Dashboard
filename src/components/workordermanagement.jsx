import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench, Calendar as CalendarIcon, MapPin, Building, Search, Filter, X, ChevronDown,
  Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, XCircle, User, MessageSquare,
  PlusCircle, Briefcase, Users, ArrowLeft, Edit, Mail, Phone, Trash2, Map, Printer,
  BarChart2, Award, Download, FileText
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, onSnapshot, doc, updateDoc, setDoc
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// --- Firebase Configuration ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'hvac-scheduler-app';

// --- Data ---
const initialCustomers = [
  { id: '1', name: "Synergy Management", type: "National Account", contact: { name: "Sarah Connor", email: "s.connor@synergy.com", phone: "555-0101" }, billingAddress: { street: "100 Main St", city: "Southfield", state: "MI", zip: "48075" }, locations: [{ name: "Lane Bryant", locNum: "4826", city: "LIVONIA", state: "MI" }, { name: "Lane Bryant", locNum: "6065", city: "LATHRUP VLG", state: "MI" }] },
  { id: '2', name: "Retail Maintenance Inc.", type: "National Account", contact: { name: "Bob Belcher", email: "bob@rmi.com", phone: "555-0102" }, billingAddress: { street: "200 Corporate Dr", city: "Troy", state: "MI", zip: "48084" }, locations: [{ name: "Value City Furniture", locNum: "175", city: "NOVI", state: "MI" }, { name: "Value City Furniture", locNum: "188", city: "CANTON TWP", state: "MI" }] },
  { id: '3', name: "Mr. Henderson", type: "Residential", contact: { name: "James Henderson", email: "j.henderson@email.com", phone: "555-0103" }, billingAddress: { street: "123 Oak Ave", city: "Southfield", state: "MI", zip: "48076" }, locations: [{ name: "Primary Residence", locNum: "N/A", city: "SOUTHFIELD", state: "MI" }] },
];

const initialSampleData = [
  { "WO#": "6748425-01", "clientWO": "SYN-10234", "Client": "Synergy Management", "Company": "Lane Bryant", "Loc #": "4826", "Category": "Heating & Cooling", "Task": "HVAC Fall Startup", "Created Date": 45852.5421875, "Schedule Date": 45900, "startTime": "09:00", "endTime": "11:00", "City": "LIVONIA", "State": "MI", "NTE": 150.5, "technician": ["John Smith", "Jane Doe"], "notes": [], "Priority": "Low", "Order Status": "Scheduled" },
  { "WO#": "6694098-01", "clientWO": "RMI-55912", "Client": "Retail Maintenance Inc.", "Company": "Value City Furniture", "Loc #": "175", "Category": "Heating & Cooling", "Task": "AC Leak", "Created Date": 45792.889, "Schedule Date": 45900, "startTime": "14:00", "endTime": "16:30", "Completed Date": 45812.498, "City": "NOVI", "State": "MI", "NTE": 750, "technician": ["John Smith"], "notes": [{ "text": "Customer reported leak from ceiling unit.", "timestamp": "2025-06-20T14:00:00Z" }], "Priority": "Urgent", "Order Status": "Completed" },
  { "WO#": "6693039-01", "clientWO": "NSG-345-A", "Client": "National Service Group", "Company": "Floor & Decor", "Loc #": "230", "Category": "Heating & Cooling", "Task": "Too Hot", "Created Date": 45791.847, "Schedule Date": null, "startTime": null, "endTime": null, "City": "MADISON HTS", "State": "MI", "NTE": 2500, "technician": [], "notes": [{ "text": "Manager called, says store is unbearable.", "timestamp": "2025-06-20T09:30:00Z" }], "Priority": "Emergency", "Order Status": "Open" },
].map(d => ({ ...d, id: d['WO#'] }));

const initialTechnicians = [
  { id: '1', name: 'John Smith', email: 'john.s@example.com', phone: '555-1111', status: 'Available' },
  { id: '2', name: 'Jane Doe', email: 'jane.d@example.com', phone: '555-2222', status: 'On Site' },
  { id: '3', name: 'Mike Rowe', email: 'mike.r@example.com', phone: '555-3333', status: 'On Call' },
  { id: '4', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '555-4444', status: 'Day Off' },
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
const getPriorityStyles = (p) => ({ 'emergency': 'bg-red-100 text-red-800 border-red-500', 'urgent': 'bg-orange-100 text-orange-800 border-orange-500', 'regular': 'bg-blue-100 text-blue-800 border-blue-500', 'low': 'bg-gray-100 text-gray-800 border-gray-500', }[p?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-500');
const getStatusStyles = (s) => ({ 'completed': 'bg-green-100 text-green-800', 'scheduled': 'bg-blue-100 text-blue-800', 'open': 'bg-yellow-100 text-yellow-800', 'in progress': 'bg-purple-100 text-purple-800', 'on hold': 'bg-pink-100 text-pink-800', 'cancelled': 'bg-red-100 text-red-800', }[s?.toLowerCase()] || 'bg-gray-100 text-gray-800');
const getCustomerTypeStyles = (t) => ({ 'national account': 'bg-blue-100 text-blue-800', 'commercial': 'bg-purple-100 text-purple-800', 'residential': 'bg-green-100 text-green-800', 'maintenance': 'bg-yellow-100 text-yellow-800', }[t?.toLowerCase()] || 'bg-gray-100 text-gray-800');
const getTechStatusStyles = (s) => ({ 'available': 'bg-green-100 text-green-800', 'on site': 'bg-blue-100 text-blue-800', 'en route': 'bg-yellow-100 text-yellow-800', 'on break': 'bg-gray-100 text-gray-800', 'on call': 'bg-teal-100 text-teal-800', 'day off': 'bg-slate-200 text-slate-800' }[s?.toLowerCase()] || 'bg-gray-100 text-gray-800');
const getBillingStatusStyles = (s) => ({ 'paid': 'bg-green-100 text-green-800', 'sent': 'bg-blue-100 text-blue-800', 'draft': 'bg-yellow-100 text-yellow-800', 'approved': 'bg-purple-100 text-purple-800', 'rejected': 'bg-red-100 text-red-800' }[s?.toLowerCase()] || 'bg-gray-100 text-gray-800');

// --- Child Components ---

const Header = ({ currentView, setCurrentView, onAddOrderClick }) => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentView !== 'dashboard'
            ? <button onClick={() => setCurrentView('dashboard')} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft size={24} /></button>
            : <Wrench className="h-8 w-8 text-blue-600" />}
          <h1 className="text-2xl font-bold text-gray-800">HVAC Schedule Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentView('billing')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"><FileText size={20} /> Billing</button>
          <button onClick={() => setCurrentView('reporting')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"><BarChart2 size={20} /> Reporting</button>
          <button onClick={() => setCurrentView('route')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"><Map size={20} /> Route</button>
          <button onClick={() => setCurrentView('dispatch')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"><CalendarIcon size={20} /> Dispatch</button>
          <button onClick={() => setCurrentView('customers')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"><Users size={20} /> Customers</button>
          <button onClick={() => setCurrentView('technicians')} className="flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"><User size={20} /> Technicians</button>
          <button onClick={onAddOrderClick} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"><PlusCircle size={20} /> Add Work Order</button>
        </div>
      </div>
    </div>
  </header>
);

const OrderCard = ({ order, onSelectOrder }) => (
  <div
    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4"
    style={{ borderColor: getPriorityStyles(order.Priority).borderColor }}
  >
    <div className="p-5">
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getPriorityStyles(order.Priority)}`}>{order.Priority}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyles(order['Order Status'])}`}>{order['Order Status']}</span>
      </div>
      <p className="text-xs text-gray-500 font-semibold mt-3 flex items-center"><Briefcase size={12} className="mr-1.5" /> {order.Client}</p>
      <h3 className="text-lg font-bold text-gray-800">{order.Company} - #{order['Loc #']}</h3>
      <p className="text-sm text-gray-500 font-medium">{order.Task}</p>
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center"><User className="w-4 h-4 mr-2 text-gray-400" /><span>{order.technician?.join(', ') || 'Unassigned'}</span></div>
        <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-400" /><span>Scheduled: {excelDateToJSDateString(order['Schedule Date']) || 'Not Set'} {order.startTime && `(${formatTime(order.startTime)})`}</span></div>
        {order.clientWO && <div className="flex items-center"><span className="font-bold mr-2">Client WO:</span><span>{order.clientWO}</span></div>}
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <button onClick={() => onSelectOrder(order)} className="w-full text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">View Details</button>
    </div>
  </div>
);

const DashboardView = ({ orders, onSelectOrder, searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => (
  <>
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by WO#, Client, Location, Tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>All</option><option>Open</option><option>Scheduled</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Cancelled</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </div>
    {orders.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={onSelectOrder} />)}
      </div>
    ) : (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700">No Work Orders Found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    )}
  </>
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
  const unscheduledOrders = workOrders
    .filter(wo => wo['Order Status'] === 'Open' || !wo.technician || wo.technician.length === 0)
    .sort((a, b) => {
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
          <div className="grid gap-px bg-gray-200 min-w-max" style={{ gridTemplateColumns: `60px repeat(${activeTechnicians.length}, minmax(200px, 1fr))`, gridTemplateRows: `auto repeat(${hours.length * 4}, 20px)` }}>
            <div className="bg-gray-100 sticky top-0 z-10"></div>
            {activeTechnicians.map(tech => (
              <div key={tech.id} className="bg-gray-100 text-center font-bold p-2 sticky top-0 z-10 flex flex-col">
                <span>{tech.name}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${getTechStatusStyles(tech.status)}`}>{tech.status}</span>
              </div>
            ))}
            {hours.map(hour => (
              <React.Fragment key={hour}>
                <div className="row-start-auto bg-gray-50 text-right pr-2 text-xs text-gray-500 -translate-y-2 sticky left-0 z-10" style={{ gridRow: (hour - 7) * 4 + 2 }}>
                  {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                </div>
                {activeTechnicians.map((tech, techIndex) => (
                  <React.Fragment key={tech.id}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`${tech.id}-${hour}-${i}`}
                        onDrop={(e) => handleDrop(e, tech.name, `${String(hour).padStart(2, '0')}:${String(i * 15).padStart(2, '0')}`)}
                        onDragOver={handleDragOver}
                        className="border-t border-gray-200"
                        style={{ gridRow: (hour - 7) * 4 + i + 2, gridColumn: techIndex + 2 }}>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
            {scheduledOrders.flatMap(order =>
              order.technician.map(techName => {
                const gridColumn = getTechnicianColumn(techName);
                const rowStart = timeToRow(order.startTime);
                const rowEnd = timeToRow(order.endTime);
                if (gridColumn < 0 || !rowStart || !rowEnd || rowEnd <= rowStart) return null;
                return (
                  <div
                    key={`${order.id}-${techName}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, order)}
                    className={`p-2 m-px rounded-lg text-xs cursor-grab overflow-hidden ${getPriorityStyles(order.Priority)}`}
                    style={{ gridColumn, gridRow: `${rowStart} / ${rowEnd}` }}
                    onClick={() => onSelectOrder(order)}
                  >
                    <p className="font-bold truncate">{order.Company}</p>
                    <p className="truncate">{order.Task}</p>
                  </div>
                );
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

  const jobsForRange = useMemo(() => {
    let startDate = new Date();
    let endDate = new Date();

    switch (viewType) {
      case 'today':
        startDate = new Date(); endDate = new Date(); break;
      case '3-day':
        startDate = new Date(); endDate = new Date(); endDate.setDate(startDate.getDate() + 2); break;
      case 'week':
        startDate = new Date(); const dayOfWeek = startDate.getDay(); startDate.setDate(startDate.getDate() - dayOfWeek); endDate.setDate(startDate.getDate() + 6); break;
      case 'custom':
        startDate = new Date(customStartDate + 'T00:00:00'); endDate = new Date(customEndDate + 'T00:00:00'); break;
      default: break;
    }

    const filtered = workOrders.filter(wo => {
      const jobDate = excelToJSDate(wo['Schedule Date']);
      return jobDate >= startDate && jobDate <= endDate;
    });

    const techName = technicians.find(t => t.id === selectedTechId)?.name;
    if (selectedTechId !== 'ALL') {
      return filtered
        .filter(wo => wo.technician.includes(techName))
        .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    }
    return filtered.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
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
          <select
            value={selectedTechId}
            onChange={e => setSelectedTechId(e.target.value)}   // keep ids as strings
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="ALL">All Technicians</option>
            {technicians.filter(t => t.name !== 'Unassigned').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
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
          <p className="text-gray-500">Map Placeholder</p>
        </div>
      </div>
      <style>{`@media print { body * { visibility: hidden; } .print-container, .print-container * { visibility: visible; } .print-container { position: absolute; left: 0; top: 0; width: 100%; } }`}</style>
      <div className="print-container hidden print:block">
        <h2 className="text-2xl font-bold mb-4">Route for {selectedTechId === 'ALL' ? 'All Technicians' : technicians.find(t => t.id === selectedTechId)?.name} on {new Date(customStartDate + 'T00:00:00').toLocaleDateString()}</h2>
        {Object.entries(groupedJobs).map(([date, techJobs]) => (
          <div key={date} className="mb-4">
            <h3 className="font-bold text-lg mt-4 border-t pt-2">{new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
            {Object.entries(techJobs).map(([techName, jobs]) => (
              <div key={techName} className="mb-2">
                <h4 className="font-semibold text-md mt-2">{techName}</h4>
                {jobs.map((job, index) => (
                  <div key={job.id} className="p-2 border-b">
                    <p><strong>{index + 1}. {formatTime(job.startTime)} - {formatTime(job.endTime)}: {job.Company}</strong></p>
                    <p>{job.Task} at {job.City}, {job.State}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomerManagementView = ({ customers, onAddCustomer, onUpdateCustomer, onAddLocation }) => {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [addingLocationTo, setAddingLocationTo] = useState(null);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
        <button onClick={() => setIsAddingCustomer(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Add New Customer</button>
      </div>
      <div className="space-y-4">
        {customers.map(customer => (
          <div key={customer.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCustomerTypeStyles(customer.type)}`}>{customer.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingCustomer(customer)} className="text-sm text-blue-600 hover:underline">Edit Details</button>
                <button onClick={() => setAddingLocationTo(customer)} className="text-sm text-green-600 hover:underline">Add Location</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="text-sm">
                <p className="font-semibold text-gray-600">Primary Contact</p>
                <p className="flex items-center gap-2"><User size={14} /> {customer.contact.name}</p>
                <p className="flex items-center gap-2"><Mail size={14} /> {customer.contact.email}</p>
                <p className="flex items-center gap-2"><Phone size={14} /> {customer.contact.phone}</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-600">Billing Address</p>
                <p>{customer.billingAddress.street}</p>
                <p>{customer.billingAddress.city}, {customer.billingAddress.state} {customer.billingAddress.zip}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Service Locations ({customer.locations.length})</h4>
              <div className="pl-4 border-l-2 space-y-1">
                {customer.locations.map((loc, index) => (
                  <div key={`${loc.name}-${loc.locNum}-${index}`} className="text-sm text-gray-700">
                    <span className="font-semibold">{loc.name}</span> (#{loc.locNum}) - {loc.city}, {loc.state}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isAddingCustomer && <AddCustomerModal onAddCustomer={onAddCustomer} onClose={() => setIsAddingCustomer(false)} />}
      {editingCustomer && <EditCustomerModal customer={editingCustomer} onUpdateCustomer={onUpdateCustomer} onClose={() => setEditingCustomer(null)} />}
      {addingLocationTo && <AddLocationModal customer={addingLocationTo} onAddLocation={onAddLocation} onClose={() => setAddingLocationTo(null)} />}
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
                <span className="flex items-center gap-1.5"><Mail size={14} /> {tech.email}</span>
                <span className="flex items-center gap-1.5"><Phone size={14} /> {tech.phone}</span>
              </div>
            </div>
            {tech.name !== 'Unassigned' && (
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(tech)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={16} /></button>
                <button onClick={() => onDeleteTechnician(tech.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={16} /></button>
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

  const details = [
    { label: "Work Order #", value: order['WO#'], icon: <Wrench /> },
    { label: "Client WO#", value: order.clientWO, icon: <Briefcase /> },
    { label: "Location", value: `${order.Company} (#${order['Loc #']})`, icon: <Building /> },
    { label: "Address", value: `${order.City}, ${order.State}`, icon: <MapPin /> },
    { label: "Priority", value: order.Priority, icon: <AlertTriangle />, style: getPriorityStyles(order.Priority) + ' px-2 py-0.5 rounded-full text-xs font-semibold' },
    { label: "Task", value: order.Task },
    { label: "NTE Amount", value: formatCurrency(order.NTE) },
    { label: "Created Date", value: excelDateToJSDateString(order['Created Date']) },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Work Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={28} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {details.map(d => (
              <div key={d.label} className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">{d.label}</span>
                <span className={`text-base text-gray-900 font-semibold flex items-center gap-2 mt-1 ${d.style || ''}`}>
                  {d.icon && <span className="text-gray-400">{React.cloneElement(d.icon, { size: 16 })}</span>}
                  <span className={d.style || ''}>{d.value}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Job Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Open</option><option>Scheduled</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Assigned Technicians</label>
                <div className="border p-2 rounded-lg max-h-24 overflow-y-auto">
                  {technicians.filter(t => t.name !== 'Unassigned').map(t => (
                    <div key={t.id} className="flex items-center">
                      <input type="checkbox" id={`tech-${t.id}`} checked={assignedTechnicians.includes(t.name)} onChange={() => handleTechChange(t.name)} className="mr-2" />
                      <label htmlFor={`tech-${t.id}`}>{t.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Schedule Date</label><input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Start Time</label><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">End Time</label><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 block mb-1">Client WO#</label>
              <input type="text" value={clientWO} onChange={e => setClientWO(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><MessageSquare size={20} className="mr-2" />Work Notes</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg">
              {order.notes && order.notes.length > 0 ? order.notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((note, index) => (
                <div key={index} className="text-sm bg-white p-2 rounded shadow-sm">
                  <p className="text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1 text-right">{formatTimestamp(note.timestamp)}</p>
                </div>
              )) : <p className="text-sm text-gray-500 text-center py-4">No notes for this job yet.</p>}
            </div>
            <div className="mt-4">
              <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a new note..." rows="3" className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
              <div className="flex justify-end mt-2">
                <button onClick={() => onAddNote(order.id, newNote, () => setNewNote(''))} disabled={!newNote.trim()} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400">Add Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2></div>
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-semibold">Primary Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div><label className="text-xs">Name</label><input value={contactName} onChange={e => setContactName(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">Email</label><input value={contactEmail} onChange={e => setContactEmail(e.target.value)} type="email" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">Phone</label><input value={contactPhone} onChange={e => setContactPhone(e.target.value)} type="tel" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-semibold">Billing Address</h3>
            <div className="mt-2"><label className="text-xs">Street</label><input value={street} onChange={e => setStreet(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div><label className="text-xs">City</label><input value={city} onChange={e => setCity(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">State</label><input value={state} onChange={e => setState(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">Zip</label><input value={zip} onChange={e => setZip(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t flex justify-end gap-4">
          <button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button>
          <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Customer</button>
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
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Edit Customer</h2></div>
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required /></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-semibold">Primary Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div><label className="text-xs">Name</label><input name="name" value={formData.contact.name} onChange={e => handleChange(e, 'contact')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">Email</label><input name="email" value={formData.contact.email} onChange={e => handleChange(e, 'contact')} type="email" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">Phone</label><input name="phone" value={formData.contact.phone} onChange={e => handleChange(e, 'contact')} type="tel" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-semibold">Billing Address</h3>
            <div className="mt-2"><label className="text-xs">Street</label><input name="street" value={formData.billingAddress.street} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div><label className="text-xs">City</label><input name="city" value={formData.billingAddress.city} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">State</label><input name="state" value={formData.billingAddress.state} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="text-xs">Zip</label><input name="zip" value={formData.billingAddress.zip} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t flex justify-end gap-4">
          <button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

const AddLocationModal = ({ customer, onClose, onAddLocation }) => {
  const [name, setName] = useState('');
  the
  const [locNum, setLocNum] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('MI');
  const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) { alert("Location name cannot be empty."); return; } onAddLocation(customer.id, { name, locNum, city, state }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add Location to {customer.name}</h2></div>
        <div className="p-6 space-y-4">
          <div><label className="text-sm font-medium text-gray-600 block mb-1">Location Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div>
          <div><label className="text-sm font-medium text-gray-600 block mb-1">Location #</label><input type="text" value={locNum} onChange={e => setLocNum(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-600 block mb-1">City</label><input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">State</label><input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t flex justify-end gap-4">
          <button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button>
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Add New Work Order</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={28} /></button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}   // keep id as string
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          {selectedClient && (
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Location</label>
              <select value={locationIdentifier} onChange={e => handleLocationChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                {selectedClient.locations.map((l, index) => <option key={`${l.name}-${l.locNum}-${index}`} value={`${l.name}-${l.locNum}-${index}`}>{l.name} (#{l.locNum})</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Client WO#</label>
            <input type="text" value={clientWO} onChange={e => setClientWO(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Task / Issue</label>
            <textarea value={task} onChange={e => setTask(e.target.value)} rows="3" className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Priority</label><select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Regular</option><option>Low</option><option>Urgent</option><option>Emergency</option></select></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Heating & Cooling</option><option>Refrigeration</option><option>Maintenance</option><option>Plumbing</option><option>Other</option></select></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">NTE Amount ($)</label><input type="number" value={nte} onChange={e => setNte(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 500" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Schedule Date</label><input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">Start Time</label><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="text-sm font-medium text-gray-600 block mb-1">End Time</label><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t mt-auto">
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Create Work Order</button>
        </div>
      </form>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [workOrders, setWorkOrders] = useState(initialSampleData);
  const [customers, setCustomers] = useState(initialCustomers);
  const [technicians, setTechnicians] = useState(initialTechnicians);

  // Billing state + sync
  const [invoices, setInvoices] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [billingLoading, setBillingLoading] = useState(true);
  const [billingError, setBillingError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'customers', 'dispatch', 'technicians', 'route'

  useEffect(() => {
    let unsubInvoices = null;
    let unsubQuotes = null;

    const run = async () => {
      try {
        await signInAnonymously(auth);
        const invoicesCol = collection(db, 'apps', appId, 'invoices');
        const quotesCol = collection(db, 'apps', appId, 'quotes');

        unsubInvoices = onSnapshot(invoicesCol, (snap) => {
          const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setInvoices(rows);
        });

        unsubQuotes = onSnapshot(quotesCol, (snap) => {
          const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setQuotes(rows);
        });
      } catch (err) {
        console.error('Billing load error:', err);
        setBillingError(err?.message || 'Failed to load billing.');
      } finally {
        setBillingLoading(false);
      }
    };

    run();
    return () => { if (unsubInvoices) unsubInvoices(); if (unsubQuotes) unsubQuotes(); };
  }, []);

  const addInvoice = async (base = {}) => {
    const ref = doc(collection(db, 'apps', appId, 'invoices'));
    await setDoc(ref, {
      workOrderId: '',
      customerName: 'New Customer',
      date: new Date().toISOString(),
      amount: 0,
      status: 'Draft',
      ...base,
    });
  };

  const addQuote = async (base = {}) => {
    const ref = doc(collection(db, 'apps', appId, 'quotes'));
    await setDoc(ref, {
      customerName: 'New Customer',
      date: new Date().toISOString(),
      amount: 0,
      description: 'New quote',
      status: 'Draft',
      ...base,
    });
  };

  const updateInvoice = async (inv) => {
    const ref = doc(db, 'apps', appId, 'invoices', inv.id);
    await updateDoc(ref, inv);
  };
  const updateQuote = async (qt) => {
    const ref = doc(db, 'apps', appId, 'quotes', qt.id);
    await updateDoc(ref, qt);
  };

  const filteredOrders = useMemo(
    () => workOrders.filter(order =>
      (statusFilter === 'All' || order['Order Status'] === statusFilter) &&
      Object.values(order).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [workOrders, searchTerm, statusFilter]
  );

  const handleUpdateOrder = (orderId, payload) => { setWorkOrders(workOrders.map(o => o.id === orderId ? { ...o, ...payload } : o)); setSelectedOrder(p => ({ ...p, ...payload })); };
  const handleAddNote = (orderId, noteText, callback) => { if (!noteText.trim()) return; const newNote = { text: noteText.trim(), timestamp: new Date().toISOString() }; const updatedOrders = workOrders.map(o => o.id === orderId ? { ...o, notes: [...(o.notes || []), newNote] } : o); setWorkOrders(updatedOrders); setSelectedOrder(p => ({ ...p, notes: [...(p.notes || []), newNote] })); callback(); };
  const handleAddNewOrder = async (newOrderData) => { const newId = `WO-${Date.now()}`; await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'hvac_work_orders', newId), { ...newOrderData, "WO#": newId, id: newId, "Created Date": jsDateToExcel(new Date()), "Order Status": newOrderData['Schedule Date'] ? 'Scheduled' : 'Open', notes: [], technician: [] }); setIsAddingOrder(false); };
    const handleAddCustomer = async (newCustomerData) => { await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'hvac_customers'), newCustomerData); };
    const handleUpdateCustomer = async (updatedCustomer) => { await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'hvac_customers', updatedCustomer.id), updatedCustomer); };
    const handleAddLocationToCustomer = async (customerId, newLocation) => { const customer = customers.find(c => c.id === customerId); await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'hvac_customers', customerId), { locations: [...customer.locations, newLocation] }); };
    const handleAddTechnician = async (newTechData) => { await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'hvac_technicians'), newTechData); };
    const handleUpdateTechnician = async (updatedTech) => { await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'hvac_technicians', updatedTech.id), updatedTech); };
    const handleDeleteTechnician = async (techId) => {
        const techToDelete = technicians.find(t => t.id === techId);
        if (techToDelete) {
            const batch = writeBatch(db);
            workOrders.forEach(wo => {
                if (wo.technician.includes(techToDelete.name)) {
                    const newTechs = wo.technician.filter(t => t !== techToDelete.name);
                    batch.update(doc(db, 'artifacts', appId, 'public', 'data', 'hvac_work_orders', wo.id), { technician: newTechs });
                }
            });
            batch.delete(doc(db, 'artifacts', appId, 'public', 'data', 'hvac_technicians', techId));
            await batch.commit();
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
                return <BillingView invoices={invoices} quotes={quotes} />;
            case 'dashboard':
            default:
                return <DashboardView orders={filteredOrders} onSelectOrder={setSelectedOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header currentView={currentView} setCurrentView={setCurrentView} onAddOrderClick={() => setIsAddingOrder(true)} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
            {selectedOrder && <WorkOrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={handleUpdateOrder} onAddNote={handleAddNote} technicians={technicians} />}
            {isAddingOrder && <AddWorkOrderModal customers={customers} onAddOrder={handleAddNewOrder} onClose={() => setIsAddingOrder(false)} />}
        </div>
    );
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

const BillingView = ({ invoices, quotes }) => {
    const [activeTab, setActiveTab] = useState('invoices');
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Billing</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Create Quote</button>
            </div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                    <button onClick={() => setActiveTab('invoices')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'invoices' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Invoices</button>
                    <button onClick={() => setActiveTab('quotes')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quotes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Quotes</button>
                </nav>
            </div>
            <div className="mt-6">
                {activeTab === 'invoices' && <div>{invoices.map(inv => <div key={inv.id}>{inv.id} - {inv.customerName} - {formatCurrency(inv.amount)} - {inv.status}</div>)}</div>}
                {activeTab === 'quotes' && <div>{quotes.map(q => <div key={q.id}>{q.id} - {q.customerName} - {formatCurrency(q.amount)} - {q.status}</div>)}</div>}
            </div>
        </div>
    );
};

export default App;