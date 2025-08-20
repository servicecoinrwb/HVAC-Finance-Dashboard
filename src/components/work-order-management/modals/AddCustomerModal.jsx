import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CUSTOMER_TYPE } from '../utils/constants';

const initialFormState = {
    name: '',
    type: CUSTOMER_TYPE.COMMERCIAL,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    city: '',
    state: 'MI',
    zip: '',
};

const AddCustomerModal = ({ onAddCustomer, onClose }) => {
    // --- UPDATED: Single state object for the form ---
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            contact: { ...prev.contact, [name]: value }
        }));
    };
    
    // ... similar handler for billingAddress ...

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return alert("Customer name is required.");
        
        const newCustomer = {
            name: formData.name,
            type: formData.type,
            contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone },
            billingAddress: { street: formData.street, city: formData.city, state: formData.state, zip: formData.zip },
            locations: [],
        };
        onAddCustomer(newCustomer);
        onClose();
    };

    return (
        <div className="fixed inset-0 ...">
            <form onSubmit={handleSubmit} className="...">
                {/* Form JSX now points to formData state */}
                <input name="name" value={formData.name} onChange={handleChange} />
                <select name="type" value={formData.type} onChange={handleChange}>
                    {Object.values(CUSTOMER_TYPE).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {/* ... rest of form inputs updated similarly ... */}
            </form>
        </div>
    );
};

export default AddCustomerModal;