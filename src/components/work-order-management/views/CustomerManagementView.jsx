import React, { useState } from 'react';
import { PlusCircle, Upload, Download, User, Mail, Phone } from 'lucide-react';
import AddCustomerModal from '../modals/AddCustomerModal';
import EditCustomerModal from '../modals/EditCustomerModal';
import AddLocationModal from '../modals/AddLocationModal';
import CSVImportModal from '../modals/CSVImportModal';
import { getCustomerTypeStyles } from '../utils/helpers';

const CustomerManagementView = ({ customers, onAddCustomer, onUpdateCustomer, onAddLocation }) => {
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [addingLocationTo, setAddingLocationTo] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);

    const exportCustomersToCSV = () => {
        const csvContent = [
            ['Name', 'Type', 'Contact Name', 'Contact Email', 'Contact Phone', 'Street', 'City', 'State', 'Zip', 'Locations Count'],
            ...customers.map(customer => [
                customer.name,
                customer.type,
                customer.contact.name,
                customer.contact.email,
                customer.contact.phone,
                customer.billingAddress.street,
                customer.billingAddress.city,
                customer.billingAddress.state,
                customer.billingAddress.zip,
                customer.locations.length
            ])
        ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };
    
    return (
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Customer Management</h3>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowImportModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        <Upload size={20} /> Import CSV
                    </button>
                    <button 
                        onClick={exportCustomersToCSV}
                        className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                        <Download size={20} /> Export CSV
                    </button>
                    <button 
                        onClick={() => setIsAddingCustomer(true)} 
                        className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                        <PlusCircle size={20} /> Add New Customer
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {customers.map(customer => (
                    <div key={customer.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h4>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCustomerTypeStyles(customer.type)}`}>{customer.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditingCustomer(customer)} className="text-sm text-blue-600 hover:underline">Edit Details</button>
                                <button onClick={() => setAddingLocationTo(customer)} className="text-sm text-green-600 hover:underline">Add Location</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="text-sm">
                                <p className="font-semibold text-gray-600 dark:text-gray-400">Primary Contact</p>
                                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><User size={14}/> {customer.contact.name}</p>
                                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Mail size={14}/> {customer.contact.email}</p>
                                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Phone size={14}/> {customer.contact.phone}</p>
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-gray-600 dark:text-gray-400">Billing Address</p>
                                <p className="text-gray-700 dark:text-gray-300">{customer.billingAddress.street}</p>
                                <p className="text-gray-700 dark:text-gray-300">{customer.billingAddress.city}, {customer.billingAddress.state} {customer.billingAddress.zip}</p>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                            <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Service Locations ({customer.locations.length})</h5>
                            <div className="pl-4 border-l-2 border-gray-200 dark:border-slate-600 space-y-1">
                                {customer.locations.map((loc, index) => (
                                    <div key={`${loc.name}-${loc.locNum}-${index}`} className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">{loc.name}</span> (#{loc.locNum}) - {loc.city}, {loc.state}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isAddingCustomer && <AddCustomerModal onAddCustomer={onAddCustomer} onClose={() => setIsAddingCustomer(false)} />}
            {editingCustomer && <EditCustomerModal customer={editingCustomer} onUpdateCustomer={onUpdateCustomer} onClose={() => setEditingCustomer(null)} />}
            {addingLocationTo && <AddLocationModal customer={addingLocationTo} onAddLocation={onAddLocation} onClose={() => setAddingLocationTo(null)} />}
            {showImportModal && (
                <CSVImportModal 
                    type="customers"
                    onClose={() => setShowImportModal(false)}
                    onImport={(data) => {
                        data.forEach(customer => onAddCustomer(customer));
                    }}
                />
            )}
        </div>
    );
};

export default CustomerManagementView;