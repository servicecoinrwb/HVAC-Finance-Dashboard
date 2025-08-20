import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddCustomerModal = ({ onAddCustomer, onClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Commercial');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');
    const [zip, setZip] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Customer name cannot be empty.");
            return;
        }

        const newCustomer = {
            name,
            type,
            contact: {
                name: contactName,
                email: contactEmail,
                phone: contactPhone
            },
            billingAddress: {
                street,
                city,
                state,
                zip
            },
            locations: []
        };

        onAddCustomer(newCustomer);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Customer</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Type</label>
                            <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)} 
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                                <option>Commercial</option>
                                <option>Residential</option>
                                <option>National Account</option>
                                <option>Maintenance</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Primary Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Contact Name</label>
                                <input 
                                    type="text" 
                                    value={contactName} 
                                    onChange={(e) => setContactName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={contactEmail} 
                                    onChange={(e) => setContactEmail(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                                <input 
                                    type="tel" 
                                    value={contactPhone} 
                                    onChange={(e) => setContactPhone(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Billing Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Street Address</label>
                                <input 
                                    type="text" 
                                    value={street} 
                                    onChange={(e) => setStreet(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">City</label>
                                    <input 
                                        type="text" 
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)} 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">State</label>
                                    <input 
                                        type="text" 
                                        value={state} 
                                        onChange={(e) => setState(e.target.value)} 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Zip Code</label>
                                    <input 
                                        type="text" 
                                        value={zip} 
                                        onChange={(e) => setZip(e.target.value)} 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">
                        Add Customer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerModal;