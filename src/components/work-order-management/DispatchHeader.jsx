import React from 'react';
import { Wrench, Calendar as CalendarIcon, Map, Users, User, PlusCircle, ArrowLeft, FileText, BarChart2 } from 'lucide-react';

export const DispatchHeader = ({ currentView, setCurrentView, onAddOrderClick }) => (
    <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {currentView !== 'dashboard' ? (
                        <button onClick={() => setCurrentView('dashboard')} className="p-2 rounded-full hover:bg-gray-100">
                            <ArrowLeft size={24} />
                        </button>
                    ) : (
                        <Wrench className="h-8 w-8 text-blue-600" />
                    )}
                    <h1 className="text-2xl font-bold text-gray-800">HVAC Dispatch</h1>
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