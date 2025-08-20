import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import OrderCard from '../components/OrderCard';

const DashboardView = ({ orders, onSelectOrder, searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => (
    <>
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Search by WO#, Client, Location, Tech..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
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
                {orders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={onSelectOrder} />)}
            </div>
        ) : (
            <div className="text-center py-16 px-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Work Orders Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
        )}
    </>
);

export default DashboardView;