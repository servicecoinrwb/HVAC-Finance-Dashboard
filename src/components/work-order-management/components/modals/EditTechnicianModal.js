import React, { useState } from 'react';

const EditTechnicianModal = ({ technician, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(technician);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Technician</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                            <option>Available</option>
                            <option>En Route</option>
                            <option>On Site</option>
                            <option>On Break</option>
                            <option>On Call</option>
                            <option>Day Off</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditTechnicianModal;