import React from 'react';
import { Search, Filter, ChevronDown, Briefcase, User, Calendar as CalendarIcon } from 'lucide-react';
// 1. Import the context hook to access shared state
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// --- Utility Functions (with dark mode support) ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const excelDateToJSDateString = (d) => { const date = excelToJSDate(d); return date ? date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : null; };
const formatTime = (timeStr) => { if (!timeStr) return ''; const [h, m] = timeStr.split(':'); const hours = parseInt(h, 10); const suffix = hours >= 12 ? 'PM' : 'AM'; const hh = ((hours + 11) % 12 + 1); return `${hh}:${m} ${suffix}`; };
// ✅ Added the missing formatCurrency function
const formatCurrency = (a) => a === null || a === undefined ? "N/A" : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a);

const getPriorityStyles = (p) => ({
    'emergency':'bg-red-100 text-red-800 border-red-500 dark:bg-red-900/50 dark:text-red-200 dark:border-red-500',
    'urgent':'bg-orange-100 text-orange-800 border-orange-500 dark:bg-orange-900/50 dark:text-orange-200 dark:border-orange-500',
    'regular':'bg-blue-100 text-blue-800 border-blue-500 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-500',
    'low':'bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-600/50 dark:text-gray-200 dark:border-gray-500',
}[p?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-600/50 dark:text-gray-200 dark:border-gray-500');

const getStatusStyles = (s) => ({
    'completed':'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    'scheduled':'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    'open':'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
    'in progress':'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
    'on hold':'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200',
    'cancelled':'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
}[s?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200');


const OrderCard = ({ order, onSelectOrder }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-transparent dark:border-slate-700 border-l-4" style={{borderColor: getPriorityStyles(order.Priority).borderColor}}>
        <div className="p-5">
            <div className="flex justify-between items-start">
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getPriorityStyles(order.Priority)}`}>{order.Priority}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyles(order['Order Status'])}`}>{order['Order Status']}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-3 flex items-center"><Briefcase size={12} className="mr-1.5"/> {order.Client}</p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{order.Company} - #{order['Loc #']}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{order.Task}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center"><User className="w-4 h-4 mr-2 text-gray-400" /><span>{order.technician?.join(', ') || 'Unassigned'}</span></div>
                <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-400" /><span>Scheduled: {excelDateToJSDateString(order['Schedule Date']) || 'Not Set'} {order.startTime && `(${formatTime(order.startTime)})`}</span></div>
                {order.clientWO && <div className="flex items-center"><span className="font-bold mr-2">Client WO:</span><span>{order.clientWO}</span></div>}
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900/50 px-5 py-3">
            <button onClick={() => onSelectOrder(order)} className="w-full text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">View Details</button>
        </div>
    </div>
);

export const DashboardView = () => {
    const { 
        filteredOrders, 
        setSelectedOrder, 
        searchTerm, 
        setSearchTerm, 
        statusFilter, 
        setStatusFilter 
    } = useWorkOrderContext();

    const orders = filteredOrders;

    return (
    <>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                    <label htmlFor="work-order-search" className="sr-only">Search Work Orders</label>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                    <input 
                        type="text" 
                        id="work-order-search"
                        name="work-order-search"
                        placeholder="Search by WO#, Client, Location, Tech..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                    />
                </div>
                <div className="relative">
                    <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                    <select 
                        id="status-filter"
                        name="status-filter"
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)} 
                        className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    >
                        <option>All</option>
                        <option>Open</option>
                        <option>Scheduled</option>
                        <option>In Progress</option>
                        <option>On Hold</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>
        </div>
        {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={setSelectedOrder} />)}
            </div>
        ) : (
            <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Work Orders Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
        )}
    </>
    );
};
