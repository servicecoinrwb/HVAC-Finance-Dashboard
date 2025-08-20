import React, { useState } from 'react';
import { PlusCircle, Edit, Mail, Phone, Trash2 } from 'lucide-react';
import AddTechnicianModal from '../modals/AddTechnicianModal';
import EditTechnicianModal from '../modals/EditTechnicianModal';
import { getTechStatusStyles } from '../utils/helpers';

const TechnicianManagementView = ({ technicians, onAddTechnician, onUpdateTechnician, onDeleteTechnician }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editing, setEditing] = useState(null);
    
    return (
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Technician Management</h3>
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                    <PlusCircle size={20} /> Add New Technician
                </button>
            </div>
            <div className="space-y-4">
                {technicians.map(tech => (
                    <div key={tech.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{tech.name}</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1.5"><Mail size={14}/> {tech.email}</span>
                                <span className="flex items-center gap-1.5"><Phone size={14}/> {tech.phone}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTechStatusStyles(tech.status)}`}>{tech.status}</span>
                            </div>
                        </div>
                        {tech.name !== 'Unassigned' && (
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditing(tech)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full">
                                    <Edit size={16}/>
                                </button>
                                <button onClick={() => onDeleteTechnician(tech.id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full">
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isAdding && <AddTechnicianModal onAdd={onAddTechnician} onClose={() => setIsAdding(false)} />}
            {editing && <EditTechnicianModal technician={editing} onUpdate={onUpdateTechnician} onClose={() => setEditing(null)} />}
        </div>
    );
};

export default TechnicianManagementView;