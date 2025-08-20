import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditCustomerModal = ({ customer, onClose, onUpdateCustomer }) => {
    const [formData, setFormData] = useState(customer);

    const handleChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateCustomer(formData);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Customer</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
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
                                <label className="text-xs text-gray-600 dark:text-gray-400">Name</label>
                                <input name="name" value={formData.contact.name} onChange={e => handleChange(e, 'contact')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">Email</label>
                                <input name="email" value={formData.contact.email} onChange={e => handleChange(e, 'contact')} type="email" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-400">Phone</label>
                                <input name="phone" value={formData.contact.phone} onChange={e => handleChange(e, 'contact')} type="tel" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Billing Address</h3>
                        <div className="space-y-4">
                             <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Street Address</label>
                                <input name="street" value={formData.billingAddress.street} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400">City</label>
                                    <input name="city" value={formData.billingAddress.city} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400">State</label>
                                    <input name="state" value={formData.billingAddress.state} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400">Zip Code</label>
                                    <input name="zip" value={formData.billingAddress.zip} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomerModal;