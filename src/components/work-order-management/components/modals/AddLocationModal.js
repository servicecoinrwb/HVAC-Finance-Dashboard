import React, { useState } from 'react';

const AddLocationModal = ({ customer, onClose, onAddLocation }) => {
    const [name, setName] = useState('');
    const [locNum, setLocNum] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Location name cannot be empty.");
            return;
        }
        onAddLocation(customer.id, { name, locNum, city, state });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Location to {customer.name}</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Location #</label>
                        <input type="text" value={locNum} onChange={e => setLocNum(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">City</label>
                            <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">State</label>
                            <input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Location</button>
                </div>
            </form>
        </div>
    );
};

export default AddLocationModal;