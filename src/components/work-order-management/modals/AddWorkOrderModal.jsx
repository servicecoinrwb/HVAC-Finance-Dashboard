import React, { useState, useMemo, useEffect } from 'react';
import { X, PlusCircle, Trash2 } from 'lucide-react';
import { yyyymmddToExcel } from '../utils/helpers';
// 1. Import the context hook
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';

// 2. Remove all props from the component definition
const AddWorkOrderModal = () => {
    // 3. Get all data and functions from the context
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
    
    // 4. Safely initialize state after customers have loaded
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
        }
    }, [selectedClient]);
    
    const onClose = () => {
        setIsAddingOrder(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let location;
        if (needsLocation) {
            if (!newLocationName.trim() || !newLocationCity.trim()) {
                return alert('Please fill out the new location name and city.');
            }
            location = { name: newLocationName.trim(), locNum: newLocationNum.trim() || 'N/A', city: newLocationCity.trim(), state: newLocationState.trim() };
        } else {
            const [company, locNum] = locationIdentifier.split('-').slice(0, 2);
            location = selectedClient?.locations.find(l => l.name === company && l.locNum === locNum);
        }

        if (!clientId || !selectedClient || !location || !task) {
            return alert('Please fill out all required fields.');
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
        };
        // Use the handler from the context
        handlers.addNewOrder(orderData);
    };

    const addLineItem = () => setLineItems([...lineItems, { description: '', quantity: 1, rate: 0, amount: 0, inventoryId: null }]);
    const removeLineItem = (index) => { if (lineItems.length > 1) setLineItems(lineItems.filter((_, i) => i !== index)); };
    
    // Guard clause to prevent rendering before data is available
    if (!customers) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg">Loading customer data...</div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Add New Work Order</h2>
                    <button type="button" onClick={onClose}><X size={28} /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-medium">Client</label>
                        <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                            <option value="">Select a customer...</option>
                            {(customers || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    {/* ... other form fields and line items JSX ... */}
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t mt-auto">
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Create Work Order</button>
                </div>
            </form>
        </div>
    );
};

export default AddWorkOrderModal;