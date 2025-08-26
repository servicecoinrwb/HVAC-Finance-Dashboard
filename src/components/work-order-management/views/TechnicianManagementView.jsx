import React, { useState } from 'react';
import { Mail, Phone, PlusCircle, Edit, Trash2, Smartphone, Key } from 'lucide-react';
import { useWorkOrderContext } from '../WorkOrderManagement.jsx';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// --- Utility Functions ---
const getTechStatusStyles = (s) => ({
    'available': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    'on site': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    'en route': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
    'on break': 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200',
    'on call': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200',
    'day off': 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200',
}[s?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-600/50 dark:text-gray-200');

// --- Enhanced Modals with Mobile Access ---
const AddTechnicianModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        mobileAccess: false,
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
        
        try {
            let techData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: 'Available',
                mobileAccess: formData.mobileAccess,
                createdAt: new Date().toISOString()
            };

            // If mobile access is enabled, create Firebase auth account
            if (formData.mobileAccess) {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }

                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(
                    auth, 
                    formData.email, 
                    formData.password
                );

                // Use Firebase UID as the technician ID
                techData.id = userCredential.user.uid;
                techData.firebaseUid = userCredential.user.uid;
                techData.mobileCredentials = {
                    email: formData.email,
                    temporaryPassword: formData.password,
                    createdAt: new Date().toISOString()
                };
            }

            await onAdd(techData);
            onClose();
        } catch (error) {
            console.error('Error creating technician:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Technician</h2>
                </div>
                
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                            required={formData.mobileAccess}
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone} 
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <input 
                                type="checkbox" 
                                name="mobileAccess"
                                id="mobileAccess"
                                checked={formData.mobileAccess}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="mobileAccess" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Smartphone size={16} />
                                Grant Mobile App Access
                            </label>
                        </div>
                        
                        {formData.mobileAccess && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-3">
                                <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                                    Creating mobile access will generate login credentials for the HVAC Service app.
                                </p>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Password (min 6 characters)</label>
                                    <input 
                                        type="password" 
                                        name="password"
                                        value={formData.password} 
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                        required
                                        minLength={6}
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        value={formData.confirmPassword} 
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Save Technician'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const EditTechnicianModal = ({ technician, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(technician);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onUpdate(formData); 
        onClose(); 
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Technician</h2>
                </div>
                
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Phone</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">Status</label>
                        <select 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option>Available</option>
                            <option>En Route</option>
                            <option>On Site</option>
                            <option>On Break</option>
                            <option>On Call</option>
                            <option>Day Off</option>
                        </select>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center space-x-3">
                            <input 
                                type="checkbox" 
                                name="mobileAccess"
                                id="editMobileAccess"
                                checked={formData.mobileAccess || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="editMobileAccess" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Smartphone size={16} />
                                Mobile App Access
                            </label>
                        </div>
                        
                        {formData.mobileAccess && (
                            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                                Firebase account already created. Contact IT for password reset if needed.
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

// Credentials Display Modal
const MobileCredentialsModal = ({ technician, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Key size={24} />
                        Mobile App Credentials
                    </h2>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{technician.name}</h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                                <span className="ml-2 font-mono text-blue-600 dark:text-blue-400">{technician.email}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Password:</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="ml-2 font-mono text-blue-600 dark:text-blue-400">
                                        {showPassword ? technician.mobileCredentials?.temporaryPassword || '••••••••' : '••••••••'}
                                    </span>
                                    <button 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                            <strong>Security Note:</strong> Share these credentials securely with the technician. 
                            They should change the password after their first login.
                        </p>
                    </div>
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-700 flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export const TechnicianManagementView = () => {
    const { technicians, handlers } = useWorkOrderContext();
    const [isAdding, setIsAdding] = useState(false);
    const [editing, setEditing] = useState(null);
    const [showingCredentials, setShowingCredentials] = useState(null);

    if (!technicians) {
        return <div className="p-6">Loading technician data...</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Technician Management</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Manage field technicians and mobile app access
                    </p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)} 
                    className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                >
                    <PlusCircle size={20} /> Add New Technician
                </button>
            </div>

            <div className="space-y-4">
                {technicians.map(tech => (
                    <div key={tech.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tech.name}</h3>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getTechStatusStyles(tech.status)}`}>
                                        {tech.status}
                                    </span>
                                    {tech.mobileAccess && (
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 flex items-center gap-1">
                                            <Smartphone size={12} />
                                            Mobile Access
                                        </span>
                                    )}
                                </div>
                                
                                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4">
                                    <span className="flex items-center gap-1.5"><Mail size={14}/> {tech.email}</span>
                                    <span className="flex items-center gap-1.5"><Phone size={14}/> {tech.phone}</span>
                                </div>

                                {tech.mobileAccess && tech.mobileCredentials && (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => setShowingCredentials(tech)}
                                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            <Key size={12} />
                                            View Mobile Credentials
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {tech.name !== 'Unassigned' && (
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setEditing(tech)} 
                                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-full"
                                    >
                                        <Edit size={16}/>
                                    </button>
                                    <button 
                                        onClick={() => handlers.deleteTechnician(tech.id)} 
                                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-slate-700 rounded-full"
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Access Summary */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Mobile App Integration</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Technicians with mobile access can use the HVAC Service Reporter app</p>
                    <p>• They can view assigned work orders and submit completed service reports</p>
                    <p>• Service reports automatically sync back to this system</p>
                    <p>• Currently <strong>{technicians.filter(t => t.mobileAccess).length}</strong> technicians have mobile access</p>
                </div>
            </div>

            {/* Modals */}
            {isAdding && (
                <AddTechnicianModal 
                    onAdd={handlers.addTechnician} 
                    onClose={() => setIsAdding(false)} 
                />
            )}
            {editing && (
                <EditTechnicianModal 
                    technician={editing} 
                    onUpdate={handlers.updateTechnician} 
                    onClose={() => setEditing(null)} 
                />
            )}
            {showingCredentials && (
                <MobileCredentialsModal
                    technician={showingCredentials}
                    onClose={() => setShowingCredentials(null)}
                />
            )}
        </div>
    );
};
