import React, { useState, useReducer, useMemo } from 'react';
import { X, Wrench, Briefcase, Building, MapPin, AlertTriangle, MessageSquare } from 'lucide-react';
import { 
    excelDateToYYYYMMDD, 
    jsDateToExcel, 
    yyyymmddToExcel,
    formatCurrency, 
    getDynamicStyles, 
    formatTimestamp, 
    excelDateToJSDateString 
} from '../utils/helpers.jsx';

// Reducer function to manage form state more cleanly
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'TOGGLE_TECH': {
            const newTechs = state.assignedTechnicians.includes(action.techName)
                ? state.assignedTechnicians.filter(t => t !== action.techName)
                : [...state.assignedTechnicians, action.techName];
            return { ...state, assignedTechnicians: newTechs };
        }
        default:
            return state;
    }
}

const WorkOrderDetailModal = ({ order, onClose, onUpdate, onAddNote, technicians }) => {
    if (!order) return null;

    const initialState = {
        status: order['Order Status'],
        assignedTechnicians: order.technician || [],
        scheduleDate: excelDateToYYYYMMDD(order['Schedule Date']),
        startTime: order.startTime || '',
        endTime: order.endTime || '',
        clientWO: order.clientWO || '',
    };
    
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [newNote, setNewNote] = useState('');

    const handleFieldChange = (field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    };

    const handleTechChange = (techName) => {
        dispatch({ type: 'TOGGLE_TECH', techName });
    };
    
    const handleSaveChanges = () => {
        const payload = {};
        if (formData.status !== order['Order Status']) { 
            payload['Order Status'] = formData.status; 
            if (formData.status === 'Completed' && !order['Completed Date']) {
                payload['Completed Date'] = jsDateToExcel(new Date());
            } 
        }
        if (JSON.stringify(formData.assignedTechnicians) !== JSON.stringify(order.technician)) {
            payload['technician'] = formData.assignedTechnicians;
        }
        const newScheduleDateExcel = yyyymmddToExcel(formData.scheduleDate);
        if (newScheduleDateExcel !== order['Schedule Date'] || formData.startTime !== order.startTime || formData.endTime !== order.endTime) {
            payload['Schedule Date'] = newScheduleDateExcel;
            payload.startTime = formData.startTime;
            payload.endTime = formData.endTime;
            if (formData.status === 'Open' && formData.scheduleDate) {
                payload['Order Status'] = 'Scheduled';
            }
        }
        if (formData.clientWO !== order.clientWO) payload.clientWO = formData.clientWO;
        if (Object.keys(payload).length > 0) onUpdate(order.id, payload);
    };

    const details = useMemo(() => [
        { label: "Work Order #", value: order['WO#'], icon: <Wrench/> },
        { label: "Client WO#", value: order.clientWO, icon: <Briefcase /> },
        { label: "Location", value: `${order.Company} (#${order['Loc #']})`, icon: <Building/> },
        { label: "Address", value: `${order.City}, ${order.State}`, icon: <MapPin/> },
        { label: "Priority", value: order.Priority, icon: <AlertTriangle/>, style: `${getDynamicStyles('priority', order.Priority)} px-2 py-0.5 rounded-full text-xs font-semibold` },
        { label: "Task", value: order.Task },
        { label: "NTE Amount", value: formatCurrency(order.NTE) },
        { label: "Created Date", value: excelDateToJSDateString(order['Created Date']) }
    ], [order]);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <header className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Work Order Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </header>

                <main className="p-6 overflow-y-auto">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {details.map(d => (
                            <div key={d.label} className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{d.label}</span>
                                <div className={`text-base text-gray-900 dark:text-white font-semibold flex items-center gap-2 mt-1`}>
                                    {d.icon && <span className="text-gray-400">{React.cloneElement(d.icon, { size: 16 })}</span>}
                                    <span className={d.style || ''}>{d.value}</span>
                                </div>
                            </div>
                        ))}
                    </section>
                    
                    <section className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Job Management</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                                <select value={formData.status} onChange={(e) => handleFieldChange('status', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                                    <option>Open</option><option>Scheduled</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Assigned Technicians</label>
                                <div className="border border-gray-300 dark:border-slate-600 p-2 rounded-lg max-h-24 overflow-y-auto bg-white dark:bg-slate-700">
                                    {technicians.filter(t => t.name !== 'Unassigned').map(t => (
                                        <div key={t.id} className="flex items-center">
                                            <input type="checkbox" id={`tech-${t.id}`} checked={formData.assignedTechnicians.includes(t.name)} onChange={() => handleTechChange(t.name)} className="mr-2" />
                                            <label htmlFor={`tech-${t.id}`} className="text-gray-900 dark:text-white">{t.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Schedule Date</label>
                                <input type="date" value={formData.scheduleDate} onChange={e => handleFieldChange('scheduleDate', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Start Time</label>
                                <input type="time" value={formData.startTime} onChange={e => handleFieldChange('startTime', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">End Time</label>
                                <input type="time" value={formData.endTime} onChange={e => handleFieldChange('endTime', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Client WO#</label>
                            <input type="text" value={formData.clientWO} onChange={e => handleFieldChange('clientWO', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                        </div>
                    </section>

                    <section className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                            <MessageSquare size={20} className="mr-2"/>Work Notes
                        </h3>
                        <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
                            {order.notes && order.notes.length > 0 ? order.notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((note, index) => (
                                <div key={index} className="text-sm bg-white dark:bg-slate-600 p-2 rounded shadow-sm">
                                    <p className="text-gray-800 dark:text-gray-200">{note.text}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{formatTimestamp(note.timestamp)}</p>
                                </div>
                            )) : <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No notes for this job yet.</p>}
                        </div>
                        <div className="mt-4">
                            <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a new note..." rows="3" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            <div className="flex justify-end mt-2">
                                <button onClick={() => onAddNote(order.id, newNote, () => setNewNote(''))} disabled={!newNote.trim()} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400">Add Note</button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default WorkOrderDetailModal;