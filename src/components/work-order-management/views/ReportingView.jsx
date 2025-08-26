import React, { useMemo, createContext, useContext, useState } from 'react';
import { Award, Trophy } from 'lucide-react';

// --- CONTEXT AND HELPERS ---
// In your actual application, these would be in separate files (e.g., context/WorkOrderContext.js, utils/helpers.js)
// They are kept here so the component remains runnable.

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// The context is created here. Your app will provide the value for this context.
const WorkOrderContext = createContext({
    workOrders: [],
    technicians: []
});

// The hook used by the component to access the data.
const useWorkOrderContext = () => {
    return useContext(WorkOrderContext);
};
// --- END OF CONTEXT AND HELPERS ---


const ReportingView = () => {
    // The component now fully relies on the context for its data.
    // It will be empty until your app provides real data through the WorkOrderContext.Provider.
    const { workOrders, technicians } = useWorkOrderContext();

    // A guard clause to handle the initial loading state before data is available.
    if (!workOrders || !technicians) {
        return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading leaderboard data...</div>;
    }

    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    
    const totalRevenue = completedOrders.reduce((sum, wo) => sum + (wo.NTE || 0), 0);
    
    const jobsByTech = useMemo(() => {
        if (!technicians || !completedOrders) return [];
        const techCounts = technicians
            .filter(t => t.name !== 'Unassigned')
            .map(tech => {
                const count = completedOrders.filter(wo => wo.technicianId === tech.id).length;
                return { name: tech.name, count, id: tech.id };
            });
        return techCounts.sort((a, b) => b.count - a.count);
    }, [completedOrders, technicians]);

    const maxJobs = Math.max(...jobsByTech.map(t => t.count), 0);
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    const medalColor = (index) => {
        if (index === 0) return 'text-yellow-500';
        if (index === 1) return 'text-gray-400 dark:text-gray-500';
        if (index === 2) return 'text-yellow-600';
        return 'text-gray-500';
    };

    const handlePrintCertificate = () => {
        console.log("Printing winner's certificate...");
        // window.print(); 
    };

    return (
        <div id="leaderboard-view" className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200 dark:border-slate-600">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Technician Leaderboard</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{currentMonth} Standings</p>
                </div>
                <button 
                    onClick={handlePrintCertificate} 
                    className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
                >
                    <Trophy size={20} /> Print Winner's Certificate
                </button>
            </div>
            
            <div className="space-y-3 my-6">
                {jobsByTech.length > 0 && jobsByTech.some(t => t.count > 0) ? (
                    jobsByTech.map((tech, index) => (
                        <div 
                            key={tech.id} 
                            className={`p-3 rounded-lg flex items-center gap-4 transition-all ${index === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-500/30' : 'bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600'}`}
                        >
                            <div className="w-10 text-center font-bold text-lg">
                                {index < 3 ? <Award size={28} className={medalColor(index)} /> : <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <p className="font-bold text-md text-gray-700 dark:text-gray-200">{tech.name}</p>
                                    {index === 0 && (
                                        <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">Top Performer</span>
                                    )}
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-4 mt-1">
                                    <div 
                                        className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold" 
                                        style={{ width: `${maxJobs > 0 ? (tech.count / maxJobs) * 100 : 0}%` }}
                                    >
                                        {tech.count > 0 && tech.count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No completed jobs to rank yet for this month.
                    </p>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-md font-semibold text-gray-600 dark:text-gray-400">Completed Jobs</h4>
                        <p className="text-3xl font-bold text-green-600">{completedOrders.length}</p>
                    </div>
                     <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-md font-semibold text-gray-600 dark:text-gray-400">Total Revenue</h4>
                        <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
                    </div>
                 </div>
            </div>
        </div>
    );
};

// The main App component now demonstrates how to integrate ReportingView.
// Your main application will control the theme and provide the data.
export default function App() {
    // In your real app, you would fetch data from your backend/Firestore
    // and manage your theme state here or in a higher-level component.
    const [appData] = useState({
        workOrders: [], // This would be populated with your actual data
        technicians: [] // This would be populated with your actual data
    });

    // Your main app's layout would apply the 'dark' class to a parent element.
    // For example: <div className={isDarkMode ? 'dark' : ''}> ... </div>
    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-4">
            <div className="flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    {/* Your app should wrap the ReportingView (or a parent component)
                      with the WorkOrderContext.Provider and pass in the real data.
                    */}
                    <WorkOrderContext.Provider value={appData}>
                        <ReportingView />
                    </WorkOrderContext.Provider>
                </div>
            </div>
        </div>
    );
}
