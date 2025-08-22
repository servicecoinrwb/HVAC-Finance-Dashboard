import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Printer } from 'lucide-react';
import { excelToJSDate, excelDateToYYYYMMDD, formatTime } from '../utils/helpers';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

const RoutePlanningView = () => {
    const { workOrders, technicians, customers } = useWorkOrderContext();
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isMapApiLoaded, setIsMapApiLoaded] = useState(false);

    const [selectedTechId, setSelectedTechId] = useState('ALL');
    const [viewType, setViewType] = useState('today');
    const [customStartDate, setCustomStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [customEndDate, setCustomEndDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const checkGoogleMaps = () => {
            if (window.google && window.google.maps) {
                setIsMapApiLoaded(true);
            } else {
                setTimeout(checkGoogleMaps, 100); // Check again shortly
            }
        };
        checkGoogleMaps();
    }, []);

    useEffect(() => {
        if (isMapApiLoaded && mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: { lat: 42.4731, lng: -83.2504 }, // Centered on Southfield, MI
                zoom: 10,
            }));
        }
    }, [isMapApiLoaded, mapRef, map]);

    const jobsForRange = useMemo(() => {
        if (!workOrders || !technicians) return [];
        let startDate, endDate;
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        switch(viewType) {
            case 'today':
                startDate = new Date(now);
                endDate = new Date(now);
                break;
            case '3-day':
                startDate = new Date(now);
                endDate = new Date(now);
                endDate.setDate(startDate.getDate() + 2);
                break;
            case 'week':
                startDate = new Date(now);
                const dayOfWeek = startDate.getDay();
                startDate.setDate(startDate.getDate() - dayOfWeek);
                // ✅ Corrected: Create a new Date object for endDate
                endDate = new Date(startDate); 
                endDate.setDate(startDate.getDate() + 6);
                break;
            case 'custom':
                startDate = new Date(customStartDate + 'T00:00:00');
                endDate = new Date(customEndDate + 'T23:59:59');
                break;
            default:
                startDate = new Date(now);
                endDate = new Date(now);
        }
        endDate.setHours(23, 59, 59, 999);

        const filtered = workOrders.filter(wo => {
            const jobDate = excelToJSDate(wo['Schedule Date']);
            return jobDate && jobDate >= startDate && jobDate <= endDate;
        });
        
        const techName = technicians.find(t => t.id === selectedTechId)?.name;
        if (selectedTechId !== 'ALL' && techName) {
            return filtered.filter(wo => wo.technician?.includes(techName)).sort((a,b) => (a.startTime || '').localeCompare(b.startTime || ''));
        }
        return filtered.sort((a,b) => (a.startTime || '').localeCompare(b.startTime || ''));
    }, [selectedTechId, workOrders, technicians, viewType, customStartDate, customEndDate]);
    
    // Update map markers when jobs change
    useEffect(() => {
        if (map && customers) {
            // ✅ Clear existing markers from the map
            markers.forEach(marker => marker.setMap(null));
            const newMarkers = [];
            
            const bounds = new window.google.maps.LatLngBounds();
            
            jobsForRange.forEach((job, index) => {
                const customer = customers.find(c => c.name === job.Client);
                const location = customer?.locations?.find(l => l.name === job.Company && l.locNum === job['Loc #']);
                
                if (location && location.lat && location.lng) {
                    const position = { lat: location.lat, lng: location.lng };
                    const marker = new window.google.maps.Marker({
                        position,
                        map,
                        label: `${index + 1}`,
                        title: `${job.Company}\n${job.Task}`,
                    });
                    newMarkers.push(marker);
                    bounds.extend(position);
                }
            });
            // ✅ Save the new markers to state
            setMarkers(newMarkers);

            if (jobsForRange.length > 0 && !bounds.isEmpty()) {
                map.fitBounds(bounds);
            }
        }
    }, [map, jobsForRange, customers]);

    const groupedJobs = useMemo(() => {
        return jobsForRange.reduce((acc, job) => {
            const dateStr = excelDateToYYYYMMDD(job['Schedule Date']);
            if (!acc[dateStr]) acc[dateStr] = {};
            (job.technician || []).forEach(techName => {
                if (!acc[dateStr][techName]) acc[dateStr][techName] = [];
                acc[dateStr][techName].push(job);
            });
            return acc;
        }, {});
    }, [jobsForRange]);

    const handlePrint = () => window.print();

    if (!technicians || !customers) {
        return <div className="p-6">Loading data...</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Route Planning</h3>
                <div className="flex items-center gap-4">
                    <select value={viewType} onChange={e => setViewType(e.target.value)} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                        <option value="today">Today</option>
                        <option value="3-day">Next 3 Days</option>
                        <option value="week">This Week</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    {viewType === 'custom' && (
                        <>
                            <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                            <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                        </>
                    )}
                    <select value={selectedTechId} onChange={e => setSelectedTechId(e.target.value)} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                        <option value="ALL">All Technicians</option>
                        {technicians.filter(t=>t.name !== 'Unassigned').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">
                        <Printer size={20} /> Print Route
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 max-h-[600px] overflow-y-auto">
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Job Order</h4>
                    {Object.keys(groupedJobs).length > 0 ? (
                        Object.entries(groupedJobs).map(([date, techJobs]) => (
                            <div key={date} className="mb-4">
                                <h5 className="font-bold text-md mb-2 p-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white rounded-md sticky top-0">
                                    {new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </h5>
                                {Object.entries(techJobs).map(([techName, jobs]) => (
                                    <div key={techName} className="mb-4">
                                        {selectedTechId === 'ALL' && <h6 className="font-semibold text-sm mb-2 p-2 bg-gray-100 dark:bg-slate-600 text-gray-800 dark:text-white rounded-md">{techName}</h6>}
                                        <div className="space-y-2">
                                            {jobs.map((job, index) => (
                                                <div key={job.id} className="p-3 border dark:border-slate-600 rounded-lg flex items-start gap-4 bg-white dark:bg-slate-700/50">
                                                    <span className="text-lg font-bold text-gray-400 dark:text-gray-500 mt-1">{index + 1}</span>
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
                <div className="md:col-span-2 bg-gray-200 dark:bg-slate-600 rounded-lg min-h-[600px]">
                    <div ref={mapRef} className="w-full h-full rounded-lg">
                        {!isMapApiLoaded && (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoutePlanningView;
