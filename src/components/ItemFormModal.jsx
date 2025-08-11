import React, { useState, useEffect } from 'react';
import { X, Upload, Users, Building, Info } from 'lucide-react';

export const ItemFormModal = ({ item = null, type, onSave, onClose, debts = [], clients = [], vehicles = [] }) => {
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            // Initialize with default values based on type
            const defaultData = getDefaultData(type);
            setFormData(defaultData);
        }
    }, [item, type]);

    const getDefaultData = (type) => {
        const defaults = {
            bill: { name: '', amount: '', dueDay: 1, category: 'Utilities', isAutoPay: false, isRecurring: false, notes: '' },
            debt: { 
                name: '', 
                creditor: '', 
                debtType: 'Credit Card', 
                totalAmount: '', 
                paidAmount: 0, 
                interestRate: '', 
                minimumPayment: '', 
                dueDate: '', 
                notes: '' 
            },
            income: { name: '', amount: '', type: 'monthly', status: 'active', isRecurring: true, notes: '' },
            weekly: { name: '', amount: '', category: 'Other', notes: '' },
            job: { name: '', revenue: '', materialCost: '', laborCost: '', date: new Date().toISOString().split('T')[0], notes: '', clientId: '' },
            task: { title: '', date: new Date().toISOString().split('T')[0], notes: '', isComplete: false },
            invoice: { 
                // Core AppSheet Fields
                invoiceNumber: '',
                jobNumber: '',
                customer: '',
                billTo: '',
                
                // Financial Fields
                grandTotal: '',
                totalCost: '',
                netTerms: 'Net 30',
                
                // Date Fields
                transactionDate: new Date().toISOString().split('T')[0],
                dueDate: '',
                paymentDate: '',
                completedOn: '',
                
                // Status & Priority
                invoiceStatus: 'Open',
                priority: 'STD',
                terms: 'Limited Warranty',
                
                // Job Details
                description: '',
                serviceAddress: '',
                locationType: 'Commercial',
                jobType: 'Service Call',
                
                // Additional AppSheet Fields
                lineItems: '',
                payments: '',
                company: 'Mechanical Temp',
                division: 'HVAC & Refrigeration',
                
                // Legacy compatibility fields (keep for existing system)
                status: 'Unpaid',
                net: '',
                invNum: '',
                jobNo: '',
                daysElapsed: 0,
                notes: ''
            },
            taxPayment: { date: new Date().toISOString().split('T')[0], amount: '', notes: '' },
            goal: { name: '', type: 'revenue', targetValue: '', deadline: new Date().toISOString().split('T')[0] },
            client: { 
                name: '', 
                address: '', 
                phone: '', 
                email: '', 
                parentId: '',
                isParent: false,
                companyType: 'regular',
                notes: ''
            },
            inventory: { name: '', quantity: '', cost: '', notes: '' },
            vehicle: { 
                name: '', 
                make: '', 
                model: '', 
                year: new Date().getFullYear().toString(), 
                vin: '', 
                licensePlate: '', 
                currentMileage: '', 
                status: 'active',
                color: '',
                registrationExpiry: '',
                insuranceExpiry: '',
                lastServiceMileage: '',
                nextServiceDue: '',
                notes: ''
            },
            maintenanceLog: { vehicleId: '', date: new Date().toISOString().split('T')[0], type: 'Oil Change', cost: '', mileage: '', notes: '', nextServiceMileage: '' }
        };
        return defaults[type] || {};
    };

    const handleInputChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: inputType === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name && !formData.title && !formData.billTo && !formData.customer) {
            alert('Please fill in the required fields.');
            return;
        }

        // Convert numeric fields
        const processedData = { ...formData };
        
        // Convert numeric fields based on type
        const numericFields = {
            bill: ['amount', 'dueDay'],
            debt: ['totalAmount', 'paidAmount', 'interestRate', 'minimumPayment'],
            income: ['amount'],
            weekly: ['amount'],
            job: ['revenue', 'materialCost', 'laborCost'],
            invoice: ['grandTotal', 'totalCost', 'net', 'daysElapsed'],
            taxPayment: ['amount'],
            goal: ['targetValue'],
            inventory: ['quantity', 'cost'],
            vehicle: ['currentMileage', 'year', 'lastServiceMileage'],
            maintenanceLog: ['cost', 'mileage', 'nextServiceMileage']
        };

        const fieldsToConvert = numericFields[type] || [];
        fieldsToConvert.forEach(field => {
            if (processedData[field] !== undefined && processedData[field] !== '') {
                processedData[field] = parseFloat(processedData[field]) || 0;
            }
        });

        // Client-specific validation and processing
        if (type === 'client') {
            // Validate parent/child logic
            if (processedData.isParent && processedData.parentId) {
                alert('A parent company cannot have a parent company. Please uncheck "Is Parent Company" or remove the parent selection.');
                return;
            }
            
            // Set companyType based on isParent and parentId
            if (processedData.isParent) {
                processedData.companyType = 'parent';
                processedData.parentId = null; // Ensure parent companies don't have a parentId
            } else if (processedData.parentId) {
                processedData.companyType = 'child';
            } else {
                processedData.companyType = 'regular';
            }
        }

        // Invoice-specific processing
        if (type === 'invoice') {
            // Auto-generate invoice number if not provided
            if (!processedData.invoiceNumber) {
                processedData.invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
            }

            // Auto-calculate due date for invoices
            if (processedData.transactionDate && processedData.netTerms && !processedData.dueDate) {
                const transDate = new Date(processedData.transactionDate);
                let daysToAdd = 30;
                if (processedData.netTerms.includes('45')) daysToAdd = 45;
                else if (processedData.netTerms.includes('15')) daysToAdd = 15;
                else if (processedData.netTerms.includes('Due on Receipt')) daysToAdd = 0;
                
                const dueDate = new Date(transDate);
                dueDate.setDate(dueDate.getDate() + daysToAdd);
                processedData.dueDate = dueDate.toISOString().split('T')[0];
            }

            // Ensure compatibility with existing system
            processedData.status = processedData.invoiceStatus === 'Paid' ? 'Paid' : 'Unpaid';
            processedData.net = processedData.grandTotal;
            processedData.invNum = processedData.invoiceNumber;
            processedData.jobNo = processedData.jobNumber;
            if (!processedData.grandTotal && processedData.net) {
                processedData.grandTotal = processedData.net;
            }
        }

        onSave(processedData, file);
    };

    // Get available parent clients (excluding current client if editing)
    const availableParents = clients.filter(client => 
        (client.isParent || client.companyType === 'parent') && 
        (!item || client.id !== item.id)
    );

    const renderFormFields = () => {
        switch (type) {
            case 'bill':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Bill Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Amount *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={formData.amount || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Due Day
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    name="dueDay"
                                    value={formData.dueDay || 1}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category || 'Utilities'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Utilities">Utilities</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Vehicle">Vehicle</option>
                                    <option value="Software">Software</option>
                                    <option value="Overhead">Overhead</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isAutoPay"
                                    checked={formData.isAutoPay || false}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Auto Pay</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isRecurring"
                                    checked={formData.isRecurring || false}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Recurring</span>
                            </label>
                        </div>
                    </>
                );

            case 'debt':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Debt Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                placeholder="e.g., Chase Credit Card, Car Loan"
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Creditor/Lender
                                </label>
                                <input
                                    type="text"
                                    name="creditor"
                                    value={formData.creditor || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Chase Bank, Toyota Financial"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Debt Type
                                </label>
                                <select
                                    name="debtType"
                                    value={formData.debtType || 'Credit Card'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Personal Loan">Personal Loan</option>
                                    <option value="Auto Loan">Auto Loan</option>
                                    <option value="Mortgage">Mortgage</option>
                                    <option value="Student Loan">Student Loan</option>
                                    <option value="Business Loan">Business Loan</option>
                                    <option value="Medical Debt">Medical Debt</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Total Amount *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="totalAmount"
                                    value={formData.totalAmount || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Amount Paid
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="paidAmount"
                                    value={formData.paidAmount || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Interest Rate (%) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="interestRate"
                                    value={formData.interestRate || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Minimum Payment
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="minimumPayment"
                                    value={formData.minimumPayment || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Payment Due Date
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            />
                        </div>
                        
                        {/* Progress Summary */}
                        {(formData.totalAmount || formData.paidAmount) && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <h4 className="font-medium text-slate-800 dark:text-white mb-3">Payment Progress</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Remaining Balance:</span>
                                        <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                                            ${((parseFloat(formData.totalAmount) || 0) - (parseFloat(formData.paidAmount) || 0)).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                                            style={{ 
                                                width: `${Math.min(
                                                    formData.totalAmount > 0 
                                                        ? ((parseFloat(formData.paidAmount) || 0) / parseFloat(formData.totalAmount)) * 100 
                                                        : 0, 
                                                    100
                                                )}%` 
                                            }}
                                        />
                                    </div>
                                    <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                                        {formData.totalAmount > 0 
                                            ? (((parseFloat(formData.paidAmount) || 0) / parseFloat(formData.totalAmount)) * 100).toFixed(1) 
                                            : 0
                                        }% paid off
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'income':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Income Source Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                placeholder="e.g., Main Business Revenue, Consulting Services"
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Amount *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="amount"
                                    value={formData.amount || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Income Type *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type || 'monthly'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="annually">Annually</option>
                                    <option value="one-time">One-time</option>
                                    <option value="project-based">Project-based</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status || 'active'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="paused">Paused</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isRecurring"
                                        checked={formData.isRecurring || false}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Recurring Income</span>
                                </label>
                            </div>
                        </div>
                        
                        {/* Income Impact Preview */}
                        {formData.amount && parseFloat(formData.amount) > 0 && formData.type && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Income Projection Analysis</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-green-600 dark:text-green-400 font-medium">{formData.type || 'Monthly'}:</span>
                                        <p className="font-mono font-bold text-green-600 dark:text-green-400">
                                            ${parseFloat(formData.amount).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-green-600 dark:text-green-400 font-medium">Monthly:</span>
                                        <p className="font-mono font-bold text-blue-600 dark:text-blue-400">
                                            ${(() => {
                                                const amount = parseFloat(formData.amount);
                                                switch (formData.type) {
                                                    case 'weekly': return (amount * 4.33).toFixed(2);
                                                    case 'quarterly': return (amount / 3).toFixed(2);
                                                    case 'annually': return (amount / 12).toFixed(2);
                                                    case 'monthly':
                                                    default: return amount.toFixed(2);
                                                }
                                            })()}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-green-600 dark:text-green-400 font-medium">Annual:</span>
                                        <p className="font-mono font-bold text-purple-600 dark:text-purple-400">
                                            ${(() => {
                                                const amount = parseFloat(formData.amount);
                                                let monthly;
                                                switch (formData.type) {
                                                    case 'weekly': monthly = amount * 4.33; break;
                                                    case 'quarterly': monthly = amount / 3; break;
                                                    case 'annually': monthly = amount / 12; break;
                                                    case 'monthly':
                                                    default: monthly = amount; break;
                                                }
                                                return (monthly * 12).toLocaleString();
                                            })()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'weekly':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Cost Item Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                placeholder="e.g., Projected Payroll, Fuel & Maintenance"
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Weekly Amount *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="amount"
                                    value={formData.amount || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category || 'Other'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Payroll">Payroll</option>
                                    <option value="Fuel & Maintenance">Fuel & Maintenance</option>
                                    <option value="Equipment Rental">Equipment Rental</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Office Expenses">Office Expenses</option>
                                    <option value="Supplies">Supplies</option>
                                    <option value="Contractors">Contractors</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Cost Impact Preview */}
                        {formData.amount && parseFloat(formData.amount) > 0 && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Cost Impact Analysis</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">Weekly:</span>
                                        <p className="font-mono font-bold text-red-600 dark:text-red-400">
                                            ${parseFloat(formData.amount).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">Monthly:</span>
                                        <p className="font-mono font-bold text-orange-600 dark:text-orange-400">
                                            ${(parseFloat(formData.amount) * 4.33).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">Annual:</span>
                                        <p className="font-mono font-bold text-purple-600 dark:text-purple-400">
                                            ${(parseFloat(formData.amount) * 52).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'vehicle':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Vehicle Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Jason's Truck, Red Van"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Make *
                                </label>
                                <select
                                    name="make"
                                    value={formData.make || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Make</option>
                                    <option value="FORD">Ford</option>
                                    <option value="CHEVROLET">Chevrolet</option>
                                    <option value="GMC">GMC</option>
                                    <option value="TOYOTA">Toyota</option>
                                    <option value="HONDA">Honda</option>
                                    <option value="NISSAN">Nissan</option>
                                    <option value="RAM">Ram</option>
                                    <option value="DODGE">Dodge</option>
                                    <option value="JEEP">Jeep</option>
                                    <option value="HYUNDAI">Hyundai</option>
                                    <option value="KIA">Kia</option>
                                    <option value="MAZDA">Mazda</option>
                                    <option value="SUBARU">Subaru</option>
                                    <option value="VOLKSWAGEN">Volkswagen</option>
                                    <option value="BMW">BMW</option>
                                    <option value="MERCEDES">Mercedes-Benz</option>
                                    <option value="AUDI">Audi</option>
                                    <option value="LEXUS">Lexus</option>
                                    <option value="ACURA">Acura</option>
                                    <option value="INFINITI">Infiniti</option>
                                    <option value="CADILLAC">Cadillac</option>
                                    <option value="LINCOLN">Lincoln</option>
                                    <option value="BUICK">Buick</option>
                                    <option value="CHRYSLER">Chrysler</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Model *
                                </label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., F-150, TRANSIT, SIERRA"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Year *
                                </label>
                                <input
                                    type="number"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    name="year"
                                    value={formData.year || new Date().getFullYear()}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., White, Black, Blue"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status || 'active'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="active">Active</option>
                                    <option value="maintenance">In Maintenance</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    VIN
                                </label>
                                <input
                                    type="text"
                                    name="vin"
                                    value={formData.vin || ''}
                                    onChange={handleInputChange}
                                    placeholder="17-character VIN"
                                    maxLength="17"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    License Plate
                                </label>
                                <input
                                    type="text"
                                    name="licensePlate"
                                    value={formData.licensePlate || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., DD16326"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Current Mileage *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    name="currentMileage"
                                    value={formData.currentMileage || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 104071"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Last Service Mileage
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    name="lastServiceMileage"
                                    value={formData.lastServiceMileage || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 98000"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Registration Expiry
                                </label>
                                <input
                                    type="date"
                                    name="registrationExpiry"
                                    value={formData.registrationExpiry || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Insurance Expiry
                                </label>
                                <input
                                    type="date"
                                    name="insuranceExpiry"
                                    value={formData.insuranceExpiry || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Next Service Due
                            </label>
                            <input
                                type="date"
                                name="nextServiceDue"
                                value={formData.nextServiceDue || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* Vehicle Preview */}
                        {(formData.name || formData.make || formData.model) && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🚗 Vehicle Preview</h4>
                                <div className="text-sm">
                                    <p className="font-medium text-slate-800 dark:text-white">
                                        {formData.name || 'Unnamed Vehicle'}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {formData.year} {formData.make} {formData.model}
                                        {formData.color && ` (${formData.color})`}
                                    </p>
                                    {formData.licensePlate && (
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Plate: {formData.licensePlate}
                                        </p>
                                    )}
                                    {formData.currentMileage && (
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Mileage: {parseInt(formData.currentMileage).toLocaleString()} miles
                                        </p>
                                    )}
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Status: <span className={`inline-block px-2 py-1 rounded text-xs ${
                                            formData.status === 'active' ? 'bg-green-100 text-green-800' :
                                            formData.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                            formData.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>{formData.status || 'active'}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'client':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Client Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address || ''}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* Parent/Child Configuration Section */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                <Building size={16} />
                                Company Structure & Hierarchy
                            </h4>
                            
                            <div className="space-y-4">
                                {/* Parent Company Checkbox */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="isParent"
                                        name="isParent"
                                        checked={formData.isParent || false}
                                        onChange={handleInputChange}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 rounded focus:ring-blue-500"
                                    />
                                    <div>
                                        <label htmlFor="isParent" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Users size={14} />
                                            This is a parent company
                                        </label>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Check this if this company has multiple locations or subsidiaries
                                        </p>
                                    </div>
                                </div>

                                {/* Parent Selection (only show if not a parent itself) */}
                                {!formData.isParent && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                                            Parent Company (Optional)
                                        </label>
                                        <select
                                            name="parentId"
                                            value={formData.parentId || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                        >
                                            <option value="">-- Independent Company --</option>
                                            {availableParents.map(parent => (
                                                <option key={parent.id} value={parent.id}>
                                                    {parent.name}
                                                </option>
                                            ))}
                                        </select>
                                        {availableParents.length === 0 && (
                                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                                No parent companies available. Create a parent company first if needed.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Help Text */}
                                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded border">
                                    <div className="flex items-start gap-2">
                                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                                        <div>
                                            {formData.isParent ? (
                                                <div>
                                                    <p className="font-medium text-blue-600 dark:text-blue-400 mb-1">Parent Company Benefits:</p>
                                                    <ul className="space-y-1">
                                                        <li>• Can have multiple child locations/subsidiaries</li>
                                                        <li>• Appears in hierarchy view with all child companies</li>
                                                        <li>• Useful for corporate clients with multiple locations</li>
                                                    </ul>
                                                </div>
                                            ) : formData.parentId ? (
                                                <div>
                                                    <p className="font-medium text-green-600 dark:text-green-400 mb-1">Child Company Setup:</p>
                                                    <ul className="space-y-1">
                                                        <li>• This location will be grouped under the parent company</li>
                                                        <li>• Jobs and invoices can be tracked separately</li>
                                                        <li>• Parent company can see consolidated reports</li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="font-medium text-slate-600 dark:text-slate-400 mb-1">Independent Company:</p>
                                                    <ul className="space-y-1">
                                                        <li>• Standalone client with no parent/child relationships</li>
                                                        <li>• Can be converted to parent company later if needed</li>
                                                        <li>• Most common setup for individual businesses</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Current Hierarchy Preview */}
                                {(formData.isParent || formData.parentId) && (
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-600">
                                        <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Hierarchy Preview:</h5>
                                        {formData.isParent ? (
                                            <div className="text-xs">
                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                                                    <Building size={12} />
                                                    {formData.name || 'New Parent Company'}
                                                </div>
                                                <div className="ml-4 mt-1 text-slate-500 dark:text-slate-400">
                                                    └── Child companies can be added later
                                                </div>
                                            </div>
                                        ) : formData.parentId && (
                                            <div className="text-xs">
                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                                                    <Building size={12} />
                                                    {availableParents.find(p => p.id === formData.parentId)?.name || 'Parent Company'}
                                                </div>
                                                <div className="ml-4 mt-1 text-green-600 dark:text-green-400 flex items-center gap-1">
                                                    <span>└──</span>
                                                    <Users size={10} />
                                                    {formData.name || 'New Child Location'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                );

            case 'job':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Job Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Revenue *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="revenue"
                                    value={formData.revenue || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Material Cost
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="materialCost"
                                    value={formData.materialCost || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Labor Cost
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="laborCost"
                                    value={formData.laborCost || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date ? formData.date.split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Client
                                </label>
                                <select
                                    name="clientId"
                                    value={formData.clientId || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="">Select Client</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                );

            case 'maintenanceLog':
        return (
            <>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Vehicle *
                        </label>
                        <select
                            name="vehicleId"
                            value={formData.vehicleId || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            required
                        >
                            <option value="">Select Vehicle</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.name || 'Unnamed'} - {vehicle.make} {vehicle.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Service Date *
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date ? formData.date.split('T')[0] : ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Service Type *
                        </label>
                        <select
                            name="type"
                            value={formData.type || 'Oil Change'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            required
                        >
                            <option value="Oil Change">Oil Change</option>
                            <option value="Tire Rotation">Tire Rotation</option>
                            <option value="Brake Service">Brake Service</option>
                            <option value="Transmission Service">Transmission Service</option>
                            <option value="Engine Repair">Engine Repair</option>
                            <option value="Inspection">Inspection</option>
                            <option value="A/C Service">A/C Service</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Cost ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="cost"
                            value={formData.cost || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Current Mileage *
                        </label>
                        <input
                            type="number"
                            name="mileage"
                            value={formData.mileage || ''}
                            onChange={handleInputChange}
                            placeholder="Current vehicle mileage"
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Next Service Mileage
                    </label>
                    <input
                        type="number"
                        name="nextServiceMileage"
                        value={formData.nextServiceMileage || ''}
                        onChange={handleInputChange}
                        placeholder="When next service is due"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                </div>
            </>
        );

            case 'invoice':
                return (
                    <>
                        {/* AppSheet Header Info */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📋 AppSheet Invoice Data</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                This form creates invoices compatible with your AppSheet system (1,091 records)
                            </p>
                        </div>

                        {/* Invoice & Job Numbers */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Invoice Number
                                </label>
                                <input
                                    type="text"
                                    name="invoiceNumber"
                                    value={formData.invoiceNumber || ''}
                                    onChange={handleInputChange}
                                    placeholder="Auto-generated if empty"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Leave empty to auto-generate (e.g., 12457956)
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Job Number *
                                </label>
                                <input
                                    type="text"
                                    name="jobNumber"
                                    value={formData.jobNumber || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 6753455-01, 3686529"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Customer & Bill To */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Customer *
                                </label>
                                <input
                                    type="text"
                                    name="customer"
                                    value={formData.customer || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Value City Furniture #175, Rally House #160"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Bill To *
                                </label>
                                <input
                                    type="text"
                                    name="billTo"
                                    value={formData.billTo || ''}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Value City Furniture, Sampler Stores"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Who receives the invoice
                                </p>
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Grand Total *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="grandTotal"
                                    value={formData.grandTotal || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Total Cost
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="totalCost"
                                    value={formData.totalCost || ''}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Labor + material costs
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Net Terms
                                </label>
                                <select
                                    name="netTerms"
                                    value={formData.netTerms || 'Net 30'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Net 15">Net 15</option>
                                    <option value="Net 30">Net 30</option>
                                    <option value="Net 45">Net 45</option>
                                    <option value="Due on Receipt">Due on Receipt</option>
                                </select>
                            </div>
                        </div>

                        {/* Service Information */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Service Address *
                            </label>
                            <input
                                type="text"
                                name="serviceAddress"
                                value={formData.serviceAddress || ''}
                                onChange={handleInputChange}
                                placeholder="e.g., 27775 Novi Rd, Novi, MI 48377, USA"
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Job Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Describe the work performed, issues found, and solutions provided..."
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>

                        {/* Date Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Transaction Date *
                                </label>
                                <input
                                    type="date"
                                    name="transactionDate"
                                    value={formData.transactionDate || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Completed On
                                </label>
                                <input
                                    type="date"
                                    name="completedOn"
                                    value={formData.completedOn || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Status and Type */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Invoice Status
                                </label>
                                <select
                                    name="invoiceStatus"
                                    value={formData.invoiceStatus || 'Open'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Overdue">Overdue</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Location Type
                                </label>
                                <select
                                    name="locationType"
                                    value={formData.locationType || 'Commercial'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Commercial">Commercial</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    value={formData.jobType || 'Service Call'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="Service Call">Service Call</option>
                                    <option value="Installation">Installation</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Repair">Repair</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        {formData.grandTotal && parseFloat(formData.grandTotal) > 0 && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💰 Invoice Summary</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-green-600 dark:text-green-400 font-medium">Invoice Total:</span>
                                        <p className="font-mono font-bold text-green-600 dark:text-green-400 text-lg">
                                            ${parseFloat(formData.grandTotal || 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">Total Costs:</span>
                                        <p className="font-mono font-bold text-blue-600 dark:text-blue-400 text-lg">
                                            ${parseFloat(formData.totalCost || 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-purple-600 dark:text-purple-400 font-medium">Profit Margin:</span>
                                        <p className="font-mono font-bold text-purple-600 dark:text-purple-400 text-lg">
                                            ${(parseFloat(formData.grandTotal || 0) - parseFloat(formData.totalCost || 0)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'inventory':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Item Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    name="quantity"
                                    value={formData.quantity || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Cost per Unit
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="cost"
                                    value={formData.cost || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </>
                );

            case 'task':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Task Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date ? formData.date.split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isComplete"
                                        checked={formData.isComplete || false}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Mark as Complete</span>
                                </label>
                            </div>
                        </div>
                    </>
                );

            case 'taxPayment':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Payment Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date ? formData.date.split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Amount *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={formData.amount || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                    </>
                );

            case 'goal':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Goal Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Goal Type
                                </label>
                                <select
                                    name="type"
                                    value={formData.type || 'revenue'}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="revenue">Revenue</option>
                                    <option value="profit">Profit</option>
                                    <option value="clients">New Clients</option>
                                    <option value="jobs">Completed Jobs</option>
                                    <option value="debt">Debt Payoff</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Target Value *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="targetValue"
                                    value={formData.targetValue || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Target Date
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline ? formData.deadline.split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </>
                );

            default:
                return <div>Form not implemented for type: {type}</div>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                            {item ? `Edit ${type}` : `Add New ${type}`}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    <div className="space-y-4">
                        {renderFormFields()}
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes || ''}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                placeholder="Additional notes or comments..."
                            />
                        </div>

                        {(type === 'bill' || type === 'invoice') && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Attachment
                                </label>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Upload receipt or related document (images and PDFs only)
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                        >
                            {item ? 'Update' : 'Add'} {type}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemFormModal;