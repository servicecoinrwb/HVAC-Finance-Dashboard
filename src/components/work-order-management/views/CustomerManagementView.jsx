import React, { useState } from 'react';
import { User, Mail, Phone, PlusCircle, Trash2, Building, HardHat } from 'lucide-react';
// 1. Import the context hook
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// --- Utility Functions ---
// 2. Updated styling function with dark mode support
const getCustomerTypeStyles = (t) => ({
    'national account': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    'commercial': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
    'residential': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    'maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
}[t?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200');


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
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Customer</h2></div><div className="p-6 overflow-y-auto space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div></div><div className="pt-4 border-t dark:border-slate-600"><h3 className="font-semibold text-gray-800 dark:text-white">Primary Contact</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs text-gray-500 dark:text-gray-400">Name</label><input value={contactName} onChange={e=>setContactName(e.target.value)} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">Email</label><input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} type="email" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">Phone</label><input value={contactPhone} onChange={e=>setContactPhone(e.target.value)} type="tel" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div></div></div><div className="pt-4 border-t dark:border-slate-600"><h3 className="font-semibold text-gray-800 dark:text-white">Billing Address</h3><div className="mt-2"><label className="text-xs text-gray-500 dark:text-gray-400">Street</label><input value={street} onChange={e=>setStreet(e.target.value)} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs text-gray-500 dark:text-gray-400">City</label><input value={city} onChange={e=>setCity(e.target.value)} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">State</label><input value={state} onChange={e=>setState(e.target.value)} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">Zip</label><input value={zip} onChange={e=>setZip(e.target.value)} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div></div></div></div><div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Save Customer</button></div></form></div>);
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
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"><div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Customer</h2></div><div className="p-6 overflow-y-auto space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required /></div><div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Customer Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"><option>Commercial</option><option>Residential</option><option>National Account</option><option>Maintenance</option></select></div></div><div className="pt-4 border-t dark:border-slate-600"><h3 className="font-semibold text-gray-800 dark:text-white">Primary Contact</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs text-gray-500 dark:text-gray-400">Name</label><input name="name" value={formData.contact.name} onChange={e => handleChange(e, 'contact')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">Email</label><input name="email" value={formData.contact.email} onChange={e => handleChange(e, 'contact')} type="email" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">Phone</label><input name="phone" value={formData.contact.phone} onChange={e => handleChange(e, 'contact')} type="tel" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div></div></div><div className="pt-4 border-t dark:border-slate-600"><h3 className="font-semibold text-gray-800 dark:text-white">Billing Address</h3><div className="mt-2"><label className="text-xs text-gray-500 dark:text-gray-400">Street</label><input name="street" value={formData.billingAddress.street} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"><div><label className="text-xs text-gray-500 dark:text-gray-400">City</label><input name="city" value={formData.billingAddress.city} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">State</label><input name="state" value={formData.billingAddress.state} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div><div><label className="text-xs text-gray-500 dark:text-gray-400">Zip</label><input name="zip" value={formData.billingAddress.zip} onChange={e => handleChange(e, 'billingAddress')} type="text" className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" /></div></div></div></div><div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button></div></form></div>);
};

const AddLocationModal = ({ customer, onClose, onAddLocation }) => {
    const [name, setName] = useState('');
    const [locNum, setLocNum] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('MI');
    const [zip, setZip] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) { alert("Location name cannot be empty."); return; } onAddLocation(customer, { name, locNum, street, city, state, zip, assets: [] }); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg"><div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Location to {customer.name}</h2></div><div className="p-6 space-y-4 overflow-y-auto"><input type="text" placeholder="Location Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required /><input type="text" placeholder="Location #" value={locNum} onChange={e => setLocNum(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /><input type="text" placeholder="Street Address" value={street} onChange={e => setStreet(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /><div className="grid grid-cols-3 gap-4"><input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /><input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /><input type="text" placeholder="Zip Code" value={zip} onChange={e => setZip(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></div></div><div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Location</button></div></form></div>);
};

const AddAssetModal = ({ customer, locationIndex, onClose, onAddAsset }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [installDate, setInstallDate] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (!name.trim()) return; onAddAsset(customer, locationIndex, { name, type, installDate }); onClose(); };
    return (<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"><form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md"><div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Asset</h2></div><div className="p-6 space-y-4"><input type="text" placeholder="Asset Name (e.g., Rooftop Unit 1)" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required /><input type="text" placeholder="Asset Type (e.g., HVAC Unit)" value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /><input type="date" value={installDate} onChange={e => setInstallDate(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></div><div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Asset</button></div></form></div>);
};


export const CustomerManagementView = () => {
    const { customers, handlers } = useWorkOrderContext();
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [addingLocationTo, setAddingLocationTo] = useState(null);
    const [addingAssetTo, setAddingAssetTo] = useState(null); // { customer, locationIndex }

    const handleAddLocation = (customer, newLocation) => {
        const updatedLocations = [...(customer.locations || []), newLocation];
        handlers.updateCustomer({ ...customer, locations: updatedLocations });
    };
    
    const handleDeleteLocation = (customer, locationIndex) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            const updatedLocations = customer.locations.filter((_, index) => index !== locationIndex);
            handlers.updateCustomer({ ...customer, locations: updatedLocations });
        }
    };

    const handleAddAsset = (customer, locationIndex, newAsset) => {
        const updatedLocations = [...customer.locations];
        const location = updatedLocations[locationIndex];
        const updatedAssets = [...(location.assets || []), newAsset];
        location.assets = updatedAssets;
        handlers.updateCustomer({ ...customer, locations: updatedLocations });
    };
    
    if (!customers) {
        return <div className="p-6">Loading customer data...</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Management</h2>
                <button onClick={() => setIsAddingCustomer(true)} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><PlusCircle size={20} /> Add New Customer</button>
            </div>
            <div className="space-y-4">
                {customers.map(customer => (
                    <div key={customer.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h3>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCustomerTypeStyles(customer.type)}`}>{customer.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditingCustomer(customer)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                                <button onClick={() => setAddingLocationTo(customer)} className="text-sm text-green-600 dark:text-green-400 hover:underline">Add Location</button>
                                <button onClick={() => { if(window.confirm('Delete this customer and all their locations?')) handlers.deleteCustomer(customer.id) }} className="text-sm text-red-600 dark:text-red-400 hover:underline">Delete Customer</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="text-sm"><p className="font-semibold text-gray-600 dark:text-gray-400">Primary Contact</p><p className="flex items-center gap-2 text-gray-800 dark:text-gray-300"><User size={14}/> {customer.contact?.name}</p><p className="flex items-center gap-2 text-gray-800 dark:text-gray-300"><Mail size={14}/> {customer.contact?.email}</p><p className="flex items-center gap-2 text-gray-800 dark:text-gray-300"><Phone size={14}/> {customer.contact?.phone}</p></div>
                            <div className="text-sm"><p className="font-semibold text-gray-600 dark:text-gray-400">Billing Address</p><p className="text-gray-800 dark:text-gray-300">{customer.billingAddress?.street}</p><p className="text-gray-800 dark:text-gray-300">{customer.billingAddress?.city}, {customer.billingAddress?.state} {customer.billingAddress?.zip}</p></div>
                        </div>
                        <div className="mt-3 pt-3 border-t dark:border-slate-600">
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Service Locations ({(customer.locations || []).length})</h4>
                            <div className="space-y-3">
                                {(customer.locations || []).map((loc, index) => (
                                    <div key={index} className="pl-4 border-l-2 border-slate-200 dark:border-slate-600 py-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"><Building size={14} /> {loc.name} (#{loc.locNum})</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">{loc.street}, {loc.city}, {loc.state} {loc.zip}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setAddingAssetTo({ customer, locationIndex: index })} className="text-xs text-green-600 dark:text-green-400 hover:underline">Add Asset</button>
                                                <button onClick={() => handleDeleteLocation(customer, index)} className="text-xs text-red-600 dark:text-red-400 hover:underline">Delete</button>
                                            </div>
                                        </div>
                                        <div className="mt-2 pl-6">
                                            <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400">Assets ({(loc.assets || []).length})</h5>
                                            <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-600 space-y-1 mt-1">
                                                {(loc.assets || []).map((asset, assetIndex) => (
                                                    <div key={assetIndex} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                        <HardHat size={12} /> <span>{asset.name} ({asset.type}) - Installed: {asset.installDate}</span>
                                                    </div>
                                                ))}
                                                {!(loc.assets || []).length && <p className="text-xs text-gray-400 dark:text-gray-500 italic">No assets recorded.</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isAddingCustomer && <AddCustomerModal onAddCustomer={handlers.addCustomer} onClose={() => setIsAddingCustomer(false)} />}
            {editingCustomer && <EditCustomerModal customer={editingCustomer} onUpdateCustomer={handlers.updateCustomer} onClose={() => setEditingCustomer(null)} />}
            {addingLocationTo && <AddLocationModal customer={addingLocationTo} onAddLocation={handleAddLocation} onClose={() => setAddingLocationTo(null)} />}
            {addingAssetTo && <AddAssetModal customer={addingAssetTo.customer} locationIndex={addingAssetTo.locationIndex} onAddAsset={handleAddAsset} onClose={() => setAddingAssetTo(null)} />}
        </div>
    );
};
