import React, { useState } from 'react';
import { UserPlus, X, Info, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

export default function AddTechnicianModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Field Service',
    role: 'field_technician',
    mobileAccess: true,
    password: '',
    confirmPassword: '',
    skills: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
    setSuccess(false);
  };

  const handleSkillChange = (skill, checked) => {
    setFormData(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      console.log('🔧 Creating TECHNICIAN (separate from main app users)...');
      
      // Call the parent component's onAdd function
      await onAdd(formData);
      
      setSuccess(true);
      
      // Reset form and close modal after short delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: 'Field Service',
          role: 'field_technician',
          mobileAccess: true,
          password: '',
          confirmPassword: '',
          skills: []
        });
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error creating technician:', error);
      setError(error.message || 'Failed to create technician');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const skillsOptions = [
    'HVAC Installation',
    'HVAC Repair',
    'Electrical Work',
    'Plumbing',
    'Equipment Maintenance',
    'Emergency Response',
    'Commercial Systems',
    'Residential Systems'
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Technician</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create a technician account for mobile app access</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* User Type Selection Info */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300">Account Type</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              This will create a technician account separate from main app users with restricted access to mobile tech features only.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter technician's full name"
                  required
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="technician@company.com"
                  required
                  data-testid="input-email"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used for mobile app login</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="select-department"
                >
                  <option value="Field Service">Field Service</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Installation">Installation</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>

            {/* Access & Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Access & Security</h3>
              
              {/* Mobile Access Toggle */}
              <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Mobile App Access</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Enable login to mobile technician app</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.mobileAccess}
                      onChange={(e) => handleChange('mobileAccess', e.target.checked)}
                      className="sr-only peer"
                      data-testid="switch-mobile-access"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technician Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="select-role"
                >
                  <option value="field_technician">Field Technician</option>
                  <option value="senior_technician">Senior Technician</option>
                  <option value="team_lead">Team Lead</option>
                  <option value="specialist">Specialist</option>
                </select>
              </div>

              {/* Password Section - only show if mobile access is enabled */}
              {formData.mobileAccess && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum 6 characters"
                      required
                      minLength={6}
                      data-testid="input-password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Re-enter password"
                      required
                      data-testid="input-confirm-password"
                    />
                  </div>
                </div>
              )}

              {/* Skills/Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills & Permissions</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {skillsOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => handleSkillChange(skill, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        data-testid={`checkbox-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                      />
                      <label htmlFor={skill} className="text-sm text-gray-700 dark:text-gray-300">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Firebase Auth Separation Info */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-900 dark:text-green-300">Secure Account Separation</h4>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  This technician will be created with a separate Firebase Auth user type and custom claims, 
                  ensuring they can only access mobile technician features and not main app functionality.
                </p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg" data-testid="error-message">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Error creating technician</span>
              </div>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg" data-testid="success-message">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Technician created successfully</span>
              </div>
              <p className="text-sm mt-1">Mobile access has been configured and credentials are ready.</p>
            </div>
          )}
        </form>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            * Required fields
          </div>
          <div className="flex space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
              data-testid="button-cancel"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              data-testid="button-create-technician"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Creating...' : 'Create Technician'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}