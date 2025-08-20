import React, { useMemo } from 'react';
import { Download, Award } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const ReportingView = ({ workOrders, technicians }) => {
    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    
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
        alert("PDF download functionality would be implemented here with a proper PDF library");
    };

    return (
        <div id="reporting-view" className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Reporting Dashboard</h3>
                <button onClick={handleDownloadPdf} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">
                    <Download size={20} /> Download PDF
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                    <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Completed Jobs</h4>
                    <p className="text-5xl font-bold text-green-600">{completedOrders.length}</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                    <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Potential Revenue</h4>
                    <p className="text-5xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
                </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Technician Leaderboard</h4>
                <div className="space-y-4">
                    {jobsByTech.map((tech, index) => (
                        <div key={tech.name} className="flex items-center gap-4">
                            <div className="w-10 text-center">
                                {index < 3 ? <Award size={24} className={medalColor(index)} /> : <span className="text-lg font-bold text-gray-400 dark:text-gray-500">{index + 1}</span>}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-800 dark:text-white">{tech.name}</p>
                                <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-4 mt-1">
                                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${maxJobs > 0 ? (tech.count / maxJobs) * 100 : 0}%` }}></div>
                                </div>
                            </div>
                            <div className="w-12 text-right font-bold text-lg text-gray-800 dark:text-white">{tech.count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportingView;