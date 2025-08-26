import React, { useState } from 'react';
import { Mail, Phone, PlusCircle, Smartphone, Key, User, Wrench, AlertCircle } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
                userType: 'technician',  // Critical for mobile app recognition
                role: 'field_technician', // Specific role for permissions
                createdAt: new Date().toISOString()
            };

            // If mobile access is enabled, create Firebase auth account
            if (formData.mobileAccess) {
                // Validation for mobile access
                if (!formData.email.trim()) {
                    throw new Error('Email is required for mobile access');
                }
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }

                console.log('Creating Firebase account for:', formData.email);

                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(
                    auth, 
                    formData.email, 
                    formData.password
                );

                // Use Firebase UID as the technician ID (critical for mobile login)
                techData.id = userCredential.user.uid;
                techData.firebaseUid = userCredential.user.uid;
                techData.mobileCredentials = {
                    email: formData.email,
                    temporaryPassword: formData.password,
                    createdAt: new Date().toISOString()
                };

                console.log('✅ Firebase account created successfully');
                console.log('Firebase UID:', userCredential.user.uid);
                console.log('Will save technician to path: artifacts/workOrderManagement/users/{companyId}/technicians/' + userCredential.user.uid);
            } else {
                // Generate ID for non-mobile technicians
                techData.id = crypto.randomUUID();
            }

            console.log('Creating technician with data:', techData);
            await onAdd(techData);
            onClose();
        } catch (error) {
            console.error('Error creating technician:', error);
            
            // Provide user-friendly error messages
            let errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Use a different email or check existing technicians.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use at least 6 characters.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }
            
            setError(errorMessage);
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Create a field technician with optional mobile app access
                    </p>
                </div>
                
                <div className="p-6 space-y-4">
                    {/* Basic Information */}
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
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                            Email {formData.mobileAccess && <span className="text-red-500">*</span>}
                        </label>
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

                    {/* User Type Display */}
                    <div className="border-t pt-4">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">User Type</label>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
                            <User size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Field Technician</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 ml-auto">Mobile Service Reporter</span>
                        </div>
                    </div>

                    {/* Mobile Access Section */}
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
                                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 mb-3">
                                    <Key size={16} />
                                    <span className="font-medium">Creating mobile access will:</span>
                                </div>
                                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1 mb-3">
                                    <div>• Generate Firebase authentication account</div>
                                    <div>• Enable HVAC Service Reporter app login</div>
                                    <div>• Allow work order assignment and completion</div>
                                    <div>• Sync service reports back to this system</div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                                        Password (min 6 characters) <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password"
                                        value={formData.password} 
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                        required={formData.mobileAccess}
                                        minLength={6}
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        value={formData.confirmPassword} 
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                                        required={formData.mobileAccess}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Security Note */}
                    {formData.mobileAccess && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                                <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                <div className="text-xs text-yellow-800 dark:text-yellow-200">
                                    <div className="font-medium mb-1">Security Note:</div>
                                    <div>Share login credentials securely with the technician. They should change their password after first login for security.</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4 hover:text-gray-900 dark:hover:text-white transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                <PlusCircle size={16} />
                                Save Technician
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTechnicianModal;
