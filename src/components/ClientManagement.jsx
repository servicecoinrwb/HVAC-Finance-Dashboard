import React, { useMemo, useState } from 'react';
import { 
    Upload, 
    FileText, 
    PlusCircle, 
    Edit, 
    Trash2, 
    Search,
    Filter,
    SortAsc,
    SortDesc,
    Building2,
    Building,
    Users,
    ChevronDown,
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Grid3X3,
    List,
    TreePine,
    Link,
    Unlink,
    UserPlus,
    ArrowRight,
    X,
    Check
} from 'lucide-react';

export const ClientManagement = ({ 
    clients, 
    openModal, 
    handleDelete, 
    handleBulkDelete, 
    searchTerm, 
    setSearchTerm, 
    selectedIds, 
    setSelectedIds, 
    handleImportCSV, 
    handleExportCSV,
    handleBulkUpdate  // New prop for bulk operations
}) => {
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterBy, setFilterBy] = useState('all');
    const [selectedParent, setSelectedParent] = useState('all');
    const [viewMode, setViewMode] = useState('hierarchy');
    const [expandedParents, setExpandedParents] = useState(new Set());
    const [showFilters, setShowFilters] = useState(false);
    const [showBulkAssign, setShowBulkAssign] = useState(false);
    const [bulkAssignParent, setBulkAssignParent] = useState('');
    const [draggedClient, setDraggedClient] = useState(null);

    // Get parent companies
    const parentCompanies = useMemo(() => 
        clients.filter(client => !client.parentId || client.parentId === ''),
        [clients]
    );

    // Get unassigned clients (no parent)
    const unassignedClients = useMemo(() => 
        clients.filter(client => !client.parentId || client.parentId === ''),
        [clients]
    );

    // Get filtered and sorted clients
    const filteredClients = useMemo(() => {
        let filtered = clients.filter(client => {
            const matchesSearch = 
                (client.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (client.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (client.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (client.phone || '').includes(searchTerm);

            const matchesFilter = 
                filterBy === 'all' ||
                (filterBy === 'parent' && (!client.parentId || client.parentId === '')) ||
                (filterBy === 'location' && client.parentId && client.parentId !== '') ||
                (filterBy === 'unassigned' && (!client.parentId || client.parentId === '')) ||
                (filterBy === 'active' && client.status === 'Active') ||
                (filterBy === 'inactive' && client.status === 'Inactive');

            const matchesParent = 
                selectedParent === 'all' ||
                client.parentId === selectedParent ||
                client.id === selectedParent;

            return matchesSearch && matchesFilter && matchesParent;
        });

        // Sort clients
        filtered.sort((a, b) => {
            let aVal = a[sortBy] || '';
            let bVal = b[sortBy] || '';

            if (sortBy === 'name') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });

        return filtered;
    }, [clients, searchTerm, sortBy, sortOrder, filterBy, selectedParent]);

    // Organize clients by hierarchy
    const hierarchicalClients = useMemo(() => {
        const parents = filteredClients.filter(client => !client.parentId || client.parentId === '');
        return parents.map(parent => ({
            ...parent,
            children: filteredClients.filter(client => client.parentId === parent.id)
        }));
    }, [filteredClients]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const toggleParentExpansion = (parentId) => {
        const newExpanded = new Set(expandedParents);
        if (newExpanded.has(parentId)) {
            newExpanded.delete(parentId);
        } else {
            newExpanded.add(parentId);
        }
        setExpandedParents(newExpanded);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredClients.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Bulk assign parent company
    const handleBulkAssignParent = () => {
        if (selectedIds.length > 0 && bulkAssignParent) {
            const updates = selectedIds.map(id => ({
                id,
                parentId: bulkAssignParent
            }));
            handleBulkUpdate && handleBulkUpdate('client', updates);
            setSelectedIds([]);
            setShowBulkAssign(false);
            setBulkAssignParent('');
        }
    };

    // Bulk remove parent assignment
    const handleBulkRemoveParent = () => {
        if (selectedIds.length > 0) {
            const updates = selectedIds.map(id => ({
                id,
                parentId: ''
            }));
            handleBulkUpdate && handleBulkUpdate('client', updates);
            setSelectedIds([]);
        }
    };

    // Drag and Drop handlers
    const handleDragStart = (e, client) => {
        setDraggedClient(client);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetParent) => {
        e.preventDefault();
        if (draggedClient && draggedClient.id !== targetParent.id) {
            const update = {
                id: draggedClient.id,
                parentId: targetParent.id
            };
            handleBulkUpdate && handleBulkUpdate('client', [update]);
        }
        setDraggedClient(null);
    };

    // Select all children of a parent
    const selectParentAndChildren = (parent) => {
        const childrenIds = clients
            .filter(client => client.parentId === parent.id)
            .map(child => child.id);
        setSelectedIds(prev => {
            const newSelected = new Set([...prev, parent.id, ...childrenIds]);
            return Array.from(newSelected);
        });
    };

    const ClientCard = ({ client, isChild = false, parent = null }) => (
        <div 
            className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-all duration-200 ${
                isChild 
                    ? 'ml-6 border-l-4 border-l-blue-400 bg-blue-50/30 dark:bg-blue-900/10' 
                    : 'border-l-4 border-l-purple-400'
            } ${selectedIds.includes(client.id) ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
            draggable={!isChild}
            onDragStart={(e) => handleDragStart(e, client)}
            onDragOver={handleDragOver}
            onDrop={(e) => !isChild && handleDrop(e, client)}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(client.id)}
                            onChange={() => {
                                setSelectedIds(prev => 
                                    prev.includes(client.id) 
                                        ? prev.filter(id => id !== client.id) 
                                        : [...prev, client.id]
                                );
                            }}
                            className="rounded"
                        />
                        {isChild ? (
                            <Building className="h-4 w-4 text-blue-500" />
                        ) : (
                            <Building2 className="h-5 w-5 text-purple-600" />
                        )}
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            {client.name}
                        </h3>
                        {client.status && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                client.status === 'Active' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                {client.status}
                            </span>
                        )}
                        {isChild && parent && (
                            <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                                ↳ {parent.name}
                            </span>
                        )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        {client.address && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{client.address}</span>
                            </div>
                        )}
                        {client.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{client.phone}</span>
                            </div>
                        )}
                        {client.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{client.email}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 ml-4">
                    {!isChild && (
                        <button
                            onClick={() => selectParentAndChildren(client)}
                            className="p-1 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded"
                            title="Select Parent & All Locations"
                        >
                            <Users className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        onClick={() => openModal('client', client)}
                        className="p-1 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 rounded"
                        title="Edit Client"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDelete('client', client.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        title="Delete Client"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const HierarchyView = () => (
        <div className="space-y-6">
            {/* Unassigned Clients Section */}
            {unassignedClients.length > 0 && (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Unassigned Clients ({unassignedClients.filter(c => filteredClients.includes(c)).length})
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Drag clients to parent companies below
                        </span>
                    </div>
                    <div className="space-y-2">
                        {unassignedClients.filter(c => filteredClients.includes(c)).map(client => (
                            <ClientCard key={client.id} client={client} />
                        ))}
                    </div>
                </div>
            )}

            {/* Parent Companies with Children */}
            {hierarchicalClients.filter(parent => parent.children.length > 0).map(parent => (
                <div key={parent.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleParentExpansion(parent.id)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                        >
                            {expandedParents.has(parent.id) ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        <div className="flex-1">
                            <ClientCard client={parent} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                                {parent.children.length} locations
                            </span>
                            <button
                                onClick={() => selectParentAndChildren(parent)}
                                className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50"
                                title="Select All"
                            >
                                Select All
                            </button>
                        </div>
                    </div>
                    
                    {expandedParents.has(parent.id) && (
                        <div className="space-y-2 border-l-2 border-purple-200 dark:border-purple-700 ml-4 pl-4">
                            {parent.children.map(child => (
                                <ClientCard key={child.id} client={child} isChild={true} parent={parent} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const TableView = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="p-3">
                            <input type="checkbox" onChange={handleSelectAll} />
                        </th>
                        <th className="p-3">
                            <button
                                onClick={() => handleSort('name')}
                                className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
                            >
                                Name
                                {sortBy === 'name' && (
                                    sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                                )}
                            </button>
                        </th>
                        <th className="p-3">Type</th>
                        <th className="p-3">
                            <button
                                onClick={() => handleSort('address')}
                                className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
                            >
                                Address
                                {sortBy === 'address' && (
                                    sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                                )}
                            </button>
                        </th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Parent Company</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {filteredClients.map(client => {
                        const parentCompany = parentCompanies.find(p => p.id === client.parentId);
                        const isSelected = selectedIds.includes(client.id);
                        return (
                            <tr key={client.id} className={`border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                                isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}>
                                <td className="p-3">
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={() => {
                                            setSelectedIds(prev => 
                                                prev.includes(client.id) 
                                                    ? prev.filter(id => id !== client.id) 
                                                    : [...prev, client.id]
                                            );
                                        }} 
                                    />
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        {client.parentId ? (
                                            <Building className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <Building2 className="h-4 w-4 text-purple-600" />
                                        )}
                                        <span className="font-medium">{client.name}</span>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        client.parentId 
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                    }`}>
                                        {client.parentId ? 'Location' : 'Parent'}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span>{client.address}</span>
                                </td>
                                <td className="p-3">
                                    <div className="space-y-1">
                                        {client.phone && (
                                            <div className="flex items-center gap-1 text-xs">
                                                <Phone className="h-3 w-3" />
                                                <span>{client.phone}</span>
                                            </div>
                                        )}
                                        {client.email && (
                                            <div className="flex items-center gap-1 text-xs">
                                                <Mail className="h-3 w-3" />
                                                <span>{client.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-3">
                                    {parentCompany ? (
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="h-3 w-3 text-slate-400" />
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                                {parentCompany.name}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-400">—</span>
                                    )}
                                </td>
                                <td className="p-3 text-center">
                                    <button 
                                        onClick={() => openModal('client', client)} 
                                        className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete('client', client.id)} 
                                        className="text-slate-500 dark:text-slate-400 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const CardView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map(client => {
                const parentCompany = parentCompanies.find(p => p.id === client.parentId);
                return (
                    <ClientCard 
                        key={client.id} 
                        client={client} 
                        isChild={!!client.parentId}
                        parent={parentCompany}
                    />
                );
            })}
        </div>
    );

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Client Management</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {filteredClients.length} of {clients.length} clients
                        {selectedIds.length > 0 && ` • ${selectedIds.length} selected`}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    {selectedIds.length > 0 && (
                        <>
                            <button 
                                onClick={() => setShowBulkAssign(true)}
                                className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <Link size={16} /> Assign Parent ({selectedIds.length})
                            </button>
                            <button 
                                onClick={handleBulkRemoveParent}
                                className="flex items-center gap-2 text-sm bg-orange-600 hover:bg-orange-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <Unlink size={16} /> Remove Parent
                            </button>
                            <button 
                                onClick={() => handleBulkDelete('client', selectedIds)} 
                                className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                            >
                                <Trash2 size={16} /> Delete ({selectedIds.length})
                            </button>
                        </>
                    )}
                    
                    <input 
                        type="file" 
                        id="csv-importer-client" 
                        className="hidden" 
                        accept=".csv" 
                        onChange={e => handleImportCSV(e.target.files[0], 'client')} 
                    />
                    <label 
                        htmlFor="csv-importer-client" 
                        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"
                    >
                        <Upload size={16} /> Import CSV
                    </label>
                    
                    <button 
                        onClick={() => handleExportCSV(clients, 'clients')} 
                        className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                    >
                        <FileText size={16} /> Export CSV
                    </button>
                    
                    <button 
                        onClick={() => openModal('client')} 
                        className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
                    >
                        <PlusCircle size={16} /> Add New
                    </button>
                </div>
            </div>

            {/* Bulk Assign Modal */}
            {showBulkAssign && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Assign Parent Company
                            </h4>
                            <button
                                onClick={() => setShowBulkAssign(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Assign {selectedIds.length} selected clients to a parent company:
                        </p>
                        <select
                            value={bulkAssignParent}
                            onChange={(e) => setBulkAssignParent(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white mb-4"
                        >
                            <option value="">Select Parent Company</option>
                            {parentCompanies.map(parent => (
                                <option key={parent.id} value={parent.id}>
                                    {parent.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowBulkAssign(false)}
                                className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBulkAssignParent}
                                disabled={!bulkAssignParent}
                                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search clients by name, address, phone, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white"
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {/* View Mode Toggles */}
                <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                    <button
                        onClick={() => setViewMode('hierarchy')}
                        className={`px-3 py-2 text-sm ${
                            viewMode === 'hierarchy'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                        }`}
                        title="Hierarchy View"
                    >
                        <TreePine className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 text-sm ${
                            viewMode === 'list'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                        }`}
                        title="Table View"
                    >
                        <List className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`px-3 py-2 text-sm ${
                            viewMode === 'cards'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                        }`}
                        title="Card View"
                    >
                        <Grid3X3 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Filter by Type
                            </label>
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white"
                            >
                                <option value="all">All Clients</option>
                                <option value="parent">Parent Companies Only</option>
                                <option value="location">Store Locations Only</option>
                                <option value="unassigned">Unassigned Clients</option>
                                <option value="active">Active Only</option>
                                <option value="inactive">Inactive Only</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Filter by Parent Company
                            </label>
                            <select
                                value={selectedParent}
                                onChange={(e) => setSelectedParent(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white"
                            >
                                <option value="all">All Companies</option>
                                {parentCompanies.map(parent => (
                                    <option key={parent.id} value={parent.id}>
                                        {parent.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Sort by
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white"
                                >
                                    <option value="name">Name</option>
                                    <option value="address">Address</option>
                                    <option value="phone">Phone</option>
                                    <option value="email">Email</option>
                                </select>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
                                >
                                    {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="min-h-[400px]">
                {filteredClients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
                        <Users className="h-12 w-12 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No clients found</h3>
                        <p className="text-sm text-center">
                            {searchTerm || filterBy !== 'all' || selectedParent !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Get started by adding your first client'
                            }
                        </p>
                    </div>
                ) : (
                    <>
                        {viewMode === 'hierarchy' && <HierarchyView />}
                        {viewMode === 'list' && <TableView />}
                        {viewMode === 'cards' && <CardView />}
                    </>
                )}
            </div>
        </div>
    );
};