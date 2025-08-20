import React, { useState } from 'react';
import { Mail, Phone, PlusCircle, Edit, Trash2 } from 'lucide-react';
// 1. Import the context hook
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// --- Utility Functions ---
// 2. Updated styling function with dark mode support
const getTechStatusStyles = (s) => ({
    'available': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    'on site': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    'en route': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
    'on break': 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200',
    'on call': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200',
    'day off': 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200',
}[s?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200');


// --- Modals ---
const AddTechnicianModal = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) return; onAdd({ name, email, phone, status: 'Available' }); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Technician</h2></div><div className="p-6 space-y-4"><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></div></div><div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Technician</button></div></form></div>);
};

const EditTechnicianModal = ({ technician, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(technician);
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); onUpdate(formData); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Technician</h2></div><div className="p-6 space-y-4"><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label><select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"><option>Available</option><option>En Route</option><option>On Site</option><option>On Break</option><option>On Call</option><option>Day Off</option></select></div></div><div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button></div></form></div>);
};


export const TechnicianManagementView = () => {
    const { technicians, handlers } = useWorkOrderContext();
    const [isAdding, setIsAdding] = useState(false);
    const [editing, setEditing] = useState(null);

    if (!technicians) {
        return <div className="p-6">Loading technician data...</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Technician Management</h2>
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Add New Technician</button>
            </div>
            <div className="space-y-4">
                {technicians.map(tech => (
                    <div key={tech.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tech.name}</h3>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getTechStatusStyles(tech.status)}`}>{tech.status}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1.5"><Mail size={14}/> {tech.email}</span>
                                <span className="flex items-center gap-1.5"><Phone size={14}/> {tech.phone}</span>
                            </div>
                        </div>
                        {tech.name !== 'Unassigned' && (
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditing(tech)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-full"><Edit size={16}/></button>
                                <button onClick={() => handlers.deleteTechnician(tech.id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-slate-700 rounded-full"><Trash2 size={16}/></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isAdding && <AddTechnicianModal onAdd={handlers.addTechnician} onClose={() => setIsAdding(false)} />}
            {editing && <EditTechnicianModal technician={editing} onUpdate={handlers.updateTechnician} onClose={() => setEditing(null)} />}
        </div>
    );
};
