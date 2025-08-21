import React, { useState, useMemo, useEffect } from 'react';
import { X, PlusCircle, Trash2, HardHat } from 'lucide-react';
import { yyyymmddToExcel, formatCurrency } from '../utils/helpers';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

const AddWorkOrderModal = () => {
    const { customers, inventory, handlers, setIsAddingOrder } = useWorkOrderContext();

    const [clientId, setClientId] = useState('');
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Regular');
    const [lineItems, setLineItems] = useState([{ description: 'General Labor', quantity: 1, rate: 75, amount: 75, inventoryId: null }]);
    const selectedClient = useMemo(() => (customers || []).find(c => c.id === clientId), [clientId, customers]);

    const [locationIdentifier, setLocationIdentifier] = useState('');
    const [needsLocation, setNeedsLocation] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationNum, setNewLocationNum] = useState('');
    const [newLocationCity, setNewLocationCity] = useState('');
    const [newLocationState, setNewLocationState] = useState('MI');
    
    const [servicedAssets, setServicedAssets] = useState([]);

    useEffect(() => {
        if (customers && customers.length > 0 && !clientId) {
            setClientId(customers[0].id);
        }
    }, [customers, clientId]);

    useEffect(() => {
        if (selectedClient) {
            if (selectedClient.locations?.length > 0) {
                const loc = selectedClient.locations[0];
                setLocationIdentifier(`${loc.name}-${loc.locNum}-0`);
                setNeedsLocation(false);
            } else {
                setLocationIdentifier('');
                setNeedsLocation(true);
                setNewLocationName(selectedClient.type === 'Residential' ? 'Primary Residence' : 'Main Location');
                setNewLocationNum(selectedClient.type === 'Residential' ? 'N/A' : '001');
                setNewLocationCity(selectedClient.billingAddress?.city || '');
                setNewLocationState(selectedClient.billingAddress?.state || 'MI');
            }
            setServicedAssets([]); 
        }
    }, [selectedClient]);
    
    const onClose = () => {
        setIsAddingOrder(false);
    };

    const handleAssetToggle = (assetName) => {
        setServicedAssets(prev => 
            prev.includes(assetName) 
                ? prev.filter(name => name !== assetName)
                : [...prev, assetName]
        );
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
            const [company, locNum] = locationIdentifier.split('-').slice(0, 2);
            location = selectedClient?.locations.find(l => l.name === company && l.locNum === locNum);
        }

        if (!clientId || !selectedClient || !location || !task.trim()) {
            return alert('Please fill out all required fields, including the task description.');
        }

        const orderData = {
            Client: selectedClient.name,
            Company: location.name,
            'Loc #': location.locNum,
            Task: task,
            Priority: priority,
            City: location.city,
            State: location.state,
            lineItems: lineItems,
            servicedAssets: servicedAssets,
            'Order Status': 'Open',
            'Created Date': yyyymmddToExcel(new Date().toISOString().split('T')[0]),
        };
        handlers.addNewOrder(orderData);
    };

    const addLineItem = () => setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0, inventoryId: null }]);
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

    const currentAssets = useMemo(() => {
        if (needsLocation || !selectedClient || !locationIdentifier) return [];
        const [company, locNum] = locationIdentifier.split('-').slice(0, 2);
        const location = selectedClient?.locations.find(l => l.name === company && l.locNum === locNum);
        return location?.assets || [];
    }, [locationIdentifier, selectedClient, needsLocation]);

    const inputStyles = "w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Work Order</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X size={28} /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* --- Main Details --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    </div>

                    {/* --- Location Details --- */}
                    <div className="pt-4 border-t dark:border-slate-600">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Service Location</h3>
                        {selectedClient && !needsLocation ? (
                             <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mt-2 mb-1">Select Location</label>
                                <select value={locationIdentifier} onChange={e => setLocationIdentifier(e.target.value)} className={inputStyles}>
                                    {(selectedClient.locations || []).map((loc, index) => <option key={index} value={`${loc.name}-${loc.locNum}-${index}`}>{loc.name} (#{loc.locNum}) - {loc.city}</option>)}
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
                    </div>

                    {/* --- Asset Selection --- */}
                    {currentAssets.length > 0 && (
                        <div className="pt-4 border-t dark:border-slate-600">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Assets Being Serviced</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {currentAssets.map((asset, index) => (
                                    <label key={index} className="flex items-center gap-2 p-2 border dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                                        <input 
                                            type="checkbox" 
                                            checked={servicedAssets.includes(asset.name)}
                                            onChange={() => handleAssetToggle(asset.name)}
                                            className="h-4 w-4 rounded"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{asset.name} ({asset.type})</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Line Items --- */}
                    <div className="pt-4 border-t dark:border-slate-600">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Line Items</h3>
                        <div className="space-y-2">
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
                    </div>

                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 mt-auto flex justify-end">
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={!clientId || !task.trim()}
                    >
                        Create Work Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddWorkOrderModal;
