import React, { useState } from 'react';
import { X, Wrench, Briefcase, Building, MapPin, AlertTriangle, MessageSquare } from 'lucide-react';
import { excelDateToYYYYMMDD, formatCurrency, /*...other helpers*/ } from '../utils/helpers';

// --- Utility Functions ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;
const excelDateToYYYYMMDD = (d) => { const date = excelToJSDate(d); return date ? date.toISOString().split('T')[0] : ''; };
const yyyymmddToExcel = (s) => s ? jsDateToExcel(new Date(s + 'T00:00:00')) : null;
const formatTimestamp = (iso) => iso ? new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : '';
const formatCurrency = (a) => a === null || a === undefined ? "N/A" : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a);
const excelDateToJSDateString = (d) => { const date = excelToJSDate(d); return date ? date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : null; };
const getPriorityStyles = (p) => ({'emergency':'bg-red-100 text-red-800 border-red-500','urgent':'bg-orange-100 text-orange-800 border-orange-500','regular':'bg-blue-100 text-blue-800 border-blue-500','low':'bg-gray-100 text-gray-800 border-gray-500',}[p?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-500');

export const WorkOrderDetailModal = ({ order, onClose, onUpdate, onAddNote, technicians }) => {
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
        { label: "Work Order #", value: order['WO#'], icon: <Wrench/> },
        { label: "Client WO#", value: order.clientWO, icon: <Briefcase />},
        { label: "Location", value: `${order.Company} (#${order['Loc #']})`, icon: <Building/> },
        { label: "Address", value: `${order.City}, ${order.State}`, icon: <MapPin/> },
        { label: "Priority", value: order.Priority, icon: <AlertTriangle/>, style: `${getPriorityStyles(order.Priority)} px-2 py-0.5 rounded-full text-xs font-semibold` },
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
                                    <option>Open</option>
                                    <option>Scheduled</option>
                                    <option>In Progress</option>
                                    <option>On Hold</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 block mb-1">Assigned Technicians</label>
                                <div className="border p-2 rounded-lg max-h-24 overflow-y-auto">
                                    {technicians.filter(t=>t.name !== 'Unassigned').map(t => (
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
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><MessageSquare size={20} className="mr-2"/>Work Notes</h3>
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

export default WorkOrderDetailModal;
