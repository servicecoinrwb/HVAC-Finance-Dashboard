import React, { useState, useMemo } from 'react';
import { Car, PlusCircle, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export const VehicleManagement = ({ vehicles, maintenanceLogs, openModal, handleDelete, searchTerm, setSearchTerm }) => {
    const [expandedVehicleId, setExpandedVehicleId] = useState(null);

    const toggleVehicle = (id) => {
        setExpandedVehicleId(prevId => (prevId === id ? null : id));
    };
    
    const filteredVehicles = useMemo(() => vehicles.filter(v => (v.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (v.model || '').toLowerCase().includes(searchTerm.toLowerCase())), [vehicles, searchTerm]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Vehicle Management</h3>
                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Search Vehicles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 text-sm text-slate-800 dark:text-white" />
                    <button onClick={() => openModal('vehicle')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New Vehicle</button>
                </div>
            </div>
            <div className="space-y-2">
                {filteredVehicles.map(vehicle => (
                    <div key={vehicle.id}>
                        <div onClick={() => toggleVehicle(vehicle.id)} className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
                            <div className="flex items-center gap-4">
                                <Car size={24} className="text-cyan-500" />
                                <div>
                                    <p className="font-bold">{vehicle.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-mono text-orange-600 dark:text-orange-400">${(maintenanceLogs.filter(l => l.vehicleId === vehicle.id).reduce((acc, l) => acc + l.cost, 0)).toFixed(2)}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Expenses</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={(e) => { e.stopPropagation(); openModal('vehicle', vehicle); }} className="p-1 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400"><Edit size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete('vehicle', vehicle.id); }} className="p-1 text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                                {expandedVehicleId === vehicle.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>
                        {expandedVehicleId === vehicle.id && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-lg border-t-2 border-slate-200 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold">Maintenance Log</h4>
                                    <button onClick={() => openModal('maintenanceLog', { vehicleId: vehicle.id })} className="flex items-center gap-2 text-xs bg-green-600 hover:bg-green-500 text-white font-semibold px-2 py-1 rounded-md"><PlusCircle size={14} /> Add Log Entry</button>
                                </div>
                                <table className="w-full text-left text-sm">
                                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                        <tr>
                                            <th className="p-2">Date</th>
                                            <th className="p-2">Mileage</th>
                                            <th className="p-2">Work Performed</th>
                                            <th className="p-2 text-right">Cost</th>
                                            <th className="p-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {maintenanceLogs.filter(log => log.vehicleId === vehicle.id).sort((a,b) => new Date(b.date) - new Date(a.date)).map(log => (
                                            <tr key={log.id} className="border-b border-slate-200 dark:border-slate-700/50">
                                                <td className="p-2">{log.date}</td>
                                                <td className="p-2">{log.mileage?.toLocaleString() || 'N/A'}</td>
                                                <td className="p-2">{log.workPerformed}</td>
                                                <td className="p-2 text-right font-mono">${log.cost.toFixed(2)}</td>
                                                <td className="p-2 text-center">
                                                    <button onClick={() => openModal('maintenanceLog', log)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"><Edit size={14} /></button>
                                                    <button onClick={() => handleDelete('maintenanceLog', log.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};