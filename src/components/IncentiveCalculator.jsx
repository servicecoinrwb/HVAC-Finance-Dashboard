import React, { useState, useMemo, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { DollarSign, Percent, Plus, Edit, Trash2, User, Users, Calculator, FileText, TrendingUp, Clock, Calendar, Search, Filter } from 'lucide-react';

const initialPercentBrackets = [
    { min: 10000, max: Infinity, rate: 10.0 },
    { min: 8000, max: 9999, rate: 8.0 },
    { min: 5000, max: 7999, rate: 5.0 },
    { min: 3500, max: 4999, rate: 3.0 },
    { min: 0, max: 3499, rate: 1.5 },
];

const initialHourlyBrackets = [
    { min: 10000, max: Infinity, bonus: 10.0 },
    { min: 8000, max: 9999, bonus: 8.0 },
    { min: 5000, max: 7999, bonus: 5.0 },
    { min: 3500, max: 4999, bonus: 2.0 },
    { min: 0, max: 3499, bonus: 0 },
];

const IncentiveCalculator = ({ userId, db, appId }) => {
    // Original incentive calculator state
    const [percentBrackets, setPercentBrackets] = useState(initialPercentBrackets);
    const [actualSalesPercent, setActualSalesPercent] = useState(0);
    const [hourlyBrackets, setHourlyBrackets] = useState(initialHourlyBrackets);
    const [actualSalesHourly, setActualSalesHourly] = useState(0);
    const [hoursWorked, setHoursWorked] = useState(0);

    // Employee management state - NOW USES FIREBASE
    const [employees, setEmployees] = useState([]);
    const [activeTab, setActiveTab] = useState('employees');
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');

    // Employee form state
    const [employeeForm, setEmployeeForm] = useState({
        name: '',
        position: '',
        email: '',
        phone: '',
        baseSalary: '',
        payType: 'salary',
        hourlyRate: '',
        incentiveType: 'none',
        status: 'active',
        hireDate: new Date().toISOString().split('T')[0],
        department: 'Operations',
        notes: ''
    });

    // Listen to Firebase for employee data
    useEffect(() => {
        if (!userId || !db || !appId) {
            console.log("Missing Firebase props:", { userId, db, appId });
            return;
        }
        
        console.log("Setting up Firebase listener for employees...");
        
        const employeesRef = collection(db, 'artifacts', appId, 'users', userId, 'employees');
        const unsubscribe = onSnapshot(employeesRef, (snapshot) => {
            const employeeData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("Employees loaded from Firebase:", employeeData);
            setEmployees(employeeData);
        }, (error) => {
            console.error("Error fetching employees:", error);
        });

        return () => unsubscribe();
    }, [userId, db, appId]);

    // Filtered employees
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                emp.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
            const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
            return matchesSearch && matchesStatus && matchesDepartment;
        });
    }, [employees, searchTerm, statusFilter, departmentFilter]);

    // Payroll calculations
    const payrollSummary = useMemo(() => {
        const activeEmployees = employees.filter(emp => emp.status === 'active');
        
        let totalBasePay = 0;
        let totalIncentives = 0;
        let totalHours = 0;

        activeEmployees.forEach(emp => {
            // Base pay calculation
            if (emp.payType === 'salary') {
                totalBasePay += (emp.baseSalary || 0) / 12; // Monthly salary
            } else {
                totalBasePay += (emp.hourlyRate || 0) * (emp.hoursWorked || 0);
                totalHours += emp.hoursWorked || 0;
            }

            // Incentive calculations
            if (emp.incentiveType === 'percent') {
                const bracket = percentBrackets.find(b => emp.salesAmount >= b.min && emp.salesAmount <= b.max);
                if (bracket) {
                    totalIncentives += emp.salesAmount * (bracket.rate / 100);
                }
            } else if (emp.incentiveType === 'hourly') {
                const bracket = hourlyBrackets.find(b => emp.salesAmount >= b.min && emp.salesAmount <= b.max);
                if (bracket) {
                    totalIncentives += (emp.hoursWorked || 0) * bracket.bonus;
                }
            }
        });

        return {
            activeEmployeeCount: activeEmployees.length,
            totalEmployeeCount: employees.length,
            totalBasePay,
            totalIncentives,
            totalPayroll: totalBasePay + totalIncentives,
            averagePay: activeEmployees.length > 0 ? (totalBasePay + totalIncentives) / activeEmployees.length : 0,
            totalHours
        };
    }, [employees, percentBrackets, hourlyBrackets]);

    // Get unique departments
    const departments = useMemo(() => {
        const depts = [...new Set(employees.map(emp => emp.department))];
        return ['all', ...depts];
    }, [employees]);

    // Incentive calculations (original)
    const calculatedPercentBonus = useMemo(() => {
        const bracket = percentBrackets.find(b => actualSalesPercent >= b.min && actualSalesPercent <= b.max);
        if (!bracket) return 0;
        return (actualSalesPercent * (bracket.rate / 100));
    }, [actualSalesPercent, percentBrackets]);

    const calculatedHourlyBonus = useMemo(() => {
        const bracket = hourlyBrackets.find(b => actualSalesHourly >= b.min && actualSalesHourly <= b.max);
        if (!bracket || !hoursWorked) return 0;
        return hoursWorked * bracket.bonus;
    }, [actualSalesHourly, hoursWorked, hourlyBrackets]);

    // Event handlers
    const handlePercentBracketChange = (index, field, value) => {
        const newBrackets = [...percentBrackets];
        newBrackets[index][field] = parseFloat(value) || 0;
        setPercentBrackets(newBrackets);
    };

    const handleHourlyBracketChange = (index, field, value) => {
        const newBrackets = [...hourlyBrackets];
        newBrackets[index][field] = parseFloat(value) || 0;
        setHourlyBrackets(newBrackets);
    };

    const handleEmployeeFormChange = (field, value) => {
        setEmployeeForm(prev => ({ ...prev, [field]: value }));
    };

    const handleAddEmployee = async () => {
        console.log("Adding employee:", employeeForm);
        
        if (!employeeForm.name.trim()) {
            alert("Please enter employee name");
            return;
        }

        if (!userId || !db || !appId) {
            alert("Please ensure you're logged in.");
            return;
        }

        try {
            const employeesRef = collection(db, 'artifacts', appId, 'users', userId, 'employees');
            await addDoc(employeesRef, {
                ...employeeForm,
                baseSalary: parseFloat(employeeForm.baseSalary) || 0,
                hourlyRate: parseFloat(employeeForm.hourlyRate) || 0,
                hoursWorked: 0,
                salesAmount: 0,
                createdAt: serverTimestamp()
            });
            
            console.log("Employee saved to Firebase successfully!");
            
            // Reset form
            setEmployeeForm({
                name: '',
                position: '',
                email: '',
                phone: '',
                baseSalary: '',
                payType: 'salary',
                hourlyRate: '',
                incentiveType: 'none',
                status: 'active',
                hireDate: new Date().toISOString().split('T')[0],
                department: 'Operations',
                notes: ''
            });
            setIsAddingEmployee(false);
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee: " + error.message);
        }
    };

    const handleEditEmployee = (employee) => {
        setEmployeeForm(employee);
        setEditingEmployee(employee.id);
        setIsAddingEmployee(true);
    };

    const handleUpdateEmployee = async () => {
        if (!userId || !db || !editingEmployee) return;

        try {
            const employeeRef = doc(db, 'artifacts', appId, 'users', userId, 'employees', editingEmployee);
            await updateDoc(employeeRef, {
                ...employeeForm,
                baseSalary: parseFloat(employeeForm.baseSalary) || 0,
                hourlyRate: parseFloat(employeeForm.hourlyRate) || 0,
                modifiedAt: serverTimestamp()
            });

            setEditingEmployee(null);
            setIsAddingEmployee(false);
            setEmployeeForm({
                name: '',
                position: '',
                email: '',
                phone: '',
                baseSalary: '',
                payType: 'salary',
                hourlyRate: '',
                incentiveType: 'none',
                status: 'active',
                hireDate: new Date().toISOString().split('T')[0],
                department: 'Operations',
                notes: ''
            });
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee: " + error.message);
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (!userId || !db) return;
        
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const employeeRef = doc(db, 'artifacts', appId, 'users', userId, 'employees', id);
                await deleteDoc(employeeRef);
                console.log("Employee deleted from Firebase");
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Failed to delete employee: " + error.message);
            }
        }
    };

    const handleEmployeeDataChange = async (id, field, value) => {
        if (!userId || !db) return;

        try {
            const employeeRef = doc(db, 'artifacts', appId, 'users', userId, 'employees', id);
            await updateDoc(employeeRef, {
                [field]: parseFloat(value) || 0,
                modifiedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating employee data:", error);
        }
    };

    const calculateEmployeeIncentive = (employee) => {
        if (employee.incentiveType === 'percent') {
            const bracket = percentBrackets.find(b => employee.salesAmount >= b.min && employee.salesAmount <= b.max);
            return bracket ? employee.salesAmount * (bracket.rate / 100) : 0;
        } else if (employee.incentiveType === 'hourly') {
            const bracket = hourlyBrackets.find(b => employee.salesAmount >= b.min && employee.salesAmount <= b.max);
            return bracket ? (employee.hoursWorked || 0) * bracket.bonus : 0;
        }
        return 0;
    };

    const calculateEmployeeBasePay = (employee) => {
        if (employee.payType === 'salary') {
            return (employee.baseSalary || 0) / 12; // Monthly
        } else {
            return (employee.hourlyRate || 0) * (employee.hoursWorked || 0);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
            case 'inactive': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
            case 'terminated': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
            default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Navigation */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Payroll Management System</h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage employees, calculate payroll, and track incentives</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('employees')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'employees'
                                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <Users size={16} />
                        Employees
                    </button>
                    <button
                        onClick={() => setActiveTab('payroll')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'payroll'
                                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <Calculator size={16} />
                        Payroll
                    </button>
                    <button
                        onClick={() => setActiveTab('incentives')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'incentives'
                                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <TrendingUp size={16} />
                        Incentive Calculator
                    </button>
                </div>
            </div>

            {/* Payroll Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Employees</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {payrollSummary.activeEmployeeCount}
                            </p>
                        </div>
                        <Users className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        of {payrollSummary.totalEmployeeCount} total
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Monthly Base Pay</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${payrollSummary.totalBasePay.toLocaleString()}
                            </p>
                        </div>
                        <DollarSign className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Avg: ${payrollSummary.averagePay.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Incentives</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                ${payrollSummary.totalIncentives.toLocaleString()}
                            </p>
                        </div>
                        <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Current period
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Payroll</p>
                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                ${payrollSummary.totalPayroll.toLocaleString()}
                            </p>
                        </div>
                        <Calculator className="text-orange-600 dark:text-orange-400" size={24} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Base + incentives
                    </p>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'employees' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Employee Management</h3>
                        <button
                            onClick={() => {
                                console.log("Add Employee button clicked");
                                setIsAddingEmployee(true);
                            }}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus size={16} />
                            Add Employee
                        </button>
                    </div>

                    {employees.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <h4 className="text-lg font-semibold mb-2">No employees yet</h4>
                            <p className="mb-4">Add your first employee to get started with payroll management.</p>
                            <button
                                onClick={() => {
                                    console.log("Add First Employee button clicked");
                                    setIsAddingEmployee(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Add First Employee
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Search and Filters */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search employees..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="text-slate-400" size={16} />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="terminated">Terminated</option>
                                    </select>
                                    <select
                                        value={departmentFilter}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                    >
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>
                                                {dept === 'all' ? 'All Departments' : dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Employee Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                                        <tr>
                                            <th className="p-3">Employee</th>
                                            <th className="p-3">Department</th>
                                            <th className="p-3">Pay Type</th>
                                            <th className="p-3">Base Pay</th>
                                            <th className="p-3">Incentive Type</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredEmployees.map(employee => (
                                            <tr key={employee.id} className="border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <td className="p-3">
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-white">{employee.name}</div>
                                                        <div className="text-slate-500 dark:text-slate-400">{employee.position}</div>
                                                        <div className="text-xs text-slate-400">{employee.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                                                        {employee.department}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="capitalize">{employee.payType}</span>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        {employee.payType === 'salary' 
                                                            ? `$${employee.baseSalary.toLocaleString()}/year`
                                                            : `$${employee.hourlyRate}/hour`
                                                        }
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <span className="font-mono text-green-600 dark:text-green-400">
                                                        ${calculateEmployeeBasePay(employee).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="capitalize">{employee.incentiveType}</span>
                                                </td>
                                                <td className="p-3">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                                                        {employee.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            onClick={() => handleEditEmployee(employee)}
                                                            className="text-slate-500 dark:text-slate-400 hover:text-blue-500 p-1 rounded transition-colors"
                                                            title="Edit employee"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEmployee(employee.id)}
                                                            className="text-slate-500 dark:text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                                                            title="Delete employee"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Employee Form Modal */}
                    {isAddingEmployee && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                                        {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                                    </h3>
                                </div>
                                <div className="p-6 overflow-y-auto max-h-[70vh]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={employeeForm.name}
                                                onChange={(e) => handleEmployeeFormChange('name', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Position *
                                            </label>
                                            <input
                                                type="text"
                                                value={employeeForm.position}
                                                onChange={(e) => handleEmployeeFormChange('position', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={employeeForm.email}
                                                onChange={(e) => handleEmployeeFormChange('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={employeeForm.phone}
                                                onChange={(e) => handleEmployeeFormChange('phone', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Department
                                            </label>
                                            <select
                                                value={employeeForm.department}
                                                onChange={(e) => handleEmployeeFormChange('department', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            >
                                                <option value="Operations">Operations</option>
                                                <option value="Sales">Sales</option>
                                                <option value="Administration">Administration</option>
                                                <option value="Management">Management</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Pay Type
                                            </label>
                                            <select
                                                value={employeeForm.payType}
                                                onChange={(e) => handleEmployeeFormChange('payType', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            >
                                                <option value="salary">Salary</option>
                                                <option value="hourly">Hourly</option>
                                            </select>
                                        </div>
                                        {employeeForm.payType === 'salary' ? (
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                    Annual Salary
                                                </label>
                                                <input
                                                    type="number"
                                                    value={employeeForm.baseSalary}
                                                    onChange={(e) => handleEmployeeFormChange('baseSalary', e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                    Hourly Rate
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={employeeForm.hourlyRate}
                                                    onChange={(e) => handleEmployeeFormChange('hourlyRate', e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Incentive Type
                                            </label>
                                            <select
                                                value={employeeForm.incentiveType}
                                                onChange={(e) => handleEmployeeFormChange('incentiveType', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            >
                                                <option value="none">None</option>
                                                <option value="percent">Percentage</option>
                                                <option value="hourly">Hourly Bonus</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Status
                                            </label>
                                            <select
                                                value={employeeForm.status}
                                                onChange={(e) => handleEmployeeFormChange('status', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="terminated">Terminated</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Hire Date
                                            </label>
                                            <input
                                                type="date"
                                                value={employeeForm.hireDate}
                                                onChange={(e) => handleEmployeeFormChange('hireDate', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Notes
                                            </label>
                                            <textarea
                                                value={employeeForm.notes}
                                                onChange={(e) => handleEmployeeFormChange('notes', e.target.value)}
                                                rows="3"
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                placeholder="Additional notes about the employee..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setIsAddingEmployee(false);
                                            setEditingEmployee(null);
                                            setEmployeeForm({
                                                name: '',
                                                position: '',
                                                email: '',
                                                phone: '',
                                                baseSalary: '',
                                                payType: 'salary',
                                                hourlyRate: '',
                                                incentiveType: 'none',
                                                status: 'active',
                                                hireDate: new Date().toISOString().split('T')[0],
                                                department: 'Operations',
                                                notes: ''
                                            });
                                        }}
                                        className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            console.log("Form submit button clicked");
                                            editingEmployee ? handleUpdateEmployee() : handleAddEmployee();
                                        }}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                                    >
                                        {editingEmployee ? 'Update Employee' : 'Add Employee'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'payroll' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Payroll Calculator</h3>
                    
                    {employees.filter(emp => emp.status === 'active').length === 0 ? (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                            <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                            <h4 className="text-lg font-semibold mb-2">No active employees</h4>
                            <p className="mb-4">Add some employees to start calculating payroll.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="p-3">Employee</th>
                                        <th className="p-3">Hours</th>
                                        <th className="p-3">Sales</th>
                                        <th className="p-3">Base Pay</th>
                                        <th className="p-3">Incentive</th>
                                        <th className="p-3">Total Pay</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {employees.filter(emp => emp.status === 'active').map(employee => {
                                        const basePay = calculateEmployeeBasePay(employee);
                                        const incentive = calculateEmployeeIncentive(employee);
                                        const totalPay = basePay + incentive;
                                        
                                        return (
                                            <tr key={employee.id} className="border-b border-slate-200 dark:border-slate-700/50">
                                                <td className="p-3">
                                                    <div className="font-medium text-slate-900 dark:text-white">{employee.name}</div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">{employee.position}</div>
                                                </td>
                                                <td className="p-3">
                                                    {employee.payType === 'hourly' ? (
                                                        <input
                                                            type="number"
                                                            value={employee.hoursWorked || ''}
                                                            onChange={(e) => handleEmployeeDataChange(employee.id, 'hoursWorked', e.target.value)}
                                                            className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                                            placeholder="0"
                                                        />
                                                    ) : (
                                                        <span className="text-slate-400">—</span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    {employee.incentiveType !== 'none' ? (
                                                        <input
                                                            type="number"
                                                            value={employee.salesAmount || ''}
                                                            onChange={(e) => handleEmployeeDataChange(employee.id, 'salesAmount', e.target.value)}
                                                            className="w-24 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                                            placeholder="0"
                                                        />
                                                    ) : (
                                                        <span className="text-slate-400">—</span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    <span className="font-mono text-green-600 dark:text-green-400">
                                                        ${basePay.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="font-mono text-purple-600 dark:text-purple-400">
                                                        ${incentive.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                                                        ${totalPay.toFixed(2)}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'incentives' && (
                <div className="space-y-8">
                    {/* Original Percent Incentive Calculator */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Percent Incentive Calculator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Bonus Bracket Table */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">Bonus Brackets</h4>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                        <tr>
                                            <th className="p-2">Sales Bracket</th>
                                            <th className="p-2">% Scale</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {percentBrackets.map((bracket, index) => (
                                            <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                                <td className="p-2 font-mono bg-blue-100 dark:bg-blue-900/50">
                                                    ${bracket.min.toLocaleString()}{bracket.max === Infinity ? '+' : ` - $${bracket.max.toLocaleString()}`}
                                                </td>
                                                <td className="p-2 bg-blue-100 dark:bg-blue-900/50">
                                                    <input 
                                                        type="number"
                                                        value={bracket.rate}
                                                        onChange={(e) => handlePercentBracketChange(index, 'rate', e.target.value)}
                                                        className="w-20 bg-transparent text-right font-mono"
                                                    /> %
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Calculation Section */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">Bonus Calculation</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Actual Sales</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input 
                                                type="number"
                                                value={actualSalesPercent}
                                                onChange={(e) => setActualSalesPercent(parseFloat(e.target.value) || 0)}
                                                className="w-full bg-yellow-100 dark:bg-yellow-800/50 pl-10 p-2 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Bonus</p>
                                        <p className="text-3xl font-bold text-green-500">${calculatedPercentBonus.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Original Hourly Incentive Calculator */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Hourly Incentive Calculator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Bonus Bracket Table */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">Bonus Brackets</h4>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                        <tr>
                                            <th className="p-2">Sales Bracket</th>
                                            <th className="p-2">Bonus per Hour</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hourlyBrackets.map((bracket, index) => (
                                            <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                                <td className="p-2 font-mono bg-blue-100 dark:bg-blue-900/50">
                                                    ${bracket.min.toLocaleString()}{bracket.max === Infinity ? '+' : ` - $${bracket.max.toLocaleString()}`}
                                                </td>
                                                <td className="p-2 bg-blue-100 dark:bg-blue-900/50">
                                                    $ <input 
                                                        type="number"
                                                        value={bracket.bonus}
                                                        onChange={(e) => handleHourlyBracketChange(index, 'bonus', e.target.value)}
                                                        className="w-20 bg-transparent text-right font-mono"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Calculation Section */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">Bonus Calculation</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Actual Sales</label>
                                         <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input 
                                                type="number"
                                                value={actualSalesHourly}
                                                onChange={(e) => setActualSalesHourly(parseFloat(e.target.value) || 0)}
                                                className="w-full bg-yellow-100 dark:bg-yellow-800/50 pl-10 p-2 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Hours Worked</label>
                                        <input 
                                            type="number"
                                            value={hoursWorked}
                                            onChange={(e) => setHoursWorked(parseFloat(e.target.value) || 0)}
                                            className="w-full bg-yellow-100 dark:bg-yellow-800/50 p-2 rounded-md"
                                        />
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Bonus</p>
                                        <p className="text-3xl font-bold text-green-500">${calculatedHourlyBonus.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IncentiveCalculator;