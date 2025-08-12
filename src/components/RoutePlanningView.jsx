import React, { useState, useMemo } from 'react';
import { Printer } from 'lucide-react';

// --- Utility Functions ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const excelDateToYYYYMMDD = (d) => { const date = excelToJSDate(d); return date ? date.toISOString().split('T')[0] : ''; };
const formatTime = (timeStr) => { if (!timeStr) return ''; const [h, m] = timeStr.split(':'); const hours = parseInt(h, 10); const suffix = hours >= 12 ? 'PM' : 'AM'; const hh = ((hours + 11) % 12 + 1); return `${hh}:${m} ${suffix}`; };

export const RoutePlanningView = ({ workOrders, technicians }) => {
    const [selectedTechId, setSelectedTechId] = useState('ALL');
    const [viewType, setViewType] = useState('today'); // 'today', '3-day', 'week', 'custom'
    const [customStartDate, setCustomStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [customEndDate, setCustomEndDate] = useState(new Date().toISOString().split('T')[0]);

    const jobsForRange = useMemo(() => {
        let startDate = new Date();
        let endDate = new Date();
        
        // Set date range based on view type
        switch(viewType) {
            case 'today':
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
                break;
            case '3-day':
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(startDate.getDate() + 2);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'week':
                const dayOfWeek = startDate.getDay();
                startDate.setDate(startDate.getDate() - dayOfWeek);
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'custom':
                startDate = new Date(customStartDate + 'T00:00:00');
                endDate = new Date(customEndDate + 'T23:59:59');
                break;
            default:
                break;
        }

        const filtered = workOrders.filter(wo => {
            const jobDate = excelToJSDate(wo['Schedule Date']);
            return jobDate && jobDate >= startDate && jobDate <= endDate;
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
                    <p className="text-gray-500">Map Placeholder</p>
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