import React, { useState } from 'react';
import { PlusCircle, Wrench, AlertCircle } from 'lucide-react';
// 1. Import Firebase Functions
import { getFunctions, httpsCallable } from 'firebase/functions';

const AddTechnicianModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        mobileAccess: true, // Default to true for new techs
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;
        
        setLoading(true);
        setError('');
        
        // --- VALIDATION ---
        if (formData.mobileAccess) {
            if (!formData.email.trim()) {
                setError('Email is required for mobile access');
                setLoading(false);
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                setLoading(false);
                return;
            }
        }
        
        try {
            // 2. Get a reference to the Cloud Functions service
            const functions = getFunctions();
            // 3. Point to the specific function by name
            const createTechnician = httpsCallable(functions, 'createTechnician');

            console.log('Calling createTechnician Cloud Function with data:', formData);

            // 4. Call the function and pass the form data
            const result = await createTechnician({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                mobileAccess: formData.mobileAccess,
            });

            console.log('✅ Cloud Function executed successfully', result.data);

            // The 'onAdd' prop might not be needed anymore since the function
            // creates the Firestore record, but we'll call it for consistency
            // in case it refreshes the UI.
            if (onAdd) {
                onAdd();
            }

            onClose(); // Close the modal on success

        } catch (error) {
            console.error('Error calling createTechnician function:', error);
            // The error message from the function is more user-friendly
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Wrench size={24} />
                        Add New Technician
                    </h2>
                </div>
                
                <div className="p-6 space-y-4">
                    {/* Form inputs remain largely the same */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    </div>
                    
                    <div className="border-t pt-4">
                         <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Password (min 6 characters)
                         </label>
                         <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required minLength={6} />
                    </div>
                     <div>
                         <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Confirm Password
                         </label>
                         <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4 hover:text-gray-900 dark:hover:text-white transition-colors" disabled={loading}>
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors" disabled={loading}>
                        {loading ? 'Creating...' : <><PlusCircle size={16} /> Save Technician</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTechnicianModal;
