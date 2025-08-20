import React, { useState } from 'react';
import { User, Mail, Phone, PlusCircle } from 'lucide-react';

// --- Utility Functions ---
const getCustomerTypeStyles = (t) => ({'national account':'bg-blue-100 text-blue-800','commercial':'bg-purple-100 text-purple-800','residential':'bg-green-100 text-green-800','maintenance':'bg-yellow-100 text-yellow-800',}[t?.toLowerCase()] || 'bg-gray-100 text-gray-800');

// --- Modals (included for simplicity, can be moved to own files) ---
const AddCustomerModal = ({ onClose, onAddCustomer }) => {
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
        if (!name.trim()) { alert("Customer name cannot be empty."); return; }
        onAddCustomer({ name, type, contact: { name: contactName, email: contactEmail, phone: contactPhone }, billingAddress: { street, city, state, zip }, locations: [] });
        onClose();
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2></div><div className="p-6 overflow-y-auto space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Primary Contact</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">Name</label><input value={contactName} onChange={e=>setContactName(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Email</label><input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} type="email" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Phone</label><input value={contactPhone} onChange={e=>setContactPhone(e.target.value)} type="tel" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Billing Address</h3><div className="mt-2"><label className="text-xs">Street</label><input value={street} onChange={e=>setStreet(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">City</label><input value={city} onChange={e=>setCity(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">State</label><input value={state} onChange={e=>setState(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Zip</label><input value={zip} onChange={e=>setZip(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Customer</button></div></form></div>);
};

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
    const handleSubmit = (e) => { e.preventDefault(); onUpdateCustomer(formData); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Edit Customer</h2></div><div className="p-6 overflow-y-auto space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Customer Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Primary Contact</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">Name</label><input name="name" value={formData.contact.name} onChange={e => handleChange(e, 'contact')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Email</label><input name="email" value={formData.contact.email} onChange={e => handleChange(e, 'contact')} type="email" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Phone</label><input name="phone" value={formData.contact.phone} onChange={e => handleChange(e, 'contact')} type="tel" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="pt-4 border-t"><h3 className="font-semibold">Billing Address</h3><div className="mt-2"><label className="text-xs">Street</label><input name="street" value={formData.billingAddress.street} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs">City</label><input name="city" value={formData.billingAddress.city} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">State</label><input name="state" value={formData.billingAddress.state} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-xs">Zip</label><input name="zip" value={formData.billingAddress.zip} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button></div></form></div>);
};

const AddLocationModal = ({ customer, onClose, onAddLocation }) => {
    const [name, setName] = useState('');
    const [locNum, setLocNum] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) { alert("Location name cannot be empty."); return; } onAddLocation(customer.id, { name, locNum, city, state }); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Add Location to {customer.name}</h2></div><div className="p-6 space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Location Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">Location #</label><input type="text" value={locNum} onChange={e => setLocNum(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">City</label><input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label className="text-sm font-medium text-gray-600 block mb-1">State</label><input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" /></div></div></div><div className="p-6 bg-gray-50 border-t flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Location</button></div></form></div>);
};

export const CustomerManagementView = ({ customers, onAddCustomer, onUpdateCustomer, onAddLocation }) => {
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [addingLocationTo, setAddingLocationTo] = useState(null);
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
                <button onClick={() => setIsAddingCustomer(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Add New Customer</button>
            </div>
            <div className="space-y-4">
                {customers.map(customer => (
                    <div key={customer.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCustomerTypeStyles(customer.type)}`}>{customer.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditingCustomer(customer)} className="text-sm text-blue-600 hover:underline">Edit Details</button>
                                <button onClick={() => setAddingLocationTo(customer)} className="text-sm text-green-600 hover:underline">Add Location</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="text-sm"><p className="font-semibold text-gray-600">Primary Contact</p><p className="flex items-center gap-2"><User size={14}/> {customer.contact.name}</p><p className="flex items-center gap-2"><Mail size={14}/> {customer.contact.email}</p><p className="flex items-center gap-2"><Phone size={14}/> {customer.contact.phone}</p></div>
                            <div className="text-sm"><p className="font-semibold text-gray-600">Billing Address</p><p>{customer.billingAddress.street}</p><p>{customer.billingAddress.city}, {customer.billingAddress.state} {customer.billingAddress.zip}</p></div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">Service Locations ({customer.locations.length})</h4>
                            <div className="pl-4 border-l-2 space-y-1">{customer.locations.map((loc, index) => (<div key={`${loc.name}-${loc.locNum}-${index}`} className="text-sm text-gray-700"><span className="font-semibold">{loc.name}</span> (#{loc.locNum}) - {loc.city}, {loc.state}</div>))}</div>
                        </div>
                    </div>
                ))}
            </div>
            {isAddingCustomer && <AddCustomerModal onAddCustomer={onAddCustomer} onClose={() => setIsAddingCustomer(false)} />}
            {editingCustomer && <EditCustomerModal customer={editingCustomer} onUpdateCustomer={onUpdateCustomer} onClose={() => setEditingCustomer(null)} />}
            {addingLocationTo && <AddLocationModal customer={addingLocationTo} onAddLocation={onAddLocation} onClose={() => setAddingLocationTo(null)} />}
        </div>
    );
};