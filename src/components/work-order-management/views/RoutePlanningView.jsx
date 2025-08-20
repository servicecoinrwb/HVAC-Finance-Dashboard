import React, { useState, useMemo } from 'react';
import { Printer } from 'lucide-react';
import { excelToJSDate, excelDateToYYYYMMDD, formatTime } from '../utils/helpers';

const RoutePlanningView = ({ workOrders, technicians }) => {
    const [selectedTechId, setSelectedTechId] = useState('ALL');
    const [viewType, setViewType] = useState('today');
    const [customStartDate, setCustomStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [customEndDate, setCustomEndDate] = useState(new Date().toISOString().split('T')[0]);

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

    return (
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Route Planning</h3>
                <div className="flex items-center gap-4">
                    <select value={viewType} onChange={e => setViewType(e.target.value)} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                        <option value="today">Today</option>
                        <option value="3-day">Next 3 Days</option>
                        <option value="week">This Week</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    {viewType === 'custom' && (
                        <>
                            <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </>
                    )}
                    <select value={selectedTechId} onChange={e => setSelectedTechId(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                        <option value="ALL">All Technicians</option>
                        {technicians.filter(t=>t.name !== 'Unassigned').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">
                        <Printer size={20} /> Print Route
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Job Order</h4>
                    {Object.keys(groupedJobs).length > 0 ? (
                        Object.entries(groupedJobs).map(([date, techJobs]) => (
                            <div key={date} className="mb-4">
                                <h5 className="font-bold text-lg mb-2 p-2 bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-white rounded-md sticky top-20">
                                    {new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </h5>
                                {Object.entries(techJobs).map(([techName, jobs]) => (
                                    <div key={techName} className="mb-4">
                                        {selectedTechId === 'ALL' && <h6 className="font-bold text-md mb-2 p-2 bg-gray-100 dark:bg-slate-600 text-gray-800 dark:text-white rounded-md">{techName}</h6>}
                                        <div className="space-y-2">
                                            {jobs.map((job, index) => (
                                                <div key={job.id} className="p-3 border border-gray-200 dark:border-slate-600 rounded-lg flex items-center gap-4 bg-white dark:bg-slate-700">
                                                    <span className="text-xl font-bold text-gray-400 dark:text-gray-500">{index + 1}</span>
                                                    <div>
                                                        <p className="font-bold text-gray-800 dark:text-white">{formatTime(job.startTime)} - {formatTime(job.endTime)}</p>
                                                        <p className="text-gray-700 dark:text-gray-300">{job.Company} - {job.City}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.Task}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No jobs scheduled for this selection.</p>
                    )}
                </div>
                <div className="md:col-span-2 bg-gray-200 dark:bg-slate-600 rounded-lg flex items-center justify-center h-96">
                    <div id="route-map" className="w-full h-full rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                            Map will load here once Google Maps API key is configured
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoutePlanningView;