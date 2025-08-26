import React, { useState, useMemo, useEffect } from 'react';
import { X, PlusCircle, Trash2, HardHat, Upload, Smartphone, Calendar } from 'lucide-react';
import { yyyymmddToExcel, formatCurrency } from '../utils/helpers';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

const AddWorkOrderModal = () => {
    const { customers, inventory, technicians, handlers, setIsAddingOrder } = useWorkOrderContext();

    const [clientId, setClientId] = useState('');
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Regular');
    const [clientWorkOrderNumber, setClientWorkOrderNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [lineItems, setLineItems] = useState([{ description: 'NTE', quantity: 1, rate: 75, amount: 75, inventoryId: null, asset: '' }]);
    const selectedClient = useMemo(() => (customers || []).find(c => c.id === clientId), [clientId, customers]);

    // Mobile Integration Fields
    const [assignedTechnicians, setAssignedTechnicians] = useState([]);
    const [scheduleDate, setScheduleDate] = useState('');
    const [expectedAssets, setExpectedAssets] = useState([]);
    const [customExpectedAsset, setCustomExpectedAsset] = useState('');

    // Existing location state
    const [locationIndex, setLocationIndex] = useState(0);
    const [needsLocation, setNeedsLocation] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationNum, setNewLocationNum] = useState('');
    const [newLocationCity, setNewLocationCity] = useState('');
    const [newLocationState, setNewLocationState] = useState('MI');
    
    const [servicedAssets, setServicedAssets] = useState([]);
    const [attachment, setAttachment] = useState(null);

    // Filter technicians with mobile access
    const mobileTechnicians = useMemo(() => 
        (technicians || []).filter(tech => tech.mobileAccess && tech.name !== 'Unassigned'), 
        [technicians]
    );

    useEffect(() => {
        if (customers && customers.length > 0 && !clientId) {
            setClientId(customers[0].id);
        }
    }, [customers, clientId]);

    useEffect(() => {
        if (selectedClient) {
            if (selectedClient.locations?.length > 0) {
                setLocationIndex(0);
                setNeedsLocation(false);
                // Auto-populate expected assets from location assets
                const location = selectedClient.locations[0];
                if (location.assets?.length > 0) {
                    setExpectedAssets(location.assets.map(asset => asset.name));
                }
            } else {
                setLocationIndex(0);
                setNeedsLocation(true);
                setNewLocationName(selectedClient.type === 'Residential' ? 'Primary Residence' : 'Main Location');
                setNewLocationNum(selectedClient.type === 'Residential' ? 'N/A' : '001');
                setNewLocationCity(selectedClient.billingAddress?.city || '');
                setNewLocationState(selectedClient.billingAddress?.state || 'MI');
            }
            setServicedAssets([]);
            setExpectedAssets([]);
        }
    }, [selectedClient]);

    // Update expected assets when location changes
    useEffect(() => {
        if (selectedClient && !needsLocation && selectedClient.locations?.length > 0) {
            const location = selectedClient.locations[locationIndex];
            if (location?.assets?.length > 0) {
                setExpectedAssets(location.assets.map(asset => asset.name));
            } else {
                setExpectedAssets([]);
            }
        }
    }, [locationIndex, selectedClient, needsLocation]);
    
    const onClose = () => {
        setIsAddingOrder(false);
    };

    // Generate work order number
    const generateWorkOrderNumber = () => {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const time = new Date().toTimeString().slice(0, 5).replace(':', '');
        const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        return `WO-${date}-${time}-${random}`;
    };

    const handleAssetToggle = (assetName) => {
        setServicedAssets(prev => 
            prev.includes(assetName) 
                ? prev.filter(name => name !== assetName)
                : [...prev, assetName]
        );
    };

    const handleTechnicianToggle = (techId) => {
        setAssignedTechnicians(prev =>
            prev.includes(techId)
                ? prev.filter(id => id !== techId)
                : [...prev, techId]
        );
    };

    const handleExpectedAssetToggle = (assetName) => {
        setExpectedAssets(prev =>
            prev.includes(assetName)
                ? prev.filter(name => name !== assetName)
                : [...prev, assetName]
        );
    };

    const addCustomExpectedAsset = () => {
        if (customExpectedAsset.trim() && !expectedAssets.includes(customExpectedAsset.trim())) {
            setExpectedAssets(prev => [...prev, customExpectedAsset.trim()]);
            setCustomExpectedAsset('');
        }
    };

    const removeExpectedAsset = (assetName) => {
        setExpectedAssets(prev => prev.filter(name => name !== assetName));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let location;
        if (needsLocation) {
            if (!newLocationName.trim() || !newLocationCity.trim()) {
                return alert('Please fill out the new location name and city.');
            }
            location = { name: newLocationName.trim(), locNum: newLocationNum.trim() || 'N/A', city: newLocationCity.trim(), state: newLocationState.trim(), assets: [] };
        } else {
            location = selectedClient?.locations[locationIndex];
        }

        if (!clientId || !selectedClient || !location || !task.trim()) {
            return alert('Please fill out all required fields, including the task description.');
        }

        // Use client work order number if provided, otherwise generate one
        const workOrderNumber = clientWorkOrderNumber.trim() || generateWorkOrderNumber();

        const orderData = {
            'Work Order #': workOrderNumber,
            'Client WO#': clientWorkOrderNumber.trim() || '',
            Client: selectedClient.name,
            Company: location.name,
            'Loc #': location.locNum,
            Task: task,
            Priority: priority,
            Notes: notes.trim(),
            City: location.city,
            State: location.state,
            lineItems: lineItems,
            servicedAssets: servicedAssets,
            'Order Status': 'Open',
            'Created Date': yyyymmddToExcel(new Date().toISOString().split('T')[0]),
            
            // Mobile Integration Fields
            technician: assignedTechnicians, // Array of technician IDs
            'Schedule Date': scheduleDate || '',
            expectedAssets: expectedAssets, // For mobile app guidance
            Address: `${location.city}, ${location.state}`, // Full address for mobile app
        };

        handlers.addNewOrder(orderData, attachment);
    };

    const addLineItem = () => setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0, inventoryId: null, asset: '' }]);
    const removeLineItem = (index) => { if (lineItems.length > 1) setLineItems(lineItems.filter((_, i) => i !== index)); };
    const handleLineItemChange = (index, field, value) => {
        const updatedItems = [...lineItems];
        const item = updatedItems[index];
        item[field] = value;
        if (field === 'inventoryId') {
            const inventoryItem = (inventory || []).find(i => i.id === value);
            if (inventoryItem) {
                item.description = inventoryItem.name;
                item.rate = inventoryItem.price;
            }
        }
        item.amount = (item.quantity || 0) * (item.rate || 0);
        setLineItems(updatedItems);
    };
    
    if (!customers) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">Loading customer data...</div>
            </div>
        );
    }

    // Fixed asset lookup using direct index
    const currentAssets = useMemo(() => {
        if (needsLocation || !selectedClient || !selectedClient.locations || selectedClient.locations.length === 0) return [];
        const location = selectedClient.locations[locationIndex];
        return location?.assets || [];
    }, [locationIndex, selectedClient, needsLocation]);

    const inputStyles = "w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Work Order</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X size={28} /></button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    <fieldset className="border dark:border-slate-600 p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white">Work Order Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Client</label>
                                <select value={clientId} onChange={(e) => setClientId(e.target.value)} className={inputStyles}>
                                    <option value="">Select a customer...</option>
                                    {(customers || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Task / Issue</label>
                                <input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="e.g., AC not cooling" className={inputStyles} required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Priority</label>
                                <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputStyles}>
                                    <option>Regular</option><option>Low</option><option>Urgent</option><option>Emergency</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                                    Client WO# <span className="text-xs text-gray-500">(optional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={clientWorkOrderNumber} 
                                    onChange={e => setClientWorkOrderNumber(e.target.value)} 
                                    placeholder="Client's work order #" 
                                    className={inputStyles}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Leave blank to auto-generate
                                </p>
                            </div>
                        </div>
                    </fieldset>

                    {/* Mobile Technician Assignment */}
                    <fieldset className="border border-blue-300 dark:border-blue-600 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white flex items-center gap-2">
                            <Smartphone size={20} />
                            Mobile Technician Assignment
                        </legend>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                                    Assign to Mobile Technicians ({assignedTechnicians.length} selected)
                                </label>
                                {mobileTechnicians.length === 0 ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                                        No technicians with mobile access found. 
                                        <br />
                                        Add technicians with mobile access in Technician Management.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {mobileTechnicians.map(tech => (
                                            <label key={tech.id} className="flex items-center gap-2 p-3 border dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                                                <input 
                                                    type="checkbox" 
                                                    checked={assignedTechnicians.includes(tech.id)}
                                                    onChange={() => handleTechnicianToggle(tech.id)}
                                                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                                />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {tech.status} • {tech.email}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1 flex items-center gap-2">
                                    <Calendar size={16} />
                                    Schedule Date (Optional)
                                </label>
                                <input 
                                    type="datetime-local"
                                    value={scheduleDate}
                                    onChange={e => setScheduleDate(e.target.value)}
                                    className={inputStyles}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Technicians will see this scheduled date in their mobile app
                                </p>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border dark:border-slate-600 p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white">Service Location</legend>
                        {selectedClient && !needsLocation ? (
                             <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mt-2 mb-1">Select Location</label>
                                <select 
                                    value={locationIndex} 
                                    onChange={e => setLocationIndex(parseInt(e.target.value))} 
                                    className={inputStyles}
                                >
                                    {(selectedClient.locations || []).map((loc, index) => (
                                        <option key={index} value={index}>
                                            {loc.name} (#{loc.locNum}) - {loc.city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                                <div><label className="text-xs text-gray-500 dark:text-gray-400">Location Name</label><input value={newLocationName} onChange={e=>setNewLocationName(e.target.value)} type="text" className={inputStyles} /></div>
                                <div><label className="text-xs text-gray-500 dark:text-gray-400">Location #</label><input value={newLocationNum} onChange={e=>setNewLocationNum(e.target.value)} type="text" className={inputStyles} /></div>
                                <div><label className="text-xs text-gray-500 dark:text-gray-400">City</label><input value={newLocationCity} onChange={e=>setNewLocationCity(e.target.value)} type="text" className={inputStyles} /></div>
                                <div><label className="text-xs text-gray-500 dark:text-gray-400">State</label><input value={newLocationState} onChange={e=>setNewLocationState(e.target.value)} type="text" className={inputStyles} /></div>
                            </div>
                        )}
                    </fieldset>

                    {/* Expected Assets for Mobile App */}
                    <fieldset className="border border-green-300 dark:border-green-600 p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white flex items-center gap-2">
                            <HardHat size={20} />
                            Expected Assets for Mobile App
                        </legend>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            These assets will be suggested to technicians in the mobile app to help guide their service work.
                        </p>
                        
                        {/* Auto-populated from location */}
                        {currentAssets.length > 0 && (
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                                    Assets from Location
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {currentAssets.map((asset, index) => (
                                        <label key={index} className="flex items-center gap-2 p-2 border dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                                            <input 
                                                type="checkbox" 
                                                checked={expectedAssets.includes(asset.name)}
                                                onChange={() => handleExpectedAssetToggle(asset.name)}
                                                className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{asset.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom expected assets */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                                Add Custom Expected Asset
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    type="text"
                                    value={customExpectedAsset}
                                    onChange={e => setCustomExpectedAsset(e.target.value)}
                                    placeholder="e.g., Rooftop Unit #1, Boiler System"
                                    className={`${inputStyles} flex-1`}
                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomExpectedAsset())}
                                />
                                <button 
                                    type="button" 
                                    onClick={addCustomExpectedAsset}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {/* Selected expected assets */}
                        {expectedAssets.length > 0 && (
                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                                    Expected Assets ({expectedAssets.length})
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {expectedAssets.map((asset, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm">
                                            {asset}
                                            <button 
                                                type="button"
                                                onClick={() => removeExpectedAsset(asset)}
                                                className="hover:text-green-600 dark:hover:text-green-300"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </fieldset>

                    {/* Assets Being Serviced (existing) */}
                    {currentAssets.length > 0 && (
                        <fieldset className="border dark:border-slate-600 p-4 rounded-lg">
                            <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white">Assets Being Serviced</legend>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {currentAssets.map((asset, index) => (
                                    <label key={index} className="flex items-center gap-2 p-2 border dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                                        <input 
                                            type="checkbox" 
                                            checked={servicedAssets.includes(asset.name)}
                                            onChange={() => handleAssetToggle(asset.name)}
                                            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{asset.name} ({asset.type})</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    )}
                    
                    <fieldset className="border dark:border-slate-600 p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white">Attachments</legend>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Upload PDF Form or Checklist</label>
                            <div className="mt-2 flex items-center gap-4">
                                <input 
                                    type="file" 
                                    accept=".pdf"
                                    onChange={(e) => setAttachment(e.target.files[0])}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {attachment && <span className="text-sm text-gray-500 dark:text-gray-400">{attachment.name}</span>}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border dark:border-slate-600 p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white">Line Items</legend>
                        <div className="space-y-2 mt-2">
                            {lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                    <select className={`col-span-3 ${inputStyles}`} value={item.inventoryId || ''} onChange={e => handleLineItemChange(index, 'inventoryId', e.target.value)}>
                                        <option value="">-- Custom Item --</option>
                                        {(inventory || []).map(inv => <option key={inv.id} value={inv.id}>{inv.name}</option>)}
                                    </select>
                                    <input type="text" placeholder="Description" value={item.description} onChange={e => handleLineItemChange(index, 'description', e.target.value)} className={`col-span-4 ${inputStyles}`} />
                                    <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', parseFloat(e.target.value))} className={`col-span-1 ${inputStyles}`} />
                                    <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleLineItemChange(index, 'rate', parseFloat(e.target.value))} className={`col-span-2 ${inputStyles}`} />
                                    <div className="col-span-1 p-2 text-right font-mono dark:text-gray-300">{formatCurrency(item.amount)}</div>
                                    <button type="button" onClick={() => removeLineItem(index)} className="col-span-1 text-red-500 hover:text-red-700 disabled:opacity-50" disabled={lineItems.length <= 1}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addLineItem} className="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"><PlusCircle size={16} /> Add Line Item</button>
                    </fieldset>

                    <fieldset className="border dark:border-slate-600 p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-800 dark:text-white">Notes</legend>
                        <div className="mt-2">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                                Additional Information
                            </label>
                            <textarea
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Add any additional notes, special instructions, or observations..."
                                rows={4}
                                className={`${inputStyles} resize-vertical min-h-[100px]`}
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 mt-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {assignedTechnicians.length > 0 && (
                                <span className="flex items-center gap-1">
                                    <Smartphone size={16} />
                                    {assignedTechnicians.length} mobile technician(s) will receive this work order
                                </span>
                            )}
                        </div>
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            disabled={!clientId || !task.trim()}
                        >
                            Create Work Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddWorkOrderModal;
