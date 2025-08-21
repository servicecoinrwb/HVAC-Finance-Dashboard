import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, PlusCircle, Trash2, Building, HardHat, ChevronDown, Edit } from 'lucide-react';
// 1. Import the context hook
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// --- Utility Functions ---
const getCustomerTypeStyles = (t) => ({
    'national account': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    'commercial': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
    'residential': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    'maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
}[t?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200');


// --- Modals ---
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
    const [assetType, setAssetType] = useState('HVAC Unit');
    const [customAssetType, setCustomAssetType] = useState('');
    const [brand, setBrand] = useState('Trane');
    const [customBrand, setCustomBrand] = useState('');
    const [model, setModel] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [installDate, setInstallDate] = useState('');
    const [filters, setFilters] = useState([{ size: '', quantity: 1 }]);
    const [driveType, setDriveType] = useState('DD');
    const [economizer, setEconomizer] = useState(false);

    const commonBrands = ['Trane', 'Carrier', 'Lennox', 'Goodman', 'Rheem', 'York', 'Other'];
    const commonAssetTypes = ['HVAC Unit', 'Rooftop Unit', 'Furnace', 'Air Conditioner', 'Heat Pump', 'Boiler', 'Other'];

    const handleFilterChange = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    };
    const addFilter = () => setFilters([...filters, { size: '', quantity: 1 }]);
    const removeFilter = (index) => setFilters(filters.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        const newAsset = {
            name,
            type: assetType === 'Other' ? customAssetType : assetType,
            brand: brand === 'Other' ? customBrand : brand,
            model, serialNumber, installDate,
            filters: filters.filter(f => f.size.trim()),
            driveType,
            economizer
        };
        onAddAsset(customer, locationIndex, newAsset);
        onClose();
    };

    const inputStyles = "w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Asset</h2></div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Asset Name</label><input type="text" placeholder="e.g., Rooftop Unit 1" value={name} onChange={e => setName(e.target.value)} className={inputStyles} required /></div>
                        <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Asset Type</label><select value={assetType} onChange={e => setAssetType(e.target.value)} className={inputStyles}>{commonAssetTypes.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                        {assetType === 'Other' && <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Custom Asset Type</label><input type="text" value={customAssetType} onChange={e => setCustomAssetType(e.target.value)} className={inputStyles} /></div>}
                        <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Brand</label><select value={brand} onChange={e => setBrand(e.target.value)} className={inputStyles}>{commonBrands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                        {brand === 'Other' && <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Custom Brand</label><input type="text" value={customBrand} onChange={e => setCustomBrand(e.target.value)} className={inputStyles} /></div>}
                        <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Model</label><input type="text" value={model} onChange={e => setModel(e.target.value)} className={inputStyles} /></div>
                        <div className="md:col-span-2"><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Serial Number</label><input type="text" value={serialNumber} onChange={e => setSerialNumber(e.target.value)} className={inputStyles} /></div>
                        <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Install Date</label><input type="date" value={installDate} onChange={e => setInstallDate(e.target.value)} className={inputStyles} /></div>
                    </div>
                    <div className="pt-4 border-t dark:border-slate-600">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Filters</h4>
                        {filters.map((filter, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input type="text" placeholder="Size (e.g., 20x20x1)" value={filter.size} onChange={e => handleFilterChange(index, 'size', e.target.value)} className="flex-grow p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" />
                                <input type="number" value={filter.quantity} onChange={e => handleFilterChange(index, 'quantity', parseInt(e.target.value) || 1)} className="w-20 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700" />
                                <button type="button" onClick={() => removeFilter(index)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={addFilter} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Add Filter</button>
                    </div>
                    <div className="pt-4 border-t dark:border-slate-600 grid grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Drive Type</label><select value={driveType} onChange={e => setDriveType(e.target.value)} className={inputStyles}><option>DD</option><option>Belt Drive</option></select></div>
                        <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="economizer" checked={economizer} onChange={e => setEconomizer(e.target.checked)} className="h-4 w-4" /><label htmlFor="economizer" className="text-sm font-medium text-gray-600 dark:text-gray-400">Has Economizer</label></div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4"><button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button><button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700">Add Asset</button></div>
            </form>
        </div>
    );
};

const EditAssetModal = ({ asset, customer, locationIndex, assetIndex, onClose, onUpdateAsset }) => {
    const [formData, setFormData] = useState(asset);
    
    const [assetType, setAssetType] = useState(asset.type);
    const [customAssetType, setCustomAssetType] = useState('');
    const [brand, setBrand] = useState(asset.brand);
    const [customBrand, setCustomBrand] = useState('');
    const [filters, setFilters] = useState(asset.filters || [{ size: '', quantity: 1 }]);

    const commonBrands = ['Trane', 'Carrier', 'Lennox', 'Goodman', 'Rheem', 'York', 'Other'];
    const commonAssetTypes = ['HVAC Unit', 'Rooftop Unit', 'Furnace', 'Air Conditioner', 'Heat Pump', 'Boiler', 'Other'];

    useEffect(() => {
        if (!commonAssetTypes.includes(asset.type)) {
            setAssetType('Other');
            setCustomAssetType(asset.type);
        }
        if (!commonBrands.includes(asset.brand)) {
            setBrand('Other');
            setCustomBrand(asset.brand);
        }
    }, [asset]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleFilterChange = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    };
    const addFilter = () => setFilters([...filters, { size: '', quantity: 1 }]);
    const removeFilter = (index) => setFilters(filters.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAsset = {
            ...formData,
            type: assetType === 'Other' ? customAssetType : assetType,
            brand: brand === 'Other' ? customBrand : brand,
            filters: filters.filter(f => f.size.trim()),
        };
        onUpdateAsset(customer, locationIndex, assetIndex, updatedAsset);
        onClose();
    };

    const inputStyles = "w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Asset</h2></div>
                <div className="p-6 overflow-y-auto space-y-4">
                    {/* ... (form fields similar to AddAssetModal, but using formData) ... */}
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};


export const CustomerManagementView = () => {
    const { customers, handlers } = useWorkOrderContext();
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [addingLocationTo, setAddingLocationTo] = useState(null);
    const [addingAssetTo, setAddingAssetTo] = useState(null);
    const [editingAsset, setEditingAsset] = useState(null); // { customer, locationIndex, assetIndex }
    const [expandedCustomers, setExpandedCustomers] = useState(new Set());
    const [expandedLocations, setExpandedLocations] = useState({});

    const toggleCustomerExpansion = (customerId) => {
        const newSet = new Set(expandedCustomers);
        if (newSet.has(customerId)) newSet.delete(customerId);
        else newSet.add(customerId);
        setExpandedCustomers(newSet);
    };

    const toggleLocationExpansion = (customerId, locationIndex) => {
        setExpandedLocations(prev => {
            const customerLocations = new Set(prev[customerId]);
            if (customerLocations.has(locationIndex)) customerLocations.delete(locationIndex);
            else customerLocations.add(locationIndex);
            return { ...prev, [customerId]: customerLocations };
        });
    };

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
        location.assets = [...(location.assets || []), newAsset];
        handlers.updateCustomer({ ...customer, locations: updatedLocations });
    };

    const handleUpdateAsset = (customer, locationIndex, assetIndex, updatedAsset) => {
        const updatedLocations = [...customer.locations];
        updatedLocations[locationIndex].assets[assetIndex] = updatedAsset;
        handlers.updateCustomer({ ...customer, locations: updatedLocations });
    };

    const handleDeleteAsset = (customer, locationIndex, assetIndex) => {
        if(window.confirm("Are you sure you want to delete this asset?")) {
            const updatedLocations = [...customer.locations];
            updatedLocations[locationIndex].assets.splice(assetIndex, 1);
            handlers.updateCustomer({ ...customer, locations: updatedLocations });
        }
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
                {customers.map(customer => {
                    const isExpanded = expandedCustomers.has(customer.id);
                    return (
                        <div key={customer.id} className="border border-gray-200 dark:border-slate-700 rounded-lg">
                            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50" onClick={() => toggleCustomerExpansion(customer.id)}>
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h3>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCustomerTypeStyles(customer.type)}`}>{customer.type}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => setEditingCustomer(customer)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                                        <button onClick={() => setAddingLocationTo(customer)} className="text-sm text-green-600 dark:text-green-400 hover:underline">Add Location</button>
                                        <button onClick={() => { if(window.confirm('Delete this customer and all their locations?')) handlers.deleteCustomer(customer.id) }} className="text-sm text-red-600 dark:text-red-400 hover:underline">Delete Customer</button>
                                    </div>
                                    <ChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="p-4 border-t dark:border-slate-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-sm"><p className="font-semibold text-gray-600 dark:text-gray-400">Primary Contact</p><p className="flex items-center gap-2 text-gray-800 dark:text-gray-300"><User size={14}/> {customer.contact?.name}</p><p className="flex items-center gap-2 text-gray-800 dark:text-gray-300"><Mail size={14}/> {customer.contact?.email}</p><p className="flex items-center gap-2 text-gray-800 dark:text-gray-300"><Phone size={14}/> {customer.contact?.phone}</p></div>
                                        <div className="text-sm"><p className="font-semibold text-gray-600 dark:text-gray-400">Billing Address</p><p className="text-gray-800 dark:text-gray-300">{customer.billingAddress?.street}</p><p className="text-gray-800 dark:text-gray-300">{customer.billingAddress?.city}, {customer.billingAddress?.state} {customer.billingAddress?.zip}</p></div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t dark:border-slate-600">
                                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Service Locations ({(customer.locations || []).length})</h4>
                                        <div className="space-y-3">
                                            {(customer.locations || []).map((loc, index) => {
                                                const isLocationExpanded = expandedLocations[customer.id]?.has(index);
                                                return (
                                                <div key={index} className="pl-4 border-l-2 border-slate-200 dark:border-slate-600 py-2">
                                                    <div className="flex justify-between items-start cursor-pointer" onClick={() => toggleLocationExpansion(customer.id, index)}>
                                                        <div className="flex items-center gap-2">
                                                            <ChevronDown className={`transition-transform ${isLocationExpanded ? 'rotate-180' : ''}`} size={16} />
                                                            <div>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"><Building size={14} /> {loc.name} (#{loc.locNum})</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">{loc.street}, {loc.city}, {loc.state} {loc.zip}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                                            <button onClick={() => setAddingAssetTo({ customer, locationIndex: index })} className="text-xs text-green-600 dark:text-green-400 hover:underline">Add Asset</button>
                                                            <button onClick={() => handleDeleteLocation(customer, index)} className="text-xs text-red-600 dark:text-red-400 hover:underline">Delete</button>
                                                        </div>
                                                    </div>
                                                    {isLocationExpanded && (
                                                        <div className="mt-2 pl-6">
                                                            <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400">Assets ({(loc.assets || []).length})</h5>
                                                            <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-600 space-y-1 mt-1">
                                                                {(loc.assets || []).map((asset, assetIndex) => (
                                                                    <div key={assetIndex} className="text-xs text-gray-600 dark:text-gray-400 flex justify-between items-start">
                                                                        <div>
                                                                            <p className="flex items-center gap-2 font-semibold"><HardHat size={12} /> {asset.name} ({asset.type})</p>
                                                                            <ul className="pl-5 list-disc text-gray-500 dark:text-gray-500">
                                                                                <li>Brand: {asset.brand}, Model: {asset.model}, S/N: {asset.serialNumber}</li>
                                                                                <li>Installed: {asset.installDate}</li>
                                                                                <li>Filters: {(asset.filters || []).map(f => `${f.quantity}x ${f.size}`).join(', ') || 'N/A'}</li>
                                                                                <li>Drive: {asset.driveType}, Economizer: {asset.economizer ? 'Yes' : 'No'}</li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                                                            <button onClick={() => setEditingAsset({ customer, locationIndex: index, assetIndex: assetIndex, asset: asset })} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                                                                            <button onClick={() => handleDeleteAsset(customer, index, assetIndex)} className="text-xs text-red-600 dark:text-red-400 hover:underline">Delete</button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {!(loc.assets || []).length && <p className="text-xs text-gray-400 dark:text-gray-500 italic">No assets recorded.</p>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )})}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            {isAddingCustomer && <AddCustomerModal onAddCustomer={handlers.addCustomer} onClose={() => setIsAddingCustomer(false)} />}
            {editingCustomer && <EditCustomerModal customer={editingCustomer} onUpdateCustomer={handlers.updateCustomer} onClose={() => setEditingCustomer(null)} />}
            {addingLocationTo && <AddLocationModal customer={addingLocationTo} onAddLocation={handleAddLocation} onClose={() => setAddingLocationTo(null)} />}
            {addingAssetTo && <AddAssetModal customer={addingAssetTo.customer} locationIndex={addingAssetTo.locationIndex} onAddAsset={handleAddAsset} onClose={() => setAddingAssetTo(null)} />}
            {editingAsset && <EditAssetModal asset={editingAsset.asset} customer={editingAsset.customer} locationIndex={editingAsset.locationIndex} assetIndex={editingAsset.assetIndex} onUpdateAsset={handleUpdateAsset} onClose={() => setEditingAsset(null)} />}
        </div>
    );
};    