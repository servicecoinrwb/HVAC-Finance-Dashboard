import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';

const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;
const yyyymmddToExcel = (s) => s ? jsDateToExcel(new Date(s + 'T00:00:00')) : null;

export const AddWorkOrderModal = ({ onClose, onAddOrder, customers }) => {
    const [clientId, setClientId] = useState(customers[0]?.id || '');
    const [locationIdentifier, setLocationIdentifier] = useState('');
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Regular');
    const [category, setCategory] = useState('Heating & Cooling');
    const [nte, setNte] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [clientWO, setClientWO] = useState('');

    const selectedClient = useMemo(() => customers.find(c => c.id === clientId), [clientId, customers]);
    
    useEffect(() => {
        if (selectedClient?.locations?.[0]) {
            const loc = selectedClient.locations[0];
            setLocationIdentifier(`${loc.name}-${loc.locNum}-0`);
        } else {
            setLocationIdentifier('');
        }
    }, [selectedClient]);

    const handleLocationChange = (identifier) => {
        setLocationIdentifier(identifier);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [company, locNum] = locationIdentifier.split('-').slice(0, 2);
        const location = selectedClient.locations.find(l => l.name === company && l.locNum === locNum);
        if (!clientId || !location || !task) { alert('Please fill out all required fields.'); return; }
        onAddOrder({ Client: selectedClient.name, Company: location.name, 'Loc #': location.locNum, Task: task, Priority: priority, Category: category, City: location.city, State: location.state, NTE: parseFloat(nte) || 0, 'Schedule Date': yyyymmddToExcel(scheduleDate), startTime, endTime, clientWO });
    };

    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800">Add New Work Order</h2><button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={28} /></button></div><div className="p-6 overflow-y-auto space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Client</label><select value={clientId} onChange={(e) => setClientId(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg">{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>{selectedClient && <div><label className="text-sm font-medium text-gray-600 block mb-1">Location</label><select value={locationIdentifier} onChange={e => handleLocationChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">{selectedClient.locations.map((l, index) => <option key={`${l.name}-${l.locNum}-${index}`} value={`${l.name}-${l.locNum}-${index}`}>{l.name} (#{l.locNum})</option>)}</select></div>}<div><label className="text-sm font-medium text-gray-600 block mb-1">Client WO#</label><input type="text" value={clientWO} onChange={e=>setClientWO(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Task / Issue</label><textarea value={task} onChange={e => setTask(e.target.value)} rows="3" className="w-full p-2 border border-gray-300 rounded-lg" required></textarea></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Priority</label><select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Regular</option><option>Low</option><option>Urgent</option><option>Emergency</option></select></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Heating & Cooling</option><option>Refrigeration</option><option>Maintenance</option><option>Plumbing</option><option>Other</option></select></div><div><label className="text-sm font-medium text-gray-600 block mb-1">NTE Amount ($)</label><input type="number" value={nte} onChange={e => setNte(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 500" /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Schedule Date</label><input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Start Time</label><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">End Time</label><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="p-6 bg-gray-50 border-t mt-auto"><button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Create Work Order</button></div></form></div>);
};