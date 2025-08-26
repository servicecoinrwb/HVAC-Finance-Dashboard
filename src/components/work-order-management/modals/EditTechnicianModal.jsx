import React, { useState } from 'react';
import { Smartphone, Key, User, Wrench } from 'lucide-react';

const EditTechnicianModal = ({ technician, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        ...technician,
        userType: technician.userType || 'technician', // Ensure userType is set
        role: technician.role || 'field_technician'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Ensure critical fields are set for mobile app recognition
        const updatedTechnician = {
            ...formData,
            userType: 'technician',
            role: 'field_technician',
            updatedAt: new Date().toISOString()
        };
        
        onUpdate(updatedTechnician);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Wrench size={24} />
                        Edit Technician
                    </h2>
                </div>
                
                <div className="p-6 space-y-4">
                    {/* Basic Information */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name || ''} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email || ''} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone || ''} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select 
                            name="status" 
                            value={formData.status || 'Available'} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="Available">Available</option>
                            <option value="En Route">En Route</option>
                            <option value="On Site">On Site</option>
                            <option value="On Break">On Break</option>
                            <option value="On Call">On Call</option>
                            <option value="Day Off">Day Off</option>
                        </select>
                    </div>

                    {/* User Type - Read Only Display */}
                    <div className="border-t pt-4">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">User Type</label>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
                            <User size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Field Technician</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 ml-auto">Mobile App User</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            This designation allows mobile app access and work order assignment.
                        </p>
                    </div>

                    {/* Mobile Access Section */}
                    <div className="border-t pt-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <input 
                                type="checkbox" 
                                name="mobileAccess"
                                id="editMobileAccess"
                                checked={formData.mobileAccess || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="editMobileAccess" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Smartphone size={16} />
                                Mobile App Access
                            </label>
                        </div>
                        
                        {formData.mobileAccess && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg space-y-2">
                                <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                                    <Key size={12} />
                                    <span>Firebase account already created</span>
                                </div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                    Firebase UID: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{formData.firebaseUid || formData.id}</code>
                                </div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                    Contact IT for password reset if needed.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile App Path Info */}
                    {formData.mobileAccess && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="text-xs font-medium text-green-800 dark:text-green-200 mb-1">
                                Mobile App Integration Status
                            </div>
                            <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                                <div>• User Type: <strong>Field Technician</strong></div>
                                <div>• Role: <strong>Mobile Service Reporter</strong></div>
                                <div>• App Access: <strong>Enabled</strong></div>
                                <div>• Document ID: <code>{formData.id}</code></div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTechnicianModal;
