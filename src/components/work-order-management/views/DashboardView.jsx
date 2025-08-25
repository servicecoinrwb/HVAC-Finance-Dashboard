import React, { useMemo, useState } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Briefcase, User, Calendar as CalendarIcon, Wrench, Check, DollarSign, BarChart } from 'lucide-react';
// 1. Import the context hook to access shared state
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// --- Utility Functions (with dark mode support) ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const excelDateToJSDateString = (d) => { const date = excelToJSDate(d); return date ? date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : null; };
const formatTime = (timeStr) => { if (!timeStr) return ''; const [h, m] = timeStr.split(':'); const hours = parseInt(h, 10); const suffix = hours >= 12 ? 'PM' : 'AM'; const hh = ((hours + 11) % 12 + 1); return `${hh}:${m} ${suffix}`; };
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

// --- Date Utilities ---
const getDateCategory = (scheduleDate) => {
    if (!scheduleDate) return 'later';
    
    const date = excelToJSDate(scheduleDate);
    if (!date) return 'later';
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const isThisWeek = date <= weekFromNow && date > tomorrow;
    
    if (isToday) return 'today';
    if (isTomorrow) return 'tomorrow';
    if (isThisWeek) return 'thisweek';
    return 'later';
};

// --- Reusable Components ---

const KpiCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
        green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300',
        yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300',
        purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
    };
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-full ${colors[color] || colors.blue}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

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

const DateGroupSection = ({ title, orders, onSelectOrder, badge }) => {
    if (!orders.length) return null;
    
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
                {badge && <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 rounded-full">{badge}</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={onSelectOrder} />)}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, children, count }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-lg transition-colors ${
            active 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
        }`}
    >
        {children}
        {count > 0 && (
            <span className={`px-2 py-1 text-xs rounded-full ${
                active 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
            }`}>
                {count}
            </span>
        )}
    </button>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    
    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-slate-600"
            >
                <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-slate-600"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export const DashboardView = () => {
    const { 
        workOrders,
        invoices,
        filteredOrders, 
        setSelectedOrder, 
        searchTerm, 
        setSearchTerm
    } = useWorkOrderContext();

    const [activeTab, setActiveTab] = useState('active');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 15;

    const kpiData = useMemo(() => {
        const safeOrders = workOrders || [];
        const safeInvoices = invoices || [];
        
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const openOrders = safeOrders.filter(wo => wo['Order Status'] === 'Open').length;
        
        const completedThisMonth = safeOrders.filter(wo => {
            const completedDate = excelToJSDate(wo['Completed Date']);
            return wo['Order Status'] === 'Completed' && completedDate >= startOfMonth;
        }).length;

        const billedThisMonth = safeInvoices.filter(inv => new Date(inv.date) >= startOfMonth)
            .reduce((sum, inv) => sum + (inv.total || 0), 0);
        
        const avgInvoiceValue = safeInvoices.length > 0 
            ? safeInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0) / safeInvoices.length
            : 0;

        return { openOrders, completedThisMonth, billedThisMonth, avgInvoiceValue };
    }, [workOrders, invoices]);

    // Tab filtering logic
    const tabData = useMemo(() => {
        const safeOrders = filteredOrders || [];
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const active = safeOrders.filter(order => 
            ['Open', 'In Progress', 'On Hold'].includes(order['Order Status'])
        );

        const scheduled = safeOrders.filter(order => 
            order['Order Status'] === 'Scheduled' || 
            (order['Schedule Date'] && excelToJSDate(order['Schedule Date']) > now)
        );

        const recent = safeOrders.filter(order => {
            const completedDate = excelToJSDate(order['Completed Date']);
            return order['Order Status'] === 'Completed' && completedDate >= sevenDaysAgo;
        });

        const all = safeOrders;

        return { active, scheduled, recent, all };
    }, [filteredOrders]);

    // Date grouping for scheduled tab
    const scheduledByDate = useMemo(() => {
        const groups = {
            today: [],
            tomorrow: [],
            thisweek: [],
            later: []
        };

        tabData.scheduled.forEach(order => {
            const category = getDateCategory(order['Schedule Date']);
            groups[category].push(order);
        });

        return groups;
    }, [tabData.scheduled]);

    // Pagination logic for "All" tab
    const paginatedOrders = useMemo(() => {
        if (activeTab !== 'all') return [];
        
        const startIndex = (currentPage - 1) * ordersPerPage;
        return tabData.all.slice(startIndex, startIndex + ordersPerPage);
    }, [tabData.all, currentPage, ordersPerPage, activeTab]);

    const totalPages = Math.ceil(tabData.all.length / ordersPerPage);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'active':
                return tabData.active.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tabData.active.map(order => 
                            <OrderCard key={order.id} order={order} onSelectOrder={setSelectedOrder} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Active Work Orders</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">All work orders are either scheduled or completed.</p>
                    </div>
                );

            case 'scheduled':
                return (
                    <div>
                        <DateGroupSection 
                            title="Today" 
                            orders={scheduledByDate.today} 
                            onSelectOrder={setSelectedOrder}
                            badge={scheduledByDate.today.length}
                        />
                        <DateGroupSection 
                            title="Tomorrow" 
                            orders={scheduledByDate.tomorrow} 
                            onSelectOrder={setSelectedOrder}
                            badge={scheduledByDate.tomorrow.length}
                        />
                        <DateGroupSection 
                            title="This Week" 
                            orders={scheduledByDate.thisweek} 
                            onSelectOrder={setSelectedOrder}
                            badge={scheduledByDate.thisweek.length}
                        />
                        <DateGroupSection 
                            title="Later" 
                            orders={scheduledByDate.later} 
                            onSelectOrder={setSelectedOrder}
                            badge={scheduledByDate.later.length}
                        />
                        {tabData.scheduled.length === 0 && (
                            <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Scheduled Work Orders</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Schedule work orders to see them organized by date.</p>
                            </div>
                        )}
                    </div>
                );

            case 'recent':
                return tabData.recent.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tabData.recent.map(order => 
                            <OrderCard key={order.id} order={order} onSelectOrder={setSelectedOrder} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Recently Completed Work Orders</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Completed work orders from the last 7 days will appear here.</p>
                    </div>
                );

            case 'all':
                return (
                    <div>
                        {paginatedOrders.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedOrders.map(order => 
                                    <OrderCard key={order.id} order={order} onSelectOrder={setSelectedOrder} />
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Work Orders Found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search criteria.</p>
                            </div>
                        )}
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* --- KPI Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KpiCard title="Open Work Orders" value={kpiData.openOrders} icon={<Wrench size={24} />} color="yellow" />
                <KpiCard title="Completed This Month" value={kpiData.completedThisMonth} icon={<Check size={24} />} color="green" />
                <KpiCard title="Billed This Month" value={formatCurrency(kpiData.billedThisMonth)} icon={<DollarSign size={24} />} color="blue" />
                <KpiCard title="Avg. Invoice Value" value={formatCurrency(kpiData.avgInvoiceValue)} icon={<BarChart size={24} />} color="purple" />
            </div>

            {/* --- Search Section --- */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-8">
                <div className="relative">
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
            </div>

            {/* --- Tabs --- */}
            <div className="flex flex-wrap gap-2 mb-8">
                <TabButton 
                    active={activeTab === 'active'} 
                    onClick={() => handleTabChange('active')}
                    count={tabData.active.length}
                >
                    Active
                </TabButton>
                <TabButton 
                    active={activeTab === 'scheduled'} 
                    onClick={() => handleTabChange('scheduled')}
                    count={tabData.scheduled.length}
                >
                    Scheduled
                </TabButton>
                <TabButton 
                    active={activeTab === 'recent'} 
                    onClick={() => handleTabChange('recent')}
                    count={tabData.recent.length}
                >
                    Recent
                </TabButton>
                <TabButton 
                    active={activeTab === 'all'} 
                    onClick={() => handleTabChange('all')}
                    count={tabData.all.length}
                >
                    All
                </TabButton>
            </div>
            
            {/* --- Tab Content --- */}
            {renderTabContent()}
        </>
    );
};