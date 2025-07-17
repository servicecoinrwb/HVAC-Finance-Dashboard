import React from 'react';
import { ManagementSection } from './ManagementSection';

export const JobsSection = ({ jobs, clients, openModal, handleDelete, searchTerm, setSearchTerm, handleImportCSV, handleExportCSV }) => {
    const jobColumns = [
        { key: 'name', header: 'Job/Client', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'client', header: 'Client', render: item => <span>{clients.find(c => c.id === item.clientId)?.name || 'N/A'}</span> },
        { key: 'revenue', header: 'Revenue', className: 'text-right', render: item => <span className="font-mono text-green-600 dark:text-green-400">${(item.revenue || 0).toFixed(2)}</span> },
        { key: 'materialCost', header: 'Material Cost', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(item.materialCost || 0).toFixed(2)}</span> },
        { key: 'laborCost', header: 'Labor Cost', className: 'text-right', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${(item.laborCost || 0).toFixed(2)}</span> },
        { key: 'netProfit', header: 'Net Profit', className: 'text-right font-bold', render: item => <span className="font-mono text-cyan-600 dark:text-cyan-400">${((item.revenue || 0) - (item.materialCost || 0) - (item.laborCost || 0)).toFixed(2)}</span> },
    ];

    return (
        <ManagementSection
            title="Job Profitability"
            data={jobs}
            columns={jobColumns}
            type="job"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleImportCSV={handleImportCSV}
            handleExportCSV={handleExportCSV}
            openModal={openModal}
            handleDelete={handleDelete}
        />
    );
};
