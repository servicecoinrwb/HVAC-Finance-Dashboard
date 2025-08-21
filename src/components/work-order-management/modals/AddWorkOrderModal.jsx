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
    
    // --- NEW: State for selected assets ---
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
            // Reset selected assets when client changes
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
            servicedAssets: servicedAssets, // ✅ Save the selected assets
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
                <div className="bg-white p-6 rounded-lg">Loading customer data...</div>
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
                <div className="p-6 overflow-y-auto space-y-4">
                    {/* ... Main Details and Location sections ... */}
                    
                    {/* --- ✅ NEW: ASSET SELECTION --- */}
                    {currentAssets.length > 0 && (
                        <div className="pt-4 border-t dark:border-slate-600">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Assets Being Serviced</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {currentAssets.map((asset, index) => (
                                    <label key={index} className="flex items-center gap-2 p-2 border dark:border-slate-700 rounded-lg cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={servicedAssets.includes(asset.name)}
                                            onChange={() => handleAssetToggle(asset.name)}
                                            className="h-4 w-4"
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
                        {/* ... Line item mapping ... */}
                    </div>

                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 mt-auto flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Create Work Order</button>
                </div>
            </form>
        </div>
    );
};
